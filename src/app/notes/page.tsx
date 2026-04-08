import type { Metadata } from "next";
import { NotesWorkspace } from "@/components/notes/notes-workspace";

export const metadata: Metadata = {
  title: "Notes",
  description: "A dedicated notes workspace for month and range notes.",
};

export default function NotesPage() {
  return <NotesWorkspace />;
}
