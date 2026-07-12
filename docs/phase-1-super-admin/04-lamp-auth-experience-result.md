# Lamp Authentication Experience Result

## Result

The existing mock Super Admin authentication flow now uses a minimal interactive security-lamp direction. Dashboard and AdminShell remain unchanged. The preserved ZETSU-01 assets and asset components are no longer loaded or rendered by this auth flow.

## Login experience

- Desktop uses a true two-column composition: complete floor lamp at approximately 44% on the left and a 430–480px RTL authentication card on the right.
- The scene starts nearly black with the lamp base, pole, arm, shade, cord, and restrained standby handle visible.
- Clicking, keyboard-activating, or dragging the pull beyond its threshold toggles the lamp on or off before submission.
- A focused red/white beam illuminates the centered Login card and reveals it with a short blur/fade/settle transition.
- Visible content is limited to portal identity, email, password, validation, and secure login action.
- Wrong credentials produce Arabic error feedback, a controlled card shake, and optional rejection sound.
- Correct credentials produce a clean light/panel confirmation before moving to OTP.
- Turning the lamp off dims and disables the form without erasing entered values. Valid submission locks it on during OTP.

## OTP experience

The six-digit mock OTP remains `246810`. The same left lamp remains on and locked while the right card transforms into verification. A compact security-device visual represents idle, typing, verifying, success, and error states. Entered digits illuminate matching device indicators, verification activates a scanner, and success opens the existing Dashboard through the established portal transition.

## Sound

Sound remains disabled until the visible `تفعيل الصوت` control is used. Web Audio generates quiet lamp pull/light-on, focus, click, digit, scanner, error, success, logout, wind, and paper movement sounds. There is no music or external audio. The context suspends while the tab is hidden and cleans up generated nodes/timers.

## Accessibility and mobile

Forms retain labels, autocomplete, keyboard focus, `aria-live` errors, accessible show/hide password control, logical LTR OTP digit order, and reduced-motion support. Lamp state is exposed through its button label and `aria-pressed`; the real button supports click, Enter/Space, Pointer Events, and touch. Mobile changes to a vertical lamp-above-form layout, scales the complete lamp/device, uses nearly full-width cards, reduces fragments, respects safe areas, and keeps all six OTP boxes within the viewport.

## Limits

Authentication remains local mock UI only. No API call, real session, cookie, JWT, MFA service, password storage, or backend integration exists. ZETSU-01 assets remain available but are intentionally unused under this approved minimal lamp direction.
