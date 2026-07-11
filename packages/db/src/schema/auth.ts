import { sql } from "drizzle-orm";
import {
  check,
  foreignKey,
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userStatus = pgEnum("auth_user_status", ["pending", "active", "suspended", "disabled"]);
export const membershipStatus = pgEnum("auth_membership_status", [
  "invited",
  "active",
  "suspended",
  "revoked",
]);
export const roleScope = pgEnum("auth_role_scope", ["platform", "tenant"]);
export const roleStatus = pgEnum("auth_role_status", ["active", "retired"]);
export const assignmentStatus = pgEnum("auth_assignment_status", ["active", "revoked"]);
export const sessionStatus = pgEnum("auth_session_status", ["active", "revoked", "expired"]);
export const loginAttemptOutcome = pgEnum("auth_login_attempt_outcome", [
  "success",
  "failure",
  "blocked",
]);
export const loginFailureReason = pgEnum("auth_login_failure_reason", [
  "invalid_credentials",
  "user_inactive",
  "membership_inactive",
  "rate_limited",
  "locked",
  "expired_flow",
  "policy_denied",
]);
export const auditActorType = pgEnum("auth_audit_actor_type", ["human", "system", "service"]);

const createdAt = () => timestamp("created_at", { withTimezone: true }).defaultNow().notNull();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).defaultNow().notNull();

export const users = pgTable(
  "users",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    email: varchar("email", { length: 320 }).notNull(),
    normalizedEmail: varchar("normalized_email", { length: 320 }).notNull(),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    // Password algorithm and parameters remain deferred to Security approval.
    passwordHash: text("password_hash"),
    status: userStatus("status").default("pending").notNull(),
    lockedUntil: timestamp("locked_until", { withTimezone: true }),
    passwordChangedAt: timestamp("password_changed_at", { withTimezone: true }),
    disabledAt: timestamp("disabled_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("users_normalized_email_unique").on(table.normalizedEmail),
    index("users_status_idx").on(table.status),
  ],
);

export const roles = pgTable(
  "roles",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    // The tenant foreign key awaits the separately approved tenants schema.
    tenantId: uuid("tenant_id"),
    roleKey: varchar("role_key", { length: 120 }).notNull(),
    name: varchar("name", { length: 160 }).notNull(),
    scopeType: roleScope("scope_type").notNull(),
    status: roleStatus("status").default("active").notNull(),
    description: text("description"),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("roles_platform_key_unique")
      .on(table.roleKey)
      .where(sql`${table.scopeType} = 'platform'`),
    uniqueIndex("roles_tenant_key_unique")
      .on(table.tenantId, table.roleKey)
      .where(sql`${table.scopeType} = 'tenant'`),
    uniqueIndex("roles_id_tenant_unique").on(table.id, table.tenantId),
    uniqueIndex("roles_id_scope_unique").on(table.id, table.scopeType),
    check(
      "roles_scope_tenant_consistency",
      sql`(${table.scopeType} = 'platform' AND ${table.tenantId} IS NULL) OR (${table.scopeType} = 'tenant' AND ${table.tenantId} IS NOT NULL)`,
    ),
  ],
);

export const permissions = pgTable(
  "permissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    permissionKey: varchar("permission_key", { length: 160 }).notNull(),
    scopeType: roleScope("scope_type").notNull(),
    description: text("description"),
    status: roleStatus("status").default("active").notNull(),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("permissions_key_unique").on(table.permissionKey),
    uniqueIndex("permissions_id_scope_unique").on(table.id, table.scopeType),
  ],
);

export const platformRoleAssignments = pgTable(
  "platform_role_assignments",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
    roleId: uuid("role_id").notNull(),
    // Redundant by design so a composite FK can reject tenant-scoped roles here.
    roleScope: roleScope("role_scope").default("platform").notNull(),
    status: assignmentStatus("status").default("active").notNull(),
    assignedAt: timestamp("assigned_at", { withTimezone: true }).defaultNow().notNull(),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    assignedByUserId: uuid("assigned_by_user_id").references(() => users.id, { onDelete: "restrict" }),
    revokedByUserId: uuid("revoked_by_user_id").references(() => users.id, { onDelete: "restrict" }),
    reason: text("reason").notNull(),
  },
  (table) => [
    uniqueIndex("platform_role_assignments_active_unique")
      .on(table.userId, table.roleId)
      .where(sql`${table.status} = 'active'`),
    index("platform_role_assignments_user_status_idx").on(table.userId, table.status),
    foreignKey({
      columns: [table.roleId, table.roleScope],
      foreignColumns: [roles.id, roles.scopeType],
      name: "platform_role_assignments_platform_role_fk",
    }).onDelete("restrict"),
    check("platform_role_assignments_scope_check", sql`${table.roleScope} = 'platform'`),
    check(
      "platform_role_assignments_revocation_check",
      sql`(${table.status} = 'active' AND ${table.revokedAt} IS NULL) OR (${table.status} = 'revoked' AND ${table.revokedAt} IS NOT NULL)`,
    ),
  ],
);

export const tenantMemberships = pgTable(
  "tenant_memberships",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    // The tenant foreign key awaits the separately approved tenants schema.
    tenantId: uuid("tenant_id").notNull(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
    // One tenant role per membership is the approved MVP model.
    roleId: uuid("role_id").notNull(),
    status: membershipStatus("status").default("invited").notNull(),
    invitedAt: timestamp("invited_at", { withTimezone: true }).defaultNow().notNull(),
    activatedAt: timestamp("activated_at", { withTimezone: true }),
    suspendedAt: timestamp("suspended_at", { withTimezone: true }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    createdAt: createdAt(),
    updatedAt: updatedAt(),
  },
  (table) => [
    uniqueIndex("tenant_memberships_tenant_user_unique").on(table.tenantId, table.userId),
    index("tenant_memberships_tenant_status_idx").on(table.tenantId, table.status),
    index("tenant_memberships_user_status_idx").on(table.userId, table.status),
    // Enforces both tenant-role scope and same-tenant ownership.
    foreignKey({
      columns: [table.roleId, table.tenantId],
      foreignColumns: [roles.id, roles.tenantId],
      name: "tenant_memberships_tenant_role_fk",
    }).onDelete("restrict"),
  ],
);

export const rolePermissions = pgTable(
  "role_permissions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    roleId: uuid("role_id").notNull(),
    permissionId: uuid("permission_id").notNull(),
    // Redundant by design so role and permission scope must match.
    scopeType: roleScope("scope_type").notNull(),
    createdAt: createdAt(),
    createdByUserId: uuid("created_by_user_id").references(() => users.id, { onDelete: "restrict" }),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("role_permissions_active_unique")
      .on(table.roleId, table.permissionId)
      .where(sql`${table.revokedAt} IS NULL`),
    index("role_permissions_permission_idx").on(table.permissionId),
    foreignKey({
      columns: [table.roleId, table.scopeType],
      foreignColumns: [roles.id, roles.scopeType],
      name: "role_permissions_role_scope_fk",
    }).onDelete("restrict"),
    foreignKey({
      columns: [table.permissionId, table.scopeType],
      foreignColumns: [permissions.id, permissions.scopeType],
      name: "role_permissions_permission_scope_fk",
    }).onDelete("restrict"),
  ],
);

export const userSessions = pgTable(
  "user_sessions",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "restrict" }),
    tenantMembershipId: uuid("tenant_membership_id").references(() => tenantMemberships.id, {
      onDelete: "restrict",
    }),
    // The raw opaque bearer token must never be persisted.
    sessionTokenDigest: varchar("session_token_digest", { length: 255 }).notNull(),
    status: sessionStatus("status").default("active").notNull(),
    createdAt: createdAt(),
    expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    idleExpiresAt: timestamp("idle_expires_at", { withTimezone: true }),
    lastUsedAt: timestamp("last_used_at", { withTimezone: true }).defaultNow().notNull(),
    // Self-FK and exact token-family representation remain deferred with rotation policy review.
    rotatedFromSessionId: uuid("rotated_from_session_id"),
    revokedAt: timestamp("revoked_at", { withTimezone: true }),
    revocationReason: varchar("revocation_reason", { length: 160 }),
    ipHash: varchar("ip_hash", { length: 255 }),
    userAgentHash: varchar("user_agent_hash", { length: 255 }),
  },
  (table) => [
    uniqueIndex("user_sessions_token_digest_unique").on(table.sessionTokenDigest),
    index("user_sessions_user_status_idx").on(table.userId, table.status),
    index("user_sessions_membership_status_idx").on(table.tenantMembershipId, table.status),
    index("user_sessions_expires_at_idx").on(table.expiresAt),
    check(
      "user_sessions_revocation_check",
      sql`(${table.status} = 'revoked' AND ${table.revokedAt} IS NOT NULL) OR (${table.status} <> 'revoked' AND ${table.revokedAt} IS NULL)`,
    ),
  ],
);

export const loginAttempts = pgTable(
  "login_attempts",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id").references(() => users.id, { onDelete: "restrict" }),
    emailFingerprint: varchar("email_fingerprint", { length: 255 }),
    // The tenant foreign key awaits the separately approved tenants schema.
    tenantId: uuid("tenant_id"),
    outcome: loginAttemptOutcome("outcome").notNull(),
    failureReason: loginFailureReason("failure_reason"),
    occurredAt: timestamp("occurred_at", { withTimezone: true }).defaultNow().notNull(),
    ipHash: varchar("ip_hash", { length: 255 }),
    userAgentHash: varchar("user_agent_hash", { length: 255 }),
    correlationId: varchar("correlation_id", { length: 160 }),
  },
  (table) => [
    index("login_attempts_user_occurred_idx").on(table.userId, table.occurredAt),
    index("login_attempts_email_occurred_idx").on(table.emailFingerprint, table.occurredAt),
    index("login_attempts_ip_occurred_idx").on(table.ipHash, table.occurredAt),
    check(
      "login_attempts_failure_reason_check",
      sql`(${table.outcome} = 'success' AND ${table.failureReason} IS NULL) OR (${table.outcome} <> 'success' AND ${table.failureReason} IS NOT NULL)`,
    ),
  ],
);

export const auditActorLinks = pgTable(
  "audit_actor_links",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    // audit_logs is owned by the future audit boundary and is not created here.
    auditEventId: uuid("audit_event_id").notNull(),
    actorUserId: uuid("actor_user_id").references(() => users.id, { onDelete: "restrict" }),
    subjectUserId: uuid("subject_user_id").references(() => users.id, { onDelete: "restrict" }),
    // The tenant foreign key awaits the separately approved tenants schema.
    tenantId: uuid("tenant_id"),
    tenantMembershipId: uuid("tenant_membership_id").references(() => tenantMemberships.id, {
      onDelete: "restrict",
    }),
    userSessionId: uuid("user_session_id").references(() => userSessions.id, { onDelete: "restrict" }),
    actorType: auditActorType("actor_type").notNull(),
    createdAt: createdAt(),
  },
  (table) => [
    uniqueIndex("audit_actor_links_event_unique").on(table.auditEventId),
    index("audit_actor_links_actor_idx").on(table.actorUserId),
    index("audit_actor_links_subject_idx").on(table.subjectUserId),
    index("audit_actor_links_tenant_idx").on(table.tenantId),
    check(
      "audit_actor_links_human_actor_check",
      sql`${table.actorType} <> 'human' OR ${table.actorUserId} IS NOT NULL`,
    ),
  ],
);
