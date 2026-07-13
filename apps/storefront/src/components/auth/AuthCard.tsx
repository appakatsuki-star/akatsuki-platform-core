import type { ReactNode } from "react";
export function AuthCard({ children, status }: { children: ReactNode; status: "ready" | "loading" | "success" | "error" }) { return <section className={`auth-premium-card auth-card-${status}`}>{children}</section>; }
export function AuthStatusMessage({ type, children }: { type: "error" | "success"; children: ReactNode }) { return <div className={`auth-status auth-status-${type}`} role={type === "error" ? "alert" : "status"}><span>{type === "success" ? "✓" : "!"}</span><p>{children}</p></div>; }
