"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/calendar/icons";

type CalendarHeaderProps = {
  currentMonth: Date;
  monthLabel: string;
  yearLabel: string;
  displayKey: string;
  onPrevious: () => void;
  onNext: () => void;
  onJump: (date: Date) => void;
};

const MONTH_OPTIONS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function CalendarHeader({
  currentMonth,
  monthLabel,
  yearLabel,
  displayKey,
  onPrevious,
  onNext,
  onJump,
}: CalendarHeaderProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [pickerYear, setPickerYear] = useState(currentMonth.getFullYear());
  const pickerRef = useRef<HTMLDivElement | null>(null);
  const yearOptions = useMemo(() => {
    const currentYear = currentMonth.getFullYear();
    return Array.from({ length: 21 }, (_, index) => currentYear - 10 + index);
  }, [currentMonth]);

  useEffect(() => {
    if (!isPickerOpen) {
      return;
    }

    function handlePointerDown(event: MouseEvent) {
      if (!pickerRef.current) {
        return;
      }

      if (!pickerRef.current.contains(event.target as Node)) {
        setIsPickerOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
    };
  }, [isPickerOpen]);

  function openPicker() {
    setPickerYear(currentMonth.getFullYear());
    setIsPickerOpen((value) => !value);
  }

  function jumpToMonth(monthIndex: number) {
    onJump(new Date(pickerYear, monthIndex, 1));
    setIsPickerOpen(false);
  }

  return (
    <motion.header
      ref={pickerRef}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="relative flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between"
    >
      <motion.div layout>
        <motion.button
          type="button"
          onClick={openPicker}
          whileTap={{ scale: 0.99 }}
          className="rounded-[0.7rem] text-left transition hover:bg-[var(--color-surface-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-page-surface)]"
          aria-label="Open month and year picker"
          aria-expanded={isPickerOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={displayKey}
              initial={{ opacity: 0, y: 14, scale: 0.985, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -12, scale: 1.01, filter: "blur(6px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="inline-flex max-w-full items-baseline gap-2 whitespace-nowrap font-serif text-[1.45rem] font-semibold leading-none tracking-[-0.045em] text-[var(--color-text-base)] sm:text-[1.8rem] lg:text-[2rem]"
            >
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ delay: 0.04, duration: 0.24, ease: "easeOut" }}
              >
                {monthLabel}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ delay: 0.08, duration: 0.24, ease: "easeOut" }}
              >
                {yearLabel}
              </motion.span>
            </motion.h1>
          </AnimatePresence>
        </motion.button>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.24 }}
          className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-soft)]"
        >
          Click month or year to jump faster
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.3, ease: "easeOut" }}
        className="flex items-center self-start rounded-[1rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-soft)] p-1 shadow-[var(--shadow-inset-soft)]"
      >
        <motion.button
          type="button"
          onClick={onPrevious}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="Show previous month"
        >
          <ChevronLeftIcon />
        </motion.button>
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-card)] hover:text-[var(--color-text-brand)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="Show next month"
        >
          <ChevronRightIcon />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isPickerOpen ? (
        <motion.div
          initial={{ opacity: 0, y: -8, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute left-0 top-full z-20 mt-2 w-[18rem] rounded-[1rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-card)] p-3 shadow-[var(--shadow-picker)]"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.2 }} className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-soft)]">
              Jump to month
            </motion.p>
            <select
              value={pickerYear}
              onChange={(event) => setPickerYear(Number(event.target.value))}
              className="rounded-[0.7rem] border border-[var(--color-border-input)] bg-[var(--color-page-surface)] px-2.5 py-1.5 text-sm font-medium text-[var(--color-text-brand)] outline-none focus:border-[var(--color-border-input-focus)] focus:ring-2 focus:ring-[var(--color-accent-track)]"
              aria-label="Select year"
            >
              {yearOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <motion.div className="grid grid-cols-3 gap-1.5" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.018 } } }}>
            {MONTH_OPTIONS.map((month, index) => {
              const isActive =
                currentMonth.getFullYear() === pickerYear && currentMonth.getMonth() === index;

              return (
                <motion.button
                  key={month}
                  type="button"
                  onClick={() => jumpToMonth(index)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  variants={{ hidden: { opacity: 0, y: 6 }, show: { opacity: 1, y: 0 } }}
                  className={[
                    "rounded-[0.75rem] px-2 py-2 text-xs font-medium transition",
                    isActive
                      ? "bg-[var(--color-accent)] text-[var(--color-text-inverse)]"
                      : "bg-[var(--color-surface-soft)] text-[var(--color-accent)] hover:bg-[var(--color-neutral-pill)]",
                  ].join(" ")}
                >
                  {month.slice(0, 3)}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>
      ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
