"use client";

import { isDateWithinRange, isSameDay } from "@/utils/date-utils";
import type { CalendarDay } from "@/utils/types";

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

  return (
    <button
      type="button"
      onClick={() => onSelect(day.date)}
      className={[
        "group relative flex aspect-[1/0.7] min-h-[1.45rem] items-start justify-start rounded-[0.55rem] border px-0.75 py-0.5 text-left transition duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fbfaf7]",
        day.isCurrentMonth
          ? "border-[#e9e4d8] bg-white text-[#2e3833] shadow-[0_8px_22px_rgba(48,56,45,0.04)]"
          : "border-transparent bg-[#f3f2ed] text-[#c0c4bb]",
        isWeekend && day.isCurrentMonth && !isInRange ? "text-[#4f6f52]" : "",
        isMiddle ? "border-[#dfe6da] bg-[#edf1ea] text-[#4e6f52]" : "",
        isStart || isEnd
          ? "border-[#4f6f52] bg-[#4f6f52] text-white shadow-[0_8px_18px_rgba(79,111,82,0.2)]"
          : "hover:-translate-y-0.5 hover:border-[#d3dbd0] hover:bg-white",
      ].join(" ")}
      aria-pressed={isInRange}
      aria-label={`Select ${day.date.toDateString()}`}
    >
      <span
        className={[
          "text-[10px] font-semibold leading-none tracking-[-0.03em]",
          !day.isCurrentMonth ? "text-[#d0d4cb]" : "",
          isStart || isEnd ? "text-white" : "",
        ].join(" ")}
      >
        {day.date.getDate()}
      </span>

      {isToday && !isStart && !isEnd ? (
        <span className="absolute right-0.75 top-0.75 h-1.5 w-1.5 rounded-full border border-white bg-[#4f6f52] shadow-sm" />
      ) : null}

      {isMiddle ? (
        <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-[#d6e6d0]" />
      ) : null}

      {!day.isCurrentMonth ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.65rem] bg-[repeating-linear-gradient(135deg,transparent,transparent_6px,rgba(136,144,129,0.04)_6px,rgba(136,144,129,0.04)_7px)]" />
      ) : null}
    </button>
  );
}
