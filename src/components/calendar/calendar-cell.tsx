"use client";

import { isDateWithinRange, isSameDay } from "@/utils/date-utils";
import type { CalendarDay } from "@/utils/types";
import { motion } from "motion/react";

type CalendarCellProps = {
  day: CalendarDay;
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onSelect: (date: Date) => void;
};

export function CalendarCell({
  day,
  today,
  rangeStart,
  rangeEnd,
  onSelect,
}: CalendarCellProps) {
  const isToday = isSameDay(day.date, today);
  const isStart = rangeStart ? isSameDay(day.date, rangeStart) : false;
  const isEnd = rangeEnd ? isSameDay(day.date, rangeEnd) : false;
  const isInRange = isDateWithinRange(day.date, rangeStart, rangeEnd);
  const isMiddle = isInRange && !isStart && !isEnd;
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
  const isEdge = isStart || isEnd;

  return (
    <motion.button
      layout
      type="button"
      onClick={() => onSelect(day.date)}
      whileHover={isEdge ? undefined : { y: -1.5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className={[
        "group relative flex aspect-[1/0.64] min-h-[1.25rem] items-start justify-start rounded-[0.5rem] border px-0.5 py-[0.22rem] text-left transition duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf7]",
        day.isCurrentMonth
          ? "border-[#e9e4d8] bg-white text-[#2e3833] shadow-[0_8px_22px_rgba(48,56,45,0.04)]"
          : "border-transparent bg-[#f3f2ed] text-[#c0c4bb]",
        isWeekend && day.isCurrentMonth && !isInRange ? "text-[#4f6f52]" : "",
        isMiddle ? "border-[#bfd3bc] bg-[#dcebd7] text-[#35563d] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)]" : "",
        isEdge
          ? "border-[#446246] bg-[#446246] text-white shadow-[0_10px_20px_rgba(68,98,70,0.28)]"
          : "hover:-translate-y-0.5 hover:border-[#d3dbd0] hover:bg-white",
      ].join(" ")}
      aria-pressed={isInRange}
      aria-label={`Select ${day.date.toDateString()}`}
    >
      {isMiddle ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.55rem] bg-[linear-gradient(180deg,rgba(220,235,215,0.96),rgba(206,226,201,0.96))]" />
      ) : null}

      {isEdge ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.55rem] bg-[linear-gradient(180deg,rgba(86,122,88,0.16),rgba(0,0,0,0))]" />
      ) : null}

      <span
        className={[
          "relative z-10 text-[9px] font-semibold leading-none tracking-[-0.03em]",
          !day.isCurrentMonth ? "text-[#d0d4cb]" : "",
          isEdge ? "text-white" : "",
        ].join(" ")}
      >
        {day.date.getDate()}
      </span>

      {isToday && !isEdge ? (
        <span className="absolute right-0.5 top-0.5 h-1.25 w-1.25 rounded-full border border-white bg-[#4f6f52] shadow-sm" />
      ) : null}

      {isMiddle ? (
        <>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-[#aac4a7]" />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-0.5 rounded-l-full bg-[#aac4a7]" />
        </>
      ) : null}

      {isEdge ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.55rem] ring-1 ring-[#6f9271]/70 ring-inset" />
      ) : null}

      {!day.isCurrentMonth ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.65rem] bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(136,144,129,0.04)_6px,rgba(136,144,129,0.04)_7px)]" />
      ) : null}
    </motion.button>
  );
}
