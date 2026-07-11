# Support and Notifications

## Purpose

Define tenant-scoped customer support and reliable event-driven communications that link to orders, payments, transfers, and digital deliveries without leaking sensitive data or treating notification delivery as proof of a business outcome.

## Main actors

- Customer
- Support Agent
- Tenant Admin
- Super Admin support/security operator
- Notification worker and email/SMS/push/in-app providers
- Domain modules emitting versioned events

## Core flows

### Support

1. Customer opens a ticket, selects a category, adds a message/evidence, and optionally links an owned business object.
2. The system validates ownership, scans attachments, assigns priority/SLA, and routes to an authorized queue.
3. Agents reply, add private notes, assign/escalate, request information, and resolve with a reason.
4. Customer may reopen within policy; all status and assignment changes appear in the timeline.

### Notifications

1. A committed business event creates an outbox record.
2. The notification service resolves tenant template/version, locale, recipient preference, and mandatory-delivery policy.
3. A delivery attempt is queued with an idempotent key and minimal payload.
4. Provider outcome is recorded; retryable failures back off, permanent failures surface to operations.
5. In-app records and preference/audit history remain available independently of external delivery.

## Required entities

- SupportTicket, TicketCategory, TicketStatus, TicketPriority
- TicketMessage, InternalNote, Attachment, Assignment, Escalation, SLARecord
- NotificationEvent, NotificationTemplate, TemplateVersion
- NotificationPreference, Notification, DeliveryAttempt, Channel
- ProviderMessageReference, SuppressionRecord, DeliveryFailure
- AuditRecord and optional CustomerSatisfactionResponse

## Business rules

- Tickets and messages are tenant-scoped; linked object access is verified server-side for every actor.
- Canonical ticket states are `open`, `waiting_for_agent`, `waiting_for_customer`, `resolved`, and `closed`.
- Internal notes are never customer-visible and require staff permission.
- Attachments are private, validated, size/type limited, malware-scanned, and accessed through short-lived authorization.
- Agents see only queues and sensitive fields allowed by role; finance/compliance cases are not ordinary support tickets.
- Notification content derives from committed domain facts and must not claim success before authoritative state changes.
- Security, authentication, payment, transfer, and legal notices cannot be opted out of where delivery is necessary; marketing requires separate consent.
- Templates are tenant-brandable within controlled variables/slots; missing variables fail safely and do not expose raw data.
- Delivery is at least once, so each logical notification has a stable deduplication key.
- Retries are channel/provider-specific and bounded. Notification failure never rolls back the originating business transaction.
- Sensitive secrets, full beneficiary/payment data, or digital product values are not placed in email/SMS; the message links to authenticated views.
- Staff edits, exports, assignment, internal notes, and sensitive ticket access are audited as policy requires.

## Edge cases

- Customer links a ticket to another customer's guessed order ID.
- Attachment scan is delayed or finds malware.
- Two agents respond or change status concurrently.
- Customer replies after ticket closure or from an unverified email.
- Provider accepts a message but never delivers it, or sends duplicate callbacks.
- Tenant changes branding/template while retries are pending.
- Recipient changes locale/contact/preferences between event and delivery.
- A suspended tenant has unresolved customer or security tickets.

## MVP scope

- Customer ticket create/list/detail/reply; Agent queue, assignment, reply, internal note, and resolve/reopen.
- Basic categories/priorities, linked order/payment reference, private safe attachments if scanning is available, and simple response target.
- Email plus in-app notifications for account security, deposit/payment, order, and ticket events.
- Versioned controlled templates, locale fallback, preference split between mandatory and optional, bounded retries, and delivery status.
- No chatbot autonomy, live chat, voice, social inbox, or AI-sent customer replies.

## Later scope

- SLA calendars, skills-based routing, macros, CSAT, knowledge base, live chat, omnichannel inbox, push/SMS, and advanced escalation.
- AI summaries, classification, retrieval-assisted response drafts, translation drafts, and quality review with human approval.

## Open questions

- Which support hours, languages, ticket categories, priorities, and response/resolution targets are promised?
- Which notification channels/providers and sender domains are available at launch?
- Which events are legally/operationally mandatory and which are preference-controlled?
- What attachment types, sizes, retention, redaction, and malware scanner are required?
- Can Super Admin support view tenant tickets, and through what time-limited approval?
- What template customization and marketing-consent rules apply per tenant/jurisdiction?
