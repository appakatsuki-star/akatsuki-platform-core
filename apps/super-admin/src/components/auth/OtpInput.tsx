import { useRef } from "react";

export default function OtpInput({ value,onChange,disabled=false }: { value:string[]; onChange:(value:string[])=>void; disabled?:boolean }) {
  const refs=useRef<Array<HTMLInputElement|null>>([]);
  const setDigit=(index:number,digit:string)=>{const next=[...value];next[index]=digit.replace(/\D/g,"").slice(-1);onChange(next);if(next[index]&&index<5)refs.current[index+1]?.focus();};
  const onKeyDown=(index:number,event:React.KeyboardEvent<HTMLInputElement>)=>{if(event.key==="Backspace"&&!value[index]&&index>0)refs.current[index-1]?.focus();if(event.key==="ArrowLeft"&&index<5)refs.current[index+1]?.focus();if(event.key==="ArrowRight"&&index>0)refs.current[index-1]?.focus();};
  const onPaste=(event:React.ClipboardEvent<HTMLInputElement>)=>{event.preventDefault();const digits=event.clipboardData.getData("text").replace(/\D/g,"").slice(0,6).split("");if(!digits.length)return;onChange(Array.from({length:6},(_,index)=>digits[index]??""));refs.current[Math.min(digits.length,6)-1]?.focus();};
  return <div className="otp-row" dir="ltr" aria-label="رمز التحقق المكوّن من ستة أرقام">{value.map((digit,index)=><input key={index} ref={element=>{refs.current[index]=element;}} value={digit} disabled={disabled} onChange={event=>setDigit(index,event.target.value)} onKeyDown={event=>onKeyDown(index,event)} onPaste={onPaste} inputMode="numeric" pattern="[0-9]*" maxLength={1} autoComplete={index===0?"one-time-code":"off"} aria-label={`الرقم ${index+1} من رمز التحقق`}/>)}</div>;
}
