"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@/components/calendar/icons";

type CalendarHeaderProps = {
  monthLabel: string;
  yearLabel: string;
  onPrevious: () => void;
  onNext: () => void;
};

export function CalendarHeader({
  monthLabel,
  yearLabel,
  onPrevious,
  onNext,
}: CalendarHeaderProps) {
  return (
    <header className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="font-serif text-[1.55rem] font-semibold leading-[0.82] tracking-[-0.04em] text-[#26302d] sm:text-[1.9rem]">
          {monthLabel}
          <span className="block">{yearLabel}</span>
        </h1>
        <p className="mt-1 text-[8px] font-semibold uppercase tracking-[0.22em] text-[#6d826f]">
          Monthly Gallery
        </p>
      </div>

      <div className="flex items-center self-start rounded-[1rem] border border-[#dde3da] bg-[#f3f5ef] p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
        <button
          type="button"
          onClick={onPrevious}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[#617166] transition hover:bg-white hover:text-[#456347] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62]"
          aria-label="Show previous month"
        >
          <ChevronLeftIcon />
        </button>
        <button
          type="button"
          onClick={onNext}
          className="inline-flex h-8 w-8 items-center justify-center rounded-[0.8rem] text-[#617166] transition hover:bg-white hover:text-[#456347] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5d7f62]"
          aria-label="Show next month"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </header>
  );
}
