"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
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
  const displayKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
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
      className="h-[calc(100vh-3.5rem)] overflow-hidden bg-[var(--color-page-surface)] px-4 py-4 sm:px-5 lg:px-7"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.06,
            },
          },
        }}
        className="mx-auto flex h-full max-w-5xl flex-col"
      >
        <motion.div
          variants={{
            hidden: { y: 10, opacity: 0 },
            show: { y: 0, opacity: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="flex items-start justify-between gap-4"
        >
          <div>
            <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-label)]">Notes Workspace</motion.p>
            <motion.h2 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05, duration: 0.28 }} className="mt-2 font-serif text-[1.8rem] font-semibold tracking-[-0.04em] text-[var(--color-text-base)]">
              Keep month and range notes in their own space.
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.28 }} className="mt-2 max-w-2xl text-sm leading-6 text-[var(--color-text-faint)]">
              This page is dedicated to writing and revisiting notes, so the calendar view can stay clean and focused.
            </motion.p>
          </div>

          <motion.div
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.28, ease: "easeOut" }}
            className="flex items-center rounded-[1rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-1 shadow-[var(--shadow-inset-soft)]"
          >
            <motion.button
              type="button"
              onClick={() => setCurrentMonth((month) => addMonths(month, -1))}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-brand)]"
              aria-label="Show previous month"
            >
              <ChevronLeftIcon />
            </motion.button>
            <motion.button
              type="button"
              onClick={() => setCurrentMonth((month) => addMonths(month, 1))}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-brand)]"
              aria-label="Show next month"
            >
              <ChevronRightIcon />
            </motion.button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.32, ease: "easeOut" }}
          className="mt-5 grid min-h-0 flex-1 gap-4 lg:grid-cols-[1.1fr_0.9fr]"
        >
          <motion.section
            variants={{
              hidden: { opacity: 0, y: 14, scale: 0.985 },
              show: { opacity: 1, y: 0, scale: 1 },
            }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="rounded-[1.2rem] border border-[var(--color-border-card)] bg-[var(--color-surface-muted)] p-4 shadow-[var(--shadow-card)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.h2
                key={`month-note-heading-${displayKey}`}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="font-serif text-[1.55rem] font-semibold tracking-[-0.045em] text-[var(--color-text-base)] sm:text-[1.8rem]"
              >
                {monthLabel}
              </motion.h2>
            </AnimatePresence>
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.22 }}
              className="mt-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-label)]"
            >
              Month Notes
            </motion.p>
            <motion.textarea
              key={`month-note-textarea-${displayKey}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.26, ease: "easeOut" }}
              value={monthNote}
              onChange={(event) => updateMonthNote(event.target.value)}
              placeholder="Capture reminders, planning notes, and editorial thoughts for the visible month."
              className="mt-3 h-[calc(100%-5.25rem)] min-h-[16rem] w-full resize-none rounded-[1rem] border border-[var(--color-border-input)] bg-[var(--color-surface-card-soft)] px-4 py-3 text-base leading-8 text-[var(--color-text-muted)] outline-none transition placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-input-focus)] focus:bg-[var(--color-surface-card)] focus:ring-2 focus:ring-[var(--color-accent-track)]"
            />
          </motion.section>

          <motion.section
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.34, ease: "easeOut" }}
            className="flex min-h-0 flex-col gap-4"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.985 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="rounded-[1.2rem] border border-[var(--color-border-panel)] bg-[var(--color-surface-card)] p-4 shadow-[var(--shadow-card)]"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.22 }} className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-text-label)]">Selected Range</motion.p>
                  <motion.h3 layout className="mt-2 font-serif text-xl font-semibold tracking-[-0.04em] text-[var(--color-text-heading)]">
                    {rangeLabel ?? "Choose a start and end date from the calendar page"}
                  </motion.h3>
                </div>
                <motion.span
                  layout
                  whileHover={{ y: -1 }}
                  className={[
                    "rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em]",
                    rangeNoteKey ? "bg-[var(--color-accent-range-pill)] text-[var(--color-accent-pill-text)]" : "bg-[var(--color-neutral-status)] text-[var(--color-neutral-status-text)]",
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
                className="mt-4 min-h-36 w-full resize-none rounded-[1rem] border border-[var(--color-border-input-alt)] bg-[var(--color-surface-card-strong)] px-4 py-3 text-sm leading-7 text-[var(--color-text-muted)] outline-none transition placeholder:text-[var(--color-text-placeholder)] disabled:cursor-not-allowed disabled:border-[var(--color-border-input-disabled)] disabled:bg-[var(--color-surface-card-disabled)] disabled:text-[var(--color-text-disabled)] focus:border-[var(--color-border-input-focus)] focus:bg-[var(--color-surface-card)] focus:ring-2 focus:ring-[var(--color-accent-track)]"
              />
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 14, scale: 0.985 },
                show: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.32, ease: "easeOut" }}
              className="rounded-[1.2rem] border border-[var(--color-border-panel)] bg-[var(--color-surface-card)] p-4 shadow-[var(--shadow-card)]"
            >
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28, duration: 0.22 }} className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-text-label)]">Notes Guide</motion.p>
              <motion.ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--color-text-subtle)]" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.32 } } }}>
                <motion.li variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}>Month notes are keyed to the visible month.</motion.li>
                <motion.li variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}>Range notes are keyed to the currently selected date span.</motion.li>
                <motion.li variants={{ hidden: { opacity: 0, x: -6 }, show: { opacity: 1, x: 0 } }}>Everything is persisted locally in your browser storage.</motion.li>
              </motion.ul>
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.div>
    </motion.main>
  );
}
