"use client"

import { useEffect, useRef, useState, type ReactNode } from "react"

// Built by scripts/build-film.py: one short clip per scene. Wide for big screens, tall cut to fit a phone,
// and a lighter version of each for data saver and very slow networks.
export function filmSize() {
  const phone = window.innerWidth < 700 && window.innerHeight > window.innerWidth
  const connection = (navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } }).connection
  const slow = Boolean(connection?.saveData) || /(^|-)[23]g$/.test(connection?.effectiveType ?? "")
  const shape = phone ? "tall" : "wide"
  const size = phone ? (slow ? "slow" : "tall") : slow ? "lite" : "wide"
  return { shape, size }
}

/**
 * A scene of the film as its own section. Its clip loads as the section comes near, plays once when it's
 * mostly on screen, and rests on its last frame. Scrolled away and back, it plays again from the start.
 */
export function SceneClip({ name, id, children }: { name: "hotel" | "table" | "earth"; id?: string; children: ReactNode }) {
  const section = useRef<HTMLElement>(null)
  const video = useRef<HTMLVideoElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const box = section.current
    const player = video.current
    if (!box || !player) return
    const { shape, size } = filmSize()
    player.poster = `/film/${name}-${shape}.jpg`
    let playable = true

    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        near.disconnect()
        player.src = `/film/${name}-${size}.mp4`
      },
      { rootMargin: "120% 0px" },
    )
    const seen = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.55) {
          setShown(true)
          if (!playable || !player.paused || player.ended) return
          player.play().catch(() => {
            // iPhones in Low Power Mode won't play video: the scene's last frame stands in for it.
            playable = false
            if (player.duration) player.currentTime = player.duration - 0.05
          })
        } else if (entry.intersectionRatio === 0) {
          setShown(false)
          player.pause()
          if (playable && player.currentTime > 0) player.currentTime = 0
        }
      },
      { threshold: [0, 0.55] },
    )
    near.observe(box)
    seen.observe(box)
    return () => {
      near.disconnect()
      seen.disconnect()
      player.pause()
    }
  }, [name])

  return (
    <section ref={section} id={id} data-testid={`scene-${name}`} className="relative h-[100svh] min-h-[560px] overflow-hidden bg-[#0B1020]">
      <video ref={video} aria-hidden="true" muted playsInline preload="auto" disablePictureInPicture className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/65 via-[#0F172A]/10 to-transparent lg:bg-gradient-to-r lg:from-[#0F172A]/60 lg:via-[#0F172A]/10 lg:to-transparent" />
      <div
        data-shown={shown}
        className="relative mx-auto flex h-full max-w-7xl translate-y-6 flex-col justify-end px-6 pb-14 opacity-0 transition-[opacity,transform] duration-700 ease-out data-[shown=true]:translate-y-0 data-[shown=true]:opacity-100 motion-reduce:translate-y-0 motion-reduce:transition-none lg:justify-center lg:pb-0"
      >
        {children}
      </div>
    </section>
  )
}
