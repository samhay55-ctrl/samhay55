import { useApp } from './store.jsx'
import { classById, spaceById, catOf, classImg, spaceImg } from './data.js'

// Resolve a booking record into displayable fields.
function mapBooking(bk) {
  const isClass = bk.kind === 'class'
  const item = isClass ? classById(bk.ref) : spaceById(bk.ref)
  if (!item) return null
  return {
    id: bk.id,
    title: isClass ? item.title : item.name,
    scheme: item.scheme,
    date: bk.date,
    time: bk.time,
    kindLabel: isClass ? item.type.toUpperCase() : 'SPACE',
    accent: isClass ? catOf(item.type).accent : '#9F6F4F',
    img: isClass ? classImg(item) : spaceImg(item),
    isClass,
    itemId: item.id,
  }
}

export default function Bookings() {
  const { state, actions } = useApp()

  const upcoming = state.bookings.filter((b) => b.status === 'upcoming').map(mapBooking).filter(Boolean)
  const past = state.bookings.filter((b) => b.status === 'past').map(mapBooking).filter(Boolean)

  const rebook = (m) =>
    m.isClass ? actions.startBooking(m.itemId) : actions.openSpace(m.itemId, 'bookings')

  return (
    <div className="lw-fade px-[22px] pt-[18px] pb-[110px]">
      <div className="text-[11px] font-semibold tracking-[.32em] text-clay">YOUR JOURNEY</div>
      <h1 className="mt-2 font-serif text-[38px] font-medium leading-none">My bookings</h1>

      {/* Upcoming */}
      <h3 className="mt-[30px] text-[12px] font-semibold tracking-[.16em]">UPCOMING</h3>
      {upcoming.length > 0 ? (
        <div className="mt-3.5 flex flex-col gap-3.5">
          {upcoming.map((m) => (
            <div
              key={m.id}
              className="overflow-hidden rounded-[18px]"
              style={{ background: '#FBF8F3', border: '1px solid #E9E1D4' }}
            >
              <div className="flex gap-[13px] p-[13px]">
                <div className="h-[70px] w-[70px] flex-none rounded-[12px]" style={m.img} />
                <div className="min-w-0 flex-1">
                  <div className="text-[10.5px] font-semibold tracking-[.06em]" style={{ color: m.accent }}>
                    {m.kindLabel}
                  </div>
                  <div className="mt-0.5 font-serif text-[20px] font-medium leading-[1.1]">{m.title}</div>
                  <div className="mt-1 text-[12.5px] text-stone">
                    {m.date} · {m.time} · {m.scheme}
                  </div>
                </div>
              </div>
              <div className="flex" style={{ borderTop: '1px solid #EDE5D8' }}>
                <button
                  onClick={actions.reschedule}
                  className="flex-1 cursor-pointer border-none bg-transparent p-[13px] font-sans text-[12.5px] font-semibold tracking-[.04em]"
                  style={{ borderRight: '1px solid #EDE5D8', color: '#5C544B' }}
                >
                  Reschedule
                </button>
                <button
                  onClick={() => actions.cancelBooking(m.id)}
                  className="flex-1 cursor-pointer border-none bg-transparent p-[13px] font-sans text-[12.5px] font-semibold tracking-[.04em]"
                  style={{ color: '#A8694F' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div
          className="mt-3.5 rounded-[18px] p-[30px] text-center"
          style={{ border: '1px dashed #D8CEBE' }}
        >
          <p className="m-0 font-serif text-[20px] italic text-stone">Nothing booked yet.</p>
          <button
            onClick={() => actions.go('discover')}
            className="mt-3.5 cursor-pointer rounded-[30px] border-none px-[22px] py-3 font-sans text-[13px] font-semibold"
            style={{ background: '#2B2825', color: '#F3EEE6' }}
          >
            Find a class
          </button>
        </div>
      )}

      {/* Past */}
      <h3 className="mt-[34px] text-[12px] font-semibold tracking-[.16em] text-stone">PAST</h3>
      <div className="mt-3.5 flex flex-col gap-[11px]">
        {past.map((m) => (
          <div key={m.id} className="flex items-center gap-[13px] px-0.5 py-1" style={{ opacity: 0.74 }}>
            <div className="h-[52px] w-[52px] flex-none rounded-[11px]" style={m.img} />
            <div className="min-w-0 flex-1">
              <div className="font-serif text-[18px] font-medium leading-[1.1]">{m.title}</div>
              <div className="mt-0.5 text-[12px] text-stone">
                {m.date} · {m.scheme}
              </div>
            </div>
            <button
              onClick={() => rebook(m)}
              className="cursor-pointer rounded-[30px] bg-transparent px-3.5 py-[7px] font-sans text-[11.5px] font-semibold"
              style={{ border: '1px solid #D8CEBE', color: '#5C544B' }}
            >
              Book again
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
