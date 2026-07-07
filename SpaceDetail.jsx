import { useApp } from './store.jsx'
import { spaceById, spaceImg, priceText } from './data.js'

export default function SpaceDetail() {
  const { state, actions } = useApp()
  const s = spaceById(state.selectedSpaceId)
  if (!s) return null

  return (
    <div className="lw-fade pb-[120px]">
        {/* Hero */}
        <div className="relative -mt-[50px] h-[330px]" style={spaceImg(s)}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg,rgba(28,23,18,.3) 0%,rgba(28,23,18,0) 45%,rgba(28,23,18,.16) 100%)',
            }}
          />
          <button
            onClick={actions.back}
            className="absolute top-[60px] left-[18px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none text-[18px]"
            style={{ background: 'rgba(251,248,243,.92)', color: '#2B2825' }}
          >
            ←
          </button>
        </div>

        <div className="px-6 pt-6">
          <div className="text-[11px] font-semibold tracking-[.22em] text-clay">{s.scheme}</div>
          <h1 className="mt-[9px] font-serif text-[36px] font-medium leading-[1.02]">{s.name}</h1>
          <p className="mt-4 text-[14.5px] font-light" style={{ lineHeight: 1.62, color: '#5C544B' }}>
            {s.desc}
          </p>

          {/* Stats */}
          <div className="mt-[22px] flex gap-3">
            <div
              className="flex-1 rounded-[14px] p-[15px]"
              style={{ background: '#FBF8F3', border: '1px solid #E9E1D4' }}
            >
              <div className="text-[10.5px] tracking-[.1em]" style={{ color: '#A89E8E' }}>
                CAPACITY
              </div>
              <div className="mt-[3px] font-serif text-[24px] font-medium">{s.capacity}</div>
            </div>
            <div
              className="flex-1 rounded-[14px] p-[15px]"
              style={{ background: '#FBF8F3', border: '1px solid #E9E1D4' }}
            >
              <div className="text-[10.5px] tracking-[.1em]" style={{ color: '#A89E8E' }}>
                HOURLY
              </div>
              <div className="mt-[3px] font-serif text-[24px] font-medium">{priceText(s.price)}</div>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-[26px]">
            <h3 className="m-0 text-[12px] font-semibold tracking-[.16em]">IN THIS SPACE</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {s.amenities.map((a, i) => (
                <span
                  key={i}
                  className="rounded-[30px] px-3.5 py-2 text-[12.5px]"
                  style={{ border: '1px solid #E2D9CB', background: '#FBF8F3', color: '#5C544B' }}
                >
                  {a}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
  )
}
