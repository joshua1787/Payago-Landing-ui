"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { OptimizedPicture } from "@/components/optimized-picture"
import { Check, ExternalLink, Hotel, Plane } from "lucide-react"
import { useState } from "react"

export function BookingModal({ isOpen, onClose, type = "hotel" }: { isOpen: boolean; onClose: () => void; type?: "hotel" | "flight" }) {
    const [step, setStep] = useState<"details" | "handoff" | "success">("details")

    const sampleName = type === "hotel" ? "Tokyo hotel handoff preview" : "Tokyo flight handoff preview"
    const sampleMeta = type === "hotel" ? "Sample stay idea • final availability on partner site" : "Sample flight idea • final fare on partner site"

    const handleHandoff = () => {
        setStep("handoff")
    }

    const handleReady = () => {
        setStep("success")
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white border-slate-200 text-slate-900 p-0 gap-0 overflow-hidden">

                {/* Header Image */}
                {step !== "success" && (
                    <div className="h-32 bg-slate-100 relative">
                        <OptimizedPicture
                            src={type === 'hotel' ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"}
                            alt={type === 'hotel' ? "Sample hotel booking preview" : "Sample flight booking preview"}
                            className="contents"
                            imgClassName="w-full h-full object-cover opacity-80"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute bottom-4 left-6">
                            <h2 className="text-2xl font-bold text-white">{sampleName}</h2>
                            <div className="flex items-center gap-2 text-sm text-white/80">
                                {type === 'hotel' ? <Hotel className="w-3 h-3" /> : <Plane className="w-3 h-3" />}
                                {sampleMeta}
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {step === "details" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-slate-400 text-xs block mb-1">Dates</label>
                                    <div className="text-slate-900">Oct 12 - Oct 18</div>
                                </div>
                                <div className="bg-slate-50 p-3 rounded-lg">
                                    <label className="text-slate-400 text-xs block mb-1">Guests</label>
                                    <div className="text-slate-900">2 Adults</div>
                                </div>
                            </div>

                            <div className="border border-slate-200 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between text-slate-700">
                                    <span>Example {type === 'hotel' ? 'stay' : 'round-trip'} estimate</span>
                                    <span>$3,200.00</span>
                                </div>
                                <div className="flex justify-between text-slate-400 text-sm">
                                    <span>Partner fees/taxes</span>
                                    <span>Shown at checkout</span>
                                </div>
                                <div className="border-t border-slate-200 pt-3 flex justify-between font-bold text-lg text-blue-600">
                                    <span>Due in this demo</span>
                                    <span>$0.00</span>
                                </div>
                            </div>

                            <Button onClick={handleHandoff} className="w-full bg-blue-600 hover:bg-blue-500 py-6 text-lg">
                                Preview Partner Handoff
                            </Button>

                            <div className="flex justify-center items-center gap-2 text-xs text-slate-400">
                                <span className="w-2 h-2 rounded-full bg-blue-500" /> Demo only — no reservation or payment
                            </div>
                        </div>
                    )}

                    {step === "handoff" && (
                        <div className="space-y-6">
                            <div>
                                <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600 mb-4">
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    Provider handoff preview
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900">Ready to hand off details</h3>
                                <p className="text-slate-500 text-sm mt-2">
                                    PayaGo would prepare trip context for a provider-led handoff. The provider confirms availability, final price, and any payment requirements.
                                </p>
                            </div>

                            <div className="grid gap-3">
                                {[
                                    "Dates, guests, and trip notes are prepared for transfer.",
                                    "No card details are collected in this demo.",
                                    "A reservation is only made if the traveller completes checkout with the provider.",
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600">
                                        <Check className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
                                Demo preview only: continuing here does not create a reservation, take a charge, or send an email.
                            </div>

                            <div className="grid sm:grid-cols-2 gap-3">
                                <Button onClick={() => setStep("details")} variant="outline" className="border-slate-200 hover:bg-slate-50 text-slate-700 py-6">
                                    Back to Details
                                </Button>
                                <Button onClick={handleReady} className="bg-blue-600 hover:bg-blue-500 py-6 text-lg">
                                    Mark Handoff Ready
                                </Button>
                            </div>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="text-center py-10 space-y-6 animate-fade-in-up">
                            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-10 h-10" />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-900">Demo Handoff Ready</h3>
                                <p className="text-slate-500 max-w-sm mx-auto mt-3">
                                    The provider handoff preview is ready. No reservation was made, no charge was taken, and no email was sent.
                                </p>
                            </div>
                            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 max-w-sm mx-auto">
                                Travellers would finish any booking directly with the provider after reviewing provider terms and availability.
                            </div>
                            <Button onClick={onClose} variant="outline" className="mt-4 border-slate-200 hover:bg-slate-50 text-slate-700">
                                Return to Itinerary
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
