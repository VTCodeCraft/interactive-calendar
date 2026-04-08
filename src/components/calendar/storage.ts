import { formatDayKey, parseStoredDate, startOfMonth } from "@/utils/date-utils";
import type { EventsState, NotesState } from "@/utils/types";

export const STORAGE_KEYS = {
  start: "interactive-calendar:selected-start",
  end: "interactive-calendar:selected-end",
  month: "interactive-calendar:current-month",
  notes: "interactive-calendar:notes",
  events: "interactive-calendar:events",
} as const;

export const DEFAULT_NOTES: NotesState = {
  monthNotes: {},
  rangeNotes: {},
};

export const DEFAULT_EVENTS: EventsState = {};

export function readNotesState() {
  if (typeof window === "undefined") {
    return DEFAULT_NOTES;
  }

  const storedNotes = window.localStorage.getItem(STORAGE_KEYS.notes);
  if (!storedNotes) {
    return DEFAULT_NOTES;
  }

  try {
    const parsed = JSON.parse(storedNotes) as NotesState;
    return {
      monthNotes: parsed.monthNotes ?? {},
      rangeNotes: parsed.rangeNotes ?? {},
    };
  } catch {
    return DEFAULT_NOTES;
  }
}

export function writeNotesState(notes: NotesState) {
  window.localStorage.setItem(STORAGE_KEYS.notes, JSON.stringify(notes));
}

export function readEventsState() {
  if (typeof window === "undefined") {
    return DEFAULT_EVENTS;
  }

  const storedEvents = window.localStorage.getItem(STORAGE_KEYS.events);
  if (!storedEvents) {
    return DEFAULT_EVENTS;
  }

  try {
    const parsed = JSON.parse(storedEvents) as EventsState;
    return Object.fromEntries(
      Object.entries(parsed).map(([dateKey, events]) => [
        dateKey,
        Array.isArray(events)
          ? events.filter(
              (event): event is { id: string; title: string } =>
                Boolean(event) && typeof event.id === "string" && typeof event.title === "string",
            )
          : [],
      ]),
    );
  } catch {
    return DEFAULT_EVENTS;
  }
}

export function writeEventsState(events: EventsState) {
  window.localStorage.setItem(STORAGE_KEYS.events, JSON.stringify(events));
}

export function readCalendarStorageState() {
  const fallbackMonth = startOfMonth(new Date());

  if (typeof window === "undefined") {
    return {
      currentMonth: fallbackMonth,
      selectedStartDate: null as Date | null,
      selectedEndDate: null as Date | null,
      notes: DEFAULT_NOTES,
      events: DEFAULT_EVENTS,
      isHydrated: false,
    };
  }

  const storedMonth = parseStoredDate(window.localStorage.getItem(STORAGE_KEYS.month));
  const storedStart = parseStoredDate(window.localStorage.getItem(STORAGE_KEYS.start));
  const storedEnd = parseStoredDate(window.localStorage.getItem(STORAGE_KEYS.end));

  return {
    currentMonth: storedMonth ? startOfMonth(storedMonth) : fallbackMonth,
    selectedStartDate: storedStart,
    selectedEndDate: storedEnd,
    notes: readNotesState(),
    events: readEventsState(),
    isHydrated: true,
  };
}

export function readCalendarServerState() {
  return {
    currentMonth: startOfMonth(new Date()),
    selectedStartDate: null as Date | null,
    selectedEndDate: null as Date | null,
    notes: DEFAULT_NOTES,
    events: DEFAULT_EVENTS,
    isHydrated: false,
  };
}

export function readCalendarClientState() {
  return readCalendarStorageState();
}

export function persistCalendarMonth(currentMonth: Date) {
  window.localStorage.setItem(STORAGE_KEYS.month, formatDayKey(currentMonth));
}

export function persistCalendarRange(start: Date | null, end: Date | null) {
  if (start) {
    window.localStorage.setItem(STORAGE_KEYS.start, formatDayKey(start));
  } else {
    window.localStorage.removeItem(STORAGE_KEYS.start);
  }

  if (end) {
    window.localStorage.setItem(STORAGE_KEYS.end, formatDayKey(end));
  } else {
    window.localStorage.removeItem(STORAGE_KEYS.end);
  }
}
