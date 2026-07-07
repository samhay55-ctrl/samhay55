import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { supabase, rowToClass, rowToSpace } from './supabase.js'
import { FALLBACK_CLASSES, FALLBACK_SPACES } from './data.js'

const AppContext = createContext(null)

const INITIAL_BOOKINGS = [
  { id: 'bk1', kind: 'class', ref: 2, date: 'Today', time: '19:00', status: 'upcoming' },
  { id: 'bk2', kind: 'space', ref: 's1', date: 'Sat 5 Jul', time: '10:00–12:00', status: 'upcoming' },
  { id: 'bk3', kind: 'class', ref: 5, date: 'Mon 23 Jun', time: '12:15', status: 'past' },
  { id: 'bk4', kind: 'class', ref: 4, date: 'Thu 19 Jun', time: '18:30', status: 'past' },
]

export function AppProvider({ children }) {
  const [state, setState] = useState({
    screen: 'home',
    returnTo: 'discover',
    selectedClassId: null,
    selectedSpaceId: null,
    filterType: 'All',
    filterLoc: 'All',
    booking: null, // { classId, plan: 'dropin' | 'credit' | null, step: 'options' | 'checkout' | 'confirm' }
    credits: 4,
    tier: 'Wellness Pass',
    bookings: INITIAL_BOOKINGS,
    toast: null,
    // Live content (loaded from Supabase, falls back to bundled data)
    classes: [],
    spaces: [],
    settings: {},
    loading: true,
  })

  const patch = useCallback((p) => setState((s) => ({ ...s, ...p })), [])

  // ---- Load classes & spaces from Supabase (with a graceful fallback) ----
  useEffect(() => {
    let cancelled = false
    const timeout = (ms) =>
      new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))
    ;(async () => {
      try {
        // If Supabase is slow or unreachable, fall back rather than hang.
        const [c, s, st] = await Promise.race([
          Promise.all([
            supabase.from('classes').select('*').order('sort_order'),
            supabase.from('spaces').select('*').order('sort_order'),
            supabase.from('settings').select('*'),
          ]),
          timeout(6000),
        ])
        if (cancelled) return
        const classes = c.error || !c.data?.length ? FALLBACK_CLASSES : c.data.map(rowToClass)
        const spaces = s.error || !s.data?.length ? FALLBACK_SPACES : s.data.map(rowToSpace)
        const settings =
          st.error || !st.data ? {} : Object.fromEntries(st.data.map((r) => [r.key, r.value]))
        patch({ classes, spaces, settings, loading: false })
      } catch {
        if (!cancelled)
          patch({ classes: FALLBACK_CLASSES, spaces: FALLBACK_SPACES, settings: {}, loading: false })
      }
    })()
    return () => {
      cancelled = true
    }
  }, [patch])

  const toastTimer = useRef(null)
  const showToast = useCallback((msg) => {
    patch({ toast: msg })
    clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => patch({ toast: null }), 2400)
  }, [patch])

  const actions = useMemo(() => {
    const go = (screen) => patch({ screen, booking: null })

    return {
      go,
      goMembership: () => patch({ screen: 'membership' }),
      goAccount: () => patch({ screen: 'account' }),

      openClass: (id, from) =>
        setState((s) => ({
          ...s,
          selectedClassId: id,
          screen: 'classDetail',
          returnTo: from || (s.screen === 'home' ? 'home' : 'discover'),
        })),

      openSpace: (id, from) =>
        setState((s) => ({
          ...s,
          selectedSpaceId: id,
          screen: 'spaceDetail',
          returnTo: from || (s.screen === 'home' ? 'home' : 'spaces'),
        })),

      back: () => setState((s) => ({ ...s, screen: s.returnTo || 'discover' })),

      setFilterType: (filterType) => patch({ filterType }),
      setFilterLoc: (filterLoc) => patch({ filterLoc }),

      // ---- Booking flow ----
      startBooking: (classId) => patch({ booking: { classId, plan: null, step: 'options' } }),
      closeBooking: () => patch({ booking: null }),
      pickPlan: (plan) =>
        setState((s) => {
          if (plan === 'credit' && s.credits <= 0) return s
          return { ...s, booking: { ...s.booking, plan } }
        }),
      toCheckout: () =>
        setState((s) =>
          s.booking?.plan ? { ...s, booking: { ...s.booking, step: 'checkout' } } : s,
        ),
      backToOptions: () =>
        setState((s) => ({ ...s, booking: { ...s.booking, step: 'options' } })),
      confirmBooking: () =>
        setState((s) => {
          const b = s.booking
          if (!b) return s
          const c = s.classes.find((x) => x.id === b.classId)
          if (!c) return s
          const nb = {
            id: 'u' + Math.random().toString(36).slice(2),
            kind: 'class',
            ref: c.id,
            date: c.day,
            time: c.time,
            status: 'upcoming',
          }
          const useCredit = b.plan === 'credit' && s.credits > 0
          return {
            ...s,
            bookings: [nb, ...s.bookings],
            credits: useCredit ? s.credits - 1 : s.credits,
            booking: { ...b, step: 'confirm' },
          }
        }),
      finishBooking: () => patch({ booking: null, screen: 'bookings' }),

      // ---- Booking management ----
      cancelBooking: (id) => {
        setState((s) => ({
          ...s,
          bookings: s.bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b)),
        }))
        showToast('Booking cancelled')
      },
      reschedule: () => showToast("We'll be in touch to reschedule"),

      // ---- Membership ----
      chooseTier: (name) =>
        setState((s) => {
          if (name === s.tier) return s
          showToast('Membership updated to ' + name)
          return { ...s, tier: name }
        }),

      showToast,
    }
  }, [patch, showToast])

  const value = useMemo(() => {
    const classById = (id) => state.classes.find((c) => c.id === id)
    const spaceById = (id) => state.spaces.find((s) => s.id === id)
    return {
      state,
      actions,
      classes: state.classes,
      spaces: state.spaces,
      settings: state.settings,
      loading: state.loading,
      classById,
      spaceById,
    }
  }, [state, actions])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
