# Phase 3.3 — Premium Authentication Experience

## هدف المرحلة

استبدال تجربة Login/Register التقليدية بتجربة دخول مميزة وهادئة، تعمل بالكامل داخل المتصفح وتحافظ على Mock session الحالي من دون أي اتصال خارجي.

## مكونات Auth

- `AuthExperience`: تنسيق الحالة والنماذج والتحقق والانتقالات.
- `AuthSplash`: مقدمة قصيرة تظهر مرة واحدة في الجلسة.
- `AuthBackground`: Grid وglow وparticles وparallax خفيف.
- `AuthMascot`: Guardian SVG محلي يتبع حالة النموذج.
- `AuthCard` و`AuthStatusMessage`: البطاقة وحالات النجاح والخطأ.
- `AuthSocialButtons`: Google وWhatsApp بأيقونات SVG محلية وسلوك Mock.
- `PasswordStrength`: Weak/Medium/Strong بالنص والمؤشر.
- `auth-types`: أنواع Auth وMascot المركزية.

## Mascot states

يدعم: `idle`, `email-focus`, `email-typing`, `password-focus`, `password-visible`, `loading`, `success`, `error`. الحالة تأتي من Prop فقط، ولا توجد حركة سلوكية عشوائية.

## Splash behavior

- مدة 1400ms ضمن الحد المطلوب.
- يحفظ `platform-auth-intro=seen` في `sessionStorage` ولا يعاد بين Login وRegister في الجلسة نفسها.
- لا يظهر مع `prefers-reduced-motion`.
- لا يستخدم فيديو أو Canvas أو WebGL أو Asset خارجي.

## Login behavior

- بريد/هاتف وكلمة مرور، Remember me، Forgot password، وإظهار/إخفاء كلمة المرور.
- Login التجريبي الصحيح: `demo@example.com` وكلمة المرور `Demo1234`.
- البيانات الخاطئة تعرض رسالة وتحافظ على القيم وتنقل focus لأول حقل مطلوب.
- النجاح يحدّث Mock session ثم ينتقل إلى المتجر بعد 700ms.

## Register behavior

- الاسم، الهاتف مع رمز الدولة، البريد، كلمة المرور، الشروط.
- تحقق محلي من الصيغ وقوة كلمة المرور.
- النجاح ينتقل إلى `/verify?flow=register` استعدادًا للمرحلة التالية.
- لا ترسل أو تخزن كلمة المرور أو بيانات النموذج.

## Responsive وMotion

- Card مركزية من دون Split Screen.
- عرض Tablet متوسط، وMobile full-screen قابل للتمرير مع Safe Area.
- Parallax حتى 8px على Desktop فقط، ويتوقف على touch وreduced motion.
- Focus 140ms، card entry 300ms، error shake 320ms، success 600–700ms.

## Accessibility

- Labels حقيقية، autocomplete، aria-invalid وaria-describedby.
- Error summary عند تعدد الأخطاء ونقل focus لأول حقل خاطئ.
- Mascot decorative ومخفي عن Screen Readers.
- Social وPassword visibility أزرار semantic بأهداف لمس 44px.
- Enter يرسل النموذج وfocus-visible محفوظ.

## Known limitations وما لم يتم

- Google وWhatsApp محليان فقط ولا يستخدمان SDK.
- `/verify` ما زال تجربة Mock حالية؛ OTP المتقدم وAuthenticator و2FA مؤجلة.
- لا Backend أو Database أو API أو Real Authentication.
- لا Client Admin أو تطبيقات Native.
- يلزم QA بصري لـLogin/Register على Desktop وTablet وMobile، Dark/Light وRTL/LTR، مع فحص Keyboard وConsole.
