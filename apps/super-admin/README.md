# Akatsuki Super Admin

واجهة React + TypeScript عربية أولاً لمركز تحكم Akatsuki Platform Super Admin.

## Run locally

From the repository root:

```bash
pnpm --filter @akatsuki/super-admin dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Mock login — UI preview only

> تحذير: تجربة الدخول والتحقق بخطوتين مرئية وتجريبية فقط. لا توفر مصادقة أو حماية حقيقية ولا تتصل بأي backend.

- Email: `admin@akatsuki.com`
- Password: `Akatsuki123!`
- OTP: `246810`

لا تُحفظ كلمة المرور. بعد نجاح OTP، تُحفظ علامة harmless باسم preview authentication داخل `sessionStorage` فقط حتى يبقى العرض مفتوحاً عند تحديث الصفحة. تسجيل الخروج يحذفها.

## Current scope

- Login, Two-Factor Authentication, profile menu, and working mock logout.
- Centered authentication card matching the approved Akatsuki visual reference, with a restrained crimson atmosphere and simple matching OTP step.
- Arabic RTL dashboard, tenant directory/detail, modules, and planned-section placeholders.
- Local state navigation without a router.
- Mock presentation data only.
- Responsive dark Akatsuki visual system with RTL-compatible logical CSS properties.

There is no real authentication, backend fetch, database access, Provider integration, real metrics, mutations, production data, or secrets. Status values are visual placeholders and must not be treated as operational evidence.

## Current limitations and future integration points

- Credentials and OTP are compared locally and must be removed when real authentication is approved.
- Forgot-password, profile, and security settings remain placeholders.
- No cookies, JWT, SMS, email, authenticator, rate limiting, or server-side session exists.
- Sound is disabled until the user presses `تفعيل الصوت`. The preference is kept only in `sessionStorage`; generated low-volume Web Audio provides filtered wind, occasional paper movement, focus/press, scanner, OTP digit, unlock, error, and logout effects. There is no music or soundtrack, and audio pauses when the tab is hidden.
- Login contains only the square Akatsuki mark, `بوابة الأكاتسكي`, `لوحة التحكم الإدارية`, email, password, and the primary secure-entry button.
- OTP uses the same centered red/black card language with six inputs and no illustration or complex scene.
- Future integration must replace `mock-auth.ts` with approved API contracts, secure server-side opaque sessions, password policy, real MFA challenge/verification, CSRF protection, rate limiting, audit events, and safe error handling.

## Approved ZETSU-01 assets

- `public/assets/guardian/Z1.png` — transparent full-body guardian and sword; desktop intro, idle scene, parallax, and bounded pointer drag.
- `public/assets/guardian/Z2.png` — transparent matching portrait; panel/mobile portrait base.
- `public/assets/guardian/Z3.png` — 3×2 expression sheet; exact idle, email, password, error, success, and OTP visual overlays.
- `public/assets/guardian/Z4.png` — transparent red eye sigil for awakening, scanner, and success portal light.
- `public/assets/guardian/Z4-black.png` — dark sigil depth layer for the command-center environment.

These approved assets remain preserved for a future character-based direction, but the current lamp authentication flow does not preload or render them.
