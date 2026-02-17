"use client"

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Check, Loader2, Plane, Star } from "lucide-react"
import { useState } from "react"

export function BookingModal({ isOpen, onClose, type = "hotel" }: { isOpen: boolean; onClose: () => void; type?: "hotel" | "flight" }) {
    const [step, setStep] = useState<"details" | "payment" | "success">("details")
    const [isProcessing, setIsProcessing] = useState(false)

    const handleBook = () => {
        setStep("payment")
    }

    const handlePay = () => {
        setIsProcessing(true)
        setTimeout(() => {
            setIsProcessing(false)
            setStep("success")
        }, 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-[#0B1220] border-white/10 text-white p-0 gap-0 overflow-hidden">

                {/* Header Image */}
                {step !== "success" && (
                    <div className="h-32 bg-gray-800 relative">
                        <img
                            src={type === 'hotel' ? "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80" : "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80"}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] to-transparent" />
                        <div className="absolute bottom-4 left-6">
                            <h2 className="text-2xl font-bold">{type === 'hotel' ? 'Aman Tokyo' : 'Flight to Tokyo (NRT)'}</h2>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                                {type === 'hotel' ? <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> : <Plane className="w-3 h-3" />}
                                {type === 'hotel' ? '5.0 (Exceptional)' : 'Direct • 13h 45m'}
                            </div>
                        </div>
                    </div>
                )}

                <div className="p-6">
                    {step === "details" && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-white/5 p-3 rounded-lg">
                                    <label className="text-white/30 text-xs block mb-1">Dates</label>
                                    <div>Oct 12 - Oct 18</div>
                                </div>
                                <div className="bg-white/5 p-3 rounded-lg">
                                    <label className="text-white/30 text-xs block mb-1">Guests</label>
                                    <div>2 Adults</div>
                                </div>
                            </div>

                            <div className="border border-white/10 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between">
                                    <span>Total ({type === 'hotel' ? '5 nights' : 'Round trip'})</span>
                                    <span>$3,200.00</span>
                                </div>
                                <div className="flex justify-between text-white/50 text-sm">
                                    <span>Taxes & Fees</span>
                                    <span>$150.00</span>
                                </div>
                                <div className="border-t border-white/10 pt-3 flex justify-between font-bold text-lg text-blue-400">
                                    <span>Due Now</span>
                                    <span>$3,350.00</span>
                                </div>
                            </div>

                            <Button onClick={handleBook} className="w-full bg-blue-600 hover:bg-blue-500 py-6 text-lg">
                                Continue to Payment
                            </Button>

                            <div className="flex justify-center items-center gap-2 text-xs text-white/30">
                                <span className="w-2 h-2 rounded-full bg-green-500" /> Powered by Booking.com
                            </div>
                        </div>
                    )}

                    {step === "payment" && (
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Card Information</label>
                                    <div className="bg-white/5 border border-white/10 rounded-lg p-3 flex gap-3 items-center">
                                        <div className="w-8 h-5 bg-white/10 rounded"></div>
                                        <input type="text" placeholder="0000 0000 0000 0000" className="bg-transparent border-none outline-none flex-1 font-mono" />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Expiry</label>
                                        <input type="text" placeholder="MM/YY" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">CVC</label>
                                        <input type="text" placeholder="123" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none" />
                                    </div>
                                </div>
                            </div>

                            <Button onClick={handlePay} disabled={isProcessing} className="w-full bg-blue-600 hover:bg-blue-500 py-6 text-lg relative">
                                {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : "Pay $3,350.00"}
                            </Button>
                        </div>
                    )}

                    {step === "success" && (
                        <div className="text-center py-10 space-y-6 animate-fade-in-up">
                            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check className="w-10 h-10" />
                            </div>
                            <h3 className="text-3xl font-bold">Booking Confirmed!</h3>
                            <p className="text-white/50 max-w-xs mx-auto">
                                Your reservation at Aman Tokyo has been confirmed. A confirmation email has been sent.
                            </p>
                            <Button onClick={onClose} variant="outline" className="mt-4 border-white/10 hover:bg-white/5 hover:text-white">
                                Return to Itinerary
                            </Button>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    )
}
