export type EventAvailability = "available" | "few" | "sold_out";

export type EventItem = {
  id: string;
  title: { en: string; fa: string };
  artist: { en: string; fa: string };
  venue: { en: string; fa: string };
  city: { en: string; fa: string };
  date: string; // ISO
  genre: "concert" | "sports" | "theater" | "festival" | "comedy";
  priceFrom: number;
  currency: "USD" | "IRR";
  availability: EventAvailability;
  trending?: boolean;
  image: string; // gradient class token
};

// Static seed for the discovery screen. Real data will come from the
// Event Catalog domain per the PRD.
export const MOCK_EVENTS: EventItem[] = [
  {
    id: "evt-001",
    title: { en: "Nocturne — World Tour", fa: "نوکتورن — تور جهانی" },
    artist: { en: "Aria Vespers", fa: "آریا وسپرس" },
    venue: { en: "Milad Amphitheatre", fa: "آمفی‌تئاتر میلاد" },
    city: { en: "Tehran", fa: "تهران" },
    date: "2026-07-24T20:00:00Z",
    genre: "concert",
    priceFrom: 45,
    currency: "USD",
    availability: "few",
    trending: true,
    image: "from-[oklch(0.35_0.18_285)] to-[oklch(0.55_0.20_45)]",
  },
  {
    id: "evt-002",
    title: { en: "El Clásico — Cup Final", fa: "ال‌کلاسیکو — فینال جام" },
    artist: { en: "Real vs Barça", fa: "رئال مقابل بارسا" },
    venue: { en: "Azadi Stadium", fa: "ورزشگاه آزادی" },
    city: { en: "Tehran", fa: "تهران" },
    date: "2026-07-19T17:30:00Z",
    genre: "sports",
    priceFrom: 30,
    currency: "USD",
    availability: "available",
    trending: true,
    image: "from-[oklch(0.30_0.15_155)] to-[oklch(0.55_0.18_78)]",
  },
  {
    id: "evt-003",
    title: { en: "Hamlet — Reimagined", fa: "هملت — بازآفرینی" },
    artist: { en: "Royal Ensemble", fa: "گروه رویال" },
    venue: { en: "Vahdat Hall", fa: "تالار وحدت" },
    city: { en: "Tehran", fa: "تهران" },
    date: "2026-08-02T19:00:00Z",
    genre: "theater",
    priceFrom: 22,
    currency: "USD",
    availability: "available",
    image: "from-[oklch(0.28_0.10_25)] to-[oklch(0.42_0.15_310)]",
  },
  {
    id: "evt-004",
    title: { en: "Sunburn Festival", fa: "فستیوال سان‌برن" },
    artist: { en: "40+ artists", fa: "بیش از ۴۰ هنرمند" },
    venue: { en: "Kish Open Grounds", fa: "زمین باز کیش" },
    city: { en: "Kish", fa: "کیش" },
    date: "2026-08-15T16:00:00Z",
    genre: "festival",
    priceFrom: 89,
    currency: "USD",
    availability: "few",
    trending: true,
    image: "from-[oklch(0.40_0.20_45)] to-[oklch(0.30_0.15_320)]",
  },
  {
    id: "evt-005",
    title: { en: "Late Night Laughs", fa: "خنده‌های نیمه‌شب" },
    artist: { en: "Sam Delgado", fa: "سام دلگادو" },
    venue: { en: "Iranshahr Theatre", fa: "تئاتر ایرانشهر" },
    city: { en: "Tehran", fa: "تهران" },
    date: "2026-07-11T21:00:00Z",
    genre: "comedy",
    priceFrom: 18,
    currency: "USD",
    availability: "sold_out",
    image: "from-[oklch(0.25_0.05_265)] to-[oklch(0.45_0.15_78)]",
  },
  {
    id: "evt-006",
    title: { en: "Symphonic Nights", fa: "شب‌های سمفونیک" },
    artist: { en: "Tehran Philharmonic", fa: "فیلارمونیک تهران" },
    venue: { en: "Roudaki Hall", fa: "تالار رودکی" },
    city: { en: "Tehran", fa: "تهران" },
    date: "2026-09-06T20:00:00Z",
    genre: "concert",
    priceFrom: 35,
    currency: "USD",
    availability: "available",
    image: "from-[oklch(0.28_0.12_240)] to-[oklch(0.50_0.15_200)]",
  },
];