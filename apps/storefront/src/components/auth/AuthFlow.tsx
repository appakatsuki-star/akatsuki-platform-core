import { useCallback, useEffect, useState } from "react";
import { navigate } from "../../hooks/useRoute";
import { useStorefront } from "../../hooks/useStorefront";
import { AuthBackground } from "./AuthBackground";
import { AuthBrandArea } from "./AuthBrandArea";
import { AuthCard } from "./AuthCard";
import { AuthHeader } from "./AuthHeader";
import { AuthSuccess } from "./AuthSuccess";
import { OtpVerification } from "./OtpVerification";
import { VerificationMethod } from "./VerificationMethod";
import type { VerificationChannel } from "./auth-types";
import { clearAuthFlow, readAuthFlow, saveAuthFlow } from "./auth-utils";

export function AuthFlow() {
  const { locale, login } = useStorefront(); const [context, setContext] = useState(readAuthFlow); const [step, setStep] = useState<"method" | "otp" | "success">(() => new URLSearchParams(location.search).get("stage") === "verify" ? "otp" : "method");
  useEffect(() => { if (!context) navigate("/login"); }, [context]);
  const choose = (channel: VerificationChannel) => { if (!context) return; const next = { ...context, channel }; saveAuthFlow(next); setContext(next); setStep("otp"); history.replaceState({}, "", "/verify?stage=verify"); };
  const finish = useCallback(() => { setStep("success"); login(); setTimeout(() => { clearAuthFlow(); navigate("/"); }, 1400); }, [login]);
  if (!context) return null;
  const title = step === "method" ? (locale === "ar" ? "اختر وسيلة التحقق" : "Choose verification") : step === "otp" ? (locale === "ar" ? "أدخل رمز الأمان" : "Enter your security code") : (locale === "ar" ? "اكتمل التحقق" : "Verification complete");
  return <AuthBackground><div className="auth-experience auth-flow"><AuthHeader/><div className="auth-flow-nav"><button onClick={() => step === "otp" ? setStep("method") : navigate("/login")}>{locale === "ar" ? "رجوع" : "Back"}</button><span>{step === "method" ? "01" : step === "otp" ? "02" : "03"} / 03</span></div><main className="auth-stage"><AuthCard status={step === "success" ? "success" : "ready"}><AuthBrandArea locale={locale} label={locale === "ar" ? "تحقق آمن" : "Secure verification"} title={title} description={locale === "ar" ? "خطوة قصيرة إضافية لحماية حسابك." : "One short step to protect your account."}/>{step === "method" && <VerificationMethod context={context} locale={locale} onChoose={choose}/>} {step === "otp" && <OtpVerification context={context} locale={locale} onSuccess={finish} onState={() => undefined}/>} {step === "success" && <AuthSuccess locale={locale}/>}</AuthCard></main></div></AuthBackground>;
}
