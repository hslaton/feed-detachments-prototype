import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'

interface IconProps {
  active?: boolean
}

function HomeIcon({ active }: IconProps) {
  if (active) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-[26px] w-[26px]" aria-hidden="true">
        <path d="M12 2.4 2.9 10.2c-.27.23-.42.57-.42.93V20c0 .83.67 1.5 1.5 1.5h4.27c.6 0 1.08-.48 1.08-1.08v-4.06c0-.7.57-1.27 1.27-1.27h1.76c.7 0 1.27.57 1.27 1.27v4.06c0 .6.48 1.08 1.08 1.08H20c.83 0 1.5-.67 1.5-1.5v-8.87c0-.36-.15-.7-.42-.93L12 2.4z" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.1} strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]" aria-hidden="true">
      <path d="M12 2.4 2.9 10.2c-.27.23-.42.57-.42.93V20c0 .83.67 1.5 1.5 1.5h4.27c.6 0 1.08-.48 1.08-1.08v-4.06c0-.7.57-1.27 1.27-1.27h1.76c.7 0 1.27.57 1.27 1.27v4.06c0 .6.48 1.08 1.08 1.08H20c.83 0 1.5-.67 1.5-1.5v-8.87c0-.36-.15-.7-.42-.93L12 2.4z" />
    </svg>
  )
}

function ReelsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="4.5" />
      <path d="M3.5 8.2h17" />
      <path d="M8.2 3.2 10.8 8M13.6 3.2 16.2 8" />
      <path d="M10.4 11.7c0-.5.54-.8.97-.55l3.4 2.03c.42.25.42.86 0 1.11l-3.4 2.03c-.43.26-.97-.05-.97-.55v-4.1z" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FriendsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]" aria-hidden="true">
      <circle cx="15.4" cy="6.6" r="2.5" />
      <path d="M15.4 12c2.4 0 4.4 1.7 4.8 4" />
      <circle cx="9.3" cy="8.6" r="3.4" />
      <path d="M3.4 20c0-3.2 2.6-5.6 5.9-5.6s5.9 2.4 5.9 5.6" />
    </svg>
  )
}

function MarketplaceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]" aria-hidden="true">
      <path d="M3 9 4.9 4.6h14.2L21 9q-3 1.9-6 0-3 1.9-6 0-3 1.9-6 0Z" />
      <path d="M5 10.2V20h14v-9.8" />
      <path d="M9.7 20v-4.4a2.3 2.3 0 0 1 4.6 0V20" />
    </svg>
  )
}

function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[26px] w-[26px]" aria-hidden="true">
      <path d="M12 2.3v1.5" />
      <path d="M18 9.3a6 6 0 1 0-12 0c0 3.6-1.2 5.3-2.1 6.2-.5.5-.16 1.3.55 1.3h15.1c.71 0 1.05-.8.55-1.3-.9-.9-2.1-2.6-2.1-6.2z" />
      <path d="M10 20a2.2 2.2 0 0 0 4 0" />
    </svg>
  )
}

interface NavItem {
  label: string
  icon: ReactNode
  active?: boolean
}

export default function BottomNav({ active = 'Home' }: { active?: string }) {
  const navigate = useNavigate()
  const items: NavItem[] = [
    { label: 'Home', icon: <HomeIcon active={active === 'Home'} /> },
    { label: 'Reels', icon: <ReelsIcon /> },
    { label: 'Friends', icon: <FriendsIcon /> },
    { label: 'Marketplace', icon: <MarketplaceIcon /> },
    { label: 'Notifications', icon: <BellIcon /> },
    {
      label: 'Profile',
      icon: (
        <img
          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=56&h=56&fit=crop"
          alt=""
          className="h-[26px] w-[26px] rounded-full object-cover ring-[1.5px] ring-[#050505]"
        />
      ),
    },
  ]

  return (
    <nav className="flex shrink-0 items-stretch justify-around border-t border-[#dadde1] bg-white px-1 pb-2 pt-1.5">
      {items.map((item) => {
        const isActive = item.label === active
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => {
              if (item.label === 'Home') navigate('/')
            }}
            className={`relative flex flex-1 flex-col items-center gap-1 pt-1.5 ${
              isActive ? 'text-[#1877f2]' : 'text-[#050505]'
            }`}
          >
            {isActive && (
              <span className="absolute -top-[7px] h-[3px] w-9 rounded-full bg-[#1877f2]" />
            )}
            <span className="flex h-7 items-center justify-center leading-none">
              {item.icon}
            </span>
            <span className="w-full truncate text-center text-[9px] font-medium leading-none tracking-[-0.01em]">
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
