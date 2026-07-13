import { useEffect, useMemo, useState } from "react";
import type { Route } from "../types/storefront";

const parse = (): Route => {
  const path = window.location.pathname.replace(/\/$/, "") || "/";
  const patterns = [
    ["/categories/:categorySlug", /^\/categories\/([^/]+)$/], ["/products/:productSlug", /^\/products\/([^/]+)$/],
    ["/orders/:orderId", /^\/orders\/([^/]+)$/], ["/support/:ticketId", /^\/support\/([^/]+)$/]
  ] as const;
  for (const [template, regex] of patterns) {
    const match = path.match(regex);
    if (match) return { path: template, params: { [template.split(":")[1]]: decodeURIComponent(match[1]) }, query: new URLSearchParams(window.location.search) };
  }
  return { path, params: {}, query: new URLSearchParams(window.location.search) };
};

export const navigate = (path: string) => { window.history.pushState({}, "", path); window.dispatchEvent(new PopStateEvent("popstate")); window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" }); };
export const useRoute = () => { const [route, setRoute] = useState(parse); useEffect(() => { const update = () => setRoute(parse()); addEventListener("popstate", update); return () => removeEventListener("popstate", update); }, []); return useMemo(() => route, [route]); };
