export type NotesState = {
  monthNotes: Record<string, string>;
  rangeNotes: Record<string, string>;
};

export type CalendarDay = {
  date: Date;
  isCurrentMonth: boolean;
};
