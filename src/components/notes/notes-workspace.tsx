"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/calendar/icons";
import {
  readCalendarClientState,
  readCalendarServerState,
  persistCalendarMonth,
  writeNotesState,
} from "@/components/calendar/storage";
import { addMonths, formatMonthKey, formatRangeKey } from "@/utils/date-utils";
import type { NotesState } from "@/utils/types";

export function NotesWorkspace() {
  const [initialState] = useState(readCalendarServerState);
  const [currentMonth, setCurrentMonth] = useState(initialState.currentMonth);
  const [selectedStartDate, setSelectedStartDate] = useState(initialState.selectedStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState(initialState.selectedEndDate);
  const [notes, setNotes] = useState<NotesState>(initialState.notes);
  const [isHydrated, setIsHydrated] = useState(initialState.isHydrated);

  useEffect(() => {
    const clientState = readCalendarClientState();

    startTransition(() => {
      setCurrentMonth(clientState.currentMonth);
      setSelectedStartDate(clientState.selectedStartDate);
      setSelectedEndDate(clientState.selectedEndDate);
      setNotes(clientState.notes);
      setIsHydrated(clientState.isHydrated);
    });
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    persistCalendarMonth(currentMonth);
  }, [currentMonth, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    writeNotesState(notes);
  }, [isHydrated, notes]);

  const monthYearFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }),
    [],
  );
  const rangeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }),
    [],
  );

  const monthLabel = monthYearFormatter.format(currentMonth);
  const monthNoteKey = formatMonthKey(currentMonth);
  const rangeNoteKey =
    selectedStartDate && selectedEndDate ? formatRangeKey(selectedStartDate, selectedEndDate) : null;
  const rangeLabel =
    selectedStartDate && selectedEndDate
      ? `${rangeFormatter.format(selectedStartDate)} - ${rangeFormatter.format(selectedEndDate)}`
      : null;

  const monthNote = notes.monthNotes[monthNoteKey] ?? "";
  const rangeNote = rangeNoteKey ? notes.rangeNotes[rangeNoteKey] ?? "" : "";

  function updateMonthNote(value: string) {
    setNotes((currentNotes) => ({
      ...currentNotes,
      monthNotes: {
        ...currentNotes.monthNotes,
        [monthNoteKey]: value,
      },
    }));
  }

  function updateRangeNote(value: string) {
    if (!rangeNoteKey) {
      return;
    }

    setNotes((currentNotes) => ({
      ...currentNotes,
      rangeNotes: {
        ...currentNotes.rangeNotes,
        [rangeNoteKey]: value,
      },
    }));
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-[calc(100vh-3.5rem)] overflow-hidden bg-[#fcfbf7] px-4 py-4 sm:px-5 lg:px-7"
    >
      <div className="mx-auto flex h-full max-w-5xl flex-col">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[#8a9589]">Notes Workspace</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.28 }} className="mt-2 font-serif text-[1.8rem] font-semibold tracking-[-0.04em] text-[#22312b]">
              Keep month and range notes in their own space.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.28 }} className="mt-2 max-w-2xl text-sm leading-6 text-[#768276]">
              This page is dedicated to writing and revisiting notes, so the calendar view can stay clean and focused.
            </motion.p>
          </div>

          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.28, ease: "easeOut" }}
            className="flex items-center rounded-[1rem] border border-[#dde3da] bg-[#f3f5ef] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
          >
            <motion.button
              type="button"
              onClick={() => setCurrentMonth((month) => addMonths(month, -1))}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[#617166] transition hover:bg-white hover:text-[#456347]"
              aria-label="Show previous month"
            >
              <ChevronLeftIcon />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[#617166] transition hover:bg-white hover:text-[#456347]"
              aria-label="Show next month"
            >
              <ChevronRightIcon />
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="mt-5 grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.section
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.32, ease: "easeOut" }}
            className="rounded-[1.2rem] border border-[#dde5dc] bg-[#f5f6f1] p-4 shadow-[0_10px_22px_rgba(53,65,50,0.04)]"
          >
            <motion.p layout className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#8a9589]">{monthLabel}</motion.p>
            <textarea
              value={monthNote}
              onChange={(event) => updateMonthNote(event.target.value)}
              placeholder="Capture reminders, planning notes, and editorial thoughts for the visible month."
              className="mt-3 h-[calc(100%-4rem)] min-h-[16rem] w-full resize-none rounded-[1rem] border border-[#dbe2d8] bg-white/75 px-4 py-3 text-base leading-8 text-[#4e5b50] outline-none transition placeholder:text-[#a0a99e] focus:border-[#b9ccb2] focus:bg-white focus:ring-2 focus:ring-[#dbe9d6]"
            />
          </motion.section>

          <section className="flex min-h-0 flex-col gap-4">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.32, ease: "easeOut" }}
              className="rounded-[1.2rem] border border-[#e2e6dd] bg-white p-4 shadow-[0_10px_22px_rgba(53,65,50,0.04)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.22 }} className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8a9589]">Selected Range</motion.p>
                  <motion.h3 layout className="mt-2 font-serif text-xl font-semibold tracking-[-0.04em] text-[#21312f]">
                    {rangeLabel ?? "Choose a start and end date from the calendar page"}
                  </motion.h3>
                </div>
                <motion.span
                  layout
                  whileHover={{ y: -1 }}
                  className={[
                    "rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em]",
                    rangeNoteKey ? "bg-[#edf6e8] text-[#52714e]" : "bg-[#eff1ee] text-[#98a194]",
                  ].join(" ")}
                >
                  {rangeNoteKey ? "Range Ready" : "Awaiting"}
                </motion.span>
              </div>

              <textarea
                value={rangeNote}
                onChange={(event) => updateRangeNote(event.target.value)}
                placeholder="Plan itinerary details, bookings, meeting notes, or milestones for the selected range."
                disabled={!rangeNoteKey}
                className="mt-4 min-h-36 w-full resize-none rounded-[1rem] border border-[#dce2d9] bg-[#fafaf7] px-4 py-3 text-sm leading-7 text-[#4e5b50] outline-none transition placeholder:text-[#a0a99e] disabled:cursor-not-allowed disabled:border-[#eceee9] disabled:bg-[#f4f5f1] disabled:text-[#a8aea6] focus:border-[#b9ccb2] focus:bg-white focus:ring-2 focus:ring-[#dbe9d6]"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.24, duration: 0.32, ease: "easeOut" }}
              className="rounded-[1.2rem] border border-[#e2e6dd] bg-white p-4 shadow-[0_10px_22px_rgba(53,65,50,0.04)]"
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28, duration: 0.22 }} className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8a9589]">Notes Guide</motion.p>
              <motion.ul className="mt-3 space-y-2 text-sm leading-6 text-[#6f7d70]" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.32 } } }}>
                <motion.li variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}>Month notes are keyed to the visible month.</motion.li>
                <motion.li variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}>Range notes are keyed to the currently selected date span.</motion.li>
                <motion.li variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}>Everything is persisted locally in your browser storage.</motion.li>
              </motion.ul>
            </motion.div>
          </section>
        </div>
      </div>
    </motion.main>
  );
}
