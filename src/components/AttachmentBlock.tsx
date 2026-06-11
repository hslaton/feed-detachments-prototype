import type { ReactNode } from 'react'

interface AttachmentBlockProps {
  thumbnailUrl: string
  title: string
  metadata: string
  detailPath: string
  onNavigate: (path: string) => void
  cta: ReactNode
}

export default function AttachmentBlock({
  thumbnailUrl,
  title,
  metadata,
  detailPath,
  onNavigate,
  cta,
}: AttachmentBlockProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onNavigate(detailPath)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onNavigate(detailPath)
        }
      }}
      className="mx-3 my-2.5 flex cursor-pointer items-center gap-3 rounded-xl border border-[#ced0d4] bg-[#f7f8fa] px-3 py-2.5 transition-colors hover:bg-[#eef0f3] active:bg-[#e4e6eb]"
    >
      <img
        src={thumbnailUrl}
        alt=""
        className="h-12 w-12 shrink-0 rounded-md object-cover"
      />
      <div className="min-w-0 flex-1">
        <p className="truncate text-[15px] font-semibold text-[#050505]">
          {title}
        </p>
        <p className="truncate text-[13px] text-[#65676b]">{metadata}</p>
      </div>
      <div className="shrink-0">{cta}</div>
    </div>
  )
}
