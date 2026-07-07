import { useApp } from './store.jsx'

export default function Toast() {
  const { state } = useApp()
  if (!state.toast) return null

  return (
    <div
      className="lw-toast absolute bottom-24 left-1/2 z-30 whitespace-nowrap rounded-[30px] px-5 py-3 text-[13px] font-medium tracking-[.02em]"
      style={{
        background: '#2B2825',
        color: '#F3EEE6',
        boxShadow: '0 12px 30px -8px rgba(0,0,0,.4)',
      }}
    >
      {state.toast}
    </div>
  )
}
