import { useApp } from './store.jsx'
import { priceText } from './data.js'

// The class/space detail screens have a sticky action bar pinned to the bottom
// of the frame (above the tab bar). It lives here — outside the scroll area —
// so it stays fixed while the detail content scrolls beneath it.
export default function StickyBar() {
  const { state, actions, classById, spaceById } = useApp()

  let content = null

  if (state.screen === 'classDetail') {
    const c = classById(state.selectedClassId)
    if (c) {
      content = {
        price: priceText(c.price),
        note: 'drop-in',
        label: 'Reserve a place',
        onClick: () => actions.startBooking(c.id),
      }
    }
  } else if (state.screen === 'spaceDetail') {
    const s = spaceById(state.selectedSpaceId)
    if (s) {
      content = {
        price: priceText(s.price),
        note: 'per hour',
        label: 'Enquire to book',
        onClick: () => actions.showToast("We'll be in touch to confirm your booking"),
      }
    }
  }

  if (!content) return null

  return (
    <div
      className="absolute right-0 left-0 z-[7] flex items-center gap-3.5 px-5 pt-[18px] pb-[22px]"
      style={{
        bottom: 78, // sit directly above the 78px tab bar
        background: 'linear-gradient(180deg,rgba(243,238,230,0),#F3EEE6 26%)',
      }}
    >
      <div className="flex-none">
        <div className="text-[18px] font-bold">{content.price}</div>
        <div className="text-[10.5px] tracking-[.04em]" style={{ color: '#A89E8E' }}>
          {content.note}
        </div>
      </div>
      <button
        onClick={content.onClick}
        className="flex-1 cursor-pointer rounded-[15px] border-none p-[17px] font-sans text-[15px] font-semibold tracking-[.03em]"
        style={{
          background: '#9F6F4F',
          color: '#FBF8F3',
          boxShadow: '0 12px 24px -10px rgba(159,111,79,.7)',
        }}
      >
        {content.label}
      </button>
    </div>
  )
}
