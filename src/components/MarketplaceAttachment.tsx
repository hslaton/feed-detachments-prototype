import { useState } from 'react'
import type { MarketplaceAttachmentData } from '../data/mockPosts'
import AttachmentBlock from './AttachmentBlock'
import { useToast } from './ToastProvider'

interface MarketplaceAttachmentProps {
  attachment: MarketplaceAttachmentData
  onNavigate: (path: string) => void
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
      aria-hidden="true"
    >
      <path d="M6.32 2.58a49.26 49.26 0 0111.36 0c1.5.17 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.09.67L12 18.09l-7.16 3.58A.75.75 0 013.75 21V5.51c0-1.47 1.07-2.76 2.57-2.93z" />
    </svg>
  )
}

export default function MarketplaceAttachment({
  attachment,
  onNavigate,
}: MarketplaceAttachmentProps) {
  const [saved, setSaved] = useState(false)
  const { showToast } = useToast()

  return (
    <AttachmentBlock
      thumbnailUrl={attachment.thumbnailUrl}
      title={attachment.title}
      metadata={`${attachment.price} · ${attachment.location}`}
      detailPath={attachment.detailPath}
      onNavigate={onNavigate}
      cta={
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setSaved((value) => {
              const next = !value
              if (next) {
                showToast({
                  message: 'Saved.',
                  actionLabel: 'View',
                  onAction: () => onNavigate(attachment.detailPath),
                  icon: <BookmarkIcon filled />,
                })
              }
              return next
            })
          }}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${
            saved
              ? 'bg-[#e7f3ff] text-[#1877f2]'
              : 'bg-[#e4e6eb] text-[#050505] hover:bg-[#d8dadf]'
          }`}
        >
          <BookmarkIcon filled={saved} />
          {saved ? 'Saved' : 'Save'}
        </button>
      }
    />
  )
}
