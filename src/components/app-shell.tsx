"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import {
  BrandMark,
  MonthIcon,
  NoteIcon,
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
    <div className="min-h-screen bg-[var(--color-page-bg)] text-[var(--color-text-base)]">
      <div className="grid h-screen min-h-screen overflow-hidden lg:grid-cols-[11rem_minmax(0,1fr)]">
        <motion.aside
          initial={{ x: -18, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="hidden lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-[var(--color-border-base)] lg:bg-[var(--color-page-sidebar)]"
        >
          <div className="flex items-center gap-3 px-4 py-5">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
              className="flex h-10 w-10 items-center justify-center rounded-[0.8rem] bg-[var(--color-accent)] text-[var(--color-text-inverse)] shadow-[var(--shadow-brand)]"
            >
              <BrandMark className="h-4.5 w-4.5" />
            </motion.div>
            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.14, duration: 0.3, ease: "easeOut" }}>
              <motion.h2 layout className="text-[1.1rem] font-semibold tracking-[-0.05em] text-[var(--color-text-brand-strong)]">Atelier</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.25 }} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--color-text-soft)]">
                Workspace
              </motion.p>
            </motion.div>
          </div>

          <nav className="mt-4 flex-1 space-y-1 px-3">
            {sidebarItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <motion.div
                  key={item.href}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.08 + index * 0.06, duration: 0.3, ease: "easeOut" }}
                >
                  <Link
                    href={item.href}
                    className={[
                      "relative flex items-center gap-3 rounded-[0.9rem] px-3 py-2.5 transition",
                      isActive
                        ? "bg-[var(--color-neutral-pill)] text-[var(--color-accent)] shadow-[var(--shadow-inset-nav)]"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface-subtle)]",
                    ].join(" ")}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 rounded-[0.9rem] bg-[var(--color-neutral-pill)]"
                        transition={{ type: "spring", stiffness: 320, damping: 28 }}
                      />
                    ) : null}
                    <motion.span whileHover={{ rotate: isActive ? 0 : -6, scale: 1.05 }} className="relative z-10 inline-flex">
                      <Icon className="h-4 w-4" />
                    </motion.span>
                    <span className="relative z-10 text-[15px] font-medium tracking-[-0.02em]">{item.label}</span>
                  </Link>
                </motion.div>
              );
            })}

          </nav>
        </motion.aside>

        <div className="min-w-0">
          <header className="sticky top-0 z-30 border-b border-[var(--color-border-base)] bg-[var(--color-page-header)] backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[var(--color-text-subtle)] lg:hidden">
                  Atelier
                </p>
                <h1 className="text-[1.35rem] font-semibold tracking-[-0.05em] text-[var(--color-text-brand)] sm:text-[1.7rem]">
                  The Tactile Chronique
                </h1>
              </motion.div>

              <nav className="hidden items-center gap-6 md:flex">
                {topItems.map((item) => {
                  const isActive = pathname === item.href;

                  return (
                    <motion.div key={item.href} whileHover={{ y: -1 }}>
                      <Link
                        href={item.href}
                        className={[
                          "relative pb-1 text-[15px] font-medium tracking-[-0.03em] transition",
                          isActive ? "text-[var(--color-accent)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-accent)]",
                        ].join(" ")}
                      >
                        {item.label}
                        {isActive ? (
                          <motion.span
                            layoutId="top-nav-active"
                            className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[var(--color-accent)]"
                            transition={{ type: "spring", stiffness: 320, damping: 28 }}
                          />
                        ) : null}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="w-6 md:w-16" aria-hidden="true" />
            </div>
          </header>

          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="h-[calc(100vh-3.5rem)]"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
