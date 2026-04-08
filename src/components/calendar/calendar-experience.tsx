"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { ImageSection } from "@/components/calendar/image-section";
import { addMonths, buildMonthGrid, compareDates } from "@/utils/date-utils";
import {
  readCalendarClientState,
  readCalendarServerState,
  persistCalendarMonth,
  persistCalendarRange,
} from "@/components/calendar/storage";

export function CalendarExperience() {
  const actualToday = useMemo(() => new Date(), []);
  const [initialState] = useState(readCalendarServerState);
  const [currentMonth, setCurrentMonth] = useState(initialState.currentMonth);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialState.selectedStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialState.selectedEndDate);
  const [isHydrated, setIsHydrated] = useState(initialState.isHydrated);

  useEffect(() => {
    const clientState = readCalendarClientState();

    startTransition(() => {
      setCurrentMonth(clientState.currentMonth);
      setSelectedStartDate(clientState.selectedStartDate);
      setSelectedEndDate(clientState.selectedEndDate);
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

    persistCalendarRange(selectedStartDate, selectedEndDate);
  }, [isHydrated, selectedEndDate, selectedStartDate]);

  const weeks = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);
  const monthYearFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }),
    [],
  );
  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
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

  const yearLabel = String(currentMonth.getFullYear());
  const displayKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const rangeLabel =
    selectedStartDate && selectedEndDate
      ? `${rangeFormatter.format(selectedStartDate)} - ${rangeFormatter.format(selectedEndDate)}`
      : null;

  function handleDateSelect(date: Date) {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (compareDates(date, selectedStartDate) < 0) {
      setSelectedStartDate(date);
      setSelectedEndDate(selectedStartDate);
    } else {
      setSelectedEndDate(date);
    }

    if (date.getMonth() !== currentMonth.getMonth() || date.getFullYear() !== currentMonth.getFullYear()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }

  const selectionHint = !selectedStartDate
    ? "Tap a day to start a range."
    : selectedStartDate && !selectedEndDate
      ? "Tap another day to complete it."
      : "Tap any date to begin a fresh range.";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="grid h-[calc(100vh-3.5rem)] overflow-hidden lg:grid-cols-[minmax(14rem,34%)_minmax(24rem,66%)]"
    >
      <ImageSection
        monthLabel={monthFormatter.format(currentMonth)}
        yearLabel={yearLabel}
        displayKey={displayKey}
      />

      <motion.section
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.08, duration: 0.38, ease: "easeOut" }}
        className="overflow-hidden bg-[#fcfbf7] px-3 py-2.5 sm:px-4 lg:px-5 lg:py-3 xl:px-6"
      >
        <div className="mx-auto flex h-full max-w-[50rem] flex-col">
          <CalendarHeader
            currentMonth={currentMonth}
            monthLabel={monthFormatter.format(currentMonth)}
            yearLabel={yearLabel}
            displayKey={displayKey}
            onPrevious={() => setCurrentMonth((month) => addMonths(month, -1))}
            onNext={() => setCurrentMonth((month) => addMonths(month, 1))}
            onJump={(date) => setCurrentMonth(date)}
          />

          <div className="mt-1.5 flex min-h-0 flex-1 flex-col">
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.3, ease: "easeOut" }}
              className="mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between"
            >
              <motion.div layout>
                <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.22 }} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8a9589]">
                  Selected Window
                </motion.p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    key={`range-heading-${displayKey}-${rangeLabel ?? "none"}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="mt-1 font-serif text-[1.15rem] font-semibold tracking-[-0.04em] text-[#22312b]"
                  >
                    {rangeLabel ?? monthYearFormatter.format(currentMonth)}
                  </motion.h2>
                </AnimatePresence>
                <motion.div className="mt-1 flex flex-wrap gap-1" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.18 } } }}>
                  <motion.span variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -1 }} className="rounded-full bg-[#eef2ec] px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#738171]">
                    Today Highlighted
                  </motion.span>
                  <motion.span variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -1 }} className="rounded-full bg-[#edf6e8] px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#4f6f52]">
                    Range Aware
                  </motion.span>
                </motion.div>
              </motion.div>
              <motion.p initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.24 }} className="max-w-[8rem] text-[9px] leading-3.5 text-[#839082]">{selectionHint}</motion.p>
            </motion.div>

            <div className="min-h-0 flex-1">
              <CalendarGrid
                key={`grid-${displayKey}`}
                weeks={weeks}
                today={actualToday}
                rangeStart={selectedStartDate}
                rangeEnd={selectedEndDate}
                onSelect={handleDateSelect}
              />
            </div>
          </div>
        </div>
      </motion.section>
    </motion.main>
  );
}
