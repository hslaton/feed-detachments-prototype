import type { LinkAttachmentData } from '../data/mockPosts'

interface LinkAttachmentProps {
  attachment: LinkAttachmentData
  onNavigate: (path: string) => void
}

export default function LinkAttachment({
  attachment,
  onNavigate,
}: LinkAttachmentProps) {
  const ctaLabel = attachment.ctaLabel ?? 'Buy'

  return (
    <button
      type="button"
      onClick={() => onNavigate(attachment.detailPath)}
      className="flex w-full items-center gap-3 px-3 pb-2.5 pt-1 text-left transition-colors hover:bg-[#f7f8fa] active:bg-[#eef0f3]"
    >
      <div className="min-w-0 flex-1">
        <p className="text-[15px] text-[#050505]">{attachment.price}</p>
        <p className="mt-0.5 text-[15px] font-semibold leading-snug text-[#050505]">
          {attachment.title}
        </p>
        {attachment.description && (
          <p className="mt-0.5 text-[15px] leading-snug text-[#050505]">
            {attachment.description}
          </p>
        )}
        <p className="mt-1 text-[13px] text-[#65676b]">{attachment.location}</p>
      </div>
      <span className="shrink-0 rounded-md bg-[#e4e6eb] px-4 py-2 text-[15px] font-semibold text-[#050505]">
        {ctaLabel}
      </span>
    </button>
  )
}
