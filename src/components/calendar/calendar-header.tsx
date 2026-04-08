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
          className="rounded-[0.7rem] text-left transition hover:bg-[#f2f4ef] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fcfbf7]"
          aria-label="Open month and year picker"
          aria-expanded={isPickerOpen}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.h1
              key={displayKey}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="font-serif text-[1.55rem] font-semibold leading-[0.9] tracking-[-0.04em] text-[#26302d] sm:text-[1.9rem]"
            >
              {monthLabel} {yearLabel}
            </motion.h1>
          </AnimatePresence>
        </motion.button>
        <motion.p
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.24 }}
          className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#6d826f]"
        >
          Click month or year to jump faster
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ x: 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.3, ease: "easeOut" }}
        className="flex items-center self-start rounded-[1rem] border border-[#dde3da] bg-[#f3f5ef] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]"
      >
        <motion.button
          type="button"
          onClick={onPrevious}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[#617166] transition hover:bg-white hover:text-[#456347] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62]"
          aria-label="Show previous month"
        >
          <ChevronLeftIcon />
        </motion.button>
        <motion.button
          type="button"
          onClick={onNext}
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.96 }}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[#617166] transition hover:bg-white hover:text-[#456347] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62]"
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
          className="absolute left-0 top-full z-20 mt-2 w-[18rem] rounded-[1rem] border border-[#dde3da] bg-white p-3 shadow-[0_18px_40px_rgba(39,48,43,0.12)]"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05, duration: 0.2 }} className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#6d826f]">
              Jump to month
            </motion.p>
            <select
              value={pickerYear}
              onChange={(event) => setPickerYear(Number(event.target.value))}
              className="rounded-[0.7rem] border border-[#dbe0d8] bg-[#f8f9f5] px-2.5 py-1.5 text-sm font-medium text-[#446246] outline-none focus:border-[#b9ccb2] focus:ring-2 focus:ring-[#dbe9d6]"
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
                      ? "bg-[#4f6f52] text-white"
                      : "bg-[#f3f5ef] text-[#526155] hover:bg-[#e7ece5]",
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
