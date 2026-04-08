export type NotesState = {
  monthNotes: Record<string, string>;
  rangeNotes: Record<string, string>;
};

export type CalendarEvent = {
  id: string;
  title: string;
};

export type EventsState = Record<string, CalendarEvent[]>;

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};
