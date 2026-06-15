import type { ReactNode, Ref } from 'react'

interface PhoneFrameProps {
  header?: ReactNode
  footer?: ReactNode
  children: ReactNode
  scrollClassName?: string
  scrollRef?: Ref<HTMLDivElement>
}

export default function PhoneFrame({
  header,
  footer,
  children,
  scrollClassName = '',
  scrollRef,
}: PhoneFrameProps) {
  return (
    <div className="flex min-h-full items-start justify-center bg-[#e4e6eb] sm:p-4">
      <div
        id="phone-frame"
        className="relative flex h-[100dvh] w-full flex-col overflow-hidden bg-[#f0f2f5] sm:h-[844px] sm:max-w-[390px] sm:rounded-[2rem] sm:border sm:border-[#ccd0d5] sm:shadow-2xl"
      >
        {header}
        <div
          ref={scrollRef}
          className={`min-h-0 flex-1 overflow-y-auto ${scrollClassName}`}
        >
          {children}
        </div>
        {footer}
      </div>
    </div>
  )
}
