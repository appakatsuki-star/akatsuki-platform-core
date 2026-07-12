# Approved Reference Login Result

## Result

The mock Super Admin Login now follows the approved `799.png` composition: one centered card, square Akatsuki cloud mark, dominant Arabic title, red administrative subtitle, two pill fields, and one full-width crimson action. Dashboard and mock authentication behavior remain unchanged.

## Visual implementation

- Fullscreen almost-black background with deep crimson center glow and edge vignette.
- Faint original cloud silhouettes near the lower corners.
- Nine slow red leaf/paper fragments and twelve tiny particles, reduced on mobile.
- 480px desktop card with a restrained red border, 28px radius, dark crimson/black surface, and controlled shadow.
- Sequential entrance completes in approximately one second; reduced-motion exposes all usable controls immediately.

The approved supplied logo is stored locally at `apps/super-admin/public/assets/akatsuki-logo.png` and rendered by the shared Login/OTP mark component. It replaces the temporary CSS cloud construction.

## Login and OTP

Mock credentials remain `admin@akatsuki.com` / `Akatsuki123!`. Validation preserves the email, clears the password after wrong credentials, announces errors with `aria-live`, and performs one short shake. Password visibility remains accessible.

OTP remains a simple matching card with six boxes, numeric input, forward/backspace navigation, full-code paste, and mock code `246810`. Correct verification transitions into the existing Dashboard.

## Removed rejected presentation

`LampSwitch.tsx` and `VerificationDevice.tsx` were removed. The current Login/OTP render no lamp, character, robot, phone illustration, city, sigil, side column, marketing content, registration, or social login. Preserved ZETSU image assets remain unused.

## Sound and limitations

The unobtrusive corner toggle remains opt-in. Only generated focus, click, digit, error, success, and logout feedback is relevant to the current experience; no music or external audio exists. Authentication remains local mock UI with no API, cookie, JWT, or real MFA.
