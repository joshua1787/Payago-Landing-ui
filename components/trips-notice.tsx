// These pages describe whole trips, which aren't open yet. They stay, because trips
// are where PayaGo is going, but nobody should read them as what's live today.
export function TripsNotice() {
  return (
    <div className="border-b border-dashed border-[#0F172A]/15 bg-[#F4F1FF] px-6 py-2.5 text-center text-[13px] leading-snug text-[#334155]">
      This page talks about whole trips, which are coming. Splitting and tracking your money are live today.{" "}
      <a href="https://app.payago.in" className="font-semibold text-[#6D4AE8] underline underline-offset-2">
        Open PayaGo
      </a>
    </div>
  )
}
