import { useApp } from './store.jsx'
import {
  CLASSES,
  SPACES,
  classImg,
  spaceImg,
  ph,
  priceText,
  spotsText,
  spotsColor,
} from './data.js'

const HERO = ph('#C4B196', '#7C6247')

export default function Home() {
  const { actions } = useApp()
  const todaysClasses = CLASSES.filter((c) => c.day === 'Today')
  const featuredSpaces = SPACES.slice(0, 2)

  return (
    <div className="lw-fade pb-[108px]">
      {/* Hero */}
      <div className="relative -mt-[50px] h-[520px]" style={HERO}>
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg,rgba(28,23,18,.42) 0%,rgba(28,23,18,.05) 34%,rgba(28,23,18,.12) 62%,rgba(28,23,18,.74) 100%)',
          }}
        />
        <div className="absolute top-[62px] right-0 left-0 flex flex-col items-center px-7 text-center">
          <div
            className="text-[11px] font-medium tracking-[.42em]"
            style={{ color: 'rgba(255,255,255,.82)' }}
          >
            LIVINGWAY&nbsp;&nbsp;WELLNESS
          </div>
        </div>
        <div className="absolute right-0 bottom-10 left-0 px-[30px]" style={{ color: '#FBF8F3' }}>
          <div
            className="font-serif text-[52px] font-medium"
            style={{ lineHeight: '.96', letterSpacing: '.005em', textWrap: 'balance' }}
          >
            LIVE HOW YOU LOVE
          </div>
          <p
            className="mt-4 max-w-[300px] text-[14.5px] font-light"
            style={{ lineHeight: 1.55, color: 'rgba(251,248,243,.86)' }}
          >
            A quiet place to move, breathe and gather.
          </p>
        </div>
      </div>

      {/* Today at Livingway */}
      <div className="px-[22px] pt-[30px]">
        <div className="flex items-baseline justify-between">
          <h2 className="m-0 font-serif text-[28px] font-medium tracking-[.01em]">
            Today at Livingway
          </h2>
          <button
            onClick={() => actions.go('discover')}
            className="cursor-pointer border-none bg-transparent font-sans text-[12px] font-semibold tracking-[.06em] text-clay"
          >
            ALL CLASSES →
          </button>
        </div>
      </div>
      <div
        className="lwscroll flex gap-3.5 overflow-x-auto px-[22px] pt-[18px] pb-1.5"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {todaysClasses.map((c) => (
          <div
            key={c.id}
            onClick={() => actions.openClass(c.id, 'home')}
            className="flex-none cursor-pointer"
            style={{ flexBasis: 246, width: 246, scrollSnapAlign: 'start' }}
          >
            <div
              className="relative h-[172px] overflow-hidden rounded-[18px]"
              style={classImg(c)}
            >
              <span
                className="absolute top-3 left-3 rounded-[30px] px-[11px] py-[5px] text-[10px] font-semibold tracking-[.1em] text-ink"
                style={{ background: 'rgba(251,248,243,.92)' }}
              >
                {c.type.toUpperCase()}
              </span>
            </div>
            <div className="px-0.5 pt-3">
              <div className="font-serif text-[21px] font-medium leading-[1.1]">{c.title}</div>
              <div className="mt-[3px] text-[12.5px] text-stone">
                {c.time} · {c.scheme}
              </div>
              <div className="mt-[9px] flex items-center justify-between">
                <span className="text-[13px] font-semibold">{priceText(c.price)}</span>
                <span
                  className="text-[11px] tracking-[.04em]"
                  style={{ color: spotsColor(c.spots) }}
                >
                  {spotsText(c.spots)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Manifesto */}
      <div
        className="mx-[18px] mt-[30px] rounded-[24px] px-[30px] py-[38px] text-center"
        style={{ background: '#2B2825', color: '#F3EEE6' }}
      >
        <div
          className="text-[10px] font-medium tracking-[.34em]"
          style={{ color: 'rgba(243,238,230,.6)' }}
        >
          OUR PROMISE
        </div>
        <p
          className="mt-[18px] font-serif text-[25px] font-normal italic"
          style={{ lineHeight: 1.34, textWrap: 'balance' }}
        >
          &ldquo;Wellness shouldn&rsquo;t feel like another thing to get through. Come as you are,
          leave a little lighter.&rdquo;
        </p>
      </div>

      {/* Spaces to gather */}
      <div className="px-[22px] pt-[34px]">
        <div className="flex items-baseline justify-between">
          <h2 className="m-0 font-serif text-[28px] font-medium">Spaces to gather</h2>
          <button
            onClick={() => actions.go('spaces')}
            className="cursor-pointer border-none bg-transparent font-sans text-[12px] font-semibold tracking-[.06em] text-clay"
          >
            VIEW ALL →
          </button>
        </div>
        <p className="mt-2 text-[13.5px] font-light text-stone" style={{ lineHeight: 1.5 }}>
          Book a studio by the hour for your own practice, workshop or gathering.
        </p>
      </div>
      <div className="flex flex-col gap-3.5 px-[22px] pt-[18px]">
        {featuredSpaces.map((s) => (
          <div
            key={s.id}
            onClick={() => actions.openSpace(s.id, 'home')}
            className="flex cursor-pointer items-center gap-3.5 rounded-[18px] p-2.5"
            style={{ background: '#FBF8F3', border: '1px solid #E9E1D4' }}
          >
            <div className="h-[92px] flex-none rounded-[13px]" style={{ width: 92, ...spaceImg(s) }} />
            <div className="min-w-0 flex-1">
              <div className="font-serif text-[20px] font-medium leading-[1.1]">{s.name}</div>
              <div className="mt-[3px] text-[12px] text-stone">
                {s.scheme} · up to {s.capacity}
              </div>
              <div className="mt-2 text-[13px] font-semibold">
                {priceText(s.price)}{' '}
                <span className="text-[11.5px] font-normal text-stone">/ hour</span>
              </div>
            </div>
            <div className="pr-1.5 text-[20px]" style={{ color: '#B7AD9E' }}>
              →
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-[30px] pt-10 pb-3.5 text-center">
        <div className="font-serif text-[13px] tracking-[.3em]" style={{ color: '#B0A492' }}>
          LIVINGWAY
        </div>
        <div className="mt-1.5 text-[11px] tracking-[.04em]" style={{ color: '#A89E8E' }}>
          Roco
        </div>
      </div>
    </div>
  )
}
