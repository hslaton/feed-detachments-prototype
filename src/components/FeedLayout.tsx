import { useLayoutEffect, useRef, type ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from './BottomNav'
import PhoneFrame from './PhoneFrame'

interface FeedLayoutProps {
  children?: ReactNode
}

let savedFeedScrollTop = 0

function HomeHeader() {
  return (
    <header className="flex shrink-0 items-center justify-between bg-white px-3 py-2">
      <div className="flex items-center gap-2.5">
        <button type="button" aria-label="Menu" className="text-[#050505]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" className="h-6 w-6" aria-hidden="true">
            <path d="M3 6h18M3 12h18M3 18h18" />
          </svg>
        </button>
        <span className="text-[28px] font-extrabold leading-none tracking-[-0.04em] text-[#1877f2]">
          facebook
        </span>
      </div>

      <div className="flex items-center gap-2.5 text-[#050505]">
        <button type="button" aria-label="Create" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4e6eb]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
            <path d="M12 6v12M6 12h12" />
          </svg>
        </button>
        <button type="button" aria-label="Search" className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4e6eb]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[21px] w-[21px]" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </button>
        <button type="button" aria-label="Messenger" className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#e4e6eb]">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-[22px] w-[22px]" aria-hidden="true">
            <path d="M12 2.2C6.3 2.2 2 6.39 2 11.98c0 2.93 1.2 5.49 3.13 7.25.2.18.31.42.32.69l.05 1.76c.02.56.6.93 1.11.69l1.96-.86c.21-.09.44-.11.65-.05 1.04.29 2.13.42 3.23.42 5.7 0 10-4.19 10-9.78S17.7 2.2 12 2.2z" />
            <path d="M6.07 14.53l2.94-4.66c.47-.74 1.47-.93 2.18-.4l2.34 1.75c.21.16.5.16.71 0l3.16-2.4c.42-.32.97.18.69.62l-2.94 4.66c-.47.74-1.47.93-2.18.4l-2.34-1.75a.59.59 0 00-.71 0l-3.16 2.4c-.42.32-.97-.18-.69-.62z" fill="white" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-white bg-[#f02849] px-1 text-[10px] font-bold leading-none text-white">
            4
          </span>
        </button>
      </div>
    </header>
  )
}

export default function FeedLayout({ children }: FeedLayoutProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const el = scrollRef.current
    if (!el) return

    el.scrollTop = savedFeedScrollTop

    const handleScroll = () => {
      savedFeedScrollTop = el.scrollTop
    }
    el.addEventListener('scroll', handleScroll, { passive: true })
    return () => el.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <PhoneFrame
      header={<HomeHeader />}
      footer={<BottomNav active="Home" />}
      scrollRef={scrollRef}
    >
      {children ?? <Outlet />}
    </PhoneFrame>
  )
}
