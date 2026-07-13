# Phase 3.7 — Final Authentication Design Lock

## القرار البصري النهائي

اعتمدت تجربة المصادقة اتجاه **Premium Minimal Neo-Glass** القائم على هوية المتجر والنموذج دون Mascot أو Guardian أو Security Core. تبقى الخلفية العامة هادئة، وتتركز الهوية داخل Auth Card.

## سبب إزالة Guardian

كان العنصر السابق يضيف شخصية بصرية منفصلة وفراغًا أعلى البطاقة ولا يناسب قالبًا قابلًا لإعادة البيع. استُبدل بـBrand Area أصغر وأكثر حيادًا واحترافية.

## Brand Area وإعادة الاستخدام

تستخدم `authBrand` اسم المتجر وشعاره الوهمي من إعدادات المتجر الحالية، وتدعم بنيويًا أوضاع `logo` و`image` و`minimal`. الوضع الحالي `logo` ولا توجد صور خارجية. يمكن لاحقًا بناء Auth templates مدفوعة فوق هذا الحد دون تغيير منطق المصادقة.

## السمة

- Dark: سطح داكن غير أسود، blur متوازن، border وinner highlight خفيفان.
- Light: خلفية off-white وبطاقة وحقول دافئة منخفضة السطوع مع ظلال مريحة.
- جميع ألوان الهوية الأساسية تعتمد على Auth theme tokens.
- استُبدل زر النص بمفتاح Day/Night محلي مبني بـCSS.

## Kinetic Borders

تستخدم الحقول وCTA وأزرار Google وWhatsApp وبطاقات التحقق حدودًا حركية رفيعة عبر gradients وmask وtransform، دون مكتبة أو Layout animation. تقل الحركة مع `prefers-reduced-motion`.

## التدفقات

- Login وRegister وForgot Password تحتفظ بالمنطق والبيانات التجريبية الحالية.
- Register أعرض بعمودين على المساحات المناسبة وعمود واحد على الهاتف.
- Google وWhatsApp واجهة Mock مع هوية محلية وحالات تحميل.
- اختيار وسيلة التحقق يعرض الوجهة المخفية والحالة والوقت المتوقع.
- OTP يحافظ على أربع خانات وPaste وBackspace والتحقق التلقائي وحركات الدمج والتفكك.
- نظام الصوت اختياري، مكتوم افتراضيًا، ومحفوظ في `localStorage`.

## Responsive وRTL/LTR

يستخدم Header وحقول Auth خصائص منطقية، ويبقى OTP باتجاه LTR. تتكدس حقول Register والأزرار الاجتماعية على الهاتف، مع أهداف لمس لا تقل عن 44px وSafe Area.

## Accessibility

توجد labels حقيقية وautocomplete وfocus-visible وaria-invalid ورسائل خطأ مرئية و`aria-live` في OTP. الصوت والحركة ليسا الوسيلة الوحيدة لفهم الحالة.

## الأداء

لا توجد dependencies أو صور خارجية أو Canvas/WebGL. الحركات CSS/SVG وتستخدم transform وopacity، مع دعم reduced motion وتنظيف مؤقتات OTP ومستمع الخلفية.

## القيود المعروفة

- المصادقة والإرسال وGoogle OAuth وWhatsApp كلها Mock.
- وضع `image` معماري فقط ولا توجد صورة مخصصة حاليًا.
- Forgot Password يحتفظ بالتدفق الحالي ولا يضيف Backend أو Reset flow جديدًا.
- يلزم اعتماد بصري يدوي نهائي في المتصفح.

## QA checklist

- [ ] Dark/Light بالعربية والإنجليزية على Desktop.
- [ ] Login وRegister وForgot Password على Mobile وTablet.
- [ ] Weak/strong password وterms error.
- [ ] Email وWhatsApp verification.
- [ ] OTP الصحيح والخاطئ وPaste وResend.
- [ ] Header: Home والصوت والسمة واللغة.
- [ ] RTL/LTR وKeyboard وConsole وoverflow.

## ما لم يتم

لم يتم تعديل Home أو Backend أو Database أو Super Admin أو Project Factory، ولم تُنفذ مصادقة أو OTP أو OAuth أو WhatsApp حقيقية، ولم تبدأ Paid Auth Templates أو تطبيقات الهاتف.
