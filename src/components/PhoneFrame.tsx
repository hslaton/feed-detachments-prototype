import type { ReactNode } from 'react'

interface PhoneFrameProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
  scrollClassName?: string
}

export default function PhoneFrame({
  header,
  footer,
  children,
  scrollClassName = '',
}: PhoneFrameProps) {
  return (
    <div className="flex min-h-full items-start justify-center bg-[#e4e6eb] p-4">
      <div
        id="phone-frame"
        className="relative flex h-[844px] w-full max-w-[390px] flex-col overflow-hidden rounded-[2rem] border border-[#ccd0d5] bg-[#f0f2f5] shadow-2xl"
      >
        {header}
        <div className={`min-h-0 flex-1 overflow-y-auto ${scrollClassName}`}>
          {children}
        </div>
        {footer}
      </div>
    </div>
  )
}
