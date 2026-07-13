import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { initialNotices, initialOrders, initialTickets, initialTransactions, products } from "../data/store-data";
import type { Locale, Order, SessionState, Theme, Ticket } from "../types/storefront";

type StoreContextValue = { locale: Locale; setLocale: (value: Locale) => void; theme: Theme; setTheme: (value: Theme) => void; state: SessionState; login: () => void; logout: () => void; toggleFavorite: (id: string) => void; markNotice: (id?: string) => void; deposit: (amount: number) => void; purchase: (draft: Omit<Order, "id" | "createdAt" | "status">) => Order | null; createTicket: (ticket: Pick<Ticket, "category" | "subject" | "related"> & { message: string }) => Ticket; reply: (id: string, text: string) => void; toggleTicket: (id: string) => void };
const initial: SessionState = { loggedIn: true, balance: 42.75, favorites: ["pubg-uc"], orders: initialOrders, transactions: initialTransactions, notices: initialNotices, tickets: initialTickets };
const Context = createContext<StoreContextValue | null>(null);
const read = (): SessionState => { try { const saved = localStorage.getItem("platform-store-state"); return saved ? { ...initial, ...JSON.parse(saved) as SessionState } : initial; } catch { return initial; } };

export function StorefrontProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => localStorage.getItem("platform-store-locale") === "ar" ? "ar" : "en");
  const [theme, setThemeState] = useState<Theme>(() => { const value = localStorage.getItem("platform-store-theme"); return value === "light" || value === "system" ? value : "dark"; });
  const [state, setState] = useState<SessionState>(read);
  useEffect(() => { localStorage.setItem("platform-store-state", JSON.stringify(state)); }, [state]);
  useEffect(() => { const dark = theme === "dark" || (theme === "system" && matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.dataset.theme = dark ? "dark" : "light"; localStorage.setItem("platform-store-theme", theme); }, [theme]);
  useEffect(() => { document.documentElement.lang = locale; document.documentElement.dir = locale === "ar" ? "rtl" : "ltr"; localStorage.setItem("platform-store-locale", locale); }, [locale]);
  const value = useMemo<StoreContextValue>(() => ({ locale, setLocale: setLocaleState, theme, setTheme: setThemeState, state,
    login: () => setState(s => ({ ...s, loggedIn: true })), logout: () => setState(s => ({ ...s, loggedIn: false })),
    toggleFavorite: id => setState(s => ({ ...s, favorites: s.favorites.includes(id) ? s.favorites.filter(x => x !== id) : [...s.favorites, id] })),
    markNotice: id => setState(s => ({ ...s, notices: s.notices.map(n => !id || n.id === id ? { ...n, read: true } : n) })),
    deposit: amount => setState(s => ({ ...s, balance: s.balance + amount, transactions: [{ id: `TX-${Date.now().toString().slice(-6)}`, type: "deposit", amount, status: "completed", date: new Date().toISOString() }, ...s.transactions], notices: [{ id: `n-${Date.now()}`, type: "wallet", title: { en: "Deposit confirmed", ar: "تم تأكيد الإيداع" }, body: { en: `$${amount.toFixed(2)} was added to your wallet.`, ar: `تمت إضافة ${amount.toFixed(2)}$ إلى محفظتك.` }, date: new Date().toISOString(), read: false, link: "/wallet" }, ...s.notices] })),
    purchase: draft => { if (state.balance < draft.price || !products.some(p => p.id === draft.productId && p.available)) return null; const order: Order = { ...draft, id: `ORD-${Date.now().toString().slice(-6)}`, createdAt: new Date().toISOString(), status: "processing" }; setState(s => ({ ...s, balance: s.balance - draft.price, orders: [order, ...s.orders], transactions: [{ id: `TX-${Date.now().toString().slice(-6)}`, type: "purchase", amount: -draft.price, status: "completed", date: new Date().toISOString(), orderId: order.id }, ...s.transactions], notices: [{ id: `n-${Date.now()}`, type: "order", title: { en: "Order received", ar: "تم استلام الطلب" }, body: { en: `${order.id} is being processed.`, ar: `الطلب ${order.id} قيد المعالجة.` }, date: new Date().toISOString(), read: false, link: `/orders/${order.id}` }, ...s.notices] })); return order; },
    createTicket: input => { const ticket: Ticket = { id: `TKT-${Date.now().toString().slice(-5)}`, category: input.category, subject: input.subject, related: input.related, status: "open", createdAt: new Date().toISOString(), messages: [{ id: `m-${Date.now()}`, author: "user", text: input.message, date: new Date().toISOString() }] }; setState(s => ({ ...s, tickets: [ticket, ...s.tickets] })); return ticket; },
    reply: (id, text) => setState(s => ({ ...s, tickets: s.tickets.map(ticket => ticket.id === id ? { ...ticket, messages: [...ticket.messages, { id: `m-${Date.now()}`, author: "user", text, date: new Date().toISOString() }] } : ticket) })),
    toggleTicket: id => setState(s => ({ ...s, tickets: s.tickets.map(ticket => ticket.id === id ? { ...ticket, status: ticket.status === "open" ? "closed" : "open" } : ticket) }))
  }), [locale, theme, state]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useStorefront = () => { const value = useContext(Context); if (!value) throw new Error("StorefrontProvider is missing"); return value; };
