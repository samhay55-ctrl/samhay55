import { useApp } from './store.jsx'
import { classById, catOf, classImg, ph, ADDR } from './data.js'

const MAP_BG = ph('#E2DCCF', '#D2C9B8')

export default function ClassDetail() {
  const { state, actions } = useApp()
  const c = classById(state.selectedClassId)
  if (!c) return null
  const meta = catOf(c.type)

  return (
    <div className="lw-fade pb-[120px]">
        {/* Hero */}
        <div className="relative -mt-[50px] h-[340px]" style={classImg(c)}>
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg,rgba(28,23,18,.32) 0%,rgba(28,23,18,0) 40%,rgba(28,23,18,.18) 100%)',
            }}
          />
          <button
            onClick={actions.back}
            className="absolute top-[60px] left-[18px] flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-none text-[18px]"
            style={{ background: 'rgba(251,248,243,.92)', color: '#2B2825' }}
          >
            ←
          </button>
          <div
            className="absolute top-[62px] right-[18px] rounded-[30px] px-[13px] py-[7px] text-[10.5px] font-semibold tracking-[.04em]"
            style={{ background: 'rgba(251,248,243,.92)' }}
          >
            {c.day} · {c.time}
          </div>
        </div>

        <div className="px-6 pt-6">
          <div className="text-[11px] font-semibold tracking-[.22em] text-clay">
            {c.type.toUpperCase()} · {c.level}
          </div>
          <h1 className="mt-[9px] font-serif text-[36px] font-medium leading-[1.02]">{c.title}</h1>
          <p className="mt-4 text-[14.5px] font-light" style={{ lineHeight: 1.62, color: '#5C544B' }}>
            {c.desc}
          </p>

          {/* Instructor */}
          <div
            className="mt-6 flex items-center gap-[13px] rounded-[16px] p-4"
            style={{ background: '#FBF8F3', border: '1px solid #E9E1D4' }}
          >
            <div
              className="h-[50px] w-[50px] flex-none rounded-full"
              style={ph(meta.a, meta.b)}
            />
            <div className="flex-1">
              <div className="text-[11px] tracking-[.06em]" style={{ color: '#A89E8E' }}>
                YOUR GUIDE
              </div>
              <div className="mt-px font-serif text-[20px] font-medium">{c.instructor}</div>
            </div>
          </div>

          {/* What to bring */}
          <div className="mt-[26px]">
            <h3 className="m-0 text-[12px] font-semibold tracking-[.16em]">WHAT TO BRING</h3>
            <div className="mt-3 flex flex-col gap-2.5">
              {c.bring.map((b, i) => (
                <div key={i} className="flex items-center gap-[11px] text-[14px]" style={{ color: '#5C544B' }}>
                  <span className="h-[5px] w-[5px] flex-none rounded-full" style={{ background: '#9F6F4F' }} />
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* Where */}
          <div className="mt-[26px]">
            <h3 className="m-0 text-[12px] font-semibold tracking-[.16em]">WHERE</h3>
            <div
              className="mt-3 overflow-hidden rounded-[16px]"
              style={{ border: '1px solid #E9E1D4' }}
            >
              <div className="relative h-[120px]" style={MAP_BG}>
                <div
                  className="absolute top-1/2 left-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                  style={{ background: '#9F6F4F', boxShadow: '0 0 0 6px rgba(159,111,79,.22)' }}
                />
              </div>
              <div className="px-4 py-3.5" style={{ background: '#FBF8F3' }}>
                <div className="font-serif text-[19px] font-medium">{c.scheme}</div>
                <div className="mt-0.5 text-[12.5px] text-stone">{ADDR[c.scheme] || ''}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}
