import { storeConfig } from "../../data/store-data";
import { navigate } from "../../hooks/useRoute";
import { useAuthSounds } from "../../hooks/useAuthSounds";
import { useStorefront } from "../../hooks/useStorefront";
import { Icon } from "../ui/Icon";
import { AuthThemeToggle } from "./AuthThemeToggle";

function SoundIcon({ enabled }: { enabled: boolean }) { return <svg className="icon" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 10v4h3l4 3V7l-4 3H5Z"/>{enabled ? <><path d="M16 9c1.5 1.7 1.5 4.3 0 6"/><path d="M19 6c3.2 3.4 3.2 8.6 0 12"/></> : <path d="m16 10 5 5m0-5-5 5"/>}</svg>; }

export function AuthHeader() {
  const { locale, setLocale, setTheme } = useStorefront(); const sound = useAuthSounds();
  const isDark = document.documentElement.dataset.theme !== "light";
  const toggleTheme = () => {
    const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("platform-store-theme", next);
    setTheme(next);
  };
  return <header className="auth-header">
    <div className="auth-header-controls">
      <button className="auth-control" onClick={sound.toggle} aria-label={sound.enabled ? (locale === "ar" ? "كتم أصوات الواجهة" : "Mute interface sounds") : (locale === "ar" ? "تشغيل أصوات الواجهة" : "Enable interface sounds")} title={sound.enabled ? "Sound on" : "Sound muted"}><SoundIcon enabled={sound.enabled}/><span>{sound.enabled ? "ON" : "OFF"}</span></button>
      <AuthThemeToggle dark={isDark} onToggle={toggleTheme} label={locale === "ar" ? "تبديل المظهر" : "Toggle theme"} title={isDark ? "Light mode" : "Dark mode"}/>
      <button className="auth-control auth-language" onClick={() => setLocale(locale === "ar" ? "en" : "ar")} aria-label={locale === "ar" ? "Switch to English" : "التبديل إلى العربية"} title={locale === "ar" ? "English" : "العربية"}><span aria-hidden="true">文</span><b>{locale === "ar" ? "EN" : "AR"}</b></button>
    </div>
    <button className="auth-home" onClick={() => navigate("/")}><Icon name="home" size={18}/><span>{locale === "ar" ? "الرئيسية" : "Home"}</span></button>
    <button className="auth-header-brand" onClick={() => navigate("/")} aria-label={storeConfig.name}><span className="brand-mark">P</span><strong>{storeConfig.name}</strong></button>
  </header>;
}
