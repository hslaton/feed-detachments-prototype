import { useState } from 'react'
import type { EventReminderAttachmentData } from '../data/mockPosts'
import AttachmentBlock from './AttachmentBlock'
import RemindMeBottomSheet from './RemindMeBottomSheet'
import { useToast } from './ToastProvider'

interface EventReminderAttachmentProps {
  attachment: EventReminderAttachmentData
}

function BellIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
      aria-hidden="true"
    >
      <path d="M18 9a6 6 0 10-12 0c0 3.6-1.2 5.3-2.1 6.2-.5.5-.16 1.3.55 1.3h15.1c.71 0 1.05-.8.55-1.3-.9-.9-2.1-2.6-2.1-6.2z" />
      <path d="M10 20a2.2 2.2 0 0 0 4 0" />
    </svg>
  )
}

export default function EventReminderAttachment({
  attachment,
}: EventReminderAttachmentProps) {
  const [sheetOpen, setSheetOpen] = useState(false)
  const [reminded, setReminded] = useState(false)
  const { showToast } = useToast()

  const openSheet = () => setSheetOpen(true)

  return (
    <>
      <AttachmentBlock
        thumbnailUrl={attachment.thumbnailUrl}
        title={attachment.title}
        metadata={attachment.metadata}
        onBlockClick={openSheet}
        cta={
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation()
              openSheet()
            }}
            className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-[13px] font-semibold transition-colors ${
              reminded
                ? 'bg-[#e7f3ff] text-[#1877f2]'
                : 'bg-[#e4e6eb] text-[#050505] hover:bg-[#d8dadf]'
            }`}
          >
            <BellIcon />
            {reminded ? 'Reminder set' : 'Remind me'}
          </button>
        }
      />

      <RemindMeBottomSheet
        attachment={attachment}
        open={sheetOpen}
        reminded={reminded}
        onClose={() => setSheetOpen(false)}
        onConfirm={() => {
          setReminded(true)
          setSheetOpen(false)
          showToast({
            message: 'Reminder set. You’ll be notified before it starts.',
            actionLabel: 'View',
            onAction: openSheet,
          })
        }}
        onRemove={() => {
          setReminded(false)
          setSheetOpen(false)
          showToast({
            message: 'Reminder removed.',
          })
        }}
      />
    </>
  )
}
