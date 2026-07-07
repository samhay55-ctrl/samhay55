export default function StatusBar({ light }) {
  const color = light ? '#FBF8F3' : '#2B2825'
  return (
    <div
      className="z-[5] flex h-[50px] flex-none items-end justify-between px-7 pb-1.5 text-sm font-semibold tracking-[.02em]"
      style={{ color }}
    >
      <span>9:41</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] tracking-[.06em]">5G</span>
        <div
          className="relative flex h-[11px] w-[22px] items-center rounded-[3px] p-px opacity-85"
          style={{ border: `1px solid ${color}` }}
        >
          <div className="h-full w-[13px] rounded-[1px]" style={{ background: color }} />
        </div>
      </div>
    </div>
  )
}
