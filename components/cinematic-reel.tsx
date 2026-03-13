// Cinematic full-bleed destination reel — infinite horizontal scroll strip
// Sits between sections like a film strip. No user interaction needed.

const reelItems = [
    { image: "/images/travel-santorini.png", city: "Santorini", country: "Greece", tag: "Most Popular" },
    { image: "/images/travel-tokyo.png", city: "Tokyo", country: "Japan", tag: "Trending" },
    { image: "/images/travel-friends.png", city: "Barcelona", country: "Spain", tag: "Group Favourite" },
    { image: "/luxury-travel-destination-aerial-view-of-tropical-.jpg", city: "Maldives", country: "Indian Ocean", tag: "Luxury" },
    // Duplicate set so the loop is seamless
    { image: "/images/travel-santorini.png", city: "Santorini", country: "Greece", tag: "Most Popular" },
    { image: "/images/travel-tokyo.png", city: "Tokyo", country: "Japan", tag: "Trending" },
    { image: "/images/travel-friends.png", city: "Barcelona", country: "Spain", tag: "Group Favourite" },
    { image: "/luxury-travel-destination-aerial-view-of-tropical-.jpg", city: "Maldives", country: "Indian Ocean", tag: "Luxury" },
]

export function CinematicReel() {
    return (
        <div className="relative overflow-hidden border-y border-white/[0.04]" style={{ height: "220px" }}>
            {/* Edge fades */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#030609] to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#030609] to-transparent pointer-events-none" />

            {/* Centre text overlay */}
            <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                    <p className="text-white/15 text-[10px] font-mono uppercase tracking-[0.3em] mb-2">AI-planned trips to</p>
                    <p className="text-white/60 text-lg font-bold tracking-wide">
                        50+ destinations worldwide
                    </p>
                </div>
            </div>

            {/* Scrolling reel */}
            <div className="flex gap-3 animate-reel-scroll" style={{ width: "max-content", paddingLeft: "12px" }}>
                {reelItems.map((item, i) => (
                    <div
                        key={i}
                        className="relative rounded-2xl overflow-hidden flex-shrink-0"
                        style={{ width: "300px", height: "196px" }}
                    >
                        <img
                            src={item.image}
                            alt={item.city}
                            className="w-full h-full object-cover animate-ken-burns-slow opacity-50"
                            style={{
                                transformOrigin: "center center",
                                animationDelay: `${i * -4}s`,
                            }}
                        />
                        {/* Bottom label */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                            <p className="text-white/80 text-xs font-semibold">{item.city}</p>
                            <p className="text-white/35 text-[10px]">{item.country}</p>
                        </div>
                        {/* Tag */}
                        <div className="absolute top-3 right-3">
                            <span className="text-[9px] font-bold text-white/50 bg-white/10 border border-white/10 px-2 py-0.5 rounded-full uppercase tracking-wide">
                                {item.tag}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
