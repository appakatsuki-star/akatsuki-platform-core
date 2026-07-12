import { useEffect,useState,type FormEvent } from "react";
import { isValidEmail,verifyMockCredentials } from "../../mock-auth";
import { useAuthSounds } from "../../hooks/useAuthSounds";
import AkatsukiMark from "./AkatsukiMark";
import AuthBackground from "./AuthBackground";
import SoundController from "./SoundController";

type FieldErrors={email?:string;password?:string};

export default function LoginPage({onVerified}:{onVerified:()=>void}) {
  const [email,setEmail]=useState("");const [password,setPassword]=useState("");const [showPassword,setShowPassword]=useState(false);const [errors,setErrors]=useState<FieldErrors>({});const [alert,setAlert]=useState("");const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");const {enabled,toggle,play}=useAuthSounds(false);
  useEffect(()=>{if(status!=="error")return;const timer=window.setTimeout(()=>setStatus("idle"),700);return()=>window.clearTimeout(timer);},[status]);
  const submit=(event:FormEvent)=>{event.preventDefault();if(status==="loading"||status==="success")return;play("press");setAlert("");const next:FieldErrors={};if(!email.trim())next.email="يرجى إدخال البريد الإلكتروني";else if(!isValidEmail(email))next.email="صيغة البريد الإلكتروني غير صحيحة";if(!password)next.password="يرجى إدخال كلمة المرور";setErrors(next);if(Object.keys(next).length){setStatus("error");play("error");return;}setStatus("loading");window.setTimeout(()=>{if(!verifyMockCredentials(email,password)){setAlert("بيانات تسجيل الدخول غير صحيحة");setPassword("");setStatus("error");play("error");return;}setStatus("success");play("success");window.setTimeout(onVerified,520);},460);};
  return <main className={`reference-auth auth-status--${status}`} dir="rtl"><AuthBackground/><SoundController enabled={enabled} onToggle={toggle}/><section className={`reference-card ${status==="error"?"is-shaking":""}`}><header className="reference-head"><AkatsukiMark/><h1>بوابة الأكاتسكي</h1><p>لوحة التحكم الإدارية</p></header>{alert&&<div className="reference-error" role="alert" aria-live="assertive"><strong>!</strong>{alert}</div>}<form onSubmit={submit} noValidate>
    <label className="sr-only" htmlFor="email">البريد الإلكتروني</label><div className={`reference-input ${errors.email||status==="error"?"has-error":""}`}><span>✉</span><input id="email" type="email" dir="rtl" value={email} onFocus={()=>play("focus")} onChange={event=>setEmail(event.target.value)} placeholder="البريد الإلكتروني" autoComplete="username" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email?"email-error":undefined}/></div>{errors.email&&<small className="reference-field-error" id="email-error">⚠ {errors.email}</small>}
    <label className="sr-only" htmlFor="password">كلمة المرور</label><div className={`reference-input ${errors.password||status==="error"?"has-error":""}`}><span>▣</span><input id="password" type={showPassword?"text":"password"} dir="rtl" value={password} onFocus={()=>play("focus")} onChange={event=>setPassword(event.target.value)} placeholder="كلمة المرور" autoComplete="current-password" aria-invalid={Boolean(errors.password)} aria-describedby={errors.password?"password-error":undefined}/><button type="button" onClick={()=>setShowPassword(value=>!value)} aria-label={showPassword?"إخفاء كلمة المرور":"إظهار كلمة المرور"}>{showPassword?"◉":"◎"}</button></div>{errors.password&&<small className="reference-field-error" id="password-error">⚠ {errors.password}</small>}
    <button className={`reference-submit is-${status}`} type="submit" disabled={status==="loading"||status==="success"}>{status==="loading"?<><i/>جاري التحقق...</>:status==="success"?"تم التحقق":"دخول آمن"}</button>
  </form></section></main>;
}
