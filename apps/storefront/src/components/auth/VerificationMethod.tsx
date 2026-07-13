import type { AuthFlowContext, VerificationChannel } from "./auth-types";
import { maskEmail, maskPhone } from "./auth-utils";

export function VerificationMethod({ context, locale, onChoose }: { context: AuthFlowContext; locale: "ar" | "en"; onChoose: (channel: VerificationChannel) => void }) {
  const methods = [{ channel: "email" as const, icon: "@", title: locale === "ar" ? "البريد الإلكتروني" : "Email", target: maskEmail(context.email), eta: locale === "ar" ? "خلال ثوانٍ" : "Within seconds" }, { channel: "whatsapp" as const, icon: "W", title: "WhatsApp", target: maskPhone(context.phone), eta: locale === "ar" ? "خلال دقيقة" : "Within a minute" }];
  return <div className="verification-methods">{methods.map((method) => <button key={method.channel} className="verification-method" onClick={() => onChoose(method.channel)}><span className="method-icon" aria-hidden="true">{method.icon}</span><span><strong>{method.title}</strong><small dir="ltr">{method.target}</small><em>{method.eta} · {locale === "ar" ? "متاح" : "Available"}</em></span><b aria-hidden="true">→</b></button>)}</div>;
}
