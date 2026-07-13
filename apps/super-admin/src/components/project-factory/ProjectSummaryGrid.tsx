import type { AdminLocale } from "../../localization/admin-translations";
const cards=[{v:"3",ar:"إجمالي المشاريع",en:"Total Projects"},{v:"1",ar:"المشاريع النشطة",en:"Active Projects"},{v:"1",ar:"المسودات",en:"Draft Projects"},{v:"1",ar:"تحتاج متابعة",en:"Requiring Attention"}];
export default function ProjectSummaryGrid({locale}:{locale:AdminLocale}){return <section className="factory-summary">{cards.map((card,index)=><article key={card.en}><i>{String(index+1).padStart(2,"0")}</i><strong>{card.v}</strong><span>{locale==="ar"?card.ar:card.en}</span></article>)}</section>}
