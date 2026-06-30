import type { PostMedia } from '../data/mockPosts'

interface MediaBlockProps {
  media: PostMedia
  onOpenMedia: (startIndex?: number) => void
  actionLabel?: string
}

function PlayIcon() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/20">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60">
        <svg
          viewBox="0 0 24 24"
          fill="white"
          className="ml-1 h-8 w-8"
          aria-hidden="true"
        >
          <path d="M8 5v14l11-7z" />
        </svg>
      </div>
    </div>
  )
}

export default function MediaBlock({
  media,
  onOpenMedia,
  actionLabel = 'Open media viewer',
}: MediaBlockProps) {
  const handleClick = () => onOpenMedia(0)

  if (media.type === 'single') {
    const cropStyle =
      media.imageScale && media.objectPosition
        ? {
            objectPosition: media.objectPosition,
            transform: `scale(${media.imageScale})`,
            transformOrigin: media.objectPosition,
          }
        : media.objectPosition
          ? { objectPosition: media.objectPosition }
          : undefined

    return (
      <button
        type="button"
        onClick={handleClick}
        className="block w-full cursor-pointer overflow-hidden active:opacity-90"
        aria-label={actionLabel}
      >
        <div className="aspect-[4/3] overflow-hidden">
          <img
            src={media.urls[0]}
            alt=""
            className="h-full w-full object-cover"
            style={cropStyle}
          />
        </div>
      </button>
    )
  }

  if (media.type === 'video') {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="relative block w-full cursor-pointer overflow-hidden active:opacity-90"
        aria-label="Open video viewer"
      >
        <img
          src={media.posterUrl ?? media.urls[0]}
          alt=""
          className="aspect-[4/3] w-full object-cover"
        />
        <PlayIcon />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="grid w-full cursor-pointer grid-cols-2 grid-rows-2 gap-0.5 bg-black active:opacity-90"
      aria-label={actionLabel}
    >
      {media.urls.slice(0, 4).map((url) => (
        <img
          key={url}
          src={url}
          alt=""
          className="aspect-square w-full object-cover"
        />
      ))}
    </button>
  )
}
