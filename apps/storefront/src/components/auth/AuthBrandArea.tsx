import type { Locale } from "../../types/storefront";
import { authBrand } from "./auth-brand";

export function AuthBrandArea({ locale, label, title, description }: { locale: Locale; label: string; title: string; description: string }) {
  return <div className={`auth-brand-area auth-visual-${authBrand.visualMode}`}>
    {authBrand.visualMode === "logo" && <div className="auth-brand-logo" aria-label={authBrand.name}><span className="brand-mark">{authBrand.logoText}</span></div>}
    <span className="auth-brand-label"><i/>{label}</span><h1>{title}</h1><p>{description}</p>
    <span className="sr-only">{locale === "ar" ? "منطقة هوية تسجيل الدخول" : "Authentication brand area"}</span>
  </div>;
}
