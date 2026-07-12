import { pick,ui,type AdminLocale } from "../../localization/admin-translations";
import type { AdminTheme } from "../../hooks/useAdminTheme";
export default function ThemeToggle({theme,locale,onToggle}:{theme:AdminTheme;locale:AdminLocale;onToggle:()=>void}){return <button className="topbar-icon preference-toggle" type="button" onClick={onToggle} aria-label={pick(theme==="dark"?ui.switchLight:ui.switchDark,locale)} title={pick(theme==="dark"?ui.switchLight:ui.switchDark,locale)}><span aria-hidden="true">{theme==="dark"?"☀":"☾"}</span></button>}
