// Cinematic full-bleed destination reel.
// Kept static because continuous transform animations compete with page scroll.

import { OptimizedPicture } from "@/components/optimized-picture"

const reelItems = [
    { image: "/images/travel-santorini.webp", city: "Santorini", country: "Greece", tag: "Island escape" },
    { image: "/images/travel-tokyo.webp", city: "Tokyo", country: "Japan", tag: "Food trail" },
    { image: "/images/travel-friends.webp", city: "Barcelona", country: "Spain", tag: "Group weekender" },
    { image: "/luxury-travel-destination-aerial-view-of-tropical-.webp", city: "Maldives", country: "Indian Ocean", tag: "Beach reset" },
    // Duplicate set so the loop is seamless
    { image: "/images/travel-santorini.webp", city: "Santorini", country: "Greece", tag: "Island escape" },
    { image: "/images/travel-tokyo.webp", city: "Tokyo", country: "Japan", tag: "Food trail" },
    { image: "/images/travel-friends.webp", city: "Barcelona", country: "Spain", tag: "Group weekender" },
    { image: "/luxury-travel-destination-aerial-view-of-tropical-.webp", city: "Maldives", country: "Indian Ocean", tag: "Beach reset" },
]

export function CinematicReel() {
    return (
        <div className="scroll-stable-section relative overflow-hidden border-y border-slate-100" style={{ height: "220px" }}>
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#FAFAF8] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#FAFAF8] to-transparent pointer-events-none" />

            {/* Centre text overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-slate-400 text-[10px] font-mono uppercase tracking-[0.3em] mb-2">AI-planned trips to</p>
                    <p className="text-slate-700 text-lg font-bold tracking-wide">
                        group-ready destinations worldwide
                    </p>
                </div>
            </div>

            {/* Static reel */}
            <div className="flex gap-3" style={{ width: "max-content", paddingLeft: "12px" }}>
                {reelItems.map((item, i) => (
                    <div
                        key={i}
                        className="relative rounded-2xl overflow-hidden flex-shrink-0"
                        style={{ width: "300px", height: "196px" }}
                    >
                        <OptimizedPicture
                            src={item.image}
                            alt={item.city}
                            className="contents"
                            imgClassName="w-full h-full object-cover opacity-70"
                            style={{
                                transformOrigin: "center center",
                            }}
                        />
                        {/* Bottom label */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <p className="text-white/90 text-xs font-semibold">{item.city}</p>
                            <p className="text-white/50 text-[10px]">{item.country}</p>
                        </div>
                        {/* Tag */}
                        <div className="absolute top-3 right-3">
                            <span className="text-[9px] font-bold text-white/70 bg-black/35 border border-white/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                {item.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
