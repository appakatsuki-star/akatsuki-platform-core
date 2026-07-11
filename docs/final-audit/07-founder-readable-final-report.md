# التقرير النهائي المبسّط للمؤسس — Founder-Readable Final Report

## الخلاصة

Akatsuki أصبحت جاهزة من ناحية **التصميم والتخطيط**، لكنها ليست جاهزة بعد لبدء بناء Phase 1 بالكامل.

القرار المقترح حاليًا: **NO-GO** إلى أن يتم حسم القرارات القانونية والمالية والأمنية والاستضافة والمزوّدين.

## ما الذي سنبنيه لاحقًا؟

المثال المبسّط:

1. Super Admin ينشئ متجرًا باسم **Ahmad Store**.
2. Ahmad يصبح Tenant Admin لمتجره فقط.
3. Ahmad يربط مزوّد API واحد بطريقة آمنة.
4. Akatsuki تستورد خدمات المزوّد كسجلات خام ومخفية.
5. Ahmad يختار الخدمات المناسبة وينشرها بهذا الشكل:

```text
Games
└── PUBG Mobile
    ├── 60 UC
    ├── 325 UC
    └── 660 UC
```

6. Ahmad يضع صورة ووصفًا وأسعارًا تناسب هوية متجره.
7. العميل يفتح PUBG Mobile، يختار الباقة، ويكتب Player ID.
8. النظام يعرض سعر USD صحيحًا حسب الـtier.
9. النظام يحجز المال، يرسل الطلب مرة واحدة للمزوّد، ويتابع الحالة.
10. Wallet وLedger يسجّلان كل حركة مالية من دون تعديل مباشر للرصيد.

## ما تم إنجازه في Phase 0؟

- اختيار Fastify وDrizzle تقنيًا، مع إثبات runtime أولي.
- تصميم PostgreSQL وعزل كل tenant.
- تصميم users, sessions, MFA, RBAC, audit logs.
- تصميم Provider Product وStore Product وPackages.
- تصميم الأسعار والـtiers والعمولات المستقبلية.
- تصميم wallet/ledger مزدوج ومتوازن وغير قابل للتعديل.
- تصميم الطلبات وحالات timeout ومنع blind retry.
- إعداد security, backup, incident, hosting, release plans.
- إعداد 46 تذكرة و11 Sprint من Sprint 0 إلى Sprint 10.
- إعداد شروط توقف وقالب GO/NO-GO وقالب توقيعات.

## ما الذي يجب أن يبقى في MVP؟

- Tenant واحد تجريبي.
- Provider واحد.
- Games وPUBG Mobile وباقات قليلة.
- Player ID.
- USD فقط.
- Provider catalog import ثم review ثم publish as package.
- Pricing tier بسيط.
- Order lifecycle.
- Wallet/ledger آمن.
- Tenant isolation, RBAC, MFA, audit.

## ما الذي نؤجله؟

- SMM وlive chat وmobile recharge.
- stock/manual fulfillment.
- Agent payout والعمولات المعقدة.
- multi-provider routing/failover.
- أكثر من دولة أو عملة وFX.
- AI automation.
- mobile apps وpublic partner API.

## ما الذي نمنعه من Phase 1؟

- نشر كل كتالوج المزوّد تلقائيًا.
- عرض Provider Products الخام للعميل.
- إعادة إرسال الطلب بعد timeout من دون inquiry.
- تعديل الرصيد مباشرة.
- تعديل أو حذف ledger entries المنشورة.
- استخدام AI لتنفيذ طلب أو تغيير سعر/منتج/مفتاح/مال.
- transfers وFX.
- production launch أو real customer funds قبل الموافقات.
- Kubernetes من دون سبب واضح.

## ما القرارات الناقصة؟

- هل لبنان هو السوق الأول؟ وما اسم الشركة القانونية؟
- ما اسم مزوّد التنفيذ ومزوّد الدفع؟
- هل merchant account لكل tenant؟
- ما العملة والحدود والتقريب القانوني/المحاسبي؟
- ما chart of accounts ووقت capture/refund/settlement؟
- هل Ninja و6% مناسبان؟ وهل Agent commission معطّلة؟
- ما cloud/region/budget وRPO/RTO؟
- من يوقّع Legal وFinance وSecurity وArchitecture وOperations؟

## التوصية

لا نبدأ Phase 1 بالكامل الآن.

الخطوة الأفضل:

1. تنظيف التناقضات في الوثائق ووضع index واضح.
2. عقد اجتماع المؤسس واختيار provider/payment/cloud/entity.
3. الحصول على Legal memo وaccounting posting matrix وsecurity/hosting approvals.
4. إكمال Sprint 0.
5. بعد توقيع بشري صريح فقط، نبدأ Sprint 1 أو تذكرة Foundation واحدة.

حتى ذلك الوقت: **Phase 1 = NO-GO**.
