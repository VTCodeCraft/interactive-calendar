"use client";

import { WEEKDAY_LABELS } from "@/utils/date-utils";
import type { CalendarDay } from "@/utils/types";
import { CalendarCell } from "@/components/calendar/calendar-cell";

type CalendarGridProps = {
  weeks: CalendarDay[][];
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onSelect: (date: Date) => void;
};

export function CalendarGrid({
  weeks,
  today,
  rangeStart,
  rangeEnd,
  onSelect,
}: CalendarGridProps) {
  return (
    <section className="h-full rounded-[0.9rem] border border-[#e6e2d8] bg-[#fbfaf7] p-1.5 shadow-[0_10px_20px_rgba(48,56,45,0.05)]">
      <div className="mb-1.5 grid grid-cols-7 gap-0.5">
        {WEEKDAY_LABELS.map((weekday) => (
          <span
            key={weekday}
            className="text-center text-[7px] font-semibold uppercase tracking-[0.14em] text-[#9aa490]"
          >
            {weekday}
          </span>
        ))}
      </div>

      <div className="grid gap-0.5">
        {weeks.map((week, weekIndex) => (
          <div key={`${week[0]?.date.toISOString()}-${weekIndex}`} className="grid grid-cols-7 gap-0.5">
            {week.map((day) => (
              <CalendarCell
                key={day.date.toISOString()}
                day={day}
                today={today}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                onSelect={onSelect}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
