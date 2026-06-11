const USER_PHOTO =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop'

export default function HomeComposer() {
  return (
    <div className="flex items-center gap-2 bg-white px-3 py-2.5">
      <img
        src={USER_PHOTO}
        alt=""
        className="h-10 w-10 rounded-full object-cover"
      />
      <span className="flex-1 text-[17px] text-[#65676b]">
        What's on your mind?
      </span>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="#65676b"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-6 w-6"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="2.5" />
        <circle cx="8.5" cy="9" r="1.6" />
        <path d="M21 16l-4.5-4.5L7 21" />
      </svg>
    </div>
  )
}
