const USER_PHOTO =
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop'

interface Story {
  name: string
  image: string
  avatar: string
}

const stories: Story[] = [
  {
    name: 'Emmy Blake Hacker',
    image:
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=300&h=500&fit=crop',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop',
  },
  {
    name: 'Rachel Stuckey Slaton',
    image:
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=500&fit=crop',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop',
  },
  {
    name: 'Heather Quinn',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=500&fit=crop',
    avatar:
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=80&h=80&fit=crop',
  },
  {
    name: 'Marcus Lee',
    image:
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?w=300&h=500&fit=crop',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop',
  },
]

export default function Stories() {
  return (
    <div className="flex gap-2 overflow-x-auto px-2 pb-3 pt-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <button
        type="button"
        className="relative h-[200px] w-[112px] shrink-0 overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(0,0,0,0.2)]"
      >
        <img
          src={USER_PHOTO}
          alt=""
          className="h-[148px] w-full object-cover"
        />
        <span className="flex h-[52px] items-end justify-center pb-2 text-[12px] font-semibold text-[#050505]">
          Create story
        </span>
        <span className="absolute left-1/2 top-[148px] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-4 border-white bg-[#1877f2]">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth={3}
            strokeLinecap="round"
            className="h-4 w-4"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>

      {stories.map((story) => (
        <button
          key={story.name}
          type="button"
          className="relative h-[200px] w-[112px] shrink-0 overflow-hidden rounded-xl"
        >
          <img
            src={story.image}
            alt=""
            className="h-full w-full object-cover"
          />
          <span className="absolute left-2 top-2 block h-9 w-9 overflow-hidden rounded-full border-[3px] border-[#1877f2]">
            <img
              src={story.avatar}
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent px-2 pb-2 pt-7">
            <span className="line-clamp-2 text-left text-[12px] font-semibold leading-tight text-white">
              {story.name}
            </span>
          </span>
        </button>
      ))}
    </div>
  )
}
