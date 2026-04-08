"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BellIcon,
  BrandMark,
  HelpIcon,
  LogoutIcon,
  MonthIcon,
  NoteIcon,
  SettingsIcon,
} from "@/components/calendar/icons";

const sidebarItems = [
  { href: "/", label: "Calendar", icon: MonthIcon },
  { href: "/notes", label: "Notes", icon: NoteIcon },
];

const topItems = [
  { href: "/", label: "Calendar" },
  { href: "/notes", label: "Notes" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f5ef] text-[#22312b]">
      <div className="grid h-screen min-h-screen overflow-hidden lg:grid-cols-[11rem_minmax(0,1fr)]">
        <aside className="hidden lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-[#d8ddd4] lg:bg-[#faf8f2]">
          <div className="flex items-center gap-3 px-4 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-[0.8rem] bg-[#4f6f52] text-white shadow-[0_10px_20px_rgba(79,111,82,0.16)]">
              <BrandMark className="h-4.5 w-4.5" />
            </div>
            <div>
              <h2 className="text-[1.1rem] font-semibold tracking-[-0.05em] text-[#3d6448]">Atelier</h2>
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6c7e6d]">
                Workspace
              </p>
            </div>
          </div>

          <nav className="mt-4 flex-1 space-y-1 px-3">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "flex items-center gap-3 rounded-[0.9rem] px-3 py-2.5 transition",
                    isActive
                      ? "bg-[#e9eeea] text-[#4f6f52] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]"
                      : "text-[#5f6c62] hover:bg-[#f1f4ee]",
                  ].join(" ")}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-[15px] font-medium tracking-[-0.02em]">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 border-t border-[#dde2d9] px-3 py-4">
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-[0.9rem] px-3 py-2.5 text-left text-[#5f6c62] transition hover:bg-[#f1f4ee]"
            >
              <HelpIcon />
              <span className="text-[15px] font-medium tracking-[-0.02em]">Help</span>
            </button>
            <button
              type="button"
              className="flex w-full items-center gap-3 rounded-[0.9rem] px-3 py-2.5 text-left text-[#5f6c62] transition hover:bg-[#f1f4ee]"
            >
              <LogoutIcon />
              <span className="text-[15px] font-medium tracking-[-0.02em]">Sign Out</span>
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-[#d8ddd4] bg-[#fbfaf6]/90 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#6f856f] lg:hidden">
                  Atelier
                </p>
                <h1 className="text-[1.35rem] font-semibold tracking-[-0.05em] text-[#446246] sm:text-[1.7rem]">
                  The Tactile Chronique
                </h1>
              </div>

              <nav className="hidden items-center gap-6 md:flex">
                {topItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={[
                        "border-b-2 pb-1 text-[15px] font-medium tracking-[-0.03em] transition",
                        isActive
                          ? "border-[#4f6f52] text-[#4f6f52]"
                          : "border-transparent text-[#5f6c62] hover:text-[#4f6f52]",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f6c62] transition hover:bg-[#eef1ea] hover:text-[#4f6f52]"
                  aria-label="Notifications"
                >
                  <BellIcon />
                </button>
                <button
                  type="button"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#5f6c62] transition hover:bg-[#eef1ea] hover:text-[#4f6f52]"
                  aria-label="Settings"
                >
                  <SettingsIcon />
                </button>
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d9ded5] bg-white text-[11px] font-semibold uppercase tracking-[0.08em] text-[#4f6f52] shadow-sm">
                  TA
                </div>
              </div>
            </div>
          </header>

          {children}
        </div>
      </div>
    </div>
  );
}
