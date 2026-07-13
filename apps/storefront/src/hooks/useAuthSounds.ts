import { useState } from "react";
import { AUTH_SOUND_KEY, authSoundsEnabled, playAuthSound } from "../utils/auth-sounds";

export function useAuthSounds() {
  const [enabled, setEnabled] = useState(authSoundsEnabled);
  const toggle = () => { const next = !enabled; localStorage.setItem(AUTH_SOUND_KEY, next ? "on" : "off"); setEnabled(next); if (next) playAuthSound("toggle", true); };
  return { enabled, toggle };
}
