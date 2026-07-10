import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "fa";
export type Direction = "ltr" | "rtl";

type Dict = Record<string, string>;

const en: Dict = {
  // Brand / footer
  "brand.name": "Summit",
  "brand.tagline": "Fair, transparent ticketing for fans and organizers. Live seat availability with no surprises at checkout.",
  "footer.discover": "Discover",
  "footer.account": "Account",
  "footer.browse": "Browse events",
  "footer.myTickets": "My tickets",
  "footer.signIn": "Sign in",
  "footer.forOrganizers": "For organizers",
  "footer.copyright": "© 2026 Summit Ticketing",
  "footer.status": "All systems normal",
  // Nav
  "nav.discover": "Discover",
  "nav.myTickets": "My tickets",
  "nav.dashboard": "Dashboard",
  "nav.admin": "Admin",
  "nav.login": "Log in",
  "nav.signup": "Sign up",
  "nav.logout": "Log out",
  "nav.toggleLang": "Toggle language",
  // Home hero
  "home.eyebrow": "Fair ticketing, in real time",
  "home.title": "Every seat, live. Every ticket, guaranteed.",
  "home.subtitle": "Summit shows you exactly which seats are open the moment they open. Pick your seat, hold it for ten minutes, and check out without racing anyone.",
  "home.cta.find": "Find your event",
  "home.cta.organizers": "For organizers",
  "home.featured": "Featured",
  "home.sellingFast": "Selling fast",
  "home.trust.hold.title": "10-minute seat hold",
  "home.trust.hold.body": "Your seat is locked the moment you select it. No one can take it while you pay.",
  "home.trust.secure.title": "Secure checkout",
  "home.trust.secure.body": "Payments are processed securely and tickets are issued instantly with a unique QR code.",
  "home.trust.queue.title": "Fair queue on big drops",
  "home.trust.queue.body": "When demand spikes, our virtual waiting room keeps things orderly and transparent.",
  // Event browser
  "browse.title": "Browse events",
  "browse.subtitle": "Live availability, transparent pricing, no surprises at checkout.",
  "browse.search": "Search events, venues, or cities",
  "browse.allCities": "All cities",
  "browse.filterCity": "Filter by city",
  "browse.filterCategory": "Filter by category",
  "browse.all": "All",
  "browse.empty.title": "No events found",
  "browse.empty.subtitle": "Try a different search or clear the filters.",
  // Category names
  "cat.Concert": "Concert",
  "cat.Conference": "Conference",
  "cat.Theater": "Theater",
  "cat.Sports": "Sports",
  "cat.Jazz": "Jazz",
  "cat.Comedy": "Comedy",
  // Availability
  "avail.high": "Available",
  "avail.limited": "Limited seats",
  "avail.selling-fast": "Selling fast",
  // Event detail
  "event.back": "Back to events",
  "event.ticketsFrom": "Tickets from",
  "event.chooseSeat": "Choose your seat",
  "event.holdNotice": "Seats are held for 10 minutes once selected.",
  "event.about": "About this event",
  "event.related": "You might also like",
  "event.notFound.title": "Event not found",
  "event.notFound.body": "This event may have been removed or the link is incorrect.",
  "event.notFound.cta": "Back to events",
  // Buyer
  "buyer.title": "My tickets",
  "buyer.subtitle": "Upcoming events, order history, and QR tickets ready to scan.",
  "buyer.paid": "Paid",
  "buyer.viewTicket": "View ticket",
  // Organizer
  "org.title": "Organizer dashboard",
  "org.subtitle": "Northern Lights Tour · Mist Arena · Aug 14, 2026",
  "org.live": "Live — updating in real time",
  "org.stat.sold": "Tickets sold",
  "org.stat.sold.delta": "+18.2% this week",
  "org.stat.revenue": "Gross revenue",
  "org.stat.revenue.delta": "+12.4% this week",
  "org.stat.rate": "Sell-through rate",
  "org.stat.rate.delta": "Front sector at 93%",
  "org.stat.remaining": "Seats remaining",
  "org.stat.remaining.delta": "Across 4 sectors",
  "org.orders.title": "Recent orders",
  "org.orders.subtitle": "Live order stream. Expired holds release seats back automatically.",
  "org.col.order": "Order",
  "org.col.buyer": "Buyer",
  "org.col.seats": "Seats",
  "org.col.total": "Total",
  "org.col.status": "Status",
  "org.col.time": "Time",
  "status.Paid": "Paid",
  "status.Pending": "Pending",
  "status.Expired": "Expired",
  // Admin
  "admin.title": "Venues",
  "admin.subtitle": "Define physical dimensions, create sectors, and map exact seat coordinates.",
  "admin.col.venue": "Venue",
  "admin.col.city": "City",
  "admin.col.sectors": "Sectors",
  "admin.col.capacity": "Capacity",
  "admin.col.events": "Events",
  "admin.col.status": "Status",
  "vstatus.Active": "Active",
  "vstatus.Draft": "Draft",
  // Auth
  "auth.title": "Welcome back",
  "auth.subtitle": "Sign in to book, organize, or manage events.",
  "auth.email": "Email",
  "auth.password": "Password",
  "auth.continueAs": "Continue as",
  "auth.submit": "Continue",
  "auth.emailPlaceholder": "you@summit.dev",
  "role.buyer": "Buyer",
  "role.organizer": "Organizer",
  "role.admin": "Admin",
  // Role gate
  "gate.title": "Access restricted",
  "gate.body": "This area is limited to selected roles.",
  "gate.currentAs": "You are signed in as",
  "gate.back": "Back to Discover",
  "gate.signin": "Sign in",
  // Seats
  "seats.title": "Choose your seat",
  "seats.subtitle": "Green seats are open. Amber are held by other fans. Grey are already booked.",
  "seats.legend.available": "Available",
  "seats.legend.selected": "Your selection",
  "seats.legend.locked": "Held by others",
  "seats.legend.booked": "Booked",
  "seats.stage": "Stage",
  "seats.sector": "Sector",
  "seats.row": "Row",
  "seats.seat": "Seat",
  "seats.holdTimer": "Hold expires in",
  "seats.subtotal": "Subtotal",
  "seats.checkout": "Continue to checkout",
  "seats.emptyHint": "Select one or more open seats to continue.",
  "seats.selected": "Selected seats",
  "seats.releasedTitle": "Your hold expired",
  "seats.releasedBody": "Seats were returned to availability. Please choose again.",
  "seats.min": "min",
  "seats.sec": "sec",
  // Checkout
  "checkout.title": "Order confirmed",
  "checkout.subtitle": "Your tickets are ready. A copy has been sent to your email.",
  "checkout.seats": "Seats",
  "checkout.total": "Total paid",
  "checkout.viewTickets": "View my tickets",
  "checkout.browseMore": "Browse more events",
};

const fa: Dict = {
  "brand.name": "سامیت",
  "brand.tagline": "بلیت‌فروشی منصفانه و شفاف برای هواداران و برگزارکنندگان. موجودی صندلی به‌صورت زنده و بدون سورپرایز در پرداخت.",
  "footer.discover": "کشف",
  "footer.account": "حساب کاربری",
  "footer.browse": "مرور رویدادها",
  "footer.myTickets": "بلیت‌های من",
  "footer.signIn": "ورود",
  "footer.forOrganizers": "برای برگزارکنندگان",
  "footer.copyright": "© ۲۰۲۶ سامیت",
  "footer.status": "همه سرویس‌ها فعال",
  "nav.discover": "کشف",
  "nav.myTickets": "بلیت‌های من",
  "nav.dashboard": "داشبورد",
  "nav.admin": "مدیریت",
  "nav.login": "ورود",
  "nav.signup": "ثبت‌نام",
  "nav.logout": "خروج",
  "nav.toggleLang": "تغییر زبان",
  "home.eyebrow": "بلیت‌فروشی منصفانه، در لحظه",
  "home.title": "هر صندلی، زنده. هر بلیت، تضمینی.",
  "home.subtitle": "سامیت دقیقاً همان لحظه‌ای که صندلی‌ها آزاد می‌شوند، آن‌ها را به شما نشان می‌دهد. صندلی خود را انتخاب کنید، ده دقیقه نگه دارید و بدون رقابت پرداخت کنید.",
  "home.cta.find": "رویداد خود را پیدا کنید",
  "home.cta.organizers": "برای برگزارکنندگان",
  "home.featured": "پیشنهاد ویژه",
  "home.sellingFast": "فروش سریع",
  "home.trust.hold.title": "نگهداری ۱۰ دقیقه‌ای صندلی",
  "home.trust.hold.body": "به‌محض انتخاب، صندلی شما قفل می‌شود. تا زمان پرداخت، هیچ‌کس نمی‌تواند آن را بگیرد.",
  "home.trust.secure.title": "پرداخت امن",
  "home.trust.secure.body": "پرداخت به‌صورت امن پردازش شده و بلیت با کد QR فوراً صادر می‌شود.",
  "home.trust.queue.title": "صف عادلانه در فروش‌های پرتقاضا",
  "home.trust.queue.body": "هنگام اوج تقاضا، اتاق انتظار مجازی نظم و شفافیت را حفظ می‌کند.",
  "browse.title": "مرور رویدادها",
  "browse.subtitle": "موجودی زنده، قیمت‌گذاری شفاف، بدون سورپرایز در پرداخت.",
  "browse.search": "جستجوی رویداد، سالن یا شهر",
  "browse.allCities": "همه شهرها",
  "browse.filterCity": "فیلتر بر اساس شهر",
  "browse.filterCategory": "فیلتر بر اساس دسته",
  "browse.all": "همه",
  "browse.empty.title": "رویدادی یافت نشد",
  "browse.empty.subtitle": "جستجوی دیگری امتحان کنید یا فیلترها را پاک کنید.",
  "cat.Concert": "کنسرت",
  "cat.Conference": "همایش",
  "cat.Theater": "تئاتر",
  "cat.Sports": "ورزشی",
  "cat.Jazz": "جاز",
  "cat.Comedy": "کمدی",
  "avail.high": "موجود",
  "avail.limited": "ظرفیت محدود",
  "avail.selling-fast": "فروش سریع",
  "event.back": "بازگشت به رویدادها",
  "event.ticketsFrom": "بلیت از",
  "event.chooseSeat": "انتخاب صندلی",
  "event.holdNotice": "صندلی‌ها پس از انتخاب، ۱۰ دقیقه برای شما نگه‌ داشته می‌شوند.",
  "event.about": "درباره این رویداد",
  "event.related": "شاید این‌ها را هم دوست داشته باشید",
  "event.notFound.title": "رویداد پیدا نشد",
  "event.notFound.body": "این رویداد ممکن است حذف شده باشد یا لینک نادرست است.",
  "event.notFound.cta": "بازگشت به رویدادها",
  "buyer.title": "بلیت‌های من",
  "buyer.subtitle": "رویدادهای پیشِ‌رو، تاریخچه سفارش‌ها و بلیت‌های QR آماده اسکن.",
  "buyer.paid": "پرداخت‌شده",
  "buyer.viewTicket": "مشاهده بلیت",
  "org.title": "داشبورد برگزارکننده",
  "org.subtitle": "تور شفق شمالی · سالن میست · ۱۴ آگوست ۲۰۲۶",
  "org.live": "زنده — به‌روزرسانی لحظه‌ای",
  "org.stat.sold": "بلیت‌های فروخته‌شده",
  "org.stat.sold.delta": "+۱۸٫۲٪ این هفته",
  "org.stat.revenue": "درآمد ناخالص",
  "org.stat.revenue.delta": "+۱۲٫۴٪ این هفته",
  "org.stat.rate": "نرخ فروش",
  "org.stat.rate.delta": "بخش جلو ۹۳٪",
  "org.stat.remaining": "صندلی باقی‌مانده",
  "org.stat.remaining.delta": "در ۴ بخش",
  "org.orders.title": "سفارش‌های اخیر",
  "org.orders.subtitle": "جریان سفارش زنده. رزروهای منقضی به‌طور خودکار آزاد می‌شوند.",
  "org.col.order": "سفارش",
  "org.col.buyer": "خریدار",
  "org.col.seats": "صندلی‌ها",
  "org.col.total": "مبلغ",
  "org.col.status": "وضعیت",
  "org.col.time": "زمان",
  "status.Paid": "پرداخت‌شده",
  "status.Pending": "در انتظار",
  "status.Expired": "منقضی",
  "admin.title": "سالن‌ها",
  "admin.subtitle": "ابعاد فیزیکی را تعریف کنید، بخش‌ها را بسازید و مختصات دقیق صندلی‌ها را نگاشت کنید.",
  "admin.col.venue": "سالن",
  "admin.col.city": "شهر",
  "admin.col.sectors": "بخش‌ها",
  "admin.col.capacity": "ظرفیت",
  "admin.col.events": "رویدادها",
  "admin.col.status": "وضعیت",
  "vstatus.Active": "فعال",
  "vstatus.Draft": "پیش‌نویس",
  "auth.title": "خوش آمدید",
  "auth.subtitle": "برای خرید، برگزاری یا مدیریت رویدادها وارد شوید.",
  "auth.email": "ایمیل",
  "auth.password": "رمز عبور",
  "auth.continueAs": "ادامه به‌عنوان",
  "auth.submit": "ادامه",
  "auth.emailPlaceholder": "you@summit.dev",
  "role.buyer": "خریدار",
  "role.organizer": "برگزارکننده",
  "role.admin": "مدیر",
  "gate.title": "دسترسی محدود",
  "gate.body": "این بخش فقط برای نقش‌های خاص در دسترس است.",
  "gate.currentAs": "شما وارد شده‌اید به‌عنوان",
  "gate.back": "بازگشت به کشف",
  "gate.signin": "ورود",
  "seats.title": "صندلی خود را انتخاب کنید",
  "seats.subtitle": "صندلی‌های سبز آزادند. کهربایی توسط دیگران نگه داشته شده. خاکستری قبلاً رزرو شده است.",
  "seats.legend.available": "آزاد",
  "seats.legend.selected": "انتخاب شما",
  "seats.legend.locked": "نگه‌ داشته توسط دیگران",
  "seats.legend.booked": "رزرو شده",
  "seats.stage": "صحنه",
  "seats.sector": "بخش",
  "seats.row": "ردیف",
  "seats.seat": "صندلی",
  "seats.holdTimer": "زمان باقی‌مانده رزرو",
  "seats.subtotal": "جمع",
  "seats.checkout": "ادامه به پرداخت",
  "seats.emptyHint": "برای ادامه، یک یا چند صندلی آزاد را انتخاب کنید.",
  "seats.selected": "صندلی‌های انتخاب‌شده",
  "seats.releasedTitle": "زمان رزرو شما به پایان رسید",
  "seats.releasedBody": "صندلی‌ها به لیست موجودی بازگشتند. لطفاً دوباره انتخاب کنید.",
  "seats.min": "دقیقه",
  "seats.sec": "ثانیه",
  "checkout.title": "سفارش شما ثبت شد",
  "checkout.subtitle": "بلیت‌های شما آماده است. یک نسخه به ایمیل شما ارسال شد.",
  "checkout.seats": "صندلی‌ها",
  "checkout.total": "مبلغ پرداختی",
  "checkout.viewTickets": "مشاهده بلیت‌های من",
  "checkout.browseMore": "مرور رویدادهای بیشتر",
};

const dictionaries: Record<Locale, Dict> = { en, fa };

const STORAGE_KEY = "summit.locale";

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

  // Read persisted locale post-hydration to avoid SSR mismatch.
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved === "en" || saved === "fa") setLocaleState(saved);
    } catch {}
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
    document.documentElement.style.fontFamily =
      locale === "fa"
        ? "'Vazirmatn', ui-sans-serif, system-ui, sans-serif"
        : "'Inter', ui-sans-serif, system-ui, sans-serif";
    try { window.localStorage.setItem(STORAGE_KEY, locale); } catch {}
  }, [locale, dir]);

  const value = useMemo<I18nContextValue>(() => ({
    locale,
    dir,
    setLocale: setLocaleState,
    toggle: () => setLocaleState((p) => (p === "en" ? "fa" : "en")),
    t: (key) => dictionaries[locale][key] ?? dictionaries.en[key] ?? key,
  }), [locale, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
