import { useApp } from './store.jsx'

const TABS = [
  { id: 'home', label: 'HOME', match: ['home'] },
  { id: 'discover', label: 'CLASSES', match: ['discover', 'classDetail'] },
  { id: 'spaces', label: 'SPACES', match: ['spaces', 'spaceDetail'] },
  { id: 'bookings', label: 'BOOKINGS', match: ['bookings'] },
  { id: 'account', label: 'YOU', match: ['account', 'membership'] },
]

export default function TabBar() {
  const { state, actions } = useApp()

  return (
    <div
      className="z-[6] flex min-h-[78px] flex-none items-start px-2.5 pt-3.5"
      style={{
        background: 'rgba(243,238,230,.94)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #E4DBCD',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
    >
      {TABS.map((t) => {
        const active = t.match.includes(state.screen)
        return (
          <button
            key={t.id}
            onClick={() => actions.go(t.id)}
            className="flex flex-1 cursor-pointer flex-col items-center gap-[7px] border-none bg-transparent py-0.5 font-sans"
          >
            <span
              className="h-[5px] w-[5px] rounded-full"
              style={{ background: active ? '#9F6F4F' : 'transparent' }}
            />
            <span
              className="text-[10px] font-semibold tracking-[.12em]"
              style={{ color: active ? '#2B2825' : '#A89E8E' }}
            >
              {t.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}
