"use client";

import { TouchEvent, useRef } from "react";
import { WEEKDAY_LABELS } from "@/utils/date-utils";
import type { CalendarDay } from "@/utils/types";
import { CalendarCell } from "@/components/calendar/calendar-cell";
import { motion } from "motion/react";

type CalendarGridProps = {
  weeks: CalendarDay[][];
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  previewStart: Date | null;
  previewEnd: Date | null;
  activeEventDate: Date | null;
  getEventCount: (date: Date) => number;
  hasNoteIndicator: (date: Date) => boolean;
  hasRangeIndicator: (date: Date) => boolean;
  onSelect: (date: Date) => void;
  onHoverDate: (date: Date) => void;
  onHoverLeave: () => void;
  onSwipePrevious: () => void;
  onSwipeNext: () => void;
};

export function CalendarGrid({
  weeks,
  today,
  rangeStart,
  rangeEnd,
  previewStart,
  previewEnd,
  activeEventDate,
  getEventCount,
  hasNoteIndicator,
  hasRangeIndicator,
  onSelect,
  onHoverDate,
  onHoverLeave,
  onSwipePrevious,
  onSwipeNext,
}: CalendarGridProps) {
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  function handleTouchStart(event: TouchEvent<HTMLElement>) {
    const touch = event.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (!touchStartRef.current) {
      return;
    }

    const touch = event.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 42 || Math.abs(deltaX) < Math.abs(deltaY)) {
      return;
    }

    if (deltaX < 0) {
      onSwipeNext();
      return;
    }

    onSwipePrevious();
  }

  return (
    <motion.section
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      onMouseLeave={onHoverLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="w-full max-w-[56rem] self-start rounded-[1rem] border border-[var(--color-border-calendar)] bg-[var(--color-surface-panel)] px-2 py-1.5 shadow-[var(--shadow-calendar)]"
    >
      <motion.div className="mb-1 grid grid-cols-7 gap-[2px]" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.025, delayChildren: 0.06 } } }}>
        {WEEKDAY_LABELS.map((weekday) => (
          <motion.span
            key={weekday}
            variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }}
            className="text-center text-[7px] font-semibold uppercase tracking-[0.14em] text-[var(--color-text-label)]"
          >
            {weekday}
          </motion.span>
        ))}
      </motion.div>

      <div className="grid gap-[2px]">
        {weeks.map((week, weekIndex) => (
          <motion.div
            key={`${week[0]?.date.toISOString()}-${weekIndex}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * weekIndex, duration: 0.24, ease: "easeOut" }}
            className="grid grid-cols-7 gap-[2px]"
          >
            {week.map((day) => (
              <CalendarCell
                key={day.date.toISOString()}
                day={day}
                today={today}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                previewStart={previewStart}
                previewEnd={previewEnd}
                isEventActive={activeEventDate ? activeEventDate.toDateString() === day.date.toDateString() : false}
                eventCount={getEventCount(day.date)}
                hasNoteIndicator={hasNoteIndicator(day.date)}
                hasRangeIndicator={hasRangeIndicator(day.date)}
                onSelect={onSelect}
                onHoverDate={onHoverDate}
              />
            ))}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
