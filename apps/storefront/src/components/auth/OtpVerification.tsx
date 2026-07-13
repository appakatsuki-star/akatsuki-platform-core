import { useEffect, useRef, useState } from "react";
import { playAuthSound } from "../../utils/auth-sounds";
import type { AuthFlowContext, OtpMotionPhase } from "./auth-types";
import { CORRECT_OTP, MAX_RESENDS, maskEmail, maskPhone, RESEND_SECONDS } from "./auth-utils";
import { OtpDigitInput } from "./OtpDigitInput";

export function OtpVerification({ context, locale, onSuccess, onState }: { context: AuthFlowContext; locale: "ar" | "en"; onSuccess: () => void; onState: (state: "otp-idle" | "otp-typing" | "otp-error" | "otp-success") => void }) {
  const [code, setCode] = useState(""); const [phase, setPhase] = useState<OtpMotionPhase>("idle"); const [seconds, setSeconds] = useState(RESEND_SECONDS); const [resends, setResends] = useState(0); const [sending, setSending] = useState(false); const [sent, setSent] = useState(false); const [attempts, setAttempts] = useState(0); const [lockSeconds, setLockSeconds] = useState(0); const [resetKey, setResetKey] = useState(0); const timers = useRef<number[]>([]);
  const schedule = (callback: () => void, delay: number) => { const timer = window.setTimeout(callback, delay); timers.current.push(timer); };
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { if (!seconds) return; const timer = setInterval(() => setSeconds((current) => Math.max(0, current - 1)), 1000); return () => clearInterval(timer); }, [seconds]);
  useEffect(() => { if (phase !== "locked") return; const timer = setInterval(() => setLockSeconds((current) => { if (current <= 1) { clearInterval(timer); setPhase("idle"); setResetKey((key) => key + 1); return 0; } return current - 1; }), 1000); return () => clearInterval(timer); }, [phase]);
  useEffect(() => {
    if (code.length !== 4 || phase !== "typing") return;
    setPhase("verifying"); onState("otp-typing"); playAuthSound("otp-verifying");
    schedule(() => {
      if (code === CORRECT_OTP) {
        setPhase("accepted"); onState("otp-success"); playAuthSound("toggle");
        schedule(() => { setPhase("syncing"); playAuthSound("otp-sync"); }, 220);
        schedule(() => setPhase("merging"), 520);
        schedule(() => { setPhase("verified"); playAuthSound("otp-success"); }, 1040);
        schedule(onSuccess, 1880);
      } else {
        const nextAttempts = attempts + 1; setAttempts(nextAttempts); setPhase("rejected"); onState("otp-error"); playAuthSound("otp-error");
        schedule(() => setPhase("fragmenting"), 330);
        schedule(() => setPhase("collapsing"), 880);
        schedule(() => { setCode(""); setResetKey((key) => key + 1); if (nextAttempts >= 3) { setLockSeconds(15); setPhase("locked"); } else { setPhase("idle"); onState("otp-idle"); } }, 1180);
      }
    }, 340);
  }, [attempts, code, onState, onSuccess, phase]);
  const changeCode = (value: string) => { if (!["idle", "typing"].includes(phase)) return; if (value.length > code.length) playAuthSound("otp-digit"); setCode(value); setPhase(value ? "typing" : "idle"); onState(value ? "otp-typing" : "otp-idle"); };
  const resend = () => { if (seconds || resends >= MAX_RESENDS || sending || !["idle", "typing"].includes(phase)) return; setSending(true); setSent(false); playAuthSound("toggle"); schedule(() => { setSending(false); setSent(true); setResends((value) => value + 1); setSeconds(RESEND_SECONDS); }, 750); };
  const target = context.channel === "whatsapp" ? maskPhone(context.phone) : maskEmail(context.email); const busy = !["idle", "typing"].includes(phase);
  const status = phase === "verifying" ? (locale === "ar" ? "جاري التحقق من الرمز..." : "Verifying your code...") : phase === "accepted" || phase === "syncing" || phase === "merging" ? (locale === "ar" ? "تم قبول الرمز. جارٍ تأمين الحساب..." : "Code accepted. Securing your account...") : phase === "verified" ? (locale === "ar" ? "تم التحقق بنجاح — أصبح حسابك جاهزًا للمتابعة." : "Verified successfully — your account is ready to continue.") : ["rejected", "fragmenting", "collapsing"].includes(phase) ? (locale === "ar" ? "الرمز غير صحيح — تحقق من الرمز وحاول مرة أخرى." : "Incorrect code — check the code and try again.") : phase === "locked" ? (locale === "ar" ? `عدد المحاولات كبير. انتظر ${lockSeconds} ثانية ثم حاول مرة أخرى.` : `Too many attempts. Wait ${lockSeconds} seconds and try again.`) : attempts ? (locale === "ar" ? `محاولات غير ناجحة: ${attempts} من 3` : `Unsuccessful attempts: ${attempts} of 3`) : "";
  const resendLabel = sending ? (locale === "ar" ? "جارٍ إرسال رمز جديد..." : "Sending a new code...") : seconds ? (locale === "ar" ? `يمكنك إعادة إرسال الرمز بعد 00:${String(seconds).padStart(2, "0")}` : `You can resend the code in 00:${String(seconds).padStart(2, "0")}`) : resends >= MAX_RESENDS ? (locale === "ar" ? "تعذر إرسال رموز إضافية الآن. حاول لاحقًا." : "No more codes can be sent now. Try later.") : (locale === "ar" ? "إعادة إرسال الرمز" : "Resend code");
  return <div className={`otp-verification otp-${phase}`}><p>{locale === "ar" ? "أرسلنا رمزًا من 4 أرقام إلى وسيلة التحقق المحددة." : "We sent a 4-digit code to your selected verification method."}<strong dir="ltr">{target}</strong></p><OtpDigitInput value={code} phase={phase} resetKey={resetKey} disabled={busy} onChange={changeCode}/><div className="otp-feedback" role={["rejected", "fragmenting", "collapsing", "locked"].includes(phase) ? "alert" : "status"} aria-live="polite">{status && <><span aria-hidden="true">{phase === "verified" ? "✓" : ["rejected", "fragmenting", "collapsing", "locked"].includes(phase) ? "!" : "·"}</span>{status}</>}</div><button className={`otp-resend ${sending ? "is-sending" : ""}`} disabled={Boolean(seconds) || resends >= MAX_RESENDS || sending || busy} onClick={resend}>{resendLabel}</button>{sent && !sending && <small role="status">{locale === "ar" ? "تم إرسال رمز جديد." : "A new code was sent."}</small>}</div>;
}
