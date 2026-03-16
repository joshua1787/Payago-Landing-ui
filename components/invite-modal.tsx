"use client"

import { useState } from "react"
import { Copy, Check, Users, Mail } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function InviteModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText("https://payago.app/trip/tokyo-2026")
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white border-slate-200 text-slate-900 sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                        <Users className="w-5 h-5 text-blue-500" />
                        Invite Friends
                    </DialogTitle>
                    <DialogDescription className="text-slate-500">
                        Share this trip to plan together in real-time.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center space-x-2 mt-4">
                    <div className="grid flex-1 gap-2">
                        <Input
                            id="link"
                            defaultValue="https://payago.app/trip/tokyo-2026"
                            readOnly
                            className="bg-slate-50 border-slate-200 text-slate-700 focus-visible:ring-blue-500"
                        />
                    </div>
                    <Button type="submit" size="sm" className="px-3 bg-blue-600 hover:bg-blue-500" onClick={handleCopy}>
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                </div>

                <div className="relative my-4">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-slate-200" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-white px-2 text-slate-400">Or via email</span>
                    </div>
                </div>

                <div className="space-y-4">
                    {/* Mock Existing Members */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-xs font-bold text-white">JD</div>
                                <div className="text-sm">
                                    <div className="font-medium text-slate-900">You</div>
                                    <div className="text-slate-400 text-xs">Organizer</div>
                                </div>
                            </div>
                            <span className="text-xs text-slate-400">Joined</span>
                        </div>
                        <div className="flex items-center justify-between opacity-50">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-xs text-slate-400"><Mail className="w-3 h-3" /></div>
                                <div className="text-sm">
                                    <div className="font-medium text-slate-700">alex@example.com</div>
                                    <div className="text-slate-400 text-xs">Pending</div>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 text-xs text-slate-400 hover:text-slate-700">Resend</Button>
                        </div>
                    </div>
                </div>

                <DialogFooter className="sm:justify-start">

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
