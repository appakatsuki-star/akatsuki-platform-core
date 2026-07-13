import { useRef } from "react";
import type { OtpMotionPhase } from "./auth-types";

const fragmentVectors = [[-24, -25, -18], [-14, -32, 12], [-30, -12, -9], [-20, -20, 24], [-18, 25, -12], [-28, 18, 18], [-12, 32, -22], [-24, 13, 9], [18, -26, 16], [30, -15, -12], [14, -34, 25], [25, -20, -20], [20, 24, -15], [32, 15, 21], [15, 31, -9], [27, 20, 14]];

export function OtpDigitInput({ value, onChange, disabled, phase, resetKey }: { value: string; onChange: (value: string) => void; disabled?: boolean; phase: OtpMotionPhase; resetKey: number }) {
  const refs = useRef<Array<HTMLInputElement | null>>([]); const digits = Array.from({ length: 4 }, (_, index) => value[index] ?? "");
  const update = (index: number, raw: string) => { const digit = raw.replace(/\D/g, "").slice(-1); const next = [...digits]; next[index] = digit; onChange(next.join("")); if (digit && index < 3) refs.current[index + 1]?.focus(); };
  return <div key={resetKey} className={`otp-motion otp-phase-${phase}`} dir="ltr" role="group" aria-label="Four digit one-time verification code" style={{ "--otp-progress": value.length / 4 } as React.CSSProperties}>
    <div className="otp-progress-track" aria-hidden="true"><i/></div>
    <div className="otp-digits">
      {digits.map((digit, index) => <div className={`otp-slot ${digit ? "is-filled" : "is-empty"}`} key={index}>
        <input ref={(node) => { refs.current[index] = node; }} value={digit} disabled={disabled} inputMode="numeric" pattern="[0-9]*" maxLength={1} autoComplete={index === 0 ? "one-time-code" : "off"} autoFocus={index === 0} aria-label={`Digit ${index + 1} of 4`} aria-invalid={phase === "rejected" || phase === "fragmenting" || phase === "collapsing"} onChange={(event) => update(index, event.target.value)} onKeyDown={(event) => { if (event.key === "Backspace" && !digit && index > 0) { const next = [...digits]; next[index - 1] = ""; onChange(next.join("")); refs.current[index - 1]?.focus(); } if (event.key === "ArrowLeft") refs.current[Math.max(0, index - 1)]?.focus(); if (event.key === "ArrowRight") refs.current[Math.min(3, index + 1)]?.focus(); }} onPaste={(event) => { const pasted = event.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4); if (pasted) { event.preventDefault(); onChange(pasted); refs.current[Math.min(3, pasted.length - 1)]?.focus(); } }}/>
        <span className="otp-digit-visual" aria-hidden="true">{digit}</span><span className="otp-slot-pulse" aria-hidden="true"/>
        <span className="otp-fragments" aria-hidden="true">{Array.from({ length: 4 }, (_, fragment) => { const [x, y, rotate] = fragmentVectors[index * 4 + fragment]; return <i key={fragment} style={{ "--fragment-x": `${x}px`, "--fragment-y": `${y}px`, "--fragment-r": `${rotate}deg`, "--fragment-delay": `${fragment * 28}ms` } as React.CSSProperties}>{digit}</i>; })}</span>
        {index < 3 && <span className="otp-connector" aria-hidden="true"><i/></span>}
      </div>)}
    </div>
    <div className="otp-merge-tile" aria-hidden="true"><svg viewBox="0 0 48 48"><path d="m13 25 7 7 16-18"/></svg></div>
  </div>;
}
