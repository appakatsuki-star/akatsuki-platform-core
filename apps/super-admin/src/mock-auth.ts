// Preview-only credentials. Never reuse this module for production authentication.
export const MOCK_EMAIL = "admin@akatsuki.com";
export const MOCK_PASSWORD = "Akatsuki123!";
export const MOCK_OTP = "246810";
export const MOCK_SESSION_KEY = "akatsuki-super-admin-preview-authenticated";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function verifyMockCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === MOCK_EMAIL && password === MOCK_PASSWORD;
}
