"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
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
    <div className="min-h-screen bg-[#f7f5ef] text-[#22312b]">
      <div className="grid h-screen min-h-screen overflow-hidden lg:grid-cols-[11rem_minmax(0,1fr)]">
        <motion.aside
          initial={{ x: -18, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="hidden lg:flex lg:h-screen lg:flex-col lg:border-r lg:border-[#d8ddd4] lg:bg-[#faf8f2]"
        >
          <div className="flex items-center gap-3 px-4 py-5">
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.08, duration: 0.35, ease: "easeOut" }}
              className="flex h-10 w-10 items-center justify-center rounded-[0.8rem] bg-[#4f6f52] text-white shadow-[0_10px_20px_rgba(79,111,82,0.16)]"
            >
              <BrandMark className="h-4.5 w-4.5" />
            </motion.div>
            <motion.div initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.14, duration: 0.3, ease: "easeOut" }}>
              <motion.h2 layout className="text-[1.1rem] font-semibold tracking-[-0.05em] text-[#3d6448]">Atelier</motion.h2>
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.25 }} className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6c7e6d]">
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
                        ? "bg-[#e9eeea] text-[#4f6f52] shadow-[inset_0_1px_0_rgba(255,255,255,0.78)]"
                        : "text-[#5f6c62] hover:bg-[#f1f4ee]",
                    ].join(" ")}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="sidebar-active-pill"
                        className="absolute inset-0 rounded-[0.9rem] bg-[#e9eeea]"
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
          <header className="sticky top-0 z-30 border-b border-[#d8ddd4] bg-[#fbfaf6]/90 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4 px-4 py-2.5 sm:px-5">
              <motion.div initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.35, ease: "easeOut" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#6f856f] lg:hidden">
                  Atelier
                </p>
                <h1 className="text-[1.35rem] font-semibold tracking-[-0.05em] text-[#446246] sm:text-[1.7rem]">
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
                          isActive ? "text-[#4f6f52]" : "text-[#5f6c62] hover:text-[#4f6f52]",
                        ].join(" ")}
                      >
                        {item.label}
                        {isActive ? (
                          <motion.span
                            layoutId="top-nav-active"
                            className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-[#4f6f52]"
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

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="h-[calc(100vh-3.5rem)]"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
