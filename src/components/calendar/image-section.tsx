"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

type ImageSectionProps = {
  monthLabel: string;
  yearLabel: string;
  displayKey: string;
};

export function ImageSection({ monthLabel, yearLabel, displayKey }: ImageSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.985 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative min-h-[10rem] overflow-hidden border-b border-[#d7ddd4] bg-[#18343a] lg:h-full lg:min-h-0 lg:border-b-0 lg:border-r"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={displayKey}
          initial={{ scale: 1.06, opacity: 0.72 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.985, opacity: 0.68 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <Image
            src="/calendar-hero.svg"
            alt="Featured atelier visual"
            fill
            priority
            className="object-cover object-center opacity-80"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </motion.div>
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,18,18,0.1)_0%,rgba(10,22,23,0.12)_35%,rgba(9,16,16,0.82)_100%)]"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.16, duration: 0.55 }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(120,203,199,0.22),transparent_30%),radial-gradient(circle_at_70%_15%,rgba(255,255,255,0.08),transparent_20%)]"
      />

      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: [0, -2, 0], opacity: 1 }}
        transition={{
          opacity: { delay: 0.2, duration: 0.4, ease: "easeOut" },
          y: { delay: 0.25, duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
        }}
        className="absolute inset-x-4 top-3 rounded-[0.9rem] border border-white/12 bg-white/5 p-2 backdrop-blur-sm lg:left-4 lg:right-auto lg:top-4 lg:w-[10rem]"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-white/60">Curated Issue</p>
        <div className="mt-1.5 rounded-[0.75rem] border border-white/10 bg-white/8 p-2 shadow-[0_10px_18px_rgba(0,0,0,0.14)]">
          <div className="mb-1.5 h-5 rounded-lg bg-white/12" />
          <div className="mb-2 h-2 rounded-full bg-white/12" />
          <div className="mb-2 h-2 w-5/6 rounded-full bg-white/12" />
          <div className="h-2 w-4/6 rounded-full bg-white/12" />
        </div>
      </motion.div>

      <motion.div
        key={displayKey}
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.24, duration: 0.5, ease: "easeOut" }}
        className="absolute inset-x-4 bottom-3 lg:inset-x-4 lg:bottom-4"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`hero-copy-${displayKey}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-xl"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#d4e8e3]/72">
              The Digital Atelier
            </p>
            <h2 className="mt-2 font-serif text-[1.7rem] font-semibold leading-[0.94] text-white sm:text-[2rem] lg:text-[2.1rem]">
              The tactile side of planning.
            </h2>
            <p className="mt-1.5 max-w-sm text-[10px] leading-4 text-[#d9ebe7]/84">
              Craft your month with a gallery-like calendar, quiet structure, and notes that feel more editorial than utilitarian.
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`hero-meta-${displayKey}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="mt-2.5 flex flex-wrap items-center gap-1"
          >
            <motion.div whileHover={{ y: -1 }} className="rounded-full border border-white/12 bg-white/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
              {monthLabel}
            </motion.div>
            <motion.div whileHover={{ y: -1 }} className="rounded-full border border-white/12 bg-white/10 px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.12em] text-white/80 backdrop-blur-sm">
              {yearLabel}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </motion.section>
  );
}
