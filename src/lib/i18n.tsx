import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "en" | "fa";
export type Direction = "ltr" | "rtl";

type Dict = Record<string, string>;

const en: Dict = {
  "brand.name": "Summit",
  "brand.tagline": "Fair access to live moments",
  "nav.discover": "Discover",
  "nav.dashboard": "Dashboard",
  "nav.events": "My Events",
  "nav.orders": "Orders",
  "nav.venues": "Venues",
  "nav.users": "Users",
  "nav.analytics": "Analytics",
  "nav.signIn": "Sign in",
  "nav.signOut": "Sign out",
  "auth.title": "Welcome back",
  "auth.subtitle": "Sign in to book, organize, or manage events.",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.roleHint": "Continue as",
  "auth.role.buyer": "Buyer",
  "auth.role.organizer": "Organizer",
  "auth.role.admin": "Admin",
  "auth.submit": "Continue",
  "auth.register": "Create account",
  "discover.title": "Find your next live moment",
  "discover.subtitle": "Live seat availability, fair queueing, and instant QR tickets.",
  "discover.search": "Search artists, teams, venues…",
  "discover.filters": "Filters",
  "discover.genre": "Genre",
  "discover.date": "Date",
  "discover.location": "Location",
  "discover.availability": "Availability",
  "discover.any": "Any",
  "discover.available": "Available",
  "discover.fewLeft": "Few left",
  "discover.soldOut": "Sold out",
  "discover.trending": "Trending now",
  "discover.thisWeek": "This week",
  "discover.results": "results",
  "discover.viewEvent": "View event",
  "discover.from": "from",
  "empty.title": "No events match your filters",
  "empty.subtitle": "Try clearing filters or broadening your search.",
  "empty.reset": "Reset filters",
  "footer.rights": "All rights reserved.",
};

const fa: Dict = {
  "brand.name": "سامیت",
  "brand.tagline": "دسترسی عادلانه به لحظه‌های زنده",
  "nav.discover": "کشف رویدادها",
  "nav.dashboard": "داشبورد",
  "nav.events": "رویدادهای من",
  "nav.orders": "سفارش‌ها",
  "nav.venues": "سالن‌ها",
  "nav.users": "کاربران",
  "nav.analytics": "تحلیل‌ها",
  "nav.signIn": "ورود",
  "nav.signOut": "خروج",
  "auth.title": "خوش آمدید",
  "auth.subtitle": "برای خرید، برگزاری یا مدیریت رویدادها وارد شوید.",
  "auth.email": "ایمیل",
  "auth.password": "رمز عبور",
  "auth.roleHint": "ادامه به عنوان",
  "auth.role.buyer": "خریدار",
  "auth.role.organizer": "برگزارکننده",
  "auth.role.admin": "مدیر",
  "auth.submit": "ادامه",
  "auth.register": "ساخت حساب",
  "discover.title": "لحظه زنده بعدی خود را پیدا کنید",
  "discover.subtitle": "موجودی صندلی زنده، صف عادلانه و بلیت QR فوری.",
  "discover.search": "جستجوی هنرمند، تیم، سالن…",
  "discover.filters": "فیلترها",
  "discover.genre": "ژانر",
  "discover.date": "تاریخ",
  "discover.location": "مکان",
  "discover.availability": "موجودی",
  "discover.any": "همه",
  "discover.available": "موجود",
  "discover.fewLeft": "تعداد محدود",
  "discover.soldOut": "تمام شد",
  "discover.trending": "پرطرفدار اکنون",
  "discover.thisWeek": "این هفته",
  "discover.results": "نتیجه",
  "discover.viewEvent": "مشاهده رویداد",
  "discover.from": "از",
  "empty.title": "رویدادی با این فیلترها یافت نشد",
  "empty.subtitle": "فیلترها را پاک کنید یا جستجو را گسترده‌تر کنید.",
  "empty.reset": "پاک‌سازی فیلترها",
  "footer.rights": "تمامی حقوق محفوظ است.",
};

const dictionaries: Record<Locale, Dict> = { en, fa };

type I18nContextValue = {
  locale: Locale;
  dir: Direction;
  setLocale: (l: Locale) => void;
  toggle: () => void;
  t: (key: string) => string;
};

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");
  const dir: Direction = locale === "fa" ? "rtl" : "ltr";

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const setLocale = (l: Locale) => setLocaleState(l);
  const toggle = () => setLocaleState((prev) => (prev === "en" ? "fa" : "en"));
  const t = (key: string) => dictionaries[locale][key] ?? key;

  return (
    <I18nContext.Provider value={{ locale, dir, setLocale, toggle, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}