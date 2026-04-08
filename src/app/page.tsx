import type { Metadata } from "next";
import { CalendarExperience } from "@/components/calendar/calendar-experience";

export const metadata: Metadata = {
  title: "Interactive Wall Calendar",
  description: "A responsive wall calendar with date range selection and persistent notes.",
};

export default function Home() {
  return <CalendarExperience />;
}
