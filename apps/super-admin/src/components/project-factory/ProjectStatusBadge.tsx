import type { AdminLocale } from "../../localization/admin-translations";import type { ProjectStatus } from "../../types/project-factory";
const labels={draft:{ar:"مسودة",en:"Draft"},active:{ar:"نشط",en:"Active"},review:{ar:"قيد المراجعة",en:"Review"},attention:{ar:"يحتاج متابعة",en:"Attention"}};
export default function ProjectStatusBadge({status,locale}:{status:ProjectStatus;locale:AdminLocale}){return <span className={`factory-status is-${status}`}><i/>{labels[status][locale]}</span>}
