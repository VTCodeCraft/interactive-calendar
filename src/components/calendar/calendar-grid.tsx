"use client";

import { WEEKDAY_LABELS } from "@/utils/date-utils";
import type { CalendarDay } from "@/utils/types";
import { CalendarCell } from "@/components/calendar/calendar-cell";
import { motion } from "motion/react";

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
    <motion.section
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="h-full rounded-[0.85rem] border border-[#e6e2d8] bg-[#fbfaf7] p-1 shadow-[0_8px_18px_rgba(48,56,45,0.045)]"
    >
      <motion.div className="mb-1 grid grid-cols-7 gap-px" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025, delayChildren: 0.06 } } }}>
        {WEEKDAY_LABELS.map((weekday) => (
          <motion.span
            key={weekday}
            variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }}
            className="text-center text-[7px] font-semibold uppercase tracking-[0.14em] text-[#9aa490]"
          >
            {weekday}
          </motion.span>
        ))}
      </motion.div>

      <div className="grid gap-px">
        {weeks.map((week, weekIndex) => (
          <motion.div
            key={`${week[0]?.date.toISOString()}-${weekIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * weekIndex, duration: 0.24, ease: "easeOut" }}
            className="grid grid-cols-7 gap-px"
          >
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
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
