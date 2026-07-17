import { useEffect, useRef } from 'react'
import { AppProvider, useApp } from './store.jsx'
import TabBar from './TabBar.jsx'
import Toast from './Toast.jsx'
import StickyBar from './StickyBar.jsx'
import BookingSheet from './BookingSheet.jsx'
import Home from './Home.jsx'
import Discover from './Discover.jsx'
import ClassDetail from './ClassDetail.jsx'
import Spaces from './Spaces.jsx'
import SpaceDetail from './SpaceDetail.jsx'
import Bookings from './Bookings.jsx'
import Account from './Account.jsx'
import Membership from './Membership.jsx'

const SCREENS = {
  home: Home,
  discover: Discover,
  classDetail: ClassDetail,
  spaces: Spaces,
  spaceDetail: SpaceDetail,
  bookings: Bookings,
  account: Account,
  membership: Membership,
}

function Loading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
      <div className="font-serif text-[26px] tracking-[.28em] text-stone">LIVINGWAY</div>
      <div className="text-[12px] tracking-[.06em] text-mist">Preparing your space…</div>
    </div>
  )
}

function Phone() {
  const { state } = useApp()
  const Screen = SCREENS[state.screen] || Home
  const scrollRef = useRef(null)

  // Reset the scroll position whenever we navigate to a new screen.
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = 0
  }, [state.screen])

  return (
    <div
      className="flex min-h-[100dvh] w-full items-stretch justify-center font-sans sm:items-center"
      style={{ background: '#14110E' }}
    >
      <div
        className="relative flex h-[100dvh] w-full max-w-[480px] flex-col overflow-hidden text-ink"
        style={{ background: '#F3EEE6' }}
      >
        <div
          ref={scrollRef}
          className="lwscroll relative flex-1 overflow-x-hidden overflow-y-auto"
          style={{ WebkitOverflowScrolling: 'touch', paddingTop: 'env(safe-area-inset-top)' }}
        >
          {state.loading ? <Loading /> : <Screen key={state.screen} />}
        </div>

        <StickyBar />
        <TabBar />
        <BookingSheet />
        <Toast />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <AppProvider>
      <Phone />
    </AppProvider>
  )
}
