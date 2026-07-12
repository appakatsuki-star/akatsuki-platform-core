import { useState,type FormEvent } from "react";
import { MOCK_OTP } from "../../mock-auth";
import { useAuthSounds } from "../../hooks/useAuthSounds";
import AkatsukiMark from "./AkatsukiMark";
import AuthBackground from "./AuthBackground";
import OtpInput from "./OtpInput";
import SoundController from "./SoundController";

export default function TwoFactorPage({onSuccess,onBack}:{onSuccess:()=>void;onBack:()=>void}) {
  const [digits,setDigits]=useState(["","","","","",""]);const [error,setError]=useState("");const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");const {enabled,toggle,play}=useAuthSounds(false);
  const update=(next:string[])=>{if(next.join("").length>digits.join("").length)play("digit");setDigits(next);setError("");if(status==="error")setStatus("idle");};
  const submit=(event:FormEvent)=>{event.preventDefault();if(status==="loading"||status==="success")return;play("press");if(digits.join("").length<6){setError("أدخل رمز التحقق المكوّن من 6 أرقام");setStatus("error");play("error");return;}setStatus("loading");window.setTimeout(()=>{if(digits.join("")!==MOCK_OTP){setError("رمز التحقق غير صحيح");setStatus("error");play("error");return;}setStatus("success");play("success");window.setTimeout(onSuccess,620);},500);};
  return <main className={`reference-auth reference-otp auth-status--${status}`} dir="rtl"><AuthBackground/><SoundController enabled={enabled} onToggle={toggle}/><section className={`reference-card otp-reference-card ${status==="error"?"is-shaking":""}`}><header className="reference-head"><AkatsukiMark/><h1>التحقق بخطوتين</h1><p>أدخل رمز التحقق</p></header>{error&&<div className="reference-error" role="alert" aria-live="assertive"><strong>!</strong>{error}</div>}<form onSubmit={submit}><OtpInput value={digits} onChange={update} disabled={status==="loading"||status==="success"}/><button className={`reference-submit is-${status}`} type="submit" disabled={status==="loading"||status==="success"}>{status==="loading"?<><i/>جاري التحقق...</>:status==="success"?"تم التحقق بنجاح":"تأكيد"}</button></form><button className="reference-back" type="button" onClick={onBack}>العودة</button></section></main>;
}
