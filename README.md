# Livingway

> Live how you love. A quiet place to move, breathe and gather.

Livingway is a wellness booking app — browse and reserve classes (yoga, sound
baths, meditation, breathwork, pilates) and book studio spaces by the hour.
This is a faithful React rebuild of the Livingway product design, presented in
an on-screen phone frame.

## Features

- **Home** — today's classes, a manifesto, and featured spaces to gather.
- **Discover** — browse the class schedule with type filters and live result counts.
- **Class detail** — description, your guide, what to bring, and location, with a
  sticky reserve bar.
- **Spaces** — bookable studios with capacity, hourly rate and amenities.
- **Booking flow** — a three-step sheet: choose drop-in or a class credit →
  checkout → confirmation. (Payment is a placeholder; no charge is taken.)
- **My bookings** — upcoming bookings (reschedule / cancel) and past ones (book again).
- **You** — profile, membership card with class-credit balance, and account settings.
- **Membership** — Drop-in, Wellness Pass and Unlimited tiers.

## Tech stack

- [React 18](https://react.dev/)
- [Vite 6](https://vite.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)

State is held in a single `AppProvider` context (`src/store.jsx`) that mirrors
the original design's state machine.

## Getting started

```bash
npm install
npm run dev      # start the dev server
npm run build    # production build to dist/
npm run preview  # preview the production build
```

## Project structure

```
src/
  App.jsx              # phone frame + screen router
  store.jsx            # app state machine (context)
  data.js              # classes, spaces, tiers, palette + helpers
  components/          # StatusBar, TabBar, Toast, BookingSheet
  screens/             # Home, Discover, ClassDetail, Spaces,
                       # SpaceDetail, Bookings, Account, Membership
  index.css            # Tailwind theme tokens, fonts, keyframes
```

## Notes

Photography from the source design is represented with soft, category-tinted
gradient washes so the app is fully self-contained. Fonts (Cormorant Garamond +
Hanken Grotesk) load from Google Fonts.
