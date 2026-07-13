export type AuthSound = "field-focus" | "toggle" | "submit" | "error" | "success" | "otp-digit" | "otp-verifying" | "otp-sync" | "otp-error" | "otp-success";
export const AUTH_SOUND_KEY = "platform-auth-sound";

const tones: Record<AuthSound, Array<[number, number, number]>> = {
  "field-focus": [[480, .035, .018]], toggle: [[390, .045, .022], [520, .04, .018]], submit: [[310, .055, .02], [470, .07, .024]], error: [[210, .11, .03]], success: [[430, .06, .022], [650, .11, .026]], "otp-digit": [[590, .035, .014]], "otp-verifying": [[420, .055, .012], [540, .07, .014]], "otp-sync": [[510, .05, .014], [620, .06, .016], [720, .08, .018]], "otp-error": [[240, .12, .028], [190, .1, .02]], "otp-success": [[520, .05, .02], [710, .12, .026]],
};

let context: AudioContext | null = null;
export function authSoundsEnabled() { return localStorage.getItem(AUTH_SOUND_KEY) === "on"; }
export function playAuthSound(kind: AuthSound, force = false) {
  if (!force && !authSoundsEnabled()) return;
  try {
    context ??= new AudioContext();
    if (context.state === "suspended") void context.resume();
    let offset = 0;
    for (const [frequency, duration, volume] of tones[kind]) {
      const oscillator = context.createOscillator(); const gain = context.createGain(); const start = context.currentTime + offset;
      oscillator.type = "sine"; oscillator.frequency.setValueAtTime(frequency, start); gain.gain.setValueAtTime(.0001, start); gain.gain.exponentialRampToValueAtTime(volume, start + .008); gain.gain.exponentialRampToValueAtTime(.0001, start + duration);
      oscillator.connect(gain); gain.connect(context.destination); oscillator.start(start); oscillator.stop(start + duration + .015); offset += duration * .72;
    }
  } catch { /* Sound is optional and must never block authentication. */ }
}
