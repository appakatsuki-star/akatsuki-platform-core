# ZETSU-01 Authentication Experience Result

## Scope and result

The Super Admin authentication portal now uses the exact approved local ZETSU-01 assets. Dashboard pages, AdminShell navigation, API, DB, and mock credential behavior remain unchanged. No real authentication or external service was added.

## Asset manifest

| Asset | Exact path | Use |
|---|---|---|
| Z1 | `apps/super-admin/public/assets/guardian/Z1.png` | Transparent full-body guardian and sword for the cinematic intro, persistent desktop guardian, idle/parallax motion, and bounded drag |
| Z2 | `apps/super-admin/public/assets/guardian/Z2.png` | Transparent portrait base above the Login/Authenticator panel and the primary mobile guardian crop |
| Z3 | `apps/super-admin/public/assets/guardian/Z3.png` | 3×2 expression sheet cropped for idle, email, password, error, success, and OTP scanner states |
| Z4 | `apps/super-admin/public/assets/guardian/Z4.png` | Transparent red eye/sigil activation, verification scanner, and success portal pulse |
| Z4 dark | `apps/super-admin/public/assets/guardian/Z4-black.png` | Dark background sigil and environment depth |

The typed mapping lives in `src/config/guardian-assets.ts`, including intended use and safe missing-layer behavior. Critical Z1, Z2, and Z4 assets are preloaded in `index.html`; Z3 is loaded when the state overlay is rendered.

## Intro sequence

The first visit in a browser session runs a roughly 3.5-second CSS sequence:

1. dark scene and minimal particles;
2. Z4 eye awakening and concentric energy activation;
3. command-center/city silhouette reveal;
4. undistorted Z1 upward reveal in the center;
5. controlled Z1 settle into the left guardian area;
6. Z2 portrait and right-side glass-metal form reveal.

A harmless `sessionStorage` flag prevents replay on normal remounts. Reduced-motion removes the long delays and presents the final usable state immediately.

## Guardian states and drag

Z3 supplies the approved expression reference/crops for idle, email focus, password privacy, error, green success, and OTP scanning. Z4 intensity and state overlays reinforce each state without changing the character identity. Success expands an original green energy pulse from the guardian/sigil into the panel before OTP or Dashboard entry.

Z1 supports Pointer Events for mouse and touch. Movement is constrained to ±70px horizontally and a small safe vertical band; it cannot escape the visual region or cover the right-side form. Coordinates are not persisted. A hidden reset action exists inside the decorative scene, while form operation never depends on dragging.

## Layout and mobile

Desktop uses approximately equal visual/form areas: Z1 and Z4 on the left, Arabic RTL form on the right, with Z2/Z3 integrated above the panel. Tablet reduces scene size. Mobile hides the full-body layer, retains Z2/Z3 and Z4 in a compact vertical scene, keeps safe-area padding, and preserves six OTP boxes without horizontal scrolling.

## Sound

Sound remains disabled until `تفعيل الصوت` is pressed. Web Audio generates quiet filtered wind, occasional paper movement, click/focus, error, unlock/success, scanner, OTP digit, OTP rejection/success, and logout cues. There is no music or external audio. The preference alone is stored in `sessionStorage`; the audio context suspends while the tab is hidden and nodes/timers are cleaned up.

## Mock access

- Email: `admin@akatsuki.com`
- Password: `Akatsuki123!`
- OTP: `246810`

The password and entered credentials are never stored. Only harmless preview session, intro-seen, and sound-preference flags may exist in `sessionStorage`.

## Limitations and next refinement

Z3 is a single reference sheet, so state display uses non-destructive CSS crops rather than independently layered facial animation. Dragging is visual only. The city is a lightweight CSS silhouette, not a video or 3D environment. Real Auth, sessions, MFA, biometrics, audit events, rate limits, and API integration remain blocked.

Exact next visual refinement: perform a browser-based crop and breakpoint review of Z2/Z3 on common desktop/mobile viewports, adjusting only object positioning without altering the approved images.
