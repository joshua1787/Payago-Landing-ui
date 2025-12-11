"use client"

import { useState, useEffect, useRef } from "react"
import { Terminal, Cpu, Shield, Globe, Zap, Code2 } from "lucide-react"

export function AIDemoConsole() {
    const [lines, setLines] = useState<string[]>([])
    const [activeAnalysis, setActiveAnalysis] = useState(false)
    const [progress, setProgress] = useState(0)
    const scrollRef = useRef<HTMLDivElement>(null)

    const log = (text: string) => {
        setLines((prev) => [...prev, text])
    }

    const startAnalysis = () => {
        if (activeAnalysis) return
        setActiveAnalysis(true)
        setLines([])
        setProgress(0)

        const sequence = [
            { text: "> INITIALIZING PAYAGO_CORE_V2.1...", delay: 0 },
            { text: "> ESTABLISHING SECURE NEURAL LINK...", delay: 400 },
            { text: "> CONNECTING TO GLOBAL TRAVEL DATABANKS...", delay: 800 },
            { text: "> [SUCCESS] 4,209,000 FIGHT PATHS INDEXED", delay: 1400 },
            { text: "> [SUCCESS] 850,000 ACCOMMODATIONS VERIFIED", delay: 1600 },
            { text: "> ANALYZING USER PREFERENCES VECTOR...", delay: 2000 },
            { text: "> DETECTING OPTIMAL ROUTE: [TOKYO] -> [KYOTO] -> [OSAKA]", delay: 2800 },
            { text: "> CALCULATING BUDGET EFFICIENCY...", delay: 3500 },
            { text: "> OPTIMIZATION COMPLETE. READY FOR DEPLOYMENT.", delay: 4200 },
        ]

        sequence.forEach(({ text, delay }) => {
            setTimeout(() => log(text), delay)
        })

        // Progress bar animation
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setActiveAnalysis(false), 1000)
                    return 100
                }
                return prev + 1
            })
        }, 40)
    }

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }, [lines])

    return (
        <section className="py-24 bg-[#04060A] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <div className="space-y-8 animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="text-xs font-mono text-accent tracking-widest uppercase">System Online</span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                            Watch the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">Intelligence</span> Work
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-lg">
                            Our advanced neural engines process millions of data points in real-time to craft your perfect itinerary. No waiting, just instant, optimized results.
                        </p>

                        <button
                            onClick={startAnalysis}
                            className="group relative px-8 py-4 bg-accent/10 border border-accent/20 rounded-xl overflow-hidden hover:bg-accent/20 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-3 text-accent font-mono font-bold">
                                <Terminal className="w-5 h-5" />
                                {activeAnalysis ? "PROCESSING..." : "INITIALIZE DEMO"}
                            </span>
                        </button>
                    </div>

                    {/* Console Visual */}
                    <div className="relative group">
                        {/* Holographic Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-accent via-accent-secondary to-accent opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-500 rounded-2xl" />

                        <div className="relative rounded-2xl bg-[#0B1220] border border-white/10 overflow-hidden shadow-2xl">
                            {/* Terminal Header */}
                            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                                </div>
                                <div className="text-xs font-mono text-muted-foreground/50">payago_core.exe</div>
                            </div>

                            {/* Terminal Body */}
                            <div className="p-6 font-mono text-sm h-[400px] flex flex-col">
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                                        <div className="text-xs text-muted-foreground mb-1">CPU LOAD</div>
                                        <div className="text-accent font-bold text-xl flex items-center gap-2">
                                            <Cpu className="w-4 h-4" />
                                            {activeAnalysis ? Math.floor(Math.random() * 40 + 50) : 12}%
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-lg bg-black/40 border border-white/5">
                                        <div className="text-xs text-muted-foreground mb-1">SECURITY</div>
                                        <div className="text-accent-secondary font-bold text-xl flex items-center gap-2">
                                            <Shield className="w-4 h-4" />
                                            SECURE
                                        </div>
                                    </div>
                                </div>

                                <div
                                    ref={scrollRef}
                                    className="flex-1 overflow-y-auto space-y-2 mb-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pr-2"
                                >
                                    <div className="text-muted-foreground/50">Last login: Oct 24, 2025 on ttys001</div>
                                    <div className="text-muted-foreground/50">Type "help" for detailed commands</div>
                                    {lines.map((line, i) => (
                                        <div key={i} className={`
                      ${line.includes("ERROR") ? "text-red-400" : ""}
                      ${line.includes("SUCCESS") ? "text-accent-tertiary" : ""}
                      ${line.includes(">") ? "text-accent" : "text-foreground"}
                    `}>
                                            <span className="text-white/30 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                            {line}
                                        </div>
                                    ))}
                                    {activeAnalysis && (
                                        <div className="animate-pulse text-accent">_</div>
                                    )}
                                </div>

                                {/* Status Bar */}
                                <div className="pt-4 border-t border-white/5">
                                    <div className="flex justify-between text-xs mb-2 text-muted-foreground">
                                        <span>STATUS: {activeAnalysis ? "COMPILING" : "IDLE"}</span>
                                        <span>{progress}%</span>
                                    </div>
                                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-accent to-accent-secondary transition-all duration-300"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
