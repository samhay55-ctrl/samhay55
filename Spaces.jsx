import { useApp } from './store.jsx'
import { SPACES, spaceImg, priceText } from './data.js'

export default function Spaces() {
  const { actions } = useApp()

  return (
    <div className="lw-fade pt-[18px] pb-[110px]">
      <div className="px-[22px]">
        <div className="text-[11px] font-semibold tracking-[.32em] text-clay">SPACES</div>
        <h1 className="mt-2 font-serif text-[38px] font-medium leading-none">Room to practise</h1>
        <p className="mt-3 text-[13.5px] font-light text-stone" style={{ lineHeight: 1.55 }}>
          Bookable spaces for solo sessions, small groups and workshops.
        </p>
      </div>

      <div className="flex flex-col gap-[22px] px-[22px] pt-6">
        {SPACES.map((s) => (
          <div key={s.id} onClick={() => actions.openSpace(s.id, 'spaces')} className="cursor-pointer">
            <div className="relative h-[200px] overflow-hidden rounded-[20px]" style={spaceImg(s)}>
              <span
                className="absolute top-[13px] right-[13px] rounded-[30px] px-3 py-1.5 text-[11px] font-semibold"
                style={{ background: 'rgba(251,248,243,.92)' }}
              >
                {priceText(s.price)}/hr
              </span>
            </div>
            <div className="mt-[13px] flex items-start justify-between">
              <div>
                <div className="font-serif text-[24px] font-medium leading-[1.05]">{s.name}</div>
                <div className="mt-1 text-[13px] text-stone">
                  {s.scheme} · up to {s.capacity} people
                </div>
              </div>
              <div className="text-[20px]" style={{ color: '#B7AD9E' }}>
                →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
