"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MapPin, Calendar, Sparkles, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
// Note: You might need to install 'cmdk' and 'date-fns' if not present, but based on package.json they are there.
// We'll use standard inputs for now to keep it dependency-light but styled heavily.

export function TripInputForm() {
    const [step, setStep] = useState<"dest" | "date" | "style" | "generating">("dest")
    const [formData, setFormData] = useState({
        destination: "",
        dates: "",
        style: "",
    })

    const handleNext = () => {
        if (step === "dest" && formData.destination) setStep("date")
        else if (step === "date" && formData.dates) setStep("style")
        else if (step === "style" && formData.style) {
            setStep("generating")
            // Simulate ID generation/redirection
            setTimeout(() => {
                // console.log("Redirecting to itinerary...")
                window.location.href = '/trip'
            }, 3000)
        }
    }

    return (
        <div className="w-full max-w-2xl mx-auto min-h-[400px] relative font-sans perspective-1000">
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />

            <AnimatePresence mode="wait">
                {step === "dest" && (
                    <motion.div
                        key="dest"
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -20, rotateX: 10 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-6"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            Where to?
                        </h2>
                        <div className="relative group">
                            <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 w-6 h-6 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Tokyo, Paris, Mars..."
                                className="w-full bg-white/5 border border-white/10 rounded-3xl py-8 pl-16 pr-8 text-3xl md:text-4xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                                value={formData.destination}
                                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            />
                        </div>
                        <ContinueButton onClick={handleNext} disabled={!formData.destination} />
                    </motion.div>
                )}

                {step === "date" && (
                    <motion.div
                        key="date"
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -20, rotateX: 10 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-6"
                    >
                        <h2 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            When?
                        </h2>
                        <div className="relative group">
                            <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50 w-6 h-6 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Next weekend, July..."
                                className="w-full bg-white/5 border border-white/10 rounded-3xl py-8 pl-16 pr-8 text-3xl md:text-4xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent transition-all shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)] backdrop-blur-xl"
                                value={formData.dates}
                                onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                                onKeyDown={(e) => e.key === "Enter" && handleNext()}
                            />
                        </div>
                        <ContinueButton onClick={handleNext} disabled={!formData.dates} />
                        <button
                            onClick={() => setStep("dest")}
                            className="text-white/40 hover:text-white text-sm transition-colors absolute -bottom-16 left-0"
                        >
                            ← Back to destination
                        </button>
                    </motion.div>
                )}

                {step === "style" && (
                    <motion.div
                        key="style"
                        initial={{ opacity: 0, y: 20, rotateX: -10 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: -20, rotateX: 10 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-8"
                    >
                        <h2 className="text-5xl md:text-6xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">
                            Your vibe?
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {["Relaxed 😌", "Adventure 🧗", "Party 🪩", "Culture 🏛️", "Foodie 🍜", "Luxury 💎"].map((style) => (
                                <button
                                    key={style}
                                    onClick={() => {
                                        setFormData({ ...formData, style })
                                        // Small delay to show selection before next
                                        setTimeout(() => {
                                            setStep("generating")
                                        }, 300)
                                    }}
                                    className={cn(
                                        "p-6 rounded-2xl border text-left text-xl transition-all duration-300",
                                        formData.style === style
                                            ? "bg-blue-600 border-blue-400 text-white shadow-[0_0_30px_rgba(37,99,235,0.5)] scale-105"
                                            : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:border-white/20 hover:scale-105 hover:text-white"
                                    )}
                                >
                                    {style}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={() => setStep("date")}
                            className="text-white/40 hover:text-white text-sm transition-colors mt-4"
                        >
                            ← Back to dates
                        </button>
                    </motion.div>
                )}

                {step === "generating" && (
                    <motion.div
                        key="generating"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center text-center gap-8 py-10"
                    >
                        <div className="relative w-32 h-32">
                            <div className="absolute inset-0 rounded-full border-t-4 border-blue-500 animate-spin" />
                            <div className="absolute inset-2 rounded-full border-r-4 border-purple-500 animate-spin-slow" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Sparkles className="w-10 h-10 text-white animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-3xl font-bold text-white">Crafting your itinerary...</h3>
                            <p className="text-white/50 text-lg">Finding the best spots in {formData.destination}</p>
                        </div>

                        <div className="flex gap-2 text-sm text-white/30 font-mono">
                            <span>AI_MODEL: GEMINI-1.5-PRO</span>
                            <span className="animate-pulse">PROCESSING...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function ContinueButton({ onClick, disabled }: { onClick: () => void, disabled: boolean }) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "group flex items-center gap-2 text-xl font-semibold transition-all duration-300",
                disabled ? "opacity-0 translate-x-[-20px] pointer-events-none" : "opacity-100 translate-x-0 text-white hover:gap-4"
            )}
        >
            Continue <ArrowRight className="w-6 h-6" />
        </button>
    )
}
