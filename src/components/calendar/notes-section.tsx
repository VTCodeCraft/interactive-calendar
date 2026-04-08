"use client";

import { EditIcon, PlusIcon } from "@/components/calendar/icons";

type NotesSectionProps = {
  monthLabel: string;
  monthNote: string;
  rangeLabel: string | null;
  rangeNote: string;
  hasActiveRange: boolean;
  onMonthNoteChange: (value: string) => void;
  onRangeNoteChange: (value: string) => void;
  onFocusMonthNote: () => void;
};

export function NotesSection({
  monthLabel,
  monthNote,
  rangeLabel,
  rangeNote,
  hasActiveRange,
  onMonthNoteChange,
  onRangeNoteChange,
  onFocusMonthNote,
}: NotesSectionProps) {
  return (
    <section className="mt-2 space-y-1.5 lg:mt-2">
      <div className="flex items-center justify-between">
        <h3 className="font-serif text-[1rem] font-semibold tracking-[-0.04em] text-[var(--color-text-strong)]">
          Monthly Notes
        </h3>
        <button
          type="button"
          onClick={onFocusMonthNote}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-text-muted)] transition hover:bg-[var(--color-neutral-pill)] hover:text-[var(--color-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
          aria-label="Open notes workspace"
        >
          <EditIcon />
        </button>
      </div>

      <div className="grid gap-1.5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[0.95rem] border border-[var(--color-border-card)] bg-[var(--color-surface-muted)] p-2.5 shadow-[var(--shadow-card-sm)]">
          <div className="absolute inset-y-2.5 left-0 w-1 rounded-r-full bg-[var(--color-accent-track)]" aria-hidden="true" />
          <div className="pl-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--color-text-label)]">
              {monthLabel}
            </p>
            <textarea
              value={monthNote}
              onChange={(event) => onMonthNoteChange(event.target.value)}
              placeholder="Capture retreat planning, visual ideas, meetings, and personal reminders for the month."
              className="mt-2 min-h-14 w-full resize-none rounded-[0.8rem] border border-[var(--color-border-input)] bg-[var(--color-surface-card-tint)] px-3 py-2 text-sm leading-5 text-[var(--color-text-muted)] outline-none transition placeholder:text-[var(--color-text-placeholder)] focus:border-[var(--color-border-input-focus)] focus:bg-[var(--color-surface-card)] focus:ring-2 focus:ring-[var(--color-accent-track)]"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full bg-[var(--color-accent-month-pill)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-accent-month-pill-text)]">
                Month Memo
              </span>
              <span className="rounded-full bg-[var(--color-neutral-chip)] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[var(--color-neutral-chip-text)]">
                Stored Locally
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="rounded-[0.95rem] border border-[var(--color-border-panel)] bg-[var(--color-surface-card)] p-2.5 shadow-[var(--shadow-card-sm)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[var(--color-text-label)]">
                  Selected Range
                </p>
                <h4 className="mt-1 font-serif text-base font-semibold tracking-[-0.04em] text-[var(--color-text-heading)]">
                  {rangeLabel ?? "Choose a start and end date"}
                </h4>
              </div>
              <span
                className={[
                  "rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em]",
                  hasActiveRange ? "bg-[var(--color-accent-range-pill)] text-[var(--color-accent-pill-text)]" : "bg-[var(--color-neutral-status)] text-[var(--color-neutral-status-text)]",
                ].join(" ")}
              >
                {hasActiveRange ? "Range Ready" : "Awaiting"}
              </span>
            </div>

            <p className="mt-1.5 text-[10px] leading-4 text-[var(--color-text-faint)]">
              {hasActiveRange
                ? "Keep a dedicated note for the active date span without losing the month-wide overview."
                : "Complete a date range to unlock notes tied specifically to that selection."}
            </p>

            <textarea
              value={rangeNote}
              onChange={(event) => onRangeNoteChange(event.target.value)}
              placeholder="Plan itinerary details, bookings, meetings, or milestones for the selected range."
              disabled={!hasActiveRange}
              className="mt-2 min-h-12 w-full resize-none rounded-[0.8rem] border border-[var(--color-border-input-alt)] bg-[var(--color-surface-card-strong)] px-3 py-1.5 text-sm leading-5 text-[var(--color-text-muted)] outline-none transition placeholder:text-[var(--color-text-placeholder)] disabled:cursor-not-allowed disabled:border-[var(--color-border-input-disabled)] disabled:bg-[var(--color-surface-card-disabled)] disabled:text-[var(--color-text-disabled)] focus:border-[var(--color-border-input-focus)] focus:bg-[var(--color-surface-card)] focus:ring-2 focus:ring-[var(--color-accent-track)]"
            />
          </div>

          <button
            type="button"
            onClick={onFocusMonthNote}
            className="inline-flex items-center justify-center gap-2 self-end rounded-[0.9rem] bg-[var(--color-accent)] px-4 py-2.5 text-[var(--color-text-inverse)] shadow-[var(--shadow-button)] transition hover:-translate-y-0.5 hover:bg-[var(--color-accent-strong)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface-card)]"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-[-0.02em]">Open Notes</span>
          </button>
        </div>
      </div>
    </section>
  );
}
