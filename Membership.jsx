import { useApp } from './store.jsx'
import { TIERS } from './data.js'

export default function Membership() {
  const { state, actions } = useApp()

  return (
    <div className="lw-fade px-[22px] pt-[18px] pb-[110px]">
      <button
        onClick={actions.goAccount}
        className="cursor-pointer border-none bg-transparent p-0 font-sans text-[13px] tracking-[.04em] text-stone"
      >
        ← You
      </button>
      <h1 className="mt-4 font-serif text-[38px] font-medium leading-[1.02]">Choose how you join</h1>
      <p className="mt-3 text-[14px] font-light text-stone" style={{ lineHeight: 1.55 }}>
        No lock-in. Change or pause whenever your practice shifts.
      </p>

      <div className="mt-[26px] flex flex-col gap-4">
        {TIERS.map((t) => {
          const current = t.name === state.tier
          const border = t.featured ? '#9F6F4F' : current ? '#2B2825' : '#E2D9CB'
          const bg = t.featured ? '#FBF4EC' : '#FBF8F3'
          const btnBg = current ? '#FBF8F3' : t.featured ? '#9F6F4F' : '#2B2825'
          const btnColor = current ? '#847C72' : '#FBF8F3'
          const btnBorder = current ? '#D8CEBE' : 'transparent'
          return (
            <div
              key={t.name}
              className="relative rounded-[20px] p-[22px]"
              style={{ border: `1.5px solid ${border}`, background: bg }}
            >
              {t.featured && (
                <div
                  className="absolute -top-2.5 left-[22px] rounded-[30px] px-3 py-1 text-[10px] font-semibold tracking-[.1em]"
                  style={{ background: '#9F6F4F', color: '#FBF8F3' }}
                >
                  MOST LOVED
                </div>
              )}
              <div className="flex items-baseline justify-between">
                <div className="font-serif text-[25px] font-medium">{t.name}</div>
                <div className="text-right">
                  <span className="text-[22px] font-bold">{t.price}</span>
                  <span className="text-[12px] text-stone">{t.per}</span>
                </div>
              </div>
              <p className="mt-2 text-[13px] text-stone" style={{ lineHeight: 1.5 }}>
                {t.tagline}
              </p>
              <div className="mt-4 flex flex-col gap-[9px]">
                {t.perks.map((p, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-[13.5px]" style={{ color: '#3F3931' }}>
                    <span className="text-[13px] text-clay">✦</span>
                    {p}
                  </div>
                ))}
              </div>
              <button
                onClick={() => actions.chooseTier(t.name)}
                className="mt-[18px] w-full cursor-pointer rounded-[13px] p-3.5 font-sans text-[14px] font-semibold"
                style={{ background: btnBg, color: btnColor, border: `1px solid ${btnBorder}` }}
              >
                {current ? 'Your current plan' : 'Choose ' + t.name}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
