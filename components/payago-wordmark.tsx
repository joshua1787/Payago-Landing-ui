type PayagoWordmarkProps = {
    className?: string
}

export function PayagoWordmark({ className }: PayagoWordmarkProps) {
    return (
        <span
            aria-label="PayaGo"
            className={`inline-flex items-baseline gap-0.5 text-[1.35rem] font-black leading-none tracking-[-0.06em] text-slate-950 ${className ?? ""}`}
        >
            <span>Paya</span>
            <span className="text-[#0B766F]">Go</span>
        </span>
    )
}
