# Interactive Wall Calendar

A frontend-only wall calendar experience built with Next.js 16, React 19, and Tailwind CSS v4. The UI is designed to feel like a modern hanging calendar while supporting date-range selection, persistent notes, and responsive layouts across desktop and mobile.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Features

- Editorial wall-calendar layout with a bundled hero image and tactile card styling
- Monday-first month grid with leading and trailing days
- Date-range selection with start, end, and in-between highlighting
- Third click resets the range and starts a new selection
- Persistent notes stored in `localStorage`
- Separate note scopes for:
  - the visible month
  - the currently selected completed date range
- Responsive layout:
  - desktop: image and calendar side-by-side
  - mobile: stacked image, calendar, then notes
- Bonus polish including month navigation, weekend emphasis, and subtle motion

## State and Storage

All data is managed client-side with React hooks and persisted in `localStorage`.

- `selectedStartDate`
- `selectedEndDate`
- `currentMonth`
- `notes`

Notes use these storage shapes:

- Month note key: `YYYY-MM`
- Range note key: `YYYY-MM-DD__YYYY-MM-DD`

## Scripts

```bash
npm run dev
npm run lint
npm run build
```

## Demo Checklist

For the demo video, show:

- Selecting a start date and end date
- Reversed range selection and automatic correction
- Third-click reset behavior
- Saving and refreshing month notes
- Saving and refreshing selected-range notes
- Desktop and mobile responsive layouts

## Tech Notes

- Built with the Next.js App Router
- Keeps the page server-rendered and limits the `'use client'` boundary to the interactive calendar modules
- Uses no external calendar libraries and no backend/API integration
