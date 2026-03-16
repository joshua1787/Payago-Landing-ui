"use client"

import { Clock, MapPin, MoreHorizontal, DollarSign } from "lucide-react"
import { cn } from "@/lib/utils"

export interface Activity {
    id: string
    title: string
    time: string
    location: string
    cost: string
    category: "food" | "activity" | "flight" | "hotel"
    image?: string
}

export function ActivityCard({ activity, isDragging }: { activity: Activity; isDragging?: boolean }) {
    return (
        <div
            className={cn(
                "group relative overflow-hidden rounded-xl bg-white border border-slate-200 transition-all duration-300 hover:border-slate-300 select-none",
                isDragging ? "rotate-3 scale-105 shadow-2xl shadow-blue-500/20 z-50 cursor-grabbing" : "hover:-translate-y-1 hover:shadow-md cursor-grab"
            )}
        >
            {/* type indicator strip */}
            <div
                className={cn(
                    "absolute left-0 top-0 bottom-0 w-1",
                    activity.category === 'food' && "bg-orange-400",
                    activity.category === 'activity' && "bg-blue-400",
                    activity.category === 'flight' && "bg-purple-400",
                    activity.category === 'hotel' && "bg-emerald-400",
                )}
            />

            <div className="flex gap-4 p-4 pl-5">

                {/* Time Column */}
                <div className="flex flex-col items-center justify-center w-12 shrink-0 border-r border-slate-100 pr-4">
                    <span className="text-sm font-mono text-slate-500">{activity.time.split(' ')[0]}</span>
                    <span className="text-xs font-mono text-slate-400">{activity.time.split(' ')[1]}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                        <h4 className="font-semibold text-slate-900 truncate pr-2">{activity.title}</h4>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-1 hover:bg-slate-100 rounded"><MoreHorizontal className="w-4 h-4 text-slate-400" /></button>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <span className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                            <MapPin className="w-3 h-3" /> {activity.location}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="flex items-center gap-1 text-slate-600">
                            <DollarSign className="w-3 h-3" /> {activity.cost}
                        </span>
                    </div>

                    {/* Voting / Social proof (mock) */}
                    <div className="flex -space-x-1.5 pt-1">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-5 h-5 rounded-full border border-white bg-gradient-to-br from-slate-200 to-slate-100" />
                        ))}
                    </div>
                </div>

                {/* Optional Image Thumbnail */}
                {activity.image && (
                    <div className="w-16 h-16 rounded-lg bg-white/5 shrink-0 overflow-hidden">
                        <img src={activity.image} alt={activity.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity" />
                    </div>
                )}
            </div>
        </div>
    )
}
