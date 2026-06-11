interface PostFooterProps {
  reactionCount: string
  commentCount: string
}

function ThumbIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <path d="M3.5 10.5H6V19H3.5A1.5 1.5 0 012 17.5v-5.5a1.5 1.5 0 011.5-1.5z" />
      <path d="M6 10.5l3.9-6.6a1.6 1.6 0 012.95.83V8.2h4.55a1.7 1.7 0 011.66 2.07l-1.3 6A1.7 1.7 0 0116.1 17.6H6" />
    </svg>
  )
}

function CommentIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[21px] w-[21px]"
      aria-hidden="true"
    >
      <path d="M21 11.6c0 4.4-4 7.9-9 7.9a9.8 9.8 0 01-3.5-.63L3 20.5l1.4-3.85A7.4 7.4 0 013 11.6C3 7.2 7 3.7 12 3.7s9 3.5 9 7.9z" />
    </svg>
  )
}

function ShareIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[22px] w-[22px]"
      aria-hidden="true"
    >
      <path d="M13.5 8.5V5.2L21 12l-7.5 6.8V15.3c-5 0-8.3 1.4-10.5 4.7.7-6.6 4.2-10.7 10.5-11.5z" />
    </svg>
  )
}

function ReactionBubbles() {
  return (
    <div className="flex items-center">
      <span className="z-10 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#1877f2] ring-2 ring-white">
        <svg viewBox="0 0 24 24" fill="white" className="h-3 w-3" aria-hidden="true">
          <path d="M2 11h3v9H3a1 1 0 01-1-1v-8zm5 0 3.6-6.1a1.4 1.4 0 012.6.73V8.3h4a1.4 1.4 0 011.37 1.7l-1.2 6.1A1.4 1.4 0 0116 17.3H7V11z" />
        </svg>
      </span>
      <span className="-ml-1.5 flex h-[20px] w-[20px] items-center justify-center rounded-full bg-[#f3425f] ring-2 ring-white">
        <svg viewBox="0 0 24 24" fill="white" className="h-3 w-3" aria-hidden="true">
          <path d="M12 20s-7-4.35-9.33-8.5C1.1 8.7 2.3 5.5 5.5 5.5c1.9 0 3.2 1 4.5 2.5 1.3-1.5 2.6-2.5 4.5-2.5 3.2 0 4.4 3.2 2.83 6C19 15.65 12 20 12 20z" />
        </svg>
      </span>
    </div>
  )
}

export default function PostFooter({
  reactionCount,
  commentCount,
}: PostFooterProps) {
  return (
    <div className="border-t border-[#dadde1] px-3 py-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5 text-[#65676b]">
          <button
            type="button"
            className="flex items-center gap-1.5 active:opacity-60"
          >
            <ThumbIcon />
            <span className="text-[15px]">{reactionCount}</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 active:opacity-60"
          >
            <CommentIcon />
            <span className="text-[15px]">{commentCount}</span>
          </button>
          <button type="button" className="active:opacity-60">
            <ShareIcon />
          </button>
        </div>
        <ReactionBubbles />
      </div>
    </div>
  )
}
