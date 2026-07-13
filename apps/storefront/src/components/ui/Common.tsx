import type { ReactNode } from "react";
import { navigate } from "../../hooks/useRoute";
import { useStorefront } from "../../hooks/useStorefront";
import { Icon } from "./Icon";

export function PageHeader({ eyebrow, title, description, action }: { eyebrow?: string; title: string; description?: string; action?: ReactNode }) { return <header className="page-header"><div>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h1>{title}</h1>{description && <p>{description}</p>}</div>{action}</header>; }
export function EmptyState({ title, body, action, path = "/" }: { title: string; body: string; action?: string; path?: string }) { return <div className="empty-state"><span className="empty-icon">◇</span><h2>{title}</h2><p>{body}</p>{action && <button className="button primary" onClick={() => navigate(path)}>{action}</button>}</div>; }
export function Status({ value }: { value: string }) { return <span className={`status status-${value}`}>{value.replace("_", " ")}</span>; }
export function Breadcrumbs({ items }: { items: { label: string; path?: string }[] }) { return <nav className="breadcrumbs" aria-label="Breadcrumb">{items.map((item, i) => <span key={`${item.label}-${i}`}>{item.path ? <button onClick={() => navigate(item.path!)}>{item.label}</button> : item.label}{i < items.length - 1 && <Icon name="arrow" size={14} />}</span>)}</nav>; }
export function Protected({ children }: { children: ReactNode }) { const { state, locale } = useStorefront(); if (!state.loggedIn) return <EmptyState title={locale === "ar" ? "سجّل الدخول للمتابعة" : "Sign in to continue"} body={locale === "ar" ? "هذه الصفحة متاحة لأعضاء المتجر." : "This area is available to store members."} action={locale === "ar" ? "تسجيل الدخول" : "Sign in"} path="/login" />; return <>{children}</>; }
