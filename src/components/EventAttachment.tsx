import { useState } from 'react'
import type { EventAttachmentData } from '../data/mockPosts'
import AttachmentBlock from './AttachmentBlock'
import { useToast } from './ToastProvider'

interface EventAttachmentProps {
  attachment: EventAttachmentData
  onNavigate: (path: string) => void
}

function StarIcon({ filled }: { filled: boolean }) {
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
      <path d="M11.48 3.5a.56.56 0 011.04 0l2.12 5.11a.56.56 0 00.48.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.39a.56.56 0 01-.84.6l-4.72-2.88a.56.56 0 00-.59 0L6.98 20.54a.56.56 0 01-.84-.6l1.29-5.39a.56.56 0 00-.18-.56l-4.21-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.48-.35L11.48 3.5z" />
    </svg>
  )
}

export default function EventAttachment({
  attachment,
  onNavigate,
}: EventAttachmentProps) {
  const [interested, setInterested] = useState(false)
  const { showToast } = useToast()
  const interestedCount =
    attachment.interestedCount + (interested ? 1 : 0)

  return (
    <AttachmentBlock
      thumbnailUrl={attachment.thumbnailUrl}
      title={attachment.title}
      metadata={`${interestedCount} interested · ${attachment.goingCount} going`}
      detailPath={attachment.detailPath}
      onNavigate={onNavigate}
      cta={
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            setInterested((value) => {
              const next = !value
              if (next) {
                showToast({
                  message: 'Your response is visible to the hosts and Friends.',
                  actionLabel: 'Change',
                })
              }
              return next
            })
          }}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${
            interested
              ? 'bg-[#e7f3ff] text-[#1877f2]'
              : 'bg-[#e4e6eb] text-[#050505] hover:bg-[#d8dadf]'
          }`}
        >
          <StarIcon filled={interested} />
          {interested ? 'Interested ✓' : 'Interested'}
        </button>
      }
    />
  )
}
