import { useApp } from './store.jsx'
import { TYPE_FILTERS, classImg, priceText, spotsText, spotsColor } from './data.js'

export default function Discover() {
  const { state, actions, classes } = useApp()

  const filtered = classes.filter(
    (c) =>
      (state.filterType === 'All' || c.type === state.filterType) &&
      (state.filterLoc === 'All' || c.scheme === state.filterLoc),
  )
  const resultCount = `${filtered.length} ${filtered.length === 1 ? 'class' : 'classes'} found`

  return (
    <div className="lw-fade pt-[18px] pb-[110px]">
      <div className="px-[22px]">
        <div className="text-[11px] font-semibold tracking-[.32em] text-clay">DISCOVER</div>
        <h1 className="mt-2 font-serif text-[38px] font-medium leading-none">Find your class</h1>
      </div>

      {/* Type filters */}
      <div className="lwscroll flex gap-2 overflow-x-auto px-[22px] pt-[22px] pb-1.5">
        {TYPE_FILTERS.map((t) => {
          const on = state.filterType === t
          return (
            <button
              key={t}
              onClick={() => actions.setFilterType(t)}
              className="flex-none cursor-pointer whitespace-nowrap rounded-[30px] px-4 py-[9px] font-sans text-[12.5px] tracking-[.02em]"
              style={{
                border: `1px solid ${on ? '#2B2825' : '#E2D9CB'}`,
                background: on ? '#2B2825' : '#FBF8F3',
                color: on ? '#F3EEE6' : '#5C544B',
                fontWeight: on ? 600 : 500,
              }}
            >
              {t}
            </button>
          )
        })}
      </div>

      <div className="px-[22px] pt-2 text-[12px] tracking-[.04em]" style={{ color: '#A89E8E' }}>
        {resultCount}
      </div>

      {/* Class list */}
      <div className="flex flex-col gap-[18px] px-[22px] pt-3.5">
        {filtered.map((c) => {
          const today = c.day === 'Today'
          return (
            <div key={c.id} onClick={() => actions.openClass(c.id, 'discover')} className="cursor-pointer">
              <div className="relative h-[188px] overflow-hidden rounded-[20px]" style={classImg(c)}>
                <span
                  className="absolute top-[13px] left-[13px] rounded-[30px] px-3 py-1.5 text-[10px] font-semibold tracking-[.1em]"
                  style={{ background: 'rgba(251,248,243,.92)' }}
                >
                  {c.type.toUpperCase()}
                </span>
                <span
                  className="absolute top-[13px] right-[13px] rounded-[30px] px-3 py-1.5 text-[10.5px] font-semibold tracking-[.04em]"
                  style={{
                    background: today ? '#9F6F4F' : 'rgba(251,248,243,.92)',
                    color: today ? '#FBF8F3' : '#2B2825',
                  }}
                >
                  {c.day}
                </span>
              </div>
              <div className="mt-[13px] flex items-start justify-between">
                <div className="min-w-0 flex-1 pr-3">
                  <div className="font-serif text-[24px] font-medium leading-[1.05]">{c.title}</div>
                  <div className="mt-1 text-[13px] text-stone">
                    {c.time} · {c.duration} · {c.scheme}
                  </div>
                  <div className="mt-[3px] text-[12.5px]" style={{ color: '#9A8F7F' }}>
                    with {c.instructor}
                  </div>
                </div>
                <div className="flex-none text-right">
                  <div className="text-[16px] font-semibold">{priceText(c.price)}</div>
                  <div
                    className="mt-[5px] text-[11px] tracking-[.03em]"
                    style={{ color: spotsColor(c.spots) }}
                  >
                    {spotsText(c.spots)}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
