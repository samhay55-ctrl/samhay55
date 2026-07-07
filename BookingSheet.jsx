import { useApp } from './store.jsx'
import { classImg, priceText } from './data.js'

export default function BookingSheet() {
  const { state, actions, classById } = useApp()
  const b = state.booking
  if (!b) return null

  const c = classById(b.classId)
  if (!c) return null
  const canCredit = state.credits > 0
  const plan = b.plan
  const total = plan === 'credit' && canCredit ? 0 : c.price
  const payLineRight = plan === 'credit' && canCredit ? '1 credit' : priceText(c.price)
  const totalText = total === 0 ? '£0.00 (1 credit)' : '£' + total + '.00'

  return (
    <div className="absolute inset-0 z-20">
      <div onClick={actions.closeBooking} className="lw-scrim absolute inset-0" style={{ background: 'rgba(28,23,18,.5)' }} />
      <div
        className="lw-sheet lwscroll absolute right-0 bottom-0 left-0 overflow-y-auto px-[22px] pt-2.5 pb-[26px]"
        style={{ background: '#F3EEE6', borderRadius: '28px 28px 0 0', maxHeight: '90%' }}
      >
        <div className="mx-auto mt-1.5 mb-4 h-1 w-[42px] rounded-[4px]" style={{ background: '#D6CCBC' }} />

        {/* Step: options */}
        {b.step === 'options' && (
          <>
            <div className="mb-2 flex items-center gap-[13px]">
              <div className="h-[58px] w-[58px] flex-none rounded-[13px]" style={classImg(c)} />
              <div className="flex-1">
                <div className="font-serif text-[21px] font-medium leading-[1.05]">{c.title}</div>
                <div className="mt-[3px] text-[12.5px] text-stone">
                  {c.day} · {c.time} · {c.scheme}
                </div>
              </div>
            </div>
            <h3 className="mt-[22px] text-[12px] font-semibold tracking-[.16em]">HOW WOULD YOU LIKE TO PAY?</h3>
            <div className="mt-3.5 flex flex-col gap-3">
              <button
                onClick={() => actions.pickPlan('dropin')}
                className="flex cursor-pointer items-center justify-between rounded-[16px] p-[17px] text-left font-sans"
                style={{
                  border: `1.5px solid ${plan === 'dropin' ? '#9F6F4F' : '#E2D9CB'}`,
                  background: plan === 'dropin' ? '#FBF4EC' : '#FBF8F3',
                }}
              >
                <div>
                  <div className="text-[15px] font-semibold text-ink">Drop-in</div>
                  <div className="mt-0.5 text-[12.5px] text-stone">Pay for this class only</div>
                </div>
                <div className="text-[18px] font-bold">{priceText(c.price)}</div>
              </button>

              <button
                onClick={() => actions.pickPlan('credit')}
                className="flex items-center justify-between rounded-[16px] p-[17px] text-left font-sans"
                style={{
                  border: `1.5px solid ${plan === 'credit' ? '#9F6F4F' : '#E2D9CB'}`,
                  background: plan === 'credit' ? '#FBF4EC' : '#FBF8F3',
                  opacity: canCredit ? 1 : 0.5,
                  cursor: canCredit ? 'pointer' : 'default',
                }}
              >
                <div>
                  <div className="text-[15px] font-semibold text-ink">Use a class credit</div>
                  <div className="mt-0.5 text-[12.5px] text-stone">
                    {canCredit
                      ? state.credits + ' credits in your balance'
                      : 'No credits left — top up your plan'}
                  </div>
                </div>
                <div className="text-[13px] font-semibold text-clay">{canCredit ? '1 credit' : '—'}</div>
              </button>
            </div>
            <button
              onClick={actions.toCheckout}
              className="mt-[22px] w-full cursor-pointer rounded-[15px] border-none p-[17px] font-sans text-[15px] font-semibold tracking-[.03em]"
              style={{ background: plan ? '#9F6F4F' : '#C9BBA9', color: '#FBF8F3' }}
            >
              Continue
            </button>
          </>
        )}

        {/* Step: checkout */}
        {b.step === 'checkout' && (
          <>
            <div className="text-[11px] font-semibold tracking-[.22em] text-clay">CHECKOUT</div>
            <h2 className="mt-2 font-serif text-[28px] font-medium">Almost there</h2>
            <div
              className="mt-[18px] rounded-[16px] p-[18px]"
              style={{ background: '#FBF8F3', border: '1px solid #E9E1D4' }}
            >
              <div className="flex justify-between text-[14px]">
                <span style={{ color: '#5C544B' }}>{c.title}</span>
                <span className="font-semibold">{payLineRight}</span>
              </div>
              <div className="mt-1.5 flex justify-between text-[12.5px] text-stone">
                <span>
                  {c.day} · {c.time}
                </span>
                <span>{c.scheme}</span>
              </div>
              <div className="my-3.5" style={{ borderTop: '1px solid #EDE5D8' }} />
              <div className="flex justify-between text-[15px] font-bold">
                <span>Total today</span>
                <span>{totalText}</span>
              </div>
            </div>

            <h3 className="mt-[22px] text-[12px] font-semibold tracking-[.16em]">PAYMENT METHOD</h3>
            <div
              className="mt-3 flex items-center gap-[13px] rounded-[16px] p-4"
              style={{ background: '#FBF8F3', border: '1px solid #E9E1D4' }}
            >
              <div
                className="h-7 w-[42px] rounded-[6px]"
                style={{ background: 'linear-gradient(135deg,#C9B49C,#9F6F4F)' }}
              />
              <div className="flex-1">
                <div className="text-[13.5px] font-semibold">Card ending 4242</div>
                <div className="text-[11px] font-semibold tracking-[.06em] text-clay-deep">
                  PLACEHOLDER — NO PAYMENT TAKEN
                </div>
              </div>
              <span className="text-[16px] text-clay">✓</span>
            </div>

            <div className="mt-3.5 flex gap-3">
              <button
                onClick={actions.backToOptions}
                className="flex-none cursor-pointer rounded-[15px] px-5 py-4 font-sans text-[14px] font-semibold"
                style={{ background: 'transparent', border: '1px solid #D8CEBE', color: '#5C544B' }}
              >
                Back
              </button>
              <button
                onClick={actions.confirmBooking}
                className="flex-1 cursor-pointer rounded-[15px] border-none p-4 font-sans text-[15px] font-semibold tracking-[.03em]"
                style={{ background: '#9F6F4F', color: '#FBF8F3' }}
              >
                Confirm booking
              </button>
            </div>
          </>
        )}

        {/* Step: confirm */}
        {b.step === 'confirm' && (
          <div className="px-1.5 pt-3.5 pb-1 text-center">
            <div
              className="lw-pop mx-auto flex h-[74px] w-[74px] items-center justify-center rounded-full"
              style={{ background: '#E7E9DF' }}
            >
              <span className="text-[34px]" style={{ color: '#7E876E' }}>
                ✓
              </span>
            </div>
            <h2 className="mt-[22px] font-serif text-[30px] font-medium leading-[1.05]">You&rsquo;re booked in</h2>
            <p className="mt-3 text-[14px] font-light" style={{ lineHeight: 1.55, color: '#5C544B' }}>
              We&rsquo;ve saved your place for
              <br />
              <strong className="font-semibold text-ink">{c.title}</strong>
              <br />
              {c.day} · {c.time} · {c.scheme}
            </p>
            <p className="mt-4 font-serif text-[17px] italic text-clay">
              Arrive a few minutes early and breathe.
            </p>
            <button
              onClick={actions.finishBooking}
              className="mt-6 w-full cursor-pointer rounded-[15px] border-none p-4 font-sans text-[15px] font-semibold"
              style={{ background: '#2B2825', color: '#F3EEE6' }}
            >
              View my bookings
            </button>
            <button
              onClick={actions.closeBooking}
              className="mt-2.5 w-full cursor-pointer border-none bg-transparent p-2 font-sans text-[13px] text-stone"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
