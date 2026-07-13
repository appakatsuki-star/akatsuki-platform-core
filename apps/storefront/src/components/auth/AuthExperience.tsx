import { useEffect, useRef, useState } from "react";
import { navigate } from "../../hooks/useRoute";
import { useStorefront } from "../../hooks/useStorefront";
import { playAuthSound } from "../../utils/auth-sounds";
import { Icon } from "../ui/Icon";
import { AuthBackground } from "./AuthBackground";
import { AuthCard, AuthStatusMessage } from "./AuthCard";
import { AuthBrandArea } from "./AuthBrandArea";
import { AuthHeader } from "./AuthHeader";
import { AuthSocialButtons } from "./AuthSocialButtons";
import { AuthSplash } from "./AuthSplash";
import { PasswordStrength } from "./PasswordStrength";
import type { AuthErrors, AuthFields, AuthMode } from "./auth-types";
import { saveAuthFlow } from "./auth-utils";

const initial: AuthFields = { name: "", username: "", phone: "", email: "", country: "Lebanon", currency: "USD", password: "", confirmPassword: "", remember: false, terms: false };
const validIdentity = (value: string) => /^\S+@\S+\.\S+$/.test(value) || /^\+?[0-9 ]{8,16}$/.test(value);
const validPassword = (value: string) => value.length >= 8 && /[A-Z]/.test(value) && /[a-z]/.test(value) && /\d/.test(value);

export function AuthExperience({ mode }: { mode: AuthMode }) {
  const { locale } = useStorefront();
  const [splash, setSplash] = useState(() => sessionStorage.getItem("platform-auth-intro") !== "seen" && !matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [fields, setFields] = useState(initial);
  const [errors, setErrors] = useState<AuthErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [status, setStatus] = useState<"ready" | "loading" | "success" | "error">("ready");
  const firstInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!splash) return;
    const timer = setTimeout(() => { sessionStorage.setItem("platform-auth-intro", "seen"); setSplash(false); }, 1400);
    return () => clearTimeout(timer);
  }, [splash]);
  useEffect(() => { if (!splash) setTimeout(() => firstInput.current?.focus(), 120); }, [splash, mode]);

  const set = <K extends keyof AuthFields>(key: K, value: AuthFields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (errors[key]) setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const validate = () => {
    const next: AuthErrors = {};
    if (mode === "register" && fields.name.trim().length < 3) next.name = locale === "ar" ? "أدخل اسمًا كاملًا." : "Enter your full name.";
    if (mode === "register" && !/^\+?[0-9 ]{8,16}$/.test(fields.phone)) next.phone = locale === "ar" ? "أدخل رقمًا مع رمز الدولة." : "Enter a phone with country code.";
    if (!validIdentity(fields.email)) next.email = locale === "ar" ? "البريد الإلكتروني أو الهاتف غير مكتمل." : "Email or phone is incomplete.";
    if (mode !== "forgot" && !validPassword(fields.password)) next.password = locale === "ar" ? "كلمة المرور لا تحقق الشروط." : "Password does not meet the requirements.";
    if (mode === "register" && fields.confirmPassword !== fields.password) next.confirmPassword = locale === "ar" ? "كلمتا المرور غير متطابقتين." : "Passwords do not match.";
    if (mode === "register" && !fields.terms) next.terms = locale === "ar" ? "الموافقة على الشروط مطلوبة." : "You must accept the terms.";
    return next;
  };
  const complete = () => {
    setStatus("success"); playAuthSound("success");
    saveAuthFlow({ flow: mode === "register" ? "register" : mode === "forgot" ? "reset" : "login", email: fields.email.includes("@") ? fields.email : "demo@example.com", phone: fields.phone || fields.email });
    setTimeout(() => navigate("/verify?stage=method"), 650);
  };
  const submit = (event: React.FormEvent) => {
    event.preventDefault(); const next = validate();
    playAuthSound("submit");
    if (Object.keys(next).length) { setErrors(next); setStatus("error"); playAuthSound("error"); document.getElementById(`auth-${Object.keys(next)[0]}`)?.focus(); setTimeout(() => setStatus("ready"), 500); return; }
    setStatus("loading");
    setTimeout(() => {
      if (mode === "login" && (fields.email.trim().toLowerCase() !== "demo@example.com" || fields.password !== "Demo1234")) { setErrors({ email: locale === "ar" ? "تحقق من بيانات الدخول وحاول مجددًا." : "Check your credentials and try again." }); setStatus("error"); playAuthSound("error"); firstInput.current?.focus(); return; }
      complete();
    }, 650);
  };
  const title = mode === "login" ? (locale === "ar" ? "مرحبًا بعودتك" : "Welcome back") : mode === "register" ? (locale === "ar" ? "أنشئ حسابك" : "Create your account") : (locale === "ar" ? "استعادة الوصول" : "Recover access");

  return <AuthBackground>
    {splash && <AuthSplash />}
    <div className={`auth-experience auth-mode-${mode} ${splash ? "auth-is-splashing" : ""}`}>
      <AuthHeader />
      <main className="auth-stage">
        <AuthCard status={status}>
          <AuthBrandArea locale={locale} label={mode === "register" ? (locale === "ar" ? "حساب جديد" : "New account") : (locale === "ar" ? "دخول آمن" : "Secure access")} title={title} description={mode === "login" ? (locale === "ar" ? "سجّل الدخول للوصول إلى طلباتك ومحفظتك وخدماتك الرقمية." : "Sign in to access your orders, wallet, and digital services.") : mode === "register" ? (locale === "ar" ? "حساب واحد لطلباتك ومحفظتك وخدماتك الرقمية." : "One account for your orders, wallet, and digital services.") : (locale === "ar" ? "أدخل بريدك أو هاتفك لاستعادة الوصول." : "Enter your email or phone to recover access.")} />
          {status === "success" ? <AuthStatusMessage type="success">{locale === "ar" ? "تم قبول البيانات. اختر وسيلة التحقق." : "Details accepted. Choose a verification method."}</AuthStatusMessage> : <>
            <form className="auth-premium-form" onSubmit={submit} onClickCapture={(event) => { if (event.target instanceof Element && event.target.closest(".auth-password button")) playAuthSound("toggle"); }} onFocusCapture={(event) => { if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) playAuthSound("field-focus"); }} noValidate aria-busy={status === "loading"}>
              {Object.keys(errors).length > 1 && <div className="auth-error-summary" role="alert">{locale === "ar" ? `تحقق من ${Object.keys(errors).length} حقول.` : `Review ${Object.keys(errors).length} fields.`}</div>}
              {mode === "register" && <>
                <div className="auth-field-row"><AuthField id="name" label={locale === "ar" ? "الاسم الكامل" : "Full name"} error={errors.name}><input ref={firstInput} id="auth-name" value={fields.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" /></AuthField><AuthField id="username" label={locale === "ar" ? "اسم المستخدم (اختياري)" : "Username (optional)"}><input id="auth-username" value={fields.username} onChange={(e) => set("username", e.target.value)} autoComplete="username" /></AuthField></div>
                <div className="auth-field-row"><AuthField id="country" label={locale === "ar" ? "الدولة" : "Country"}><select id="auth-country" value={fields.country} onChange={(e) => set("country", e.target.value)}><option>Lebanon</option><option>United Arab Emirates</option><option>Saudi Arabia</option></select></AuthField><AuthField id="currency" label={locale === "ar" ? "العملة" : "Currency"}><select id="auth-currency" value={fields.currency} onChange={(e) => set("currency", e.target.value)}><option>USD</option><option>AED</option><option>SAR</option></select></AuthField></div>
                <AuthField id="phone" label={locale === "ar" ? "رقم الهاتف" : "Phone"} error={errors.phone}><input id="auth-phone" type="tel" value={fields.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+961 70 000 000" autoComplete="tel" aria-invalid={Boolean(errors.phone)} /></AuthField>
              </>}
              <AuthField id="email" label={locale === "ar" ? "البريد الإلكتروني أو الهاتف" : "Email or phone"} error={errors.email}><input ref={mode === "register" ? undefined : firstInput} id="auth-email" value={fields.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "auth-email-error" : undefined} /></AuthField>
              {mode !== "forgot" && <><AuthField id="password" label={locale === "ar" ? "كلمة المرور" : "Password"} error={errors.password}><div className="auth-password"><input id="auth-password" type={showPassword ? "text" : "password"} value={fields.password} onChange={(e) => set("password", e.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} aria-invalid={Boolean(errors.password)} /><button type="button" onClick={() => setShowPassword((visible) => !visible)} aria-label={locale === "ar" ? "إظهار أو إخفاء كلمة المرور" : "Show or hide password"}><Icon name={showPassword ? "close" : "search"} size={18} /></button></div>{mode === "register" && <PasswordStrength password={fields.password} locale={locale} />}</AuthField>{mode === "register" && <AuthField id="confirmPassword" label={locale === "ar" ? "تأكيد كلمة المرور" : "Confirm password"} error={errors.confirmPassword}><input id="auth-confirmPassword" type="password" value={fields.confirmPassword} onChange={(e) => set("confirmPassword", e.target.value)} autoComplete="new-password" /></AuthField>}</>}
              {mode === "login" && <div className="auth-options premium-options"><label><input type="checkbox" checked={fields.remember} onChange={(e) => set("remember", e.target.checked)} />{locale === "ar" ? "تذكرني" : "Remember me"}</label><button type="button" onClick={() => navigate("/forgot-password")}>{locale === "ar" ? "نسيت كلمة المرور؟" : "Forgot password?"}</button></div>}
              {mode === "register" && <div><label className="auth-terms"><input id="auth-terms" type="checkbox" checked={fields.terms} onChange={(e) => set("terms", e.target.checked)} /><span>{locale === "ar" ? "أوافق على الشروط وسياسة الخصوصية" : "I accept the terms and privacy policy"}</span></label>{errors.terms && <small className="auth-field-error">{errors.terms}</small>}</div>}
              {status === "error" && errors.email && <AuthStatusMessage type="error">{errors.email}</AuthStatusMessage>}
              <button className="button primary wide auth-submit" disabled={status === "loading"}>{status === "loading" ? (locale === "ar" ? "جارٍ التحقق…" : "Checking…") : mode === "login" ? (locale === "ar" ? "تسجيل الدخول" : "Sign in") : mode === "register" ? (locale === "ar" ? "إنشاء الحساب" : "Create account") : (locale === "ar" ? "متابعة" : "Continue")}</button>
            </form>
            {mode !== "forgot" && <><div className="divider"><span>{locale === "ar" ? "أو تابع باستخدام" : "or continue with"}</span></div><AuthSocialButtons locale={locale} disabled={status === "loading"} onSuccess={() => { setStatus("loading"); setTimeout(complete, 350); }} /></>}
            <p className="auth-switch">{mode === "login" ? <>{locale === "ar" ? "ليس لديك حساب؟ " : "New here? "}<button onClick={() => navigate("/register")}>{locale === "ar" ? "أنشئ حسابًا" : "Create an account"}</button></> : <button onClick={() => navigate("/login")}>{locale === "ar" ? "لديك حساب؟ تسجيل الدخول" : "Already registered? Sign in"}</button>}</p>
          </>}
        </AuthCard>
      </main>
    </div>
  </AuthBackground>;
}

function AuthField({ id, label, error, children }: { id: keyof AuthFields; label: string; error?: string; children: React.ReactNode }) {
  return <label className={`auth-field ${error ? "auth-field-invalid" : ""}`} htmlFor={`auth-${id}`}><span>{label}</span>{children}{error && <small id={`auth-${id}-error`} className="auth-field-error">{error}</small>}</label>;
}
