import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { EventReminderAttachmentData } from '../data/mockPosts'

interface RemindMeBottomSheetProps {
  attachment: EventReminderAttachmentData
  open: boolean
  reminded: boolean
  onClose: () => void
  onConfirm: () => void
  onRemove: () => void
}

function EventsIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#f0f2f5]">
      <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
        <rect x="8" y="12" width="32" height="28" rx="4" fill="#fff" stroke="#dadde1" />
        <rect x="8" y="12" width="32" height="8" rx="4" fill="#f02849" />
        <rect x="8" y="16" width="32" height="4" fill="#f02849" />
        <circle cx="24" cy="28" r="7" fill="#fff" stroke="#1877f2" strokeWidth="1.5" />
        <path
          d="M24 24.5l1.6 3.2 3.6.5-2.6 2.5.6 3.5L24 32.4l-3.2 1.7.6-3.5-2.6-2.5 3.6-.5L24 24.5z"
          fill="#1877f2"
        />
      </svg>
    </div>
  )
}

export default function RemindMeBottomSheet({
  attachment,
  open,
  reminded,
  onClose,
  onConfirm,
  onRemove,
}: RemindMeBottomSheetProps) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  const frame =
    typeof document !== 'undefined'
      ? (document.getElementById('phone-frame') ?? document.body)
      : null

  if (!frame) return null

  return createPortal(
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/45"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="remind-me-sheet-title"
        className="relative max-h-[88%] overflow-y-auto rounded-t-2xl bg-white px-4 pb-8 pt-3 shadow-[0_-4px_24px_rgba(0,0,0,0.12)]"
      >
        <div className="mx-auto mb-4 h-1 w-9 rounded-full bg-[#ccd0d5]" />

        <div className="flex flex-col items-center text-center">
          <EventsIcon />
          <h2
            id="remind-me-sheet-title"
            className="mt-3 text-[17px] font-bold text-[#050505]"
          >
            Facebook Events
          </h2>
          <p className="mt-2 max-w-[300px] text-[15px] leading-snug text-[#65676b]">
            We&apos;ve identified event details in this post. You can now choose
            to get reminders about posts like this.
          </p>
        </div>

        <div className="mt-5 rounded-xl border border-[#dadde1] bg-white p-4 shadow-sm">
          <div className="text-center">
            <p className="text-[17px] font-bold text-[#050505]">
              {attachment.title}
            </p>
            <p className="mt-1 text-[15px] text-[#050505]">
              {attachment.sheetDateLine}
            </p>
          </div>
          {reminded ? (
            <button
              type="button"
              onClick={onRemove}
              className="mt-4 w-full rounded-lg bg-[#e4e6eb] py-2.5 text-[15px] font-semibold text-[#050505]"
            >
              Remove reminder
            </button>
          ) : (
            <button
              type="button"
              onClick={onConfirm}
              className="mt-4 w-full rounded-lg bg-[#1877f2] py-2.5 text-[15px] font-semibold text-white"
            >
              Remind me
            </button>
          )}
        </div>

        <p className="mt-5 text-center text-[13px] leading-relaxed text-[#65676b]">
          {reminded ? (
            <>
              This post is saved to{' '}
              <span className="font-semibold text-[#1877f2]">your reminders</span>{' '}
              in Events. You&apos;ll be notified one day before and one hour
              before it starts.
            </>
          ) : (
            <>
              Setting a reminder will privately save this post to{' '}
              <span className="font-semibold text-[#1877f2]">your reminders</span>{' '}
              in Events. You&apos;ll be notified one day before and one hour
              before it starts.
            </>
          )}
        </p>
      </div>
    </div>,
    frame,
  )
}
