import { useApp } from './store.jsx'
import { ph } from './data.js'

const AVATAR = ph('#DCE0D1', '#CDD3BF')

export default function Account() {
  const { state, actions } = useApp()

  const accountRows = [
    {
      label: 'Payment methods',
      sub: 'Card ending 4242 · placeholder',
      tap: () => actions.showToast('Payments are a placeholder in this prototype'),
    },
    {
      label: 'Notifications',
      sub: 'Class reminders & gentle nudges',
      tap: () => actions.showToast('Notification settings — coming soon'),
    },
    {
      label: 'Your houses',
      sub: 'Roco · Spot · Duke · Upperbanks',
      tap: () => actions.go('spaces'),
    },
    {
      label: 'Help & contact',
      sub: 'We usually reply within a day',
      tap: () => actions.showToast('hello@livingway.co'),
    },
  ]

  return (
    <div className="lw-fade px-[22px] pt-[18px] pb-[110px]">
      <div className="text-[11px] font-semibold tracking-[.32em] text-clay">YOU</div>

      <div className="mt-3.5 flex items-center gap-4">
        <div className="h-16 w-16 flex-none rounded-full" style={AVATAR} />
        <div>
          <h1 className="m-0 font-serif text-[30px] font-medium leading-none">Eleanor Hart</h1>
          <div className="mt-[3px] text-[12.5px] text-stone">Member since 2024</div>
        </div>
      </div>

      {/* Membership card */}
      <div
        className="relative mt-6 overflow-hidden rounded-[22px] p-6"
        style={{ background: '#2B2825', color: '#F3EEE6' }}
      >
        <div
          className="absolute -top-[30px] -right-[30px] h-[130px] w-[130px] rounded-full"
          style={{ background: 'rgba(159,111,79,.32)' }}
        />
        <div className="relative">
          <div className="text-[10.5px] tracking-[.2em]" style={{ color: 'rgba(243,238,230,.62)' }}>
            CURRENT PLAN
          </div>
          <div className="mt-1 font-serif text-[26px] font-medium">{state.tier}</div>
          <div className="mt-5 flex items-end gap-1.5">
            <span className="font-serif text-[46px] font-medium" style={{ lineHeight: 0.9 }}>
              {state.credits}
            </span>
            <span className="pb-[7px] text-[13px]" style={{ color: 'rgba(243,238,230,.7)' }}>
              class credits left
            </span>
          </div>
          <button
            onClick={actions.goMembership}
            className="mt-5 cursor-pointer rounded-[30px] border-none px-5 py-3 font-sans text-[13px] font-semibold"
            style={{ background: '#F3EEE6', color: '#2B2825' }}
          >
            Manage membership →
          </button>
        </div>
      </div>

      {/* Rows */}
      <div className="mt-6 flex flex-col gap-0.5">
        {accountRows.map((r) => (
          <button
            key={r.label}
            onClick={r.tap}
            className="flex w-full cursor-pointer items-center justify-between border-none bg-transparent px-0.5 py-[18px] text-left font-sans"
            style={{ borderBottom: '1px solid #E9E1D4' }}
          >
            <div>
              <div className="text-[15px] font-medium text-ink">{r.label}</div>
              <div className="mt-0.5 text-[12px]" style={{ color: '#A89E8E' }}>
                {r.sub}
              </div>
            </div>
            <span className="text-[18px]" style={{ color: '#C2B8A8' }}>
              →
            </span>
          </button>
        ))}
      </div>

      <div className="mt-[30px] text-center">
        <div className="font-serif text-[18px] italic" style={{ color: '#B0A492' }}>
          Live how you love.
        </div>
      </div>
    </div>
  )
}
