"use client";

import { FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { CalendarEvent } from "@/utils/types";

type EventPanelProps = {
  activeDate: Date | null;
  formattedDate: string | null;
  draftTitle: string;
  events: CalendarEvent[];
  onDraftChange: (value: string) => void;
  onAddEvent: () => void;
  onRemoveEvent: (id: string) => void;
  onClose: () => void;
};

export function EventPanel({
  activeDate,
  formattedDate,
  draftTitle,
  events,
  onDraftChange,
  onAddEvent,
  onRemoveEvent,
  onClose,
}: EventPanelProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddEvent();
  }

  return (
    <AnimatePresence>
      {activeDate ? (
        <motion.aside
          key={activeDate.toISOString()}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.98 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="absolute inset-x-2 bottom-2 z-20 rounded-[1rem] border border-[var(--color-border-soft)] bg-[var(--color-surface-card)]/95 p-3 shadow-[var(--shadow-floating)] backdrop-blur-md sm:left-auto sm:right-3 sm:w-[18rem]"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-text-label)]">
                Quick Event
              </p>
              <h3 className="mt-1 font-serif text-lg font-semibold tracking-[-0.04em] text-[var(--color-text-base)]">
                {formattedDate}
              </h3>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-muted)] transition hover:bg-[var(--color-surface-subtle)] hover:text-[var(--color-accent)]"
              aria-label="Close event panel"
            >
              <span className="text-base leading-none">×</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-3 space-y-2">
            <input
              value={draftTitle}
              onChange={(event) => onDraftChange(event.target.value)}
              placeholder="Add an event title"
              className="w-full rounded-[0.85rem] border border-[var(--color-border-input)] bg-[var(--color-surface-card-strong)] px-3 py-2 text-sm text-[var(--color-text-base)] outline-none transition placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-input-focus)] focus:bg-[var(--color-surface-card)] focus:ring-2 focus:ring-[var(--color-accent-track)]"
            />

            <button
              type="submit"
              disabled={!draftTitle.trim()}
              className="inline-flex w-full items-center justify-center rounded-[0.85rem] bg-[var(--color-accent)] px-3 py-2 text-sm font-semibold text-[var(--color-text-inverse)] transition hover:bg-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-55"
            >
              Save Event
            </button>
          </form>

          <div className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--color-text-soft)]">
              Scheduled
            </p>

            <div className="mt-2 space-y-1.5">
              {events.length ? (
                events.map((calendarEvent) => (
                  <motion.div
                    key={calendarEvent.id}
                    layout
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center justify-between gap-3 rounded-[0.8rem] bg-[var(--color-surface-soft)] px-3 py-2"
                  >
                    <div className="flex min-w-0 items-center gap-2">
                      <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--color-indicator-event)]" />
                      <span className="truncate text-sm text-[var(--color-text-base)]">{calendarEvent.title}</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onRemoveEvent(calendarEvent.id)}
                      className="text-xs font-medium text-[var(--color-text-muted)] transition hover:text-[var(--color-accent)]"
                    >
                      Remove
                    </button>
                  </motion.div>
                ))
              ) : (
                <p className="rounded-[0.8rem] bg-[var(--color-surface-soft)] px-3 py-2 text-sm text-[var(--color-text-faint)]">
                  No events yet for this day.
                </p>
              )}
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
