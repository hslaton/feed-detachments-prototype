import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import { useToast } from '../components/ToastProvider'
import { mockEvents } from '../data/mockPosts'

function BackButton() {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Back"
      className="flex h-9 w-9 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-sm"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden="true">
        <path d="M15 5l-7 7 7 7" />
      </svg>
    </button>
  )
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.9} strokeLinecap="round" strokeLinejoin="round" className="h-[17px] w-[17px]" aria-hidden="true">
      <path d="M11.48 3.5a.56.56 0 011.04 0l2.12 5.11a.56.56 0 00.48.35l5.52.44c.5.04.7.66.32.99l-4.2 3.6a.56.56 0 00-.18.56l1.28 5.39a.56.56 0 01-.84.6l-4.72-2.88a.56.56 0 00-.59 0L6.98 20.54a.56.56 0 01-.84-.6l1.29-5.39a.56.56 0 00-.18-.56l-4.21-3.6a.56.56 0 01.32-.99l5.52-.44a.56.56 0 00.48-.35L11.48 3.5z" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden="true">
      <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function CalendarCheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9h17M8 3v3M16 3v3M8.8 14.2l2.1 2.1 4.3-4.3" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="#65676b" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 shrink-0" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <ellipse cx="12" cy="12" rx="4" ry="9" />
      <path d="M3 12h18M4.5 7.5h15M4.5 16.5h15" />
    </svg>
  )
}

function NotFound() {
  return (
    <PhoneFrame>
      <div className="p-4">
        <Link to="/" className="text-[#1877f2]">
          ← Back to feed
        </Link>
        <p className="mt-4">Event not found.</p>
      </div>
    </PhoneFrame>
  )
}

export default function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const event = eventId ? mockEvents[eventId] : undefined
  const [interested, setInterested] = useState(false)
  const [going, setGoing] = useState(false)
  const [tab, setTab] = useState<'about' | 'discussion'>('about')
  const { showToast } = useToast()

  if (!event) return <NotFound />

  const footer = (
    <div className="shrink-0">
      <div className="flex items-center gap-2 border-t border-[#dadde1] bg-white px-3 py-2.5">
        <button
          type="button"
          onClick={() => {
            setInterested((value) => {
              const next = !value
              if (next) {
                setGoing(false)
                showToast({
                  message: 'Your response is visible to the hosts and Friends',
                  actionLabel: 'Change',
                })
              }
              return next
            })
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-[15px] font-semibold transition-colors ${
            interested ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-[#e4e6eb] text-[#050505]'
          }`}
        >
          <StarIcon filled={interested} />
          Interested
        </button>
        <button
          type="button"
          onClick={() => {
            setGoing((value) => {
              const next = !value
              if (next) setInterested(false)
              return next
            })
          }}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-md py-2 text-[15px] font-semibold transition-colors ${
            going ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-[#e4e6eb] text-[#050505]'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[17px] w-[17px]" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 8v5l3 2" />
          </svg>
          Going
        </button>
        <button
          type="button"
          aria-label="More options"
          className="flex h-9 w-12 items-center justify-center rounded-md bg-[#e4e6eb] text-[#050505]"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>
      <BottomNav active="Home" />
    </div>
  )

  return (
    <PhoneFrame footer={footer} scrollClassName="bg-white">
      <div className="relative">
        <img
          src={event.coverUrl}
          alt=""
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="absolute left-3 top-3">
          <BackButton />
        </div>
      </div>

      <div className="px-4 pt-4 text-center">
        <p className="text-[15px] text-[#65676b]">{event.dateLine}</p>
        <h1 className="mt-1 text-[22px] font-bold leading-tight text-[#050505]">
          {event.title}
        </h1>
        <p className="mt-1 text-[14px] text-[#65676b]">
          Public · Event by <span className="font-semibold text-[#050505]">{event.hostName}</span>
        </p>
      </div>

      {(interested || going) && (
        <div className="mx-4 mt-4 rounded-lg bg-[#f0f2f5] px-3 py-2.5 text-[14px] text-[#050505]">
          Your response is visible to the hosts and{' '}
          <span className="font-semibold">Friends ▾</span>
        </div>
      )}

      <div className="mt-4 space-y-4 px-4">
        <div className="flex items-start gap-3">
          <PinIcon />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-[#050505]">
              {event.venueName}
            </p>
            <p className="text-[13px] text-[#65676b]">{event.address}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarCheckIcon />
          <div className="flex items-center gap-3">
            <p className="text-[15px] text-[#050505]">
              {event.goingLabel} · {event.interestedLabel}
            </p>
          </div>
        </div>
        <div className="-mt-2 flex items-center pl-8">
          {event.attendeeAvatars.map((src, i) => (
            <img
              key={src}
              src={src}
              alt=""
              className={`h-7 w-7 rounded-full border-2 border-white object-cover ${i > 0 ? '-ml-2' : ''}`}
            />
          ))}
        </div>

        <div className="flex items-start gap-3">
          <GlobeIcon />
          <p className="text-[15px] text-[#050505]">
            Public · Anyone on or off Facebook
          </p>
        </div>
      </div>

      <div className="mt-4 flex gap-2 px-4">
        <button
          type="button"
          onClick={() => setTab('about')}
          className={`flex-1 rounded-lg py-2 text-[15px] font-semibold ${
            tab === 'about' ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-[#e4e6eb] text-[#050505]'
          }`}
        >
          About
        </button>
        <button
          type="button"
          onClick={() => setTab('discussion')}
          className={`flex-1 rounded-lg py-2 text-[15px] font-semibold ${
            tab === 'discussion' ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-[#e4e6eb] text-[#050505]'
          }`}
        >
          Discussion
        </button>
      </div>

      <div className="mt-5 space-y-5 px-4 pb-6">
        <div>
          <h2 className="text-[19px] font-bold text-[#050505]">Posts</h2>
          <div className="mt-2 flex items-center gap-2">
            <img
              src={event.hostAvatarUrl}
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            <div className="flex-1 rounded-full bg-[#f0f2f5] px-4 py-2 text-[15px] text-[#65676b]">
              Say something...
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-[19px] font-bold text-[#050505]">What to expect</h2>
          <p className="mt-1.5 text-[15px] leading-relaxed text-[#050505]">
            {event.whatToExpect}
          </p>
        </div>

        <div>
          <h2 className="text-[19px] font-bold text-[#050505]">Meet your host</h2>
          <div className="mt-2 flex items-center gap-3 rounded-xl border border-[#dadde1] p-3">
            <img
              src={event.hostAvatarUrl}
              alt=""
              className="h-12 w-12 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-[#050505]">
                {event.hostName}
              </p>
              <p className="text-[13px] text-[#65676b]">Event host</p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  )
}
