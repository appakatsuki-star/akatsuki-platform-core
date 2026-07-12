export default function SoundController({ enabled,onToggle }: { enabled:boolean;onToggle:()=>void }) {
  return <button className={`portal-sound ${enabled?"is-on":""}`} type="button" onClick={onToggle} aria-label={enabled?"إيقاف الصوت":"تفعيل الصوت"} aria-pressed={enabled}><span>{enabled?"◖)":"◖"}</span>{enabled?"الصوت مفعّل":"تفعيل الصوت"}</button>;
}
