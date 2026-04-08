import { formatDayKey, parseStoredDate, startOfMonth } from "@/utils/date-utils";
import type { NotesState } from "@/utils/types";

export const STORAGE_KEYS = {
  start: "interactive-calendar:selected-start",
  end: "interactive-calendar:selected-end",
  month: "interactive-calendar:current-month",
  notes: "interactive-calendar:notes",
} as const;

export const DEFAULT_NOTES: NotesState = {
  monthNotes: {},
  rangeNotes: {},
};

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

export function readCalendarStorageState() {
  const fallbackMonth = startOfMonth(new Date());

  if (typeof window === "undefined") {
    return {
      currentMonth: fallbackMonth,
      selectedStartDate: null as Date | null,
      selectedEndDate: null as Date | null,
      notes: DEFAULT_NOTES,
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
    isHydrated: true,
  };
}

export function readCalendarServerState() {
  return {
    currentMonth: startOfMonth(new Date()),
    selectedStartDate: null as Date | null,
    selectedEndDate: null as Date | null,
    notes: DEFAULT_NOTES,
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
