interface PostHeaderProps {
  actorName: string
  actorAvatarUrl: string
  timestamp: string
}

function GlobeIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      className="h-[13px] w-[13px]"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" fill="#9fa3a8" />
      <path
        fill="#e4e6eb"
        d="M3.1 4.2c.6-.1 1.2.2 1.4.8.2.5-.2 1.1.1 1.5.4.4 1.1.1 1.4.6.2.5-.3 1-.1 1.5.2.6 1 .6 1.2 1.2.2.6-.4 1.1-.3 1.7.1.5.7.7.7 1.3-1.7-.1-3.3-1-4.3-2.4-.3.5-.9.6-1.4.4-.7-.3-.9-1.2-.7-1.9-.4-.2-.6-.6-.6-1 0-1.6.8-3 2-4 .1.1.1.2.2.3Zm9.2-.6c.5.5.9 1 1.1 1.7.2.6-.5 1-.5 1.6 0 .5.6.8.4 1.3-.2.5-.9.5-1.2 1-.3.5.1 1.1-.3 1.5-.5.5-1.3.1-1.8.6-.3.3-.2.9-.6 1.1.5-2 .3-4.2-.6-6 .5-.1 1-.2 1.4-.6.4-.4.5-1 .7-1.6.4.3.8.6 1 1Z"
      />
    </svg>
  )
}

export default function PostHeader({
  actorName,
  actorAvatarUrl,
  timestamp,
}: PostHeaderProps) {
  return (
    <div className="flex items-center gap-2 px-3 py-2.5">
      <img
        src={actorAvatarUrl}
        alt=""
        className="h-10 w-10 rounded-full object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-[#050505]">
          {actorName}
        </p>
        <p className="flex items-center gap-1 text-[13px] text-[#65676b]">
          <span>{timestamp}</span>
          <span aria-hidden="true">·</span>
          <GlobeIcon />
        </p>
      </div>
      <button
        type="button"
        className="rounded-full px-2 py-1 text-xl leading-none text-[#65676b] hover:bg-[#f0f2f5]"
        aria-label="More options"
      >
        ···
      </button>
    </div>
  )
}
