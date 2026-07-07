import { useEffect, useRef } from 'react'
import { AppProvider, useApp } from './store.jsx'
import StatusBar from './components/StatusBar.jsx'
import TabBar from './components/TabBar.jsx'
import Toast from './components/Toast.jsx'
import StickyBar from './components/StickyBar.jsx'
import BookingSheet from './components/BookingSheet.jsx'
import Home from './screens/Home.jsx'
import Discover from './screens/Discover.jsx'
import ClassDetail from './screens/ClassDetail.jsx'
import Spaces from './screens/Spaces.jsx'
import SpaceDetail from './screens/SpaceDetail.jsx'
import Bookings from './screens/Bookings.jsx'
import Account from './screens/Account.jsx'
import Membership from './screens/Membership.jsx'

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

// Screens whose hero photo bleeds under the status bar want light glyphs.
const LIGHT_STATUS = new Set(['home', 'classDetail', 'spaceDetail'])

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
      className="flex min-h-screen w-full items-center justify-center px-4 py-8 font-sans"
      style={{
        background:
          'radial-gradient(120% 90% at 50% 0%, #ECE5D9 0%, #E2DACE 60%, #DAD1C3 100%)',
      }}
    >
      <div
        className="relative flex h-[844px] w-[390px] flex-col overflow-hidden text-ink"
        style={{
          background: '#F3EEE6',
          borderRadius: 46,
          boxShadow:
            '0 40px 90px -30px rgba(58,48,38,.5), 0 0 0 11px #15120F, 0 0 0 12px #2B2825',
        }}
      >
        <StatusBar light={LIGHT_STATUS.has(state.screen)} />

        <div
          ref={scrollRef}
          className="lwscroll relative flex-1 overflow-x-hidden overflow-y-auto"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <Screen key={state.screen} />
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
