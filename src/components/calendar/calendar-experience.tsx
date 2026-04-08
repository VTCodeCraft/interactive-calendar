"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { ImageSection } from "@/components/calendar/image-section";
import { addMonths, buildMonthGrid, compareDates } from "@/utils/date-utils";
import {
  persistCalendarMonth,
  persistCalendarRange,
  readCalendarStorageState,
} from "@/components/calendar/storage";

export function CalendarExperience() {
  const actualToday = useMemo(() => new Date(), []);
  const [initialState] = useState(readCalendarStorageState);
  const [currentMonth, setCurrentMonth] = useState(initialState.currentMonth);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialState.selectedStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialState.selectedEndDate);
  const [isHydrated] = useState(initialState.isHydrated);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    persistCalendarMonth(currentMonth);
  }, [currentMonth, isHydrated]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    persistCalendarRange(selectedStartDate, selectedEndDate);
  }, [isHydrated, selectedEndDate, selectedStartDate]);

  const weeks = useMemo(() => buildMonthGrid(currentMonth), [currentMonth]);
  const monthYearFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
      }),
    [],
  );
  const monthFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "long",
      }),
    [],
  );
  const rangeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
      }),
    [],
  );

  const yearLabel = String(currentMonth.getFullYear());
  const rangeLabel =
    selectedStartDate && selectedEndDate
      ? `${rangeFormatter.format(selectedStartDate)} - ${rangeFormatter.format(selectedEndDate)}`
      : null;

  function handleDateSelect(date: Date) {
    if (!selectedStartDate || selectedEndDate) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (compareDates(date, selectedStartDate) < 0) {
      setSelectedStartDate(date);
      setSelectedEndDate(selectedStartDate);
    } else {
      setSelectedEndDate(date);
    }

    if (date.getMonth() !== currentMonth.getMonth() || date.getFullYear() !== currentMonth.getFullYear()) {
      setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    }
  }

  const selectionHint = !selectedStartDate
    ? "Tap a day to start a range."
    : selectedStartDate && !selectedEndDate
      ? "Tap another day to complete it."
      : "Tap any date to begin a fresh range.";

  return (
    <main className="grid h-[calc(100vh-3.5rem)] overflow-hidden lg:grid-cols-[minmax(14rem,34%)_minmax(24rem,66%)]">
      <ImageSection monthLabel={monthFormatter.format(currentMonth)} yearLabel={yearLabel} />

      <section className="overflow-hidden bg-[#fcfbf7] px-3 py-2.5 sm:px-4 lg:px-5 lg:py-3 xl:px-6">
        <div className="mx-auto flex h-full max-w-[50rem] flex-col">
          <CalendarHeader
            monthLabel={monthFormatter.format(currentMonth)}
            yearLabel={yearLabel}
            onPrevious={() => setCurrentMonth((month) => addMonths(month, -1))}
            onNext={() => setCurrentMonth((month) => addMonths(month, 1))}
          />

          <div className="mt-1.5 flex min-h-0 flex-1 flex-col">
            <div className="mb-1.5 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#8a9589]">
                  Selected Window
                </p>
                <h2 className="mt-1 font-serif text-[1.15rem] font-semibold tracking-[-0.04em] text-[#22312b]">
                  {rangeLabel ?? monthYearFormatter.format(currentMonth)}
                </h2>
                <div className="mt-1 flex flex-wrap gap-1">
                  <span className="rounded-full bg-[#eef2ec] px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#738171]">
                    Today Highlighted
                  </span>
                  <span className="rounded-full bg-[#edf6e8] px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-[#4f6f52]">
                    Range Aware
                  </span>
                </div>
              </div>
              <p className="max-w-[8rem] text-[9px] leading-3.5 text-[#839082]">{selectionHint}</p>
            </div>

            <div className="min-h-0 flex-1">
              <CalendarGrid
                weeks={weeks}
                today={actualToday}
                rangeStart={selectedStartDate}
                rangeEnd={selectedEndDate}
                onSelect={handleDateSelect}
              />
            </div>
          </div>

          <div className="mt-2 flex justify-end">
            <Link
              href="/notes"
              className="inline-flex items-center gap-2 rounded-[0.9rem] border border-[#d7ddd4] bg-white px-4 py-2 text-sm font-medium text-[#4f6f52] transition hover:bg-[#f3f6f0]"
            >
              Open Notes Workspace
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
