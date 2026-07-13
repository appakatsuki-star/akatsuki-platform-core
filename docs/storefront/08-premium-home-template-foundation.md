# Phase 4.0 — Premium Storefront Home Template Foundation

## الهدف والاتجاه البصري

تم إنشاء أول Home Template احترافي قابل لإعادة البيع لمتاجر الخدمات الرقمية. يجمع التصميم بين Editorial Commerce وBento وNeo-Glass ليقدم تجربة تطبيق واضحة وغنية دون الارتباط بهوية Akatsuki أو متجر محدد.

## المعمارية

تقود الصفحة قائمة `HomeSectionConfig` محلية تحتوي النوع والحالة والترتيب ومصدر البيانات. يمكن مستقبلًا أن تأتي القيم نفسها من Home Builder دون إعادة بناء JSX. الأقسام الحالية: Hero، Search، Greeting، Quick Actions، Categories، Best Sellers، Featured Collection، Product Sections، Trending، Offers، Recently Added، Wallet، Payment Methods، Benefits وSupport.

## Hero

Carousel من أربع شرائح محلية للألعاب والاشتراكات والبطاقات والبرامج، مع تحكم يدوي وAuto-play كل 6.2 ثانية. يتوقف عند hover/focus وعندما تكون الوثيقة مخفية، ويتوقف تلقائيًا مع reduced motion.

## Smart Search

بحث Mock قابل للتوسعة يعرض عمليات شائعة ونتائج منتجات وأقسام، ويدعم Escape وEnter والمسح وحالة no results. لا توجد Search API.

## Categories والمنتجات

توجد تسعة أقسام و18 منتجًا تجريبيًا ببيانات التسليم والتنفيذ والتوفر والسعر والخصم والشعبية. تستخدم Home بطاقة خاصة بها لتجنب تغيير ProductCard في صفحات الكتالوج، وتعرض Favorite محليًا وproduct visuals مولدة بـCSS.

## الأقسام التجارية

- Best sellers وcategory rails بتمرير أفقي responsive.
- Featured campaign مختلفة بصريًا عن Hero.
- Trending ticker هادئ يتحول إلى scroll ثابت مع reduced motion.
- عروض بتواريخ Mock ثابتة وليست عدادات يعاد تشغيلها.
- Wallet وطرق دفع تجريبية وBenefits وSupport CTA.

## العلامة وTheme tokens

يوفر `storeBrand` اسمًا وشعارًا واختصارًا وألوانًا وعملة ولغة تجريبية محايدة. تعتمد الصفحة على `--store-*` المرتبطة بنظام السمة الحالي، وتدعم Dark وLight وتبديل primary دون تعديل المكونات.

## Responsive وRTL/LTR

يتحول Hero إلى عمود واحد، وتتغير Bento grids وproduct rails وQuick Actions عبر Desktop وTablet وMobile. تستخدم المحاذاة خصائص منطقية، بينما تبقى الأسعار والأرقام مقروءة. يستمر StoreShell في توفير Header وDrawer وFooter وBottom Navigation.

## Accessibility

الأقسام semantic، والأزرار حقيقية، ولـCarousel وSearch تسميات واضحة، وحالات focus مرئية، وأهداف اللمس مناسبة. لا يعتمد المنتج على hover فقط، وتحترم الحركات `prefers-reduced-motion`.

## الأداء والحركة

لا توجد dependencies أو صور خارجية أو Canvas/WebGL. تستخدم الحركات transform وopacity، ويُنظف Hero timer عند unmount. الصور التجريبية CSS فقط، وحجم البيانات محدود ومحلي.

## حالات النظام

تم توفير `HomeState` لحالات skeleton وempty وerror وoffline، ويمكن ربطها لاحقًا بأعلام Mock أو بمصدر البيانات الفعلي دون spinners متكررة.

## القيود المعروفة

- البيانات والبحث والتوصيات والمفضلة داخل Home تجريبية محلية.
- لا يوجد Backend أو Admin Home Builder.
- StoreShell Footer وDrawer مشتركان ولم تتم إعادة بنائهما خصيصًا لهذه المرحلة.
- يلزم QA بصري يدوي نهائي في متصفح فعلي.

## ما لم يتم

لم يتم تعديل Auth أو Product Details أو Checkout أو Backend أو Database أو Super Admin، ولم تنفذ provider/payment integrations أو تطبيقات الهاتف.

## المرحلة التالية

تنفيذ QA بصري واعتماد Home Template V1، ثم الانتقال إلى تحسين Categories وProduct Details فقط بعد الاعتماد.
