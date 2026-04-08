"use client";

import { useEffect, useMemo } from "react";

const THEME_PRESETS = [
  {
    accent: "#4f6f52",
    accentStrong: "#446246",
    accentContrast: "#35563d",
    accentRange: "#dcebd7",
    accentRangeStrong: "#bfd3bc",
    accentRangeEdge: "#aac4a7",
    accentRangePill: "#edf6e8",
    accentPillText: "#52714e",
    accentMonthPill: "#ddefc8",
    accentMonthPillText: "#567251",
    accentTrack: "#d6e6d0",
    accentRing: "rgb(111 146 113 / 0.7)",
    accentTopGlow: "rgb(86 122 88 / 0.16)",
    textBrand: "#446246",
    textBrandStrong: "#3d6448",
    heroBg: "#18343a",
    heroCopy: "rgb(212 232 227 / 0.72)",
    heroBody: "rgb(217 235 231 / 0.84)",
  },
  {
    accent: "#8a5a44",
    accentStrong: "#714733",
    accentContrast: "#613827",
    accentRange: "#f2dfd4",
    accentRangeStrong: "#dfc0af",
    accentRangeEdge: "#d3ab95",
    accentRangePill: "#f6e9e0",
    accentPillText: "#81503c",
    accentMonthPill: "#efd3c3",
    accentMonthPillText: "#86523d",
    accentTrack: "#e7caba",
    accentRing: "rgb(138 90 68 / 0.65)",
    accentTopGlow: "rgb(138 90 68 / 0.18)",
    textBrand: "#714733",
    textBrandStrong: "#6a422f",
    heroBg: "#2f2623",
    heroCopy: "rgb(242 220 210 / 0.74)",
    heroBody: "rgb(245 230 222 / 0.82)",
  },
  {
    accent: "#315f73",
    accentStrong: "#284c5c",
    accentContrast: "#1f414f",
    accentRange: "#d8e9ef",
    accentRangeStrong: "#b4d0da",
    accentRangeEdge: "#95bcc8",
    accentRangePill: "#e5f2f7",
    accentPillText: "#315f73",
    accentMonthPill: "#cae4ec",
    accentMonthPillText: "#2b5a6d",
    accentTrack: "#c5dfe8",
    accentRing: "rgb(49 95 115 / 0.68)",
    accentTopGlow: "rgb(49 95 115 / 0.18)",
    textBrand: "#315f73",
    textBrandStrong: "#284c5c",
    heroBg: "#132831",
    heroCopy: "rgb(211 232 239 / 0.74)",
    heroBody: "rgb(221 239 244 / 0.82)",
  },
  {
    accent: "#6e4f88",
    accentStrong: "#5b4172",
    accentContrast: "#4a345d",
    accentRange: "#e7def0",
    accentRangeStrong: "#cfbee1",
    accentRangeEdge: "#b89dce",
    accentRangePill: "#efe7f7",
    accentPillText: "#674a80",
    accentMonthPill: "#e0d0f0",
    accentMonthPillText: "#644879",
    accentTrack: "#dac9ea",
    accentRing: "rgb(110 79 136 / 0.68)",
    accentTopGlow: "rgb(110 79 136 / 0.18)",
    textBrand: "#5b4172",
    textBrandStrong: "#513866",
    heroBg: "#221a2f",
    heroCopy: "rgb(228 216 241 / 0.74)",
    heroBody: "rgb(235 225 245 / 0.82)",
  },
] as const;

export function useCalendarTheme(currentMonth: Date) {
  const theme = useMemo(
    () => THEME_PRESETS[Math.abs(currentMonth.getMonth()) % THEME_PRESETS.length],
    [currentMonth],
  );

  useEffect(() => {
    const root = document.documentElement;
    const entries = [
      ["--color-accent", theme.accent],
      ["--color-accent-strong", theme.accentStrong],
      ["--color-accent-contrast", theme.accentContrast],
      ["--color-accent-range", theme.accentRange],
      ["--color-accent-range-strong", theme.accentRangeStrong],
      ["--color-accent-range-edge", theme.accentRangeEdge],
      ["--color-accent-range-pill", theme.accentRangePill],
      ["--color-accent-pill-text", theme.accentPillText],
      ["--color-accent-month-pill", theme.accentMonthPill],
      ["--color-accent-month-pill-text", theme.accentMonthPillText],
      ["--color-accent-track", theme.accentTrack],
      ["--color-accent-ring", theme.accentRing],
      ["--color-accent-top-glow", theme.accentTopGlow],
      ["--color-text-brand", theme.textBrand],
      ["--color-text-brand-strong", theme.textBrandStrong],
      ["--color-hero-bg", theme.heroBg],
      ["--color-hero-copy", theme.heroCopy],
      ["--color-hero-body", theme.heroBody],
    ] as const;

    entries.forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });

    return () => {
      entries.forEach(([name]) => {
        root.style.removeProperty(name);
      });
    };
  }, [theme]);
}
