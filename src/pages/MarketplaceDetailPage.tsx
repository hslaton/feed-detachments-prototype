import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import PhoneFrame from '../components/PhoneFrame'
import { useToast } from '../components/ToastProvider'
import { mockListings } from '../data/mockPosts'

function Header() {
  const navigate = useNavigate()
  return (
    <header className="flex shrink-0 items-center justify-between bg-white px-3 py-2.5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Close"
        className="text-[#050505]"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div className="flex items-center gap-4 text-[#050505]">
        <button type="button" aria-label="Cart">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
            <circle cx="9" cy="20" r="1.4" />
            <circle cx="18" cy="20" r="1.4" />
            <path d="M2.5 3h2.2l2.1 11.4a1.5 1.5 0 001.48 1.23h8.3a1.5 1.5 0 001.47-1.2l1.4-7.03H5.4" />
          </svg>
        </button>
        <button type="button" aria-label="Search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
        </button>
        <button type="button" aria-label="More options">
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
          </svg>
        </button>
      </div>
    </header>
  )
}

function MessengerIcon({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.2C6.3 2.2 2 6.39 2 11.98c0 2.93 1.2 5.49 3.13 7.25.2.18.31.42.32.69l.05 1.76c.02.56.6.93 1.11.69l1.96-.86c.21-.09.44-.11.65-.05 1.04.29 2.13.42 3.23.42 5.7 0 10-4.19 10-9.78S17.7 2.2 12 2.2z" />
      <path d="M6.07 14.53l2.94-4.66c.47-.74 1.47-.93 2.18-.4l2.34 1.75c.21.16.5.16.71 0l3.16-2.4c.42-.32.97.18.69.62l-2.94 4.66c-.47.74-1.47.93-2.18.4l-2.34-1.75a.59.59 0 00-.71 0l-3.16 2.4c-.42.32-.97-.18-.69-.62z" fill="white" />
    </svg>
  )
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1.9} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
      <path d="M6.32 2.58a49.26 49.26 0 0111.36 0c1.5.17 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.09.67L12 18.09l-7.16 3.58A.75.75 0 013.75 21V5.51c0-1.47 1.07-2.76 2.57-2.93z" />
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
        <p className="mt-4">Listing not found.</p>
      </div>
    </PhoneFrame>
  )
}

export default function MarketplaceDetailPage() {
  const { listingId } = useParams<{ listingId: string }>()
  const listing = listingId ? mockListings[listingId] : undefined
  const [activeImage, setActiveImage] = useState(0)
  const [delivery, setDelivery] = useState<'pickup' | 'shipping'>('pickup')
  const [saved, setSaved] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const { showToast } = useToast()

  if (!listing) return <NotFound />

  const footer = (
    <div className="flex shrink-0 items-center justify-around border-t border-[#dadde1] bg-white px-2 pb-2 pt-1.5 text-[#050505]">
      {[
        {
          label: 'Alerts',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
              <path d="M18 9a6 6 0 10-12 0c0 3.6-1.2 5.3-2.1 6.2-.5.5-.16 1.3.55 1.3h15.1c.71 0 1.05-.8.55-1.3C19.2 14.3 18 12.6 18 9z" />
              <path d="M10 20a2.2 2.2 0 004 0" />
            </svg>
          ),
        },
        { label: 'Message', icon: <MessengerIcon className="h-[22px] w-[22px]" /> },
        {
          label: 'Share',
          icon: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-[22px] w-[22px]" aria-hidden="true">
              <path d="M4 11v7a2 2 0 002 2h12a2 2 0 002-2v-7" />
              <path d="M12 15V3M8 7l4-4 4 4" />
            </svg>
          ),
        },
      ].map((item) => (
        <button key={item.label} type="button" className="flex flex-col items-center gap-1">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e4e6eb]">
            {item.icon}
          </span>
          <span className="text-[11px] font-medium">{item.label}</span>
        </button>
      ))}
      <button
        type="button"
        onClick={() => {
          setSaved((value) => {
            const next = !value
            if (next) {
              showToast({
                message: 'Saved.',
                actionLabel: 'View',
                icon: <BookmarkIcon filled />,
              })
            }
            return next
          })
        }}
        className={`flex flex-col items-center gap-1 ${saved ? 'text-[#1877f2]' : 'text-[#050505]'}`}
      >
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${saved ? 'bg-[#e7f3ff]' : 'bg-[#e4e6eb]'}`}>
          <BookmarkIcon filled={saved} />
        </span>
        <span className="text-[11px] font-medium">{saved ? 'Saved' : 'Save'}</span>
      </button>
    </div>
  )

  return (
    <PhoneFrame header={<Header />} footer={footer} scrollClassName="bg-white">
      <div className="relative">
        <img
          src={listing.images[activeImage]}
          alt=""
          className="aspect-square w-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
          {listing.images.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImage(i)}
              aria-label={`Photo ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === activeImage ? 'w-1.5 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="px-4 pt-3">
        <h1 className="text-[22px] font-bold leading-tight text-[#050505]">
          {listing.title}
        </h1>
        <p className="mt-0.5 text-[17px] text-[#050505]">{listing.price}</p>
        <p className="mt-1.5 flex items-center gap-1.5 text-[14px] text-[#65676b]">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
            <circle cx="12" cy="5" r="2" />
            <path d="M10 21l1.5-6L9 12.5 8 9l3.5 1.5L15 9M11.5 15l2.5 6" />
          </svg>
          {listing.distance}
        </p>
      </div>

      <div className="mt-3 flex gap-2 px-4">
        <button
          type="button"
          onClick={() => setDelivery('pickup')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-[15px] font-semibold ${
            delivery === 'pickup' ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-[#e4e6eb] text-[#050505]'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M3 10h18M9 7V4h6v3" />
          </svg>
          Pickup
        </button>
        <button
          type="button"
          onClick={() => setDelivery('shipping')}
          className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2.5 text-[15px] font-semibold ${
            delivery === 'shipping' ? 'bg-[#e7f3ff] text-[#1877f2]' : 'bg-[#e4e6eb] text-[#050505]'
          }`}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]" aria-hidden="true">
            <path d="M3 6h11v9H3zM14 9h4l3 3v3h-7z" />
            <circle cx="7" cy="18" r="1.6" />
            <circle cx="17" cy="18" r="1.6" />
          </svg>
          Shipping
        </button>
      </div>

      <div className="mx-4 mt-3 rounded-xl border border-[#dadde1] p-3">
        <p className="flex items-center gap-2 text-[15px] font-semibold text-[#050505]">
          <span className="text-[#1877f2]">
            <MessengerIcon />
          </span>
          Message seller
        </p>
        <div className="mt-2.5 flex items-end gap-2">
          <p className="flex-1 rounded-2xl bg-[#f0f2f5] px-3 py-2 text-[14px] leading-snug text-[#050505]">
            Hi {listing.buyerFirstName}, I'm interested. Let me know if it's still available.
          </p>
          <button
            type="button"
            className="shrink-0 rounded-lg bg-[#1877f2] px-4 py-2 text-[14px] font-semibold text-white"
          >
            Send
          </button>
        </div>
      </div>

      <div className="mt-5 px-4">
        <h2 className="text-[19px] font-bold text-[#050505]">Description</h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-[#050505]">
          {expanded ? listing.description : listing.conditionSummary}
        </p>
        {expanded && (
          <div className="mt-3 flex items-center justify-between border-t border-[#dadde1] pt-3">
            <span className="text-[15px] text-[#65676b]">Condition</span>
            <span className="text-[15px] text-[#050505]">{listing.condition}</span>
          </div>
        )}
        {!expanded && (
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="mt-3 w-full rounded-lg bg-[#e4e6eb] py-2.5 text-[15px] font-semibold text-[#050505]"
          >
            See more
          </button>
        )}
      </div>

      <div className="mt-5 px-4">
        <h2 className="flex items-center gap-1 text-[19px] font-bold text-[#050505]">
          Seller
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </h2>
        <div className="mt-2 flex items-center gap-3">
          <img
            src={listing.sellerAvatarUrl}
            alt=""
            className="h-11 w-11 rounded-full object-cover"
          />
          <div className="min-w-0 flex-1">
            <p className="text-[15px] font-semibold text-[#050505]">
              {listing.sellerName}
            </p>
            <p className="flex items-center gap-1 text-[13px] text-[#65676b]">
              <span className="text-[#f7b928]">★★★★★</span>
              <span className="font-semibold text-[#050505]">{listing.sellerRating}</span>
              <span>({listing.sellerReviews})</span>
            </p>
          </div>
          <button
            type="button"
            className="shrink-0 rounded-lg bg-[#e4e6eb] px-5 py-2 text-[15px] font-semibold text-[#050505]"
          >
            Follow
          </button>
        </div>
      </div>

      <div className="mt-5 px-4 pb-6">
        <h2 className="text-[19px] font-bold text-[#050505]">Location</h2>
        <div className="relative mt-2 overflow-hidden rounded-xl">
          <img
            src={listing.mapUrl}
            alt=""
            className="h-40 w-full object-cover"
          />
          <button
            type="button"
            className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[14px] font-semibold text-[#050505] shadow"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-[16px] w-[16px]" aria-hidden="true">
              <path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Mark as too far
          </button>
        </div>
        <p className="mt-2 text-[15px] font-semibold text-[#050505]">{listing.location}</p>
        <p className="text-[13px] text-[#65676b]">Location is approximate</p>
      </div>
    </PhoneFrame>
  )
}
