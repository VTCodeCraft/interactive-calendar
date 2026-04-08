"use client";

import { isDateWithinRange, isSameDay } from "@/utils/date-utils";
import type { CalendarDay } from "@/utils/types";
import { motion } from "motion/react";

type CalendarCellProps = {
  day: CalendarDay;
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  previewStart: Date | null;
  previewEnd: Date | null;
  isEventActive: boolean;
  eventCount: number;
  hasNoteIndicator: boolean;
  hasRangeIndicator: boolean;
  onSelect: (date: Date) => void;
  onHoverDate: (date: Date) => void;
};

export function CalendarCell({
  day,
  today,
  rangeStart,
  rangeEnd,
  previewStart,
  previewEnd,
  isEventActive,
  eventCount,
  hasNoteIndicator,
  hasRangeIndicator,
  onSelect,
  onHoverDate,
}: CalendarCellProps) {
  const isToday = isSameDay(day.date, today);
  const isStart = rangeStart ? isSameDay(day.date, rangeStart) : false;
  const isEnd = rangeEnd ? isSameDay(day.date, rangeEnd) : false;
  const isInRange = isDateWithinRange(day.date, rangeStart, rangeEnd);
  const isMiddle = isInRange && !isStart && !isEnd;
  const isPreviewInRange = rangeEnd ? false : isDateWithinRange(day.date, previewStart, previewEnd);
  const isPreviewStart = previewStart ? isSameDay(day.date, previewStart) : false;
  const isPreviewEnd = previewEnd ? isSameDay(day.date, previewEnd) : false;
  const isPreviewEdge = isPreviewInRange && (isPreviewStart || isPreviewEnd);
  const isPreviewMiddle = isPreviewInRange && !isPreviewEdge;
  const isWeekend = day.date.getDay() === 0 || day.date.getDay() === 6;
  const isEdge = isStart || isEnd;
  const hasAnyIndicator = eventCount > 0 || hasNoteIndicator || hasRangeIndicator || isPreviewInRange;

  return (
    <motion.button
      layout
      type="button"
      onClick={() => onSelect(day.date)}
      onMouseEnter={() => onHoverDate(day.date)}
      whileHover={isEdge ? undefined : { y: -1.5 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      className={[
        "group relative flex aspect-[1/0.58] min-h-[1.05rem] items-start justify-start rounded-[0.5rem] border px-[0.32rem] py-[0.18rem] text-left transition duration-150",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-panel)]",
        day.isCurrentMonth
          ? "border-[var(--color-border-cell)] bg-[var(--color-surface-card)] text-[var(--color-text-base)] shadow-[var(--shadow-cell)]"
          : "border-transparent bg-[var(--color-surface-outside)] text-[var(--color-text-outside)]",
        isWeekend && day.isCurrentMonth && !isInRange ? "text-[var(--color-accent)]" : "",
        isMiddle ? "border-[var(--color-accent-range-strong)] bg-[var(--color-accent-range)] text-[var(--color-accent-contrast)] shadow-[var(--shadow-range-inset)]" : "",
        isPreviewMiddle ? "border-[var(--color-accent-preview-border)] bg-[var(--color-accent-preview)] text-[var(--color-accent-preview-text)]" : "",
        isEdge
          ? "border-[var(--color-accent-strong)] bg-[var(--color-accent-strong)] text-[var(--color-text-inverse)] shadow-[var(--shadow-cell-edge)]"
          : "hover:-translate-y-0.5 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-card)]",
        isPreviewEdge && !isEdge ? "border-[var(--color-accent-preview-border)] bg-[var(--color-accent-preview)]" : "",
        isEventActive ? "ring-1 ring-[var(--color-indicator-event)] ring-inset" : "",
      ].join(" ")}
      aria-pressed={isInRange}
      aria-label={`Select ${day.date.toDateString()}`}
    >
      {isMiddle ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.55rem]" style={{ backgroundImage: "var(--gradient-range-fill)" }} />
      ) : null}

      {isPreviewMiddle || isPreviewEdge ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.55rem]" style={{ backgroundImage: "var(--gradient-preview-fill)" }} />
      ) : null}

      {isEdge ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.55rem]" style={{ backgroundImage: "var(--gradient-edge-fill)" }} />
      ) : null}

      {isInRange || isPreviewInRange ? (
        <motion.span
          aria-hidden="true"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.12, 0.26, 0.12], backgroundPositionX: ["-140%", "140%"] }}
          transition={{ duration: 1.6, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
          className="pointer-events-none absolute inset-0 rounded-[0.55rem]"
          style={{ backgroundImage: "var(--gradient-wave)", backgroundSize: "220% 100%" }}
        />
      ) : null}

      <span
        className={[
          "relative z-10 text-[7px] font-semibold leading-none tracking-[-0.03em]",
          !day.isCurrentMonth ? "text-[var(--color-text-outside-soft)]" : "",
          isEdge ? "text-[var(--color-text-inverse)]" : "",
        ].join(" ")}
      >
        {day.date.getDate()}
      </span>

      {isToday && !isEdge ? (
        <span className="absolute right-0.5 top-0.5 h-[3px] w-[3px] rounded-full border border-[var(--color-text-inverse)] bg-[var(--color-accent)] shadow-sm" />
      ) : null}

      {isMiddle ? (
        <>
          <span className="pointer-events-none absolute inset-y-0 left-0 w-0.5 rounded-r-full bg-[var(--color-accent-range-edge)]" />
          <span className="pointer-events-none absolute inset-y-0 right-0 w-0.5 rounded-l-full bg-[var(--color-accent-range-edge)]" />
        </>
      ) : null}

      {isEdge ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.55rem] ring-1 ring-[var(--color-accent-ring)] ring-inset" />
      ) : null}

      {!day.isCurrentMonth ? (
        <span className="pointer-events-none absolute inset-0 rounded-[0.65rem]" style={{ backgroundImage: "var(--pattern-outside-day)" }} />
      ) : null}

      {hasAnyIndicator ? (
        <div className="pointer-events-none absolute bottom-0.5 left-0.5 z-10 flex items-center gap-0.5">
          {eventCount > 0 ? <span className="h-1 w-1 rounded-full bg-[var(--color-indicator-event)]" /> : null}
          {hasNoteIndicator ? <span className="h-1 w-1 rounded-full bg-[var(--color-indicator-note)]" /> : null}
          {hasRangeIndicator ? <span className="h-1 w-1 rounded-full bg-[var(--color-indicator-range)]" /> : null}
          {isPreviewInRange && !hasRangeIndicator ? (
            <span className="h-1 w-1 rounded-full bg-[var(--color-indicator-preview)]" />
          ) : null}
        </div>
      ) : null}
    </motion.button>
  );
}
