import {
  Bot,
  Layers,
  ListChecks,
  CalendarDays,
  HeartPulse,
  Target,
  Wallet,
  Briefcase,
  Home,
  Compass,
  BookOpen,
  Users,
  Inbox,
  Sparkles,
  Zap,
  Lightbulb,
  Bookmark,
  MapPin,
  CalendarCheck,
  Sunrise,
  Sun,
  Sunset,
  Coffee,
} from "lucide-react";

/* "One system. Your whole life." — connected life areas around the hub. */
export const systemNodes = [
  { icon: Bot, label: "AI", tint: "blue" },
  { icon: Layers, label: "Memory", tint: "green" },
  { icon: ListChecks, label: "Tasks", tint: "purple" },
  { icon: CalendarDays, label: "Calendar", tint: "blue" },
  { icon: HeartPulse, label: "Wellness", tint: "red" },
  { icon: Target, label: "Goals", tint: "orange" },
  { icon: Wallet, label: "Finance", tint: "green" },
];

/* "Built around your life." */
export const lifeAreas = [
  { icon: Briefcase, tint: "blue", title: "Work", desc: "Keep projects, meetings and priorities organized." },
  { icon: Home, tint: "green", title: "Personal", desc: "Keep the details of everyday life in one place." },
  { icon: Compass, tint: "purple", title: "Planning", desc: "Turn ideas into clear next steps." },
  { icon: HeartPulse, tint: "red", title: "Wellness", desc: "Build routines that actually fit your life." },
  { icon: BookOpen, tint: "orange", title: "Learning", desc: "Capture what you learn and make it useful later." },
  { icon: Target, tint: "blue", title: "Goals", desc: "Keep long-term goals visible while you focus on today." },
  { icon: Users, tint: "green", title: "Relationships", desc: "Remember the people and moments that matter." },
  { icon: Wallet, tint: "purple", title: "Money", desc: "Stay aware of where your time and money are going." },
];

/* "How LifeOS works." */
export const workSteps = [
  { step: "01", icon: Inbox, title: "Capture", desc: "Put the things that matter into one place." },
  { step: "02", icon: Sparkles, title: "Understand", desc: "LifeOS connects the context behind your information." },
  { step: "03", icon: Zap, title: "Act", desc: "Turn that context into better decisions and daily action." },
];

/* "A life that remembers." */
export const memoryItems = [
  { icon: Users, tint: "blue", title: "People you know", example: "Birthdays, preferences, last conversations" },
  { icon: Lightbulb, tint: "orange", title: "Ideas you've captured", example: "Sparks worth revisiting later" },
  { icon: Bookmark, tint: "purple", title: "Things to remember", example: "Passwords, details, little notes" },
  { icon: Target, tint: "green", title: "Goals you're working toward", example: "Progress you don't want to lose" },
  { icon: MapPin, tint: "red", title: "Places you've been", example: "Trips, spots and recommendations" },
  { icon: CalendarCheck, tint: "blue", title: "Plans you've made", example: "Commitments and what comes next" },
];

/* "Made for real life." — a day with LifeOS. */
export const dayMoments = [
  { icon: Sunrise, tint: "orange", time: "Monday Morning", title: "Know what matters today." },
  { icon: Sun, tint: "blue", time: "During Work", title: "Keep your priorities clear." },
  { icon: Sunset, tint: "purple", time: "Evening", title: "Reflect, plan and reset." },
  { icon: Coffee, tint: "green", time: "Weekend", title: "Make room for what matters." },
];
