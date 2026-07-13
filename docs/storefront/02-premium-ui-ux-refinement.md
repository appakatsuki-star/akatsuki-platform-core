# Phase 3.2 — Storefront Premium UI/UX Refinement

## هدف المرحلة

رفع Storefront الحالي من Foundation وظيفي إلى تجربة تجارة رقمية Premium منظمة بصريًا، مع الحفاظ على Routes وحالة Mock ومنطق الشراء والمحفظة والدعم الموجود.

## الصفحات المعدلة

- Home: تسلسل تجارة كامل من Hero إلى Footer بدل الاعتماد على Hero كبير وفراغات.
- Product Details: قصة المنتج ومعرض بصري ومعلومات تسليم في جهة، وباقات وحقول ومحفظة وشراء في جهة أخرى.
- Wallet: ملخص مالي أقصر، إجراءات واضحة، طرق إيداع، وتصفية المعاملات حسب النوع والحالة.
- Orders: بحث بالرقم وتصفية بالحالة والتاريخ وبطاقات طلب ذات إجراءات مباشرة.
- Profile: ملخص حساب، رتبة وتقدم، رصيد، إحصاءات طلبات، عضوية، تحقق ومعلومات شخصية.
- Categories وSearch وCheckout وSupport وNotifications: استفادت من بطاقات المنتج والـShell وحالات Feedback والتباعد والـresponsive الجديدة.

## Components الجديدة

- `HeroCarousel`: ثلاث شرائح بطيئة، توقف عند hover/focus/touch، وتحترم reduced motion.
- `ProductVisual`: visual محلي مبني بـCSS وقابل للتلوين حسب فئة المنتج.
- `ProductCardSkeleton`, `SectionSkeleton`, `PageSkeleton`.
- `ErrorState`, `OfflineState` مع Retry اختياري.

## التغييرات البصرية

- Product Cards تعرض الفئة، التوفر/التنفيذ، الشعبية، وقت التنفيذ، السعر القديم والخصم والإجراء.
- Featured editorial collection وCategory shelves منفصلة للألعاب والاشتراكات وبطاقات الهدايا.
- Offers وPayment methods وWhy choose us وSupport CTA ضمن قصة Home متسلسلة.
- Design tokens ظلت مركزية، وأضيفت طبقة `premium.css` منفصلة لتقليل مخاطر تعديل Foundation.
- ظلال وحدود دقيقة وحركة 150–250ms دون Neon أو Glass مبالغ.

## تحسينات UX والموبايل

- Mobile Header يعرض Menu وLogo وSearch وWallet فقط؛ اللغة والمظهر والإشعارات داخل Drawer.
- Drawer يغلق بـEscape، يحبس focus، ويغلق بالنقر خارج القائمة.
- Bottom Navigation يحتوي Active indicator وSafe Area وأهداف لمس واضحة.
- Sticky purchase panel يرتفع فوق Bottom Navigation.
- Hero وبطاقات المنتجات وطرق الإيداع والطلبات والملف الشخصي يعاد ترتيبها حسب العرض.

## Accessibility وMotion

- `aria-current`, `aria-pressed`, `aria-invalid`, labels وstatus text.
- Focus visible، disabled semantics، ونصوص خطأ/مساعدة للحقول الديناميكية.
- `prefers-reduced-motion` يوقف carousel التلقائي والحركات وshimmer.
- Skeletons تستخدم `aria-busy` وحالات Error تستخدم `role=alert`.

## Mock behavior المحفوظ

- Login/Logout، OTP التجريبي، المحفظة والإيداع، الشراء، الطلبات، الإشعارات، المفضلة والتذاكر لم تتحول إلى خدمات حقيقية.
- لم تتغير Routes أو صيغة الحالة المحفوظة في LocalStorage.
- لم تتم إضافة Provider أو Payment Gateway أو API.

## Known limitations والشاشات المطلوبة للـQA

- لم تُنفذ مراجعة بصرية يدوية على مصفوفة 16 حالة في هذه الخطوة.
- يجب البدء بـHome، Product Details، Checkout، Wallet، Orders، Profile وMobile Drawer/Bottom Navigation.
- Product visuals محلية تجريدية قابلة للاستبدال لاحقًا من إعدادات المتجر.
- البيانات القليلة قد تجعل بعض Category shelves قصيرة، وهذا مقصود في بيانات Foundation الحالية.

## ما لم يتغير

- Super Admin وProject Factory وClient Admin.
- Backend وDatabase وPrisma وAPI وAuthentication الحقيقي.
- Dependencies وPackage versions وLockfile ضمن Phase 3.2.
