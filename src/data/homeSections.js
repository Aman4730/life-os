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
  {
    step: "01",
    icon: Inbox,
    title: "Capture",
    desc: "Put the things that matter into one place.",
    detail: "Notes, tasks, links, even a quick voice memo.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Understand",
    desc: "LifeOS connects the context behind your information.",
    detail: "It links the people, dates and projects automatically.",
  },
  {
    step: "03",
    icon: Zap,
    title: "Act",
    desc: "Turn that context into better decisions and daily action.",
    detail: "Get timely nudges and a clear plan for your day.",
  },
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
  {
    icon: Sunrise,
    tint: "orange",
    clock: "7:00 AM",
    time: "Morning",
    title: "Know what matters today.",
    detail: "Your Daily Brief lands before the first email.",
  },
  {
    icon: Sun,
    tint: "blue",
    clock: "1:30 PM",
    time: "At work",
    title: "Keep your priorities clear.",
    detail: "Meeting notes and next steps, captured for you.",
  },
  {
    icon: Sunset,
    tint: "purple",
    clock: "7:00 PM",
    time: "Evening",
    title: "Reflect, plan and reset.",
    detail: "A gentle recap, with tomorrow set up in advance.",
  },
  {
    icon: Coffee,
    tint: "green",
    clock: "Weekend",
    time: "Downtime",
    title: "Make room for what matters.",
    detail: "Less admin to handle, more of your actual life.",
  },
];
