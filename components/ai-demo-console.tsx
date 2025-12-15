"use client"

import { useState } from "react"
import { Brain, Activity, Zap, Cpu, Network, ShieldCheck } from "lucide-react"

export function AIDemoConsole() {
    const [isActive, setIsActive] = useState(false)

    const toggleActive = () => {
        setIsActive((prev) => !prev)
    }

    return (
        <section className="py-24 bg-[#04060A] relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Text Content */}
                    <div className="space-y-8 animate-fade-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                            <span className="relative flex h-2 w-2">
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 ${isActive ? 'duration-500' : 'duration-1000'}`}></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                            </span>
                            <span className="text-xs font-mono text-accent tracking-widest uppercase">
                                {isActive ? "System Active" : "System Standby"}
                            </span>
                        </div>

                        <h2 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                            Watch the <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-secondary">Intelligence</span> Work
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-lg">
                            Our advanced neural engines process millions of data points in real-time to optimize complex variables. No waiting, just instant, computed results.
                        </p>

                        <button
                            onClick={toggleActive}
                            className="group relative px-8 py-4 bg-accent/10 border border-accent/20 rounded-xl overflow-hidden hover:bg-accent/20 transition-all duration-300"
                        >
                            <div className="absolute inset-0 bg-accent/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            <span className="relative flex items-center gap-3 text-accent font-mono font-bold">
                                <Zap className={`w-5 h-5 ${isActive ? 'fill-accent' : ''}`} />
                                {isActive ? "DEACTIVATE CORE" : "INITIALIZE DEMO"}
                            </span>
                        </button>
                    </div>

                    {/* Visual Content: Neural Core */}
                    <div className="relative flex items-center justify-center min-h-[500px] w-full group">

                        {/* Central Orb Container */}
                        <div className="relative w-64 h-64 flex items-center justify-center">
                            {/* Core Pulse */}
                            <div className={`absolute inset-0 bg-gradient-to-tr from-accent via-accent-secondary to-purple-500 rounded-full blur-2xl transition-all duration-700 ${isActive ? 'opacity-60 scale-125' : 'opacity-20 scale-100'}`} />

                            {/* Inner Core */}
                            <div className={`relative w-full h-full rounded-full border border-white/10 bg-black/40 backdrop-blur-sm overflow-hidden flex items-center justify-center transition-all duration-700 ${isActive ? 'shadow-[0_0_50px_-10px_rgba(var(--accent-rgb),0.5)] border-accent/30' : ''}`}>
                                <div className={`absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`} />

                                {/* Brain Icon / Central Symbol */}
                                <Brain className={`w-24 h-24 text-accent transition-all duration-700 ${isActive ? 'drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] scale-110' : 'text-white/20'}`} strokeWidth={1} />
                            </div>

                            {/* Orbiting Particles (CSS Animation usually needed, simulating with divs) */}
                            <div className={`absolute inset-0 rounded-full border border-dashed border-white/10 animate-[spin_10s_linear_infinite] ${isActive ? 'opacity-100' : 'opacity-30'}`} />
                            <div className={`absolute -inset-8 rounded-full border border-white/5 animate-[spin_15s_linear_infinite_reverse] ${isActive ? 'opacity-100' : 'opacity-20'}`} />
                        </div>

                        {/* Floating Stat Cards */}
                        <div className={`absolute top-10 left-0 lg:left-10 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-accent/10 rounded-lg">
                                    <Cpu className="w-5 h-5 text-accent" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground font-mono">NEURAL LOAD</div>
                                    <div className="text-lg font-bold text-white">94%</div>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute bottom-20 right-0 lg:right-10 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-xl transition-all duration-500 delay-100 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-500/10 rounded-lg">
                                    <ShieldCheck className="w-5 h-5 text-green-500" />
                                </div>
                                <div>
                                    <div className="text-xs text-muted-foreground font-mono">SYSTEM INTEGRITY</div>
                                    <div className="text-lg font-bold text-white">OPTIMAL</div>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute top-1/2 right-[-20px] bg-black/60 backdrop-blur-md border border-white/10 p-3 rounded-xl transition-all duration-500 delay-200 ${isActive ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'}`}>
                            <div className="flex flex-col gap-2">
                                <Activity className="w-4 h-4 text-accent animate-pulse" />
                                <Network className="w-4 h-4 text-accent-secondary" />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}
