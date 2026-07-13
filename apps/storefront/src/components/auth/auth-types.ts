export type AuthMode = "login" | "register" | "forgot";
export type AuthStep = "splash" | "login" | "register" | "choose-verification" | "verify" | "success";
export type VerificationChannel = "email" | "whatsapp";
export type AuthStatus = "idle" | "typing" | "loading" | "success" | "error";
export type OtpMotionPhase = "idle" | "typing" | "verifying" | "accepted" | "syncing" | "merging" | "verified" | "rejected" | "fragmenting" | "collapsing" | "resetting" | "locked";
export type AuthFields = { name: string; username: string; phone: string; email: string; country: string; currency: string; password: string; confirmPassword: string; remember: boolean; terms: boolean };
export type AuthErrors = Partial<Record<keyof AuthFields, string>>;
export type AuthFlowContext = { flow: "login" | "register" | "reset"; email: string; phone: string; channel?: VerificationChannel };
