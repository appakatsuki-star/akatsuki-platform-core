export type TenantStatus = "نشط" | "قيد الإعداد" | "موقوف";

export interface Tenant {
  id: string;
  store: string;
  initials: string;
  owner: string;
  country: string;
  currency: string;
  plan: string;
  status: TenantStatus;
  created: string;
  domain: string;
}

export const tenants: Tenant[] = [
  { id: "nexus", store: "نيكسوس للألعاب", initials: "NG", owner: "عمر حداد", country: "لبنان", currency: "USD", plan: "النمو", status: "نشط", created: "18 مايو 2026", domain: "play.nexus.example" },
  { id: "vertex", store: "فيرتكس ديجيتال", initials: "VD", owner: "لينا كريم", country: "الإمارات", currency: "AED", plan: "الأعمال", status: "نشط", created: "12 مايو 2026", domain: "shop.vertex.example" },
  { id: "nova", store: "نوفا توب أب", initials: "NT", owner: "يوسف صالح", country: "الأردن", currency: "JOD", plan: "الانطلاق", status: "قيد الإعداد", created: "9 مايو 2026", domain: "nova.example" },
  { id: "arcade", store: "ريد أركيد", initials: "RA", owner: "مايا ناصر", country: "الكويت", currency: "KWD", plan: "النمو", status: "موقوف", created: "26 أبريل 2026", domain: "redarcade.example" },
  { id: "orbit", store: "أوربت ستور", initials: "OS", owner: "سامي مراد", country: "السعودية", currency: "SAR", plan: "الأعمال", status: "نشط", created: "17 أبريل 2026", domain: "orbit.example" },
];

export const activities = [
  { title: "تم إنشاء متجر جديد", detail: "نوفا توب أب · منذ 12 دقيقة", tone: "green" },
  { title: "تم تفعيل اشتراك", detail: "نيكسوس للألعاب · منذ 28 دقيقة", tone: "blue" },
  { title: "تم تحديث وحدة", detail: "فيرتكس ديجيتال · منذ ساعة", tone: "amber" },
  { title: "فشل اتصال مزود", detail: "محاولة اختبار وهمية · منذ ساعتين", tone: "red" },
  { title: "تم تحديث إعدادات متجر", detail: "أوربت ستور · منذ 3 ساعات", tone: "green" },
];

export const modules = [
  { name: "شحن الألعاب", icon: "GT", description: "كتالوج شحن أرصدة ومنتجات الألعاب الرقمية.", status: "نشط" },
  { name: "خدمات التواصل", icon: "SM", description: "خدمات شبكات التواصل وإدارة تنفيذها.", status: "مخطط" },
  { name: "المحفظة", icon: "WA", description: "أرصدة العملاء والحركات المالية.", status: "معطل" },
  { name: "الطلبات", icon: "OR", description: "متابعة الطلبات والعمليات من مكان واحد.", status: "مخطط" },
  { name: "المزودون", icon: "PR", description: "إدارة اتصالات مزودي التنفيذ الخارجيين.", status: "معطل" },
  { name: "الحوالات", icon: "RE", description: "التحويلات والتسويات عبر الحدود.", status: "معطل" },
  { name: "الدعم", icon: "SU", description: "مساحة دعم المتاجر والعملاء.", status: "نشط" },
] as const;
