import type { Locale } from "../types/storefront";

const messages = {
  en: { home: "Home", categories: "Categories", orders: "Orders", wallet: "Wallet", profile: "Profile", search: "Search", favorites: "Favorites", offers: "Offers", support: "Support", notifications: "Notifications", login: "Sign in", logout: "Sign out", viewAll: "View all", available: "Available", unavailable: "Unavailable", automatic: "Automatic", manual: "Manual", addFunds: "Add funds", open: "Open", back: "Back", continue: "Continue", save: "Save", cancel: "Cancel", loading: "Loading…", empty: "Nothing to show yet", account: "Account", settings: "Settings" },
  ar: { home: "الرئيسية", categories: "الأقسام", orders: "الطلبات", wallet: "المحفظة", profile: "حسابي", search: "البحث", favorites: "المفضلة", offers: "العروض", support: "الدعم", notifications: "الإشعارات", login: "تسجيل الدخول", logout: "تسجيل الخروج", viewAll: "عرض الكل", available: "متاح", unavailable: "غير متاح", automatic: "تلقائي", manual: "يدوي", addFunds: "إضافة رصيد", open: "فتح", back: "رجوع", continue: "متابعة", save: "حفظ", cancel: "إلغاء", loading: "جارٍ التحميل…", empty: "لا يوجد محتوى بعد", account: "الحساب", settings: "الإعدادات" }
} as const;

export type MessageKey = keyof typeof messages.en;
export const t = (locale: Locale, key: MessageKey) => messages[locale][key];
export const money = (value: number, locale: Locale) => new Intl.NumberFormat(locale === "ar" ? "en-US" : "en-US", { style: "currency", currency: "USD" }).format(value);
export const date = (value: string, locale: Locale) => new Intl.DateTimeFormat(locale === "ar" ? "ar-LB-u-nu-latn" : "en-US", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
