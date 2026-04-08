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
        <h3 className="font-serif text-[1rem] font-semibold tracking-[-0.04em] text-[#1f2f2c]">
          Monthly Notes
        </h3>
        <button
          type="button"
          onClick={onFocusMonthNote}
          className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#657468] transition hover:bg-[#eef1ea] hover:text-[#4f6f52] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62]"
          aria-label="Open notes workspace"
        >
          <EditIcon />
        </button>
      </div>

      <div className="grid gap-1.5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="relative overflow-hidden rounded-[0.95rem] border border-[#dde5dc] bg-[#f5f6f1] p-2.5 shadow-[0_8px_18px_rgba(53,65,50,0.04)]">
          <div className="absolute inset-y-2.5 left-0 w-1 rounded-r-full bg-[#d6e6d0]" aria-hidden="true" />
          <div className="pl-2.5">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#8a9589]">
              {monthLabel}
            </p>
            <textarea
              value={monthNote}
              onChange={(event) => onMonthNoteChange(event.target.value)}
              placeholder="Capture retreat planning, visual ideas, meetings, and personal reminders for the month."
              className="mt-2 min-h-14 w-full resize-none rounded-[0.8rem] border border-[#dbe2d8] bg-white/70 px-3 py-2 text-sm leading-5 text-[#4e5b50] outline-none transition placeholder:text-[#a0a99e] focus:border-[#b9ccb2] focus:bg-white focus:ring-2 focus:ring-[#dbe9d6]"
            />
            <div className="mt-2 flex flex-wrap gap-1">
              <span className="rounded-full bg-[#ddefc8] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#567251]">
                Month Memo
              </span>
              <span className="rounded-full bg-[#e5e6e1] px-3 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-[#656a60]">
                Stored Locally
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="rounded-[0.95rem] border border-[#e2e6dd] bg-white p-2.5 shadow-[0_8px_18px_rgba(53,65,50,0.04)]">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#8a9589]">
                  Selected Range
                </p>
                <h4 className="mt-1 font-serif text-base font-semibold tracking-[-0.04em] text-[#21312f]">
                  {rangeLabel ?? "Choose a start and end date"}
                </h4>
              </div>
              <span
                className={[
                  "rounded-full px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[0.2em]",
                  hasActiveRange ? "bg-[#edf6e8] text-[#52714e]" : "bg-[#eff1ee] text-[#98a194]",
                ].join(" ")}
              >
                {hasActiveRange ? "Range Ready" : "Awaiting"}
              </span>
            </div>

            <p className="mt-1.5 text-[10px] leading-4 text-[#768276]">
              {hasActiveRange
                ? "Keep a dedicated note for the active date span without losing the month-wide overview."
                : "Complete a date range to unlock notes tied specifically to that selection."}
            </p>

            <textarea
              value={rangeNote}
              onChange={(event) => onRangeNoteChange(event.target.value)}
              placeholder="Plan itinerary details, bookings, meetings, or milestones for the selected range."
              disabled={!hasActiveRange}
              className="mt-2 min-h-12 w-full resize-none rounded-[0.8rem] border border-[#dce2d9] bg-[#fafaf7] px-3 py-1.5 text-sm leading-5 text-[#4e5b50] outline-none transition placeholder:text-[#a0a99e] disabled:cursor-not-allowed disabled:border-[#eceee9] disabled:bg-[#f4f5f1] disabled:text-[#a8aea6] focus:border-[#b9ccb2] focus:bg-white focus:ring-2 focus:ring-[#dbe9d6]"
            />
          </div>

          <button
            type="button"
            onClick={onFocusMonthNote}
            className="inline-flex items-center justify-center gap-2 self-end rounded-[0.9rem] bg-[#4f6f52] px-4 py-2.5 text-white shadow-[0_10px_20px_rgba(79,111,82,0.18)] transition hover:-translate-y-0.5 hover:bg-[#446246] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4f6f52] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            <PlusIcon className="h-4 w-4" />
            <span className="text-sm font-semibold tracking-[-0.02em]">Open Notes</span>
          </button>
        </div>
      </div>
    </section>
  );
}
