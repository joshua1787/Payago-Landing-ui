"use client"

import { useState } from "react"
import { ActivityCard, type Activity } from "./activity-card"
import { CloudRain, Sun, Users, Share2, Calendar as CalendarIcon, Plus } from "lucide-react"
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay,
    defaultDropAnimationSideEffects,
    type DragStartEvent,
    type DragEndEvent,
} from "@dnd-kit/core"
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cn } from "@/lib/utils"
import { InviteModal } from "./invite-modal"
import { BookingModal } from "./booking-modal"

// Mock Data
const INITIAL_ITINERARY: Record<string, Activity[]> = {
    "Day 1": [
        { id: "1", title: "Arrival at Narita", time: "09:00 AM", location: "Narita Airport", cost: "$20", category: "flight" },
        { id: "2", title: "Check-in: Aman Tokyo", time: "11:00 AM", location: "Otemachi Tower", cost: "$800", category: "hotel" },
        { id: "3", title: "Ramen Street Lunch", time: "01:00 PM", location: "Tokyo Station", cost: "$15", category: "food" },
    ],
    "Day 2": [
        { id: "4", title: "TeamLabs Planets", time: "10:00 AM", location: "Toyosu", cost: "$35", category: "activity" },
        { id: "5", title: "Sushi Omakase", time: "07:00 PM", location: "Ginza", cost: "$150", category: "food" },
    ],
    "Day 3": [
        { id: "6", title: "Shibuya Crossing", time: "09:00 AM", location: "Shibuya", cost: "Free", category: "activity" },
    ]
}

function SortableActivity({ activity }: { activity: Activity }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: activity.id })

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
    }

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <ActivityCard activity={activity} isDragging={isDragging} />
        </div>
    )
}

export function ItineraryBoard() {
    const [activeDay, setActiveDay] = useState("Day 1")
    const [itinerary, setItinerary] = useState(INITIAL_ITINERARY)
    const [activeId, setActiveId] = useState<string | null>(null)

    // Modal States
    const [isInviteOpen, setIsInviteOpen] = useState(false)
    const [isBookingOpen, setIsBookingOpen] = useState(false)
    const [bookingType, setBookingType] = useState<"hotel" | "flight">("hotel")

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    )

    const handleBookingTrigger = (type: "hotel" | "flight") => {
        setBookingType(type)
        setIsBookingOpen(true)
    }

    function handleDragStart(event: DragStartEvent) {
        setActiveId(event.active.id as string)
    }

    function handleDragEnd(event: DragEndEvent) {
        const { active, over } = event

        if (active.id !== over?.id) {
            setItinerary((items) => {
                const currentDayItems = items[activeDay]
                const oldIndex = currentDayItems.findIndex((item) => item.id === active.id)
                const newIndex = currentDayItems.findIndex((item) => item.id === over?.id)

                return {
                    ...items,
                    [activeDay]: arrayMove(currentDayItems, oldIndex, newIndex),
                }
            })
        }

        setActiveId(null)
    }

    const dropAnimation = {
        sideEffects: defaultDropAnimationSideEffects({
            styles: {
                active: {
                    opacity: '0.5',
                },
            },
        }),
    }

    return (
        <div className="min-h-screen bg-[#04060A] pt-24 px-6 pb-20 font-sans selection:bg-blue-500/30">

            {/* Header */}
            <header className="max-w-6xl mx-auto mb-12 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-8 animate-fade-in-up">
                {/* ... existing header code ... */}
                <div>
                    <div className="text-blue-400 font-mono text-xs tracking-widest mb-2 uppercase">Trip ID: #TOKYO-2026</div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">Tokyo Adventure 🇯🇵</h1>
                    <div className="flex items-center gap-4 text-white/50 text-sm">
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5"><CalendarIcon className="w-4 h-4" /> Oct 12 - Oct 18</span>
                        <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5"><Users className="w-4 h-4" /> 4 Travelers</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => setIsInviteOpen(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                    >
                        <Share2 className="w-4 h-4" /> Invite
                    </button>
                    <button
                        className="px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center gap-2 backdrop-blur-sm hover:bg-blue-500/20 transition-colors"
                    >
                        <Sun className="w-4 h-4" /> 22°C Clear
                    </button>
                </div>
            </header>


            {/* Main Board Area */}
            <div className="max-w-6xl mx-auto grid lg:grid-cols-[280px_1fr] gap-8 animate-fade-in-up delay-100">

                {/* Sidebar */}
                <aside className="space-y-2">
                    {Object.keys(itinerary).map((day) => (
                        <button
                            key={day}
                            onClick={() => setActiveDay(day)}
                            className={cn(
                                "w-full text-left p-4 rounded-xl transition-all duration-200 flex justify-between items-center group relative overflow-hidden",
                                activeDay === day
                                    ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 text-white shadow-lg shadow-blue-900/10"
                                    : "text-white/40 hover:bg-white/5 hover:text-white border border-transparent"
                            )}
                        >
                            <span className="font-semibold relative z-10">{day}</span>
                            {day === "Day 3" && (
                                <div className="flex items-center gap-2 relative z-10">
                                    <span className="text-[10px] bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">HIGH RAIN</span>
                                    <CloudRain className="w-4 h-4 text-blue-400 animate-pulse" />
                                </div>
                            )}
                            {activeDay === day && <div className="absolute inset-0 bg-blue-500/5" />}
                        </button>
                    ))}

                    <div className="mt-8 p-5 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 backdrop-blur-sm cursor-pointer hover:bg-orange-500/20 transition-colors">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                            </span>
                            <h4 className="text-orange-400 font-semibold text-sm">Smart Alert</h4>
                        </div>
                        <p className="text-orange-200/70 text-xs leading-relaxed">
                            Heavy rain predicted for Day 3 afternoon. Outdoor activities might be affected.
                        </p>
                        <button
                            className="mt-3 text-xs text-orange-400 hover:text-orange-300 underline underline-offset-4"
                            onClick={() => handleBookingTrigger("hotel")} // Mock trigger for demo
                        >
                            View alternatives
                        </button>
                    </div>
                </aside>

                {/* Itinerary Column */}
                <div className="bg-[#080c14] rounded-3xl border border-white/5 p-8 min-h-[600px] relative">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:32px] rounded-3xl pointer-events-none" />

                    <div className="relative z-10">
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h3 className="text-3xl font-bold text-white mb-1">{activeDay}</h3>
                                <p className="text-white/30 text-sm">Drag to reorder activities</p>
                            </div>
                            <span className="px-3 py-1 rounded-full bg-white/5 text-white/50 text-xs font-mono">
                                {itinerary[activeDay].length} ITEMS
                            </span>
                        </div>

                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={itinerary[activeDay].map(item => item.id)}
                                strategy={verticalListSortingStrategy}
                            >
                                <div className="space-y-4">
                                    {itinerary[activeDay].map((activity) => (
                                        <div key={activity.id} onClick={() => {
                                            if (activity.category === 'hotel' || activity.category === 'flight') {
                                                handleBookingTrigger(activity.category)
                                            }
                                        }}>
                                            <SortableActivity activity={activity} />
                                        </div>
                                    ))}
                                </div>
                            </SortableContext>

                            <DragOverlay dropAnimation={dropAnimation}>
                                {activeId ? (
                                    <ActivityCard
                                        activity={itinerary[activeDay].find(item => item.id === activeId)!}
                                        isDragging
                                    />
                                ) : null}
                            </DragOverlay>
                        </DndContext>

                        <button className="w-full mt-4 py-4 rounded-xl border border-dashed border-white/10 text-white/30 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all group flex items-center justify-center gap-2">
                            <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium uppercase tracking-wider">Add Activity</span>
                        </button>
                    </div>
                </div>

            </div>

            <InviteModal isOpen={isInviteOpen} onClose={() => setIsInviteOpen(false)} />
            <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} type={bookingType} />
        </div>
    )
}
