# Interactive Wall Calendar

A frontend-only wall calendar experience built with Next.js 16, React 19, Tailwind CSS v4, and Motion. The project turns a wall-calendar-inspired design into a polished, interactive application with date-range selection, persistent notes, route-based workspaces, responsive layout behavior, and a centralized theme system.

## Overview

This project is designed around two main user spaces:

- `Calendar`: the visual calendar experience for browsing months and selecting date ranges
- `Notes`: a dedicated writing workspace for month notes and range-specific notes

The interface uses a shared app shell with:

- a persistent left sidebar on desktop
- top navigation for quick route switching
- a large editorial hero panel
- an interactive calendar grid
- a separate notes workspace route

Everything is client-side only. There is no backend, no API integration, and no external calendar library.

## Tech Stack

- Next.js `16.2.2`
- React `19.2.4`
- React DOM `19.2.4`
- Tailwind CSS `v4`
- Motion `12.38.0`
- TypeScript
- ESLint

## Implemented Features

### 1. Interactive Calendar UI

- Wall-calendar-inspired layout with a large visual hero section
- Editorial, minimal interface styling
- Shared shell with sidebar and header
- Responsive split layout on desktop
- Compact, viewport-conscious calendar sizing

### 2. Calendar Grid

- Monday-first weekday order: `Mon` to `Sun`
- Correct month alignment
- Leading and trailing days from adjacent months
- 5-row minimum layout with automatic 6-row support when needed
- Weekend emphasis
- Today indicator
- Outside-month styling

### 3. Date Range Selection

- First click selects start date
- Second click selects end date
- If the second date is earlier than the first, the range is automatically reordered
- Third click resets the previous range and starts a fresh selection
- Start date, end date, and in-between dates are visually distinct
- Range selection persists in localStorage

### 4. Month Navigation

- Previous and next month controls
- Clickable month/year heading
- Fast jump picker for month and year
- Outside-click close behavior for the month/year picker
- Current month view persists in localStorage

### 5. Notes System

- Dedicated `/notes` workspace route
- Month note editing for the currently visible month
- Range note editing for the currently selected completed date range
- Month notes are always editable
- Range notes unlock when a complete date range exists
- Notes persist in localStorage
- Notes page hydrates both notes data and saved range state correctly

### 6. Route Structure

- `/` for the calendar experience
- `/notes` for the notes workspace
- Shared shell applied through the root layout

### 7. Motion and Interaction Design

- App shell reveal animation
- Sidebar item entrances
- Active navigation indicator transitions
- Route/page transitions between calendar and notes
- Hero panel entrance and keyed month transitions
- Month heading transitions on month switch
- Picker open/close animation
- Grid and weekday entrance animation
- Cell hover, tap, and layout motion
- Notes workspace card and content transitions

### 8. Responsive Behavior

- Desktop layout uses sidebar + hero + calendar workspace
- Mobile keeps the shell functional and adapts the content stack
- Calendar grid sizing was compacted to reduce scrolling on typical desktop screens

### 9. Centralized Theme Tokens

The project now uses a token-driven theme defined in:

- [globals.css](C:/Users/trvis/OneDrive/Desktop/WORK/Projects/interactive-calendar/src/app/globals.css)

This file contains semantic CSS variables for:

- page backgrounds
- surfaces
- text colors
- border colors
- accent colors
- hero colors
- gradients
- shadows
- UI state colors

If you want to change the visual theme, update the variables in `globals.css` and the new colors will propagate across the app.

## Project Structure

```text
src/
  app/
    layout.tsx
    page.tsx
    notes/page.tsx
    globals.css

  components/
    app-shell.tsx
    calendar/
      calendar-cell.tsx
      calendar-experience.tsx
      calendar-grid.tsx
      calendar-header.tsx
      icons.tsx
      image-section.tsx
      notes-section.tsx
      storage.ts
    notes/
      notes-workspace.tsx

  utils/
    date-utils.ts
    types.ts
```

## Core Architecture

### App Shell

`src/components/app-shell.tsx`

- shared shell used across routes
- desktop sidebar navigation
- top navigation
- animated route container

### Calendar Experience

`src/components/calendar/calendar-experience.tsx`

- owns the main calendar page state
- hydrates client-side stored values
- handles date selection logic
- persists month and range state
- renders the calendar layout

### Calendar Header

`src/components/calendar/calendar-header.tsx`

- shows current month and year
- supports previous/next month navigation
- supports fast month/year jumping
- closes picker on outside click

### Calendar Grid and Cell

`src/components/calendar/calendar-grid.tsx`
`src/components/calendar/calendar-cell.tsx`

- renders weekday labels and week rows
- applies today, weekend, outside-month, and range styles
- supports selection interaction

### Image Section

`src/components/calendar/image-section.tsx`

- renders the hero artwork
- shows month and year badges
- includes editorial overlay styling
- reacts visually on month changes

### Notes Workspace

`src/components/notes/notes-workspace.tsx`

- renders the dedicated notes route
- supports month note editing
- supports selected-range note editing
- reads and writes persisted notes state

### Storage Layer

`src/components/calendar/storage.ts`

- centralizes all localStorage access
- provides server-safe fallback state
- handles hydration-friendly reads

### Date Utilities

`src/utils/date-utils.ts`

- month grid generation
- month math
- date comparison
- stable date key formatting
- date range membership checks

## State Model

The application manages the following client-side state:

- `currentMonth`
- `selectedStartDate`
- `selectedEndDate`
- `notes`
- `isHydrated`

Notes use this shape:

```ts
type NotesState = {
  monthNotes: Record<string, string>;
  rangeNotes: Record<string, string>;
};
```

## Local Storage

### Storage Keys

Defined in `src/components/calendar/storage.ts`:

- `interactive-calendar:selected-start`
- `interactive-calendar:selected-end`
- `interactive-calendar:current-month`
- `interactive-calendar:notes`

### Note Key Formats

- Month note key: `YYYY-MM`
- Range note key: `YYYY-MM-DD__YYYY-MM-DD`

### Persistence Behavior

- current month persists
- selected range persists
- month notes persist
- range notes persist
- notes workspace reads the saved selected range so it can unlock range note editing correctly

## Theme System

The theme is centralized in `src/app/globals.css`.

It includes tokens for:

- `--color-page-*`
- `--color-text-*`
- `--color-border-*`
- `--color-surface-*`
- `--color-accent-*`
- `--color-neutral-*`
- `--color-hero-*`
- `--shadow-*`
- `--gradient-*`

This means you do not need to hunt through components to update the color palette.

## Styling Notes

- Uses Tailwind utility classes for spacing, layout, typography, and sizing
- Uses CSS variables for theme colors, surfaces, gradients, and shadows
- Keeps typography and overall look editorial and tactile
- Uses a custom hero visual from the `public` folder

## Motion Notes

Motion is implemented with the `motion` package.

Animated areas include:

- sidebar
- header
- navigation indicators
- route transitions
- hero image panel
- month heading
- selected-window heading
- weekday labels
- week rows
- day cells
- notes workspace cards

## Accessibility and UX Notes

- Buttons include labels for navigation and controls
- Month jump picker closes when clicking outside
- Focus-visible styles are included on interactive controls
- Disabled range notes field clearly indicates locked state until a range is selected

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run build
npm run start
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

### 3. Open the app

Visit:

[http://localhost:3000](http://localhost:3000)

## How to Use the App

### Calendar Page

1. Open the home route `/`
2. Click one date to set the range start
3. Click another date to set the range end
4. Use previous/next controls to browse months
5. Click the month/year heading to jump directly to a month and year

### Notes Page

1. Open `/notes`
2. Write month notes for the visible month
3. Write range notes for the currently selected date range
4. Refresh the page to confirm persistence

## Current Routes

- `/`
- `/notes`

## No-Backend Constraint

This project intentionally does not include:

- backend services
- API routes
- database integration
- authentication
- external calendar libraries

## Verification

The project has been verified with:

- `npm.cmd run lint`
- `npm.cmd run build`

## Summary

This project currently delivers:

- an interactive wall calendar
- date range selection
- persistent notes
- dedicated notes route
- fast month/year jump picker
- centralized theme variables
- site-wide motion
- responsive route-based UI

All core behavior is implemented on the client, with theme control centralized in one global stylesheet.
