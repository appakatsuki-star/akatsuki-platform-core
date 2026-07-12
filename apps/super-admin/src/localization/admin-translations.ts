export type AdminLocale="ar"|"en";
export type LocalizedText={ar:string;en:string};
export const text=(ar:string,en:string):LocalizedText=>({ar,en});
export const pick=(value:LocalizedText,locale:AdminLocale)=>value[locale];

export const ui={
  platform:text("منصة أكاتسكي","Akatsuki Platform"),admin:text("إدارة المنصة","Platform management"),
  welcome:text("مرحباً بعودتك","Welcome back"),operations:text("مركز عمليات Akatsuki Platform","Akatsuki Platform Operations"),summary:text("ملخص سريع لحالة العمل الحالية.","A concise overview of current operations."),
  recent:text("النشاط الأخير","Recent activity"),updates:text("تحديثات المنصة","Platform updates"),viewAll:text("عرض الكل","View all"),shortcuts:text("اختصارات","Shortcuts"),quickActions:text("إجراءات سريعة","Quick actions"),
  search:text("ابحث في المنصة...","Search the platform..."),noResults:text("لا توجد نتائج تجريبية","No mock results"),createAccount:text("＋ إنشاء حساب","＋ Create Account"),
  notifications:text("الإشعارات","Notifications"),newNotifications:text("4 جديدة","4 new"),allNotifications:text("عرض جميع الإشعارات","View all notifications"),
  profile:text("الملف الشخصي","Profile"),accountSettings:text("إعدادات الحساب","Account Settings"),lockSession:text("قفل الجلسة","Lock Session"),logout:text("تسجيل الخروج","Logout"),
  openMenu:text("فتح قائمة التنقل","Open navigation"),closeMenu:text("إغلاق قائمة التنقل","Close navigation"),collapse:text("طي القائمة","Collapse sidebar"),expand:text("توسيع القائمة","Expand sidebar"),
  switchLight:text("التبديل إلى الوضع الفاتح","Switch to light theme"),switchDark:text("التبديل إلى الوضع الداكن","Switch to dark theme"),switchArabic:text("التبديل إلى العربية","Switch to Arabic"),switchEnglish:text("التبديل إلى الإنجليزية","Switch to English"),
  development:text("قيد التطوير","In development"),returnDashboard:text("العودة إلى لوحة التحكم","Return to dashboard"),environment:text("بيئة الإدارة","Admin environment"),internal:text("واجهة داخلية","Internal interface"),
};
