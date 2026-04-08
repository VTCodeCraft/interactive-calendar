import type { CalendarDay } from "@/utils/types";

const WEEK_START_OFFSET = 6;

export const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function addMonths(date: Date, amount: number) {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

export function isSameDay(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function isSameMonth(left: Date, right: Date) {
  return left.getFullYear() === right.getFullYear() && left.getMonth() === right.getMonth();
}

export function compareDates(left: Date, right: Date) {
  return stripTime(left).getTime() - stripTime(right).getTime();
}

export function stripTime(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function formatDayKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${year}-${month}`;
}

export function formatRangeKey(start: Date, end: Date) {
  return `${formatDayKey(start)}__${formatDayKey(end)}`;
}

export function parseStoredDate(value: string | null) {
  if (!value) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(year, month - 1, day);
}

export function buildMonthGrid(month: Date) {
  const monthStart = startOfMonth(month);
  const monthEnd = new Date(month.getFullYear(), month.getMonth() + 1, 0);
  const leadingDays = (monthStart.getDay() + WEEK_START_OFFSET) % 7;
  const trailingDays = (7 - ((leadingDays + monthEnd.getDate()) % 7 || 7)) % 7;
  const baseTotalDays = leadingDays + monthEnd.getDate() + trailingDays;
  const totalDays = baseTotalDays < 35 ? 35 : baseTotalDays;
  const gridStart = new Date(month.getFullYear(), month.getMonth(), 1 - leadingDays);
  const days: CalendarDay[] = Array.from({ length: totalDays }, (_, index) => {
    const date = new Date(
      gridStart.getFullYear(),
      gridStart.getMonth(),
      gridStart.getDate() + index,
    );

    return {
      date,
      isCurrentMonth: isSameMonth(date, monthStart),
    };
  });

  const weeks: CalendarDay[][] = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }

  return weeks;
}

export function isDateWithinRange(date: Date, start: Date | null, end: Date | null) {
  if (!start || !end) {
    return false;
  }

  const value = stripTime(date).getTime();
  return value >= stripTime(start).getTime() && value <= stripTime(end).getTime();
}
