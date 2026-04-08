"use client";
import { startTransition, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EventPanel } from "@/components/calendar/event-panel";
import { CalendarGrid } from "@/components/calendar/calendar-grid";
import { CalendarHeader } from "@/components/calendar/calendar-header";
import { ImageSection } from "@/components/calendar/image-section";
import { addMonths, buildMonthGrid, compareDates, formatDayKey, formatMonthKey, formatRangeKey, isDateWithinRange } from "@/utils/date-utils";
import {
  readCalendarClientState,
  readCalendarServerState,
  writeEventsState,
  persistCalendarMonth,
  persistCalendarRange,
} from "@/components/calendar/storage";
import type { EventsState, NotesState } from "@/utils/types";

export function CalendarExperience() {
  const actualToday = useMemo(() => new Date(), []);
  const [initialState] = useState(readCalendarServerState);
  const [currentMonth, setCurrentMonth] = useState(initialState.currentMonth);
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialState.selectedStartDate);
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialState.selectedEndDate);
  const [notes, setNotes] = useState<NotesState>(initialState.notes);
  const [events, setEvents] = useState<EventsState>(initialState.events);
  const [isHydrated, setIsHydrated] = useState(initialState.isHydrated);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const [activeEventDate, setActiveEventDate] = useState<Date | null>(null);
  const [isEventPanelOpen, setIsEventPanelOpen] = useState(false);
  const [eventDraftTitle, setEventDraftTitle] = useState("");

  useEffect(() => {
    const clientState = readCalendarClientState();

    startTransition(() => {
      setCurrentMonth(clientState.currentMonth);
      setSelectedStartDate(clientState.selectedStartDate);
      setSelectedEndDate(clientState.selectedEndDate);
      setNotes(clientState.notes);
      setEvents(clientState.events);
      setIsHydrated(clientState.isHydrated);
    });
  }, []);

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

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    writeEventsState(events);
  }, [events, isHydrated]);

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
  const displayKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`;
  const monthKey = formatMonthKey(currentMonth);
  const monthHasNote = Boolean(notes.monthNotes[monthKey]?.trim());
  const committedRangeKey =
    selectedStartDate && selectedEndDate ? formatRangeKey(selectedStartDate, selectedEndDate) : null;
  const committedRangeHasNote = committedRangeKey ? Boolean(notes.rangeNotes[committedRangeKey]?.trim()) : false;
  const previewStartDate =
    selectedStartDate && !selectedEndDate && hoveredDate
      ? compareDates(hoveredDate, selectedStartDate) < 0
        ? hoveredDate
        : selectedStartDate
      : null;
  const previewEndDate =
    selectedStartDate && !selectedEndDate && hoveredDate
      ? compareDates(hoveredDate, selectedStartDate) < 0
        ? selectedStartDate
        : hoveredDate
      : null;
  const rangeLabel =
    selectedStartDate && selectedEndDate
      ? `${rangeFormatter.format(selectedStartDate)} - ${rangeFormatter.format(selectedEndDate)}`
      : null;
  const eventFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      }),
    [],
  );
  const activeEventKey = activeEventDate ? formatDayKey(activeEventDate) : null;
  const activeDateEvents = activeEventKey ? events[activeEventKey] ?? [] : [];
  const activeEventButtonLabel = activeEventDate
    ? `Open event editor for ${eventFormatter.format(activeEventDate)}`
    : "Select a date to manage events";

  function handleDateSelect(date: Date) {
    setActiveEventDate(date);
    setIsEventPanelOpen(false);
    setEventDraftTitle("");
    setHoveredDate(null);

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

  function handleMiniCalendarJump(date: Date) {
    setCurrentMonth(new Date(date.getFullYear(), date.getMonth(), 1));
    setActiveEventDate(date);
    setIsEventPanelOpen(false);
  }

  function handleHoverDate(date: Date) {
    if (!selectedStartDate || selectedEndDate) {
      return;
    }

    setHoveredDate(date);
  }

  function handleHoverLeave() {
    setHoveredDate(null);
  }

  function handleAddEvent() {
    if (!activeEventDate || !eventDraftTitle.trim()) {
      return;
    }

    const dateKey = formatDayKey(activeEventDate);
    const nextEvent = {
      id: `${dateKey}-${Date.now()}`,
      title: eventDraftTitle.trim(),
    };

    setEvents((currentEvents) => ({
      ...currentEvents,
      [dateKey]: [...(currentEvents[dateKey] ?? []), nextEvent],
    }));
    setEventDraftTitle("");
  }

  function handleRemoveEvent(eventId: string) {
    if (!activeEventDate) {
      return;
    }

    const dateKey = formatDayKey(activeEventDate);
    setEvents((currentEvents) => {
      const nextEvents = (currentEvents[dateKey] ?? []).filter((event) => event.id !== eventId);
      if (nextEvents.length) {
        return {
          ...currentEvents,
          [dateKey]: nextEvents,
        };
      }

      const remainingEvents = { ...currentEvents };
      delete remainingEvents[dateKey];
      return remainingEvents;
    });
  }

  function getEventCount(date: Date) {
    return events[formatDayKey(date)]?.length ?? 0;
  }

  function hasNoteIndicator(date: Date) {
    const isMonthMarker =
      monthHasNote &&
      date.getFullYear() === currentMonth.getFullYear() &&
      date.getMonth() === currentMonth.getMonth() &&
      date.getDate() === 1;
    const isRangeNoteDate =
      committedRangeHasNote && selectedStartDate && selectedEndDate
        ? isDateWithinRange(date, selectedStartDate, selectedEndDate)
        : false;

    return isMonthMarker || isRangeNoteDate;
  }

  function hasRangeIndicator(date: Date) {
    return selectedStartDate && selectedEndDate ? isDateWithinRange(date, selectedStartDate, selectedEndDate) : false;
  }

  const selectionHint = !selectedStartDate
    ? "Tap a day to start a range."
    : selectedStartDate && !selectedEndDate
      ? hoveredDate
        ? "Previewing range. Tap to commit it."
        : "Hover or tap another day to preview and complete the range."
      : "Tap any date to begin a fresh range.";

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="grid h-[calc(100vh-3.5rem)] overflow-hidden lg:grid-cols-[minmax(16rem,30%)_minmax(34rem,70%)]"
    >
      <ImageSection
        monthLabel={monthFormatter.format(currentMonth)}
        yearLabel={yearLabel}
        displayKey={displayKey}
        weeks={weeks}
        today={actualToday}
        rangeStart={selectedStartDate}
        rangeEnd={selectedEndDate}
        onJumpDate={handleMiniCalendarJump}
      />

      <motion.section
        initial={{ opacity: 0, x: 14 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.08, duration: 0.38, ease: "easeOut" }}
        className="overflow-hidden bg-[var(--color-page-surface)] px-3 py-2.5 sm:px-4 lg:px-6 lg:py-3 xl:px-7"
      >
        <div className="relative mx-auto flex h-full max-w-[72rem] flex-col">
          <CalendarHeader
            currentMonth={currentMonth}
            monthLabel={monthFormatter.format(currentMonth)}
            yearLabel={yearLabel}
            displayKey={displayKey}
            onPrevious={() => setCurrentMonth((month) => addMonths(month, -1))}
            onNext={() => setCurrentMonth((month) => addMonths(month, 1))}
            onJump={(date) => setCurrentMonth(date)}
          />

          <div className="mt-1 flex min-h-0 flex-1 flex-col">
            <motion.div
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.3, ease: "easeOut" }}
              className="mb-2 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between"
            >
              <motion.div layout>
                <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.14, duration: 0.22 }} className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[var(--color-text-label)]">
                  Calendar View
                </motion.p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    key={`range-heading-${displayKey}-${rangeLabel ?? "none"}`}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                    className="mt-1 font-serif text-[1.2rem] font-semibold tracking-[-0.04em] text-[var(--color-text-base)]"
                  >
                    {rangeLabel ?? monthYearFormatter.format(currentMonth)}
                  </motion.h2>
                </AnimatePresence>
                <motion.div className="mt-1 flex flex-wrap gap-1" initial="hidden" animate="show" variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.18 } } }}>
                  <motion.span variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -1 }} className="rounded-full bg-[var(--color-neutral-pill)] px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-[var(--color-neutral-pill-text)]">
                    Today Highlighted
                  </motion.span>
                  <motion.span variants={{ hidden: { opacity: 0, y: 4 }, show: { opacity: 1, y: 0 } }} whileHover={{ y: -1 }} className="rounded-full bg-[var(--color-accent-range-pill)] px-1.5 py-0.5 text-[6px] font-semibold uppercase tracking-[0.14em] text-[var(--color-accent)]">
                    Range Aware
                  </motion.span>
                </motion.div>
              </motion.div>
              <motion.p initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.24 }} className="max-w-[11rem] text-[9px] leading-3.5 text-[var(--color-text-dim)]">{selectionHint}</motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.22, duration: 0.24, ease: "easeOut" }}
              className="mb-2 flex items-center justify-between gap-3"
            >
              <p className="text-[9px] leading-4 text-[var(--color-text-dim)]">
                {activeEventDate
                  ? `Selected date: ${eventFormatter.format(activeEventDate)}`
                  : "Select a date first, then open the event editor only if you want to add or review events."}
              </p>
              <motion.button
                type="button"
                onClick={() => setIsEventPanelOpen(true)}
                disabled={!activeEventDate}
                whileHover={activeEventDate ? { y: -1 } : undefined}
                whileTap={activeEventDate ? { scale: 0.98 } : undefined}
                className="inline-flex shrink-0 items-center justify-center rounded-[0.8rem] border border-[var(--color-border-input)] bg-[var(--color-surface-card)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-[var(--color-text-brand)] transition hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:cursor-not-allowed disabled:opacity-45"
                aria-label={activeEventButtonLabel}
              >
                Open Event Editor
              </motion.button>
            </motion.div>

            <div className="min-h-0 flex-1">
              <CalendarGrid
                key={`grid-${displayKey}`}
                weeks={weeks}
                today={actualToday}
                rangeStart={selectedStartDate}
                rangeEnd={selectedEndDate}
                previewStart={previewStartDate}
                previewEnd={previewEndDate}
                activeEventDate={activeEventDate}
                getEventCount={getEventCount}
                hasNoteIndicator={hasNoteIndicator}
                hasRangeIndicator={hasRangeIndicator}
                onSelect={handleDateSelect}
                onHoverDate={handleHoverDate}
                onHoverLeave={handleHoverLeave}
                onSwipePrevious={() => setCurrentMonth((month) => addMonths(month, -1))}
                onSwipeNext={() => setCurrentMonth((month) => addMonths(month, 1))}
              />
            </div>
          </div>

          <EventPanel
            activeDate={isEventPanelOpen ? activeEventDate : null}
            formattedDate={isEventPanelOpen && activeEventDate ? eventFormatter.format(activeEventDate) : null}
            draftTitle={eventDraftTitle}
            events={activeDateEvents}
            onDraftChange={setEventDraftTitle}
            onAddEvent={handleAddEvent}
            onRemoveEvent={handleRemoveEvent}
            onClose={() => setIsEventPanelOpen(false)}
          />
        </div>
      </motion.section>
    </motion.main>
  );
}
