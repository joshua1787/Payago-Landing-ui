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
            <span className="bg-gradient-to-r from-[#00D4FF] via-[#7C5CFF] to-[#4AD7A2] bg-clip-text text-transparent">Go</span>
        </span>
    )
}
