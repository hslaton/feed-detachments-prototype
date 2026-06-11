import { useCallback, useEffect, useRef, useState } from 'react'
import type { PostMedia } from '../data/mockPosts'

interface MediaViewerProps {
  media: PostMedia
  startIndex?: number
  onClose: () => void
}

export default function MediaViewer({
  media,
  startIndex = 0,
  onClose,
}: MediaViewerProps) {
  const [index, setIndex] = useState(startIndex)
  const touchStartX = useRef<number | null>(null)
  const images =
    media.type === 'video' ? [] : media.urls.length > 0 ? media.urls : []
  const canSwipe = images.length > 1

  const goNext = useCallback(() => {
    setIndex((current) => (current + 1) % images.length)
  }, [images.length])

  const goPrev = useCallback(() => {
    setIndex((current) => (current - 1 + images.length) % images.length)
  }, [images.length])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight' && canSwipe) goNext()
      if (event.key === 'ArrowLeft' && canSwipe) goPrev()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [canSwipe, goNext, goPrev, onClose])

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || !canSwipe) return
    const delta = event.changedTouches[0]!.clientX - touchStartX.current
    if (delta > 50) goPrev()
    if (delta < -50) goNext()
    touchStartX.current = null
  }

  return (
    <div
      className="absolute inset-0 z-50 flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Media viewer"
    >
      <div className="flex items-center px-2 py-2 text-white">
        <button
          type="button"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10"
          aria-label="Close media viewer"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-2"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {media.type === 'video' ? (
          <video
            src={media.urls[0]}
            poster={media.posterUrl}
            controls
            autoPlay
            playsInline
            className="max-h-full max-w-full"
          />
        ) : (
          <img
            src={images[index]}
            alt=""
            className="max-h-full max-w-full object-contain"
          />
        )}

        {canSwipe && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute left-2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute right-2 rounded-full bg-black/50 px-3 py-2 text-white hover:bg-black/70"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {canSwipe && (
        <div className="flex justify-center gap-1.5 pb-6">
          {images.map((_, dotIndex) => (
            <span
              key={dotIndex}
              className={`h-2 w-2 rounded-full ${
                dotIndex === index ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
