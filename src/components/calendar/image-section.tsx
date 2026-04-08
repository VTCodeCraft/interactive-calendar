"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { WEEKDAY_LABELS, isDateWithinRange, isSameDay } from "@/utils/date-utils";
import type { CalendarDay } from "@/utils/types";

type ImageSectionProps = {
  monthLabel: string;
  yearLabel: string;
  displayKey: string;
  weeks: CalendarDay[][];
  today: Date;
  rangeStart: Date | null;
  rangeEnd: Date | null;
  onJumpDate: (date: Date) => void;
};

export function ImageSection({
  monthLabel,
  yearLabel,
  displayKey,
  weeks,
  today,
  rangeStart,
  rangeEnd,
  onJumpDate,
}: ImageSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative min-h-[10rem] overflow-hidden border-b border-[var(--color-border-base)] bg-[var(--color-hero-bg)] lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={displayKey}
          initial={{ scale: 1.06, opacity: 0.72 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.985, opacity: 0.68 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/calendar-hero.svg"
            alt="Featured atelier visual"
            fill
            priority
            className="object-cover object-center opacity-80"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero-overlay)" }}
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.16, duration: 0.55 }}
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-hero-radial)" }}
      />

      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: [0, -2, 0], opacity: 1 }}
        transition={{
          opacity: { delay: 0.2, duration: 0.4, ease: "easeOut" },
          y: { delay: 0.25, duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        className="absolute inset-x-4 top-3 rounded-[0.9rem] border border-[var(--color-hero-glass-border)] bg-[var(--color-hero-glass-bg)] p-2.5 backdrop-blur-sm lg:left-4 lg:right-auto lg:top-4 lg:w-[12rem]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-[var(--color-hero-copy)]">Mini Calendar</p>
        <div className="mt-2 rounded-[0.8rem] border border-[var(--color-hero-card-border)] bg-[var(--color-hero-card-bg)] p-2 shadow-[var(--shadow-hero-card)]">
          <div className="mb-2 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold text-[var(--color-text-inverse)]">{monthLabel}</p>
              <p className="text-[8px] uppercase tracking-[0.18em] text-[var(--color-hero-copy)]">{yearLabel}</p>
            </div>
            <div className="h-6 w-6 rounded-full border border-[var(--color-hero-glass-border)] bg-[var(--color-hero-card-fill)]/40" />
          </div>

          <div className="grid grid-cols-7 gap-1 text-center">
            {WEEKDAY_LABELS.map((weekday) => (
              <span
                key={weekday}
                className="text-[7px] font-semibold uppercase tracking-[0.12em] text-[var(--color-hero-copy)]"
              >
                {weekday.slice(0, 1)}
              </span>
            ))}
          </div>

          <div className="mt-1.5 grid gap-1">
            {weeks.map((week, weekIndex) => (
              <div key={`${displayKey}-mini-${weekIndex}`} className="grid grid-cols-7 gap-1">
                {week.map((day) => {
                  const isToday = isSameDay(day.date, today);
                  const isSelected = isDateWithinRange(day.date, rangeStart, rangeEnd);
                  return (
                    <motion.button
                      key={day.date.toISOString()}
                      type="button"
                      whileHover={{ y: -1, scale: 1.03 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => onJumpDate(day.date)}
                      className={[
                        "flex h-5 items-center justify-center rounded-[0.45rem] text-[8px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-hero-card-bg)]",
                        day.isCurrentMonth
                          ? "text-[var(--color-text-inverse)]"
                          : "text-[color-mix(in_srgb,var(--color-text-inverse)_40%,transparent)]",
                        isSelected
                          ? "bg-[var(--color-accent)] text-[var(--color-text-inverse)]"
                          : isToday
                            ? "border border-[var(--color-accent)] bg-[var(--color-hero-card-fill)]/45 text-[var(--color-text-inverse)]"
                            : "bg-[var(--color-hero-card-fill)]/25",
                      ].join(" ")}
                      aria-label={`Jump to ${day.date.toDateString()}`}
                    >
                      {day.date.getDate()}
                    </motion.button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      <motion.div
        key={displayKey}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.24, duration: 0.5, ease: "easeOut" }}
        className="absolute inset-x-4 bottom-3 lg:inset-x-4 lg:bottom-4"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`hero-copy-${displayKey}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[var(--color-hero-copy)]">
              The Digital Atelier
            </p>
            <h2 className="mt-2 font-serif text-[1.7rem] font-semibold leading-[0.94] text-[var(--color-text-inverse)] sm:text-[2rem] lg:text-[2.1rem]">
              The tactile side of planning.
            </h2>
            <p className="mt-1.5 max-w-sm text-[10px] leading-4 text-[var(--color-hero-body)]">
              Craft your month with a gallery-like calendar, quiet structure, and notes that feel more editorial than utilitarian.
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`hero-meta-${displayKey}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="mt-2.5 flex flex-wrap items-center gap-1"
          >
            <motion.div whileHover={{ y: -1 }} className="rounded-full border border-[var(--color-hero-glass-border)] bg-[var(--color-hero-card-bg)] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-inverse)] backdrop-blur-sm">
              {monthLabel}
            </motion.div>
            <motion.div whileHover={{ y: -1 }} className="rounded-full border border-[var(--color-hero-glass-border)] bg-[var(--color-hero-card-bg)] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-[var(--color-text-inverse)] backdrop-blur-sm">
              {yearLabel}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
