export type EventCategory = "Concert" | "Conference" | "Theater" | "Sports" | "Jazz" | "Comedy";
export type Availability = "high" | "limited" | "selling-fast";

export interface EventItem {
  id: string;
  title: string;
  category: EventCategory;
  date: string;
  time: string;
  venue: string;
  city: string;
  image: string;
  priceFrom: number;
  availability: Availability;
  featured?: boolean;
  description: string;
}

export const events: EventItem[] = [
  { id: "northern-lights-tour", title: "Northern Lights Tour", category: "Concert", date: "Aug 14, 2026", time: "20:00", venue: "Mist Arena", city: "Seattle", image: "/images/event-concert.png", priceFrom: 65, availability: "selling-fast", featured: true, description: "An immersive live performance under a canopy of light. The Northern Lights Tour brings a full production of sound and atmosphere to Mist Arena for one night only." },
  { id: "systems-summit", title: "Systems Summit 2026", category: "Conference", date: "Sep 02, 2026", time: "09:00", venue: "Cascade Convention Center", city: "Portland", image: "/images/event-conference.png", priceFrom: 240, availability: "high", description: "Two days of talks on distributed systems, resilience engineering, and platform architecture from the teams running the largest systems in production." },
  { id: "the-glass-hour", title: "The Glass Hour", category: "Theater", date: "Aug 22, 2026", time: "19:30", venue: "Meridian Playhouse", city: "Seattle", image: "/images/event-theater.png", priceFrom: 48, availability: "limited", description: "A quietly devastating new play about memory and distance, staged in the round at the historic Meridian Playhouse. Limited six-week engagement." },
  { id: "cascadia-derby", title: "Cascadia Derby Final", category: "Sports", date: "Sep 12, 2026", time: "17:00", venue: "Summit Stadium", city: "Vancouver", image: "/images/event-stadium.png", priceFrom: 35, availability: "selling-fast", featured: true, description: "The season comes down to ninety minutes. Two rivals, one trophy, and 54,000 seats. The Cascadia Derby Final returns to Summit Stadium." },
  { id: "blue-note-sessions", title: "Blue Note Sessions", category: "Jazz", date: "Aug 29, 2026", time: "21:00", venue: "The Foghorn Room", city: "Portland", image: "/images/event-jazz.png", priceFrom: 30, availability: "high", description: "An intimate evening of standards and new arrangements from the Pacific Northwest quartet, recorded live for the Blue Note Sessions archive." },
  { id: "dry-humor-live", title: "Dry Humor, Live", category: "Comedy", date: "Sep 05, 2026", time: "20:30", venue: "Meridian Playhouse", city: "Seattle", image: "/images/event-comedy.png", priceFrom: 28, availability: "limited", description: "One microphone, one hour, zero mercy. A headline set from the sharpest deadpan in the circuit, with two opening acts." },
];

export const categories: EventCategory[] = ["Concert", "Conference", "Theater", "Sports", "Jazz", "Comedy"];
export const cities = ["Seattle", "Portland", "Vancouver"];
export function getEvent(id: string) { return events.find((e) => e.id === id); }

export const recentOrders = [
  { id: "ORD-8841", buyer: "M. Chen", seats: "C4, C5", total: 240, status: "Paid", time: "2 min ago" },
  { id: "ORD-8840", buyer: "A. Rivera", seats: "F10", total: 85, status: "Paid", time: "5 min ago" },
  { id: "ORD-8839", buyer: "J. Okafor", seats: "A1, A2, A3", total: 360, status: "Pending", time: "7 min ago" },
  { id: "ORD-8838", buyer: "S. Novak", seats: "H7, H8", total: 130, status: "Paid", time: "12 min ago" },
  { id: "ORD-8837", buyer: "K. Tanaka", seats: "D12", total: 85, status: "Expired", time: "18 min ago" },
];

export const venues = [
  { id: "v1", name: "Mist Arena", city: "Seattle", sectors: 4, capacity: 1228, events: 12, status: "Active" },
  { id: "v2", name: "Cascade Convention Center", city: "Portland", sectors: 6, capacity: 3400, events: 8, status: "Active" },
  { id: "v3", name: "Meridian Playhouse", city: "Seattle", sectors: 3, capacity: 620, events: 21, status: "Active" },
  { id: "v4", name: "Summit Stadium", city: "Vancouver", sectors: 12, capacity: 54000, events: 5, status: "Active" },
  { id: "v5", name: "The Foghorn Room", city: "Portland", sectors: 2, capacity: 180, events: 34, status: "Draft" },
];
