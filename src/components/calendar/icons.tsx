type IconProps = {
  className?: string;
};

function iconClass(className?: string) {
  return ["h-5 w-5", className].filter(Boolean).join(" ");
}

export function BrandMark({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path d="M5 19V7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 19V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 19V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 19L17.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function GridIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <rect x="4" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function MonthIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M7 3.75V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M17 3.75V7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M3.5 9.5H20.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function AnnualIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 10H20" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 4V20" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function NoteIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path
        d="M7 4.5H13.5L18.5 9.5V19A1.5 1.5 0 0 1 17 20.5H7A1.5 1.5 0 0 1 5.5 19V6A1.5 1.5 0 0 1 7 4.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M13 4.75V9.75H18" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

export function HelpIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M9.75 9.75A2.5 2.5 0 1 1 14 11.6C13 12.15 12 12.9 12 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="12" cy="17.2" r="1" fill="currentColor" />
    </svg>
  );
}

export function LogoutIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path d="M10 4.75H6.75A1.75 1.75 0 0 0 5 6.5V17.5C5 18.47 5.78 19.25 6.75 19.25H10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M13 8L17 12L13 16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 12H17" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function BellIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path d="M7.5 10.25A4.5 4.5 0 0 1 12 5.75A4.5 4.5 0 0 1 16.5 10.25V13.5L18.25 16H5.75L7.5 13.5V10.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M10 18A2.25 2.25 0 0 0 14 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function SettingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 4V6.1M12 17.9V20M20 12H17.9M6.1 12H4M17.65 6.35L16.16 7.84M7.84 16.16L6.35 17.65M17.65 17.65L16.16 16.16M7.84 7.84L6.35 6.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path d="M14.5 7L9.5 12L14.5 17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ChevronRightIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path d="M9.5 7L14.5 12L9.5 17" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
    </svg>
  );
}

export function EditIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={iconClass(className)} aria-hidden="true">
      <path d="M4.75 19.25L8.6 18.45L17.75 9.3A1.95 1.95 0 1 0 14.99 6.54L5.84 15.69L4.75 19.25Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M13.75 7.75L16.55 10.55" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
