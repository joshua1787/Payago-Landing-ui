import type { ImgHTMLAttributes } from "react"

type OptimizedPictureProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "alt" | "className" | "srcSet"> & {
    src: string
    alt: string
    avifSrc?: string
    webpSrc?: string
    className?: string
    imgClassName?: string
}

const localRasterPattern = /^(\/(?!\/).+)\.(png|jpe?g|webp)([?#].*)?$/i

function getOptimizedSources(src: string) {
    const match = src.match(localRasterPattern)

    if (!match) return null

    const [, pathWithoutExtension, , suffix = ""] = match

    return {
        avif: `${pathWithoutExtension}.avif${suffix}`,
        webp: `${pathWithoutExtension}.webp${suffix}`,
    }
}

export function OptimizedPicture({
    src,
    alt,
    avifSrc,
    webpSrc,
    className = "contents",
    imgClassName,
    sizes,
    loading = "lazy",
    decoding = "async",
    ...imgProps
}: OptimizedPictureProps) {
    const derivedSources = getOptimizedSources(src)
    const sources = {
        avif: avifSrc ?? derivedSources?.avif,
        webp: webpSrc ?? derivedSources?.webp,
    }
    const fallbackSrc = sources.webp ?? src

    return (
        <picture className={className}>
            {sources.avif && <source srcSet={sources.avif} type="image/avif" sizes={sizes} />}
            {sources.webp && <source srcSet={sources.webp} type="image/webp" sizes={sizes} />}
            <img {...imgProps} src={fallbackSrc} alt={alt} className={imgClassName} sizes={sizes} loading={loading} decoding={decoding} />
        </picture>
    )
}
