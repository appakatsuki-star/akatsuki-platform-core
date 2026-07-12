import { useEffect, useRef, useState } from "react";
import { activities, modules, tenants, type Tenant } from "../../mock-data";
import { useAuthSounds } from "../../hooks/useAuthSounds";

type Page = "dashboard" | "tenants" | "tenant" | "subscriptions" | "plans" | "modules" | "payments" | "usage" | "support" | "logs" | "settings";

const nav: { id: Exclude<Page, "tenant">; label: string; icon: string; ready: boolean }[] = [
  { id: "dashboard", label: "لوحة التحكم", icon: "⌁", ready: true },
  { id: "tenants", label: "المتاجر", icon: "◇", ready: true },
  { id: "subscriptions", label: "الاشتراكات", icon: "◫", ready: false },
  { id: "plans", label: "الخطط", icon: "▤", ready: false },
  { id: "modules", label: "الوحدات", icon: "▦", ready: true },
  { id: "payments", label: "المدفوعات", icon: "◈", ready: false },
  { id: "usage", label: "الاستخدام", icon: "◌", ready: false },
  { id: "support", label: "الدعم", icon: "◍", ready: false },
  { id: "logs", label: "سجل النظام", icon: "≡", ready: false },
  { id: "settings", label: "الإعدادات", icon: "⚙", ready: false },
];

const titles: Record<Page, { title: string; eyebrow: string }> = {
  dashboard: { title: "نظرة عامة على المنصة", eyebrow: "مركز القيادة" },
  tenants: { title: "إدارة المتاجر", eyebrow: "مساحات العمل" },
  tenant: { title: "تفاصيل المتجر", eyebrow: "إدارة المتاجر" },
  subscriptions: { title: "الاشتراكات", eyebrow: "إدارة الاشتراكات" },
  plans: { title: "الخطط", eyebrow: "باقات المنصة" },
  modules: { title: "وحدات المنصة", eyebrow: "القدرات والخدمات" },
  payments: { title: "المدفوعات", eyebrow: "العمليات المالية" },
  usage: { title: "الاستخدام", eyebrow: "مؤشرات الاستهلاك" },
  support: { title: "الدعم", eyebrow: "خدمة المتاجر" },
  logs: { title: "سجل النظام", eyebrow: "المراقبة والتدقيق" },
  settings: { title: "الإعدادات", eyebrow: "تهيئة المنصة" },
};

function Badge({ children, tone = "neutral" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`badge badge--${tone}`}><i />{children}</span>;
}

function Dashboard() {
  const metrics = [
    ["إجمالي المتاجر", "24", "+3 هذا الشهر", "red", "◇"], ["المتاجر النشطة", "19", "79% من الإجمالي", "green", "●"],
    ["المتاجر الموقوفة", "2", "تحتاج مراجعة", "amber", "Ⅱ"], ["الاشتراكات النشطة", "17", "+2 هذا الأسبوع", "blue", "◫"],
    ["الطلبات اليوم", "1,284", "+12.4% عن الأمس", "green", "▤"], ["الإيرادات الشهرية", "$48,320", "+8.7% نمو", "red", "$"],
    ["حالة API", "متصل", "استجابة طبيعية", "green", "↯"], ["حالة قاعدة البيانات", "غير متصلة", "بيانات تجريبية", "amber", "◉"],
  ];
  return <>
    <section className="metric-grid metric-grid--wide">{metrics.map(([label, value, note, tone, icon]) => <article className="glass metric" key={label}><div className={`metric__icon metric__icon--${tone}`}>{icon}</div><p>{label}</p><strong>{value}</strong><span>{note}</span></article>)}</section>
    <section className="dashboard-grid">
      <article className="glass panel span-2"><div className="panel__head"><div><span className="kicker">آخر 6 أشهر</span><h2>نمو المتاجر والإيرادات</h2></div><div className="chart-legend"><span><i className="legend-red"/>المتاجر</span><span><i className="legend-blue"/>الإيرادات</span></div></div><div className="business-chart" aria-label="رسم تجريبي لنمو المتاجر والإيرادات"><div className="bars">{[42,55,48,68,76,92].map((height,index)=><div className="bar-group" key={index}><i style={{height:`${height}%`}}/><b style={{height:`${Math.max(20,height-18)}%`}}/></div>)}</div></div><div className="chart__months"><span>يناير</span><span>فبراير</span><span>مارس</span><span>أبريل</span><span>مايو</span><span>يونيو</span></div></article>
      <article className="glass panel"><div className="panel__head"><div><span className="kicker">آخر التحديثات</span><h2>النشاط الأخير</h2></div><button className="text-button">عرض الكل</button></div><div className="activity-list">{activities.map(item=><div className="activity" key={item.title}><i className={`dot dot--${item.tone}`}/><div><strong>{item.title}</strong><span>{item.detail}</span></div></div>)}</div></article>
    </section>
  </>;
}

function Tenants({ openTenant }: { openTenant: (tenant: Tenant) => void }) {
  return <article className="glass panel table-panel"><div className="panel__head table-tools"><div><span className="kicker">24 مساحة عمل</span><h2>إدارة المتاجر</h2></div><button className="primary-button">＋ إنشاء متجر جديد</button></div><div className="filters"><label className="search"><span>⌕</span><input aria-label="البحث عن متجر" placeholder="ابحث بالاسم أو المالك أو الدومين" /></label><label><span>الحالة</span><select aria-label="تصفية حسب الحالة"><option>كل الحالات</option><option>نشط</option><option>قيد الإعداد</option><option>موقوف</option></select></label><label><span>الخطة</span><select aria-label="تصفية حسب الخطة"><option>كل الخطط</option><option>الانطلاق</option><option>النمو</option><option>الأعمال</option></select></label></div>
    <div className="table-wrap"><table><thead><tr><th>اسم المتجر</th><th>المالك</th><th>الدولة</th><th>الدومين</th><th>الخطة</th><th>الحالة</th><th>تاريخ الإنشاء</th><th>الإجراءات</th></tr></thead><tbody>{tenants.map(tenant=><tr key={tenant.id}><td><div className="store"><span>{tenant.initials}</span><strong>{tenant.store}</strong></div></td><td>{tenant.owner}</td><td>{tenant.country}</td><td dir="ltr">{tenant.domain}</td><td>{tenant.plan}</td><td><Badge tone={tenant.status === "نشط" ? "green" : tenant.status === "قيد الإعداد" ? "amber" : "red"}>{tenant.status}</Badge></td><td>{tenant.created}</td><td><div className="row-actions"><button onClick={()=>openTenant(tenant)}>عرض</button><button>إدارة</button><button className="danger-action">إيقاف</button><button aria-label={`المزيد عن ${tenant.store}`}>•••</button></div></td></tr>)}</tbody></table></div></article>;
}

function TenantDetail({ tenant, back }: { tenant: Tenant; back: () => void }) {
  return <><div className="detail-actions"><button className="back-button" onClick={back}>→ العودة إلى المتاجر</button><div><button className="secondary-button inline">تعديل المتجر</button><button className="secondary-button inline">تغيير الخطة</button><button className="primary-button">إدارة الوحدات</button><button className="danger-button">إيقاف المتجر</button></div></div><section className="detail-grid">
    <article className="glass profile-card"><div className="profile-mark">{tenant.initials}</div><div><span className="kicker">هوية المتجر</span><h2>{tenant.store}</h2><p dir="ltr">{tenant.domain}</p></div><Badge tone={tenant.status === "نشط" ? "green" : "red"}>{tenant.status}</Badge></article>
    <article className="glass panel"><span className="kicker">معلومات أساسية</span><h2>بيانات المتجر</h2><div className="detail-list"><p><span>اسم المتجر</span><strong>{tenant.store}</strong></p><p><span>المالك</span><strong>{tenant.owner}</strong></p><p><span>الدولة</span><strong>{tenant.country}</strong></p><p><span>الدومين</span><strong dir="ltr">{tenant.domain}</strong></p></div></article>
    <article className="glass panel"><span className="kicker">الاشتراك</span><h2>الخطة والحالة</h2><div className="detail-list"><p><span>الخطة</span><strong>{tenant.plan}</strong></p><p><span>الحالة</span><strong>{tenant.status}</strong></p><p><span>العملة</span><strong>{tenant.currency}</strong></p><p><span>تاريخ الإنشاء</span><strong>{tenant.created}</strong></p></div></article>
    <article className="glass panel"><span className="kicker">الوحدات المفعلة</span><h2>قدرات المتجر</h2><div className="chip-row"><span>شحن الألعاب</span><span>الدعم</span><span>إدارة المحتوى</span></div><div className="connection"><i/><div><strong>حالة API</strong><span>غير متصل · حالة تجريبية</span></div></div></article>
    <article className="glass panel span-2"><span className="kicker">هوية المتجر</span><h2>ألوان العلامة</h2><div className="swatches"><div><i style={{background:"#e11d48"}}/><span>اللون الأساسي<br/><strong>#E11D48</strong></span></div><div><i style={{background:"#111827"}}/><span>لون السطح<br/><strong>#111827</strong></span></div><div><i style={{background:"#f8fafc"}}/><span>لون النص<br/><strong>#F8FAFC</strong></span></div></div></article>
    <article className="glass panel"><span className="kicker">ملاحظات</span><h2>الإجراءات التالية</h2><ul className="notes"><li>مراجعة محتوى بانر المتجر</li><li>تأكيد ملكية الدومين المخصص</li><li>ربط المزود ما زال غير متاح</li></ul></article>
  </section></>;
}

function Modules() { return <section className="module-grid">{modules.map(module=><article className="glass module-card" key={module.name}><div className="module-card__top"><span className="module-icon">{module.icon}</span><Badge tone={module.status === "نشط" ? "green" : module.status === "مخطط" ? "amber" : "neutral"}>{module.status}</Badge></div><h2>{module.name}</h2><p>{module.description}</p><div className="module-card__footer"><span>وحدة منصة</span><button className="icon-button" aria-label={`عرض ${module.name}`}>←</button></div></article>)}</section>; }

function Planned({ title }: { title: string }) { return <article className="glass planned"><div className="planned__icon">⌁</div><Badge tone="amber">قيد التخطيط</Badge><h2>{title}</h2><p>هذه المساحة جاهزة بصرياً وستُفعّل في خطوة مستقلة بعد اعتماد المتطلبات والبيانات والصلاحيات اللازمة.</p><button className="secondary-button inline">العودة لاحقاً</button></article>; }

export default function AdminShell({ onLogout }: { onLogout: () => void }) {
  const [page,setPage]=useState<Page>("dashboard"); const [selectedTenant,setSelectedTenant]=useState(tenants[0]); const current=titles[page];
  const [profileOpen,setProfileOpen]=useState(false);
  const {play}=useAuthSounds();
  const profileRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{const close=(event:MouseEvent)=>{if(!profileRef.current?.contains(event.target as Node))setProfileOpen(false);};document.addEventListener("mousedown",close);return()=>document.removeEventListener("mousedown",close);},[]);
  const openTenant=(tenant:Tenant)=>{setSelectedTenant(tenant);setPage("tenant");};
  return <div className="app-shell" dir="rtl"><aside className="sidebar"><div className="brand"><div className="brand__mark"><i/><i/><i/></div><div><strong>AKATSUKI PLATFORM</strong><span>SUPER ADMIN</span></div></div><div className="nav-label">إدارة المنصة</div><nav>{nav.map(item=><button className={(page===item.id||(page==="tenant"&&item.id==="tenants"))?"active":""} key={item.id} onClick={()=>setPage(item.id)}><span>{item.icon}</span>{item.label}{!item.ready&&<em>قريباً</em>}<i/></button>)}</nav><div className="sidebar__foot"><div className="environment"><i/><div><span>بيئة العرض</span><strong>بيانات تجريبية</strong></div></div><p>Akatsuki Platform Core<br/>Super Admin · v0.2</p></div></aside>
    <main><header className="topbar"><div><span className="eyebrow">{current.eyebrow}</span><h1>{current.title}</h1></div><div className="topbar__actions"><button className="quick-button">＋ إجراء سريع</button><button className="round-button" aria-label="الإشعارات">♢<i/></button><div className="profile-wrap" ref={profileRef}><button className="operator operator-button" type="button" aria-haspopup="menu" aria-expanded={profileOpen} onClick={()=>setProfileOpen(value=>!value)}><span>م أ</span><div><strong>مدير المنصة</strong><small>Super Admin</small></div><b>⌄</b></button>{profileOpen&&<div className="profile-menu" role="menu"><div><strong>مدير المنصة</strong><span>Super Admin</span></div><button type="button" role="menuitem">الملف الشخصي <small>قريباً</small></button><button type="button" role="menuitem">إعدادات الأمان <small>قريباً</small></button><button type="button" role="menuitem" className="logout-item" onClick={()=>{play("logout");onLogout();}}>تسجيل الخروج</button></div>}</div></div></header><div className="page-content">{page==="dashboard"&&<Dashboard/>}{page==="tenants"&&<Tenants openTenant={openTenant}/>} {page==="tenant"&&<TenantDetail tenant={selectedTenant} back={()=>setPage("tenants")}/>} {page==="modules"&&<Modules/>}{!["dashboard","tenants","tenant","modules"].includes(page)&&<Planned title={current.title}/>}</div></main></div>;
}
