# Super Admin Login UI Result

## Result

The existing Arabic-first Super Admin frontend now opens with a centered premium mock security portal: Login, a visually distinct Authenticator screen, then the existing dashboard. The dashboard itself remains unchanged by this redesign.

## Files and organization

- `src/App.tsx` coordinates only the preview Login, Two-Factor, and dashboard states.
- `src/mock-auth.ts` isolates clearly labeled mock credentials, OTP, session key, validation, and browser-generated error tone.
- `src/components/auth/` contains the Login page, Two-Factor page, six-box OTP input, original `Zetsu-01` guardian, restrained animated background, and sound control.
- `src/hooks/useAuthSounds.ts` owns optional low-volume Web Audio synthesis and its preview-only session preference.
- `src/components/layout/AdminShell.tsx` contains the existing dashboard shell and working profile menu/logout.
- `src/styles.css` provides the RTL shell, authentication visuals, responsive states, focus/error states, and reduced-motion behavior.

## Mock behavior

- Email: `admin@akatsuki.com`
- Password: `Akatsuki123!`
- OTP: `246810`
- Empty/invalid fields and wrong credentials show Arabic inline/alert feedback.
- Password visibility toggles without changing or storing the entered password.
- OTP accepts one numeric digit per box, supports keyboard movement and six-digit paste, and uses an LTR logical input row inside the RTL page.
- Wrong login or OTP input triggers a short low-volume Web Audio tone after user interaction. Login includes a sound toggle.
- Successful OTP stores only a harmless preview authenticated flag in `sessionStorage`; logout removes it and returns to Login.

## Visual and accessibility details

The Login and Authenticator experiences use one centered RTL portal rather than a split screen. `Zetsu-01` is an original CSS-only, silver-haired masked AI guardian with black tactical armor, red energy lines, and a semi-realistic layered silhouette. Its eyes blink/follow the pointer, attend to email focus, close during password input, turn red on invalid input, emit an expanding green security pulse on success, and narrow into scanner mode with six OTP progress lights. Only slow paper fragments, subtle particles, soft wind lines, and blurred red ambience remain in the background. Mobile reduces decoration and scales the guardian and OTP boxes. Reduced-motion preferences disable meaningful animation duration.

The desktop entrance activates an original rotating red circular sigil, presents ZETSU-01 in the center for a brief ready/greeting motion, shifts the guardian smoothly beside the form, and settles the login card with delayed fade/scale. Pointer movement adds limited head-and-eye parallax. The mobile sequence is shorter and remains centered. The Authenticator card adds a scanner identity marker, animated completion lights, and a mock resend countdown while preserving the six-box logical OTP order.

Sound is off until an explicit `تفعيل الصوت` user action. Once enabled, browser-generated low-volume filtered wind, occasional paper movement, focus, press, digit, scanner, error, unlock, and logout effects are available. There is no music or soundtrack. The preference is stored only in `sessionStorage`, and the audio context pauses while the tab is hidden. No audio file or copyrighted sound exists.

Forms have labels, autocomplete/input-mode hints, visible keyboard focus, `aria-live` error feedback, accessible password/OTP controls, and non-color error indicators.

## Explicit limits

This is preview-only UI. It adds no backend Auth, routes, database connection, cookie, JWT, real session, SMS/email/authenticator service, production user, secret, or API integration. Mock data and credentials must never be treated as production security.

## Next safe step

Run a focused visual and accessibility review of the Login/OTP flow only, including keyboard-only operation and Arabic mobile layouts, before proposing any real authentication contract.
