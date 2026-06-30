import { Link, useNavigate, useParams } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PhoneFrame from '../components/PhoneFrame'
import { mockCommerceProfiles, mockListings } from '../data/mockPosts'

function BackHeader({ title }: { title: string }) {
  const navigate = useNavigate()
  return (
    <header className="flex shrink-0 items-center border-b border-[#dadde1] bg-white px-3 py-2.5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Back"
        className="mr-2 text-[#050505]"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.4}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
          aria-hidden="true"
        >
          <path d="M15 5l-7 7 7 7" />
        </svg>
      </button>
      <h1 className="flex-1 text-center text-[17px] font-bold text-[#050505]">
        {title}
      </h1>
      <span className="w-8" aria-hidden="true" />
    </header>
  )
}

function NotFound() {
  return (
    <PhoneFrame>
      <div className="p-4">
        <Link to="/" className="text-[#1877f2]">
          ← Back to feed
        </Link>
        <p className="mt-4">Profile not found.</p>
      </div>
    </PhoneFrame>
  )
}

export default function CommerceProfilePage() {
  const { profileId } = useParams<{ profileId: string }>()
  const navigate = useNavigate()
  const profile = profileId ? mockCommerceProfiles[profileId] : undefined

  if (!profile) return <NotFound />

  const listings = profile.listingIds
    .map((id) => mockListings[id])
    .filter(Boolean)

  return (
    <PhoneFrame
      header={<BackHeader title="Commerce profile" />}
      footer={<BottomNav active="Marketplace" />}
      scrollClassName="bg-white"
    >
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <h2 className="text-[17px] font-bold text-[#050505]">
          {profile.sellerFirstName}&apos;s listings
        </h2>
        <button
          type="button"
          className="text-[15px] font-semibold text-[#1877f2]"
        >
          Share
        </button>
      </div>

      <div className="flex items-center gap-2 px-4 pb-4">
        <div className="flex flex-1 items-center gap-2 rounded-lg bg-[#f0f2f5] px-3 py-2">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="#65676b"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px] shrink-0"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" />
          </svg>
          <span className="text-[15px] text-[#65676b]">Search listings</span>
        </div>
        <button
          type="button"
          aria-label="Filter listings"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#e4e6eb] text-[#050505]"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-[18px] w-[18px]"
            aria-hidden="true"
          >
            <path d="M4 6h16M7 12h10M10 18h4" />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-4 px-2 pb-6">
        {listings.map((listing) => (
          <button
            key={listing.id}
            type="button"
            onClick={() => navigate(`/marketplace/${listing.id}`)}
            className="text-left"
          >
            <img
              src={listing.coverUrl}
              alt=""
              className="aspect-square w-full rounded-lg object-cover"
            />
            <p className="mt-1.5 truncate px-1 text-[14px] text-[#050505]">
              {listing.price} · {listing.title}
            </p>
          </button>
        ))}
      </div>
    </PhoneFrame>
  )
}
