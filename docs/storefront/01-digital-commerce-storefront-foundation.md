# Phase 3.0 — Digital Commerce Storefront Foundation

## هدف المرحلة

إنشاء Storefront محايد العلامة التجارية لبيع الخدمات الرقمية بواجهة Frontend وMock Data فقط، من دون Backend أو API أو Database أو دفع أو تنفيذ حقيقي.

## نتيجة فحص المستودع

- المستودع Monorepo يستخدم pnpm workspace وReact وTypeScript وVite.
- كان `apps/storefront` موجودًا كـPlaceholder يحوي README فقط، لذلك تم استخدامه بدل إنشاء تطبيق مكرر.
- لا توجد مكتبة Router معتمدة للتطبيق؛ تم استخدام Browser History وReact state بنموذج خفيف.
- أُعيد استخدام إصدارات React وVite وTypeScript الموجودة في `apps/super-admin` من دون إضافة Dependency أو تغيير إصدار.
- لم يتغير `pnpm-workspace.yaml`. تغير `pnpm-lock.yaml` فقط لإضافة importer التطبيق بالإصدارات الموجودة نفسها؛ لم تُضف حزمة أو نسخة جديدة.

## Architecture

- `components/layout`: Store Shell وHeader وFooter وMobile Navigation.
- `components/catalog`: بطاقات وشبكات المنتجات.
- `components/ui`: عناصر مشتركة، Icons، حالات فارغة، Status وBreadcrumbs.
- `pages`: Public، Auth/System، Commerce، Account/Support.
- `data`: Store Config والكتالوج والمحفظة والطلبات والإشعارات والتذاكر والعروض.
- `types`: أنواع مركزية للكتالوج والحالة المحلية.
- `hooks`: Router خفيف وStorefront Context.
- `utils`: الترجمة والتاريخ والعملات.

## Routes والصفحات

Public: `/`, `/login`, `/register`, `/verify`, `/forgot-password`, `/categories`, `/categories/:categorySlug`, `/products/:productSlug`, `/search`, `/offers`, `/favorites`, `/about`, `/terms`, `/privacy`, `/maintenance`, Not Found، `/offline`, `/unauthorized`, `/error`.

Authenticated Mock: `/checkout`, `/wallet`, `/wallet/deposit`, `/orders`, `/orders/:orderId`, `/notifications`, `/support`, `/support/new`, `/support/:ticketId`, `/profile`, `/settings`.

## Mock Data والسلوك

- كتالوج مرن: Category وCollection وProduct وVariant وDynamic Fields.
- Login/Logout وTheme وLanguage وحالة المتجر تحفظ محليًا من دون Password أو OTP أو Tokens.
- يتحقق زر الشراء من الباقة والحقول المطلوبة وصحة القيمة وتوفر المنتج.
- شراء المحفظة يخصم محليًا ويضيف Order وTransaction وNotification.
- الإيداع يزيد الرصيد ويضيف Transaction وNotification.
- المفضلة والإشعارات والتذاكر والردود تعمل محليًا.
- OTP التجريبي `123456` ولا يُرسل لأي خدمة.

## Responsive والوصول

- Shell مكتبي من دون Sidebar، Header مضغوط للأجهزة اللوحية، وBottom Navigation مع Safe Area للموبايل.
- تخطي للمحتوى، labels، semantic controls، focus واضح، disabled states، رسائل أخطاء، وأهداف لمس مناسبة.
- دعم Dark/Light وArabic RTL/English LTR عبر Design Tokens وخصائص CSS منطقية.
- دعم `prefers-reduced-motion` ومنع الحركات عند تفعيله.
- Breakpoints مصممة لمصفوفة 1600×1000 و1280×800 و820×1180 و390×844.

## ما لم يتم والقيود

- لا Backend أو Database أو API أو Prisma أو Migrations.
- لا Authentication أو OTP أو Google/WhatsApp أو Payment/Provider integration حقيقي.
- لا Client Admin أو Android أو iOS.
- Product visuals ورفع الملفات والدفع والتنفيذ كلها Mock.
- لم تُنفذ جولة QA بصرية كاملة على 16 حالة في هذه الخطوة؛ يلزم تشغيلها في المتصفح كجولة تالية.
- نجح Typecheck والبناء مباشرة بأدوات TypeScript/Vite الموجودة. محاولة إعادة تشغيلهما عبر pnpm أعادت تهيئة `node_modules` ثم توقفت بسبب منع الشبكة قبل تشغيل scripts؛ لا يؤثر ذلك في ملفات المصدر أو نتيجة التحقق المباشر، لكنه يتطلب إعادة تثبيت workspace خارج هذه المرحلة قبل جولة QA.

## Next step

جولة QA بصرية تبدأ بالصفحة الرئيسية، تفاصيل المنتج، Checkout، Wallet، Orders، Login وMobile Navigation عبر المصفوفة المطلوبة، من دون توسيع النطاق أو ربط أي خدمة حقيقية.
