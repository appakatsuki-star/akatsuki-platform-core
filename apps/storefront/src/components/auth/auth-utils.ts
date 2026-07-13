import type { AuthFlowContext } from "./auth-types";

export const AUTH_FLOW_KEY = "platform-auth-flow";
export const CORRECT_OTP = "1234";
export const OTP_LENGTH = 4;
export const RESEND_SECONDS = 30;
export const MAX_RESENDS = 3;

export function saveAuthFlow(context: AuthFlowContext) { sessionStorage.setItem(AUTH_FLOW_KEY, JSON.stringify(context)); }
export function readAuthFlow(): AuthFlowContext | null { try { const value = sessionStorage.getItem(AUTH_FLOW_KEY); return value ? JSON.parse(value) as AuthFlowContext : null; } catch { return null; } }
export function clearAuthFlow() { sessionStorage.removeItem(AUTH_FLOW_KEY); }
export function maskEmail(value: string) { const [name, domain] = value.split("@"); if (!domain) return "m***@example.com"; return `${name.slice(0,1) || "m"}***@${domain}`; }
export function maskPhone(value: string) { const digits = value.replace(/\s/g, ""); if (!digits) return "+961 ** *** 000"; return `${digits.slice(0,4)} ** *** ${digits.slice(-3)}`; }
