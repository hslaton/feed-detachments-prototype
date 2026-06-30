import type { MarketplaceAttachmentData } from '../data/mockPosts'

interface MarketplaceAttachmentProps {
  attachment: MarketplaceAttachmentData
  onNavigate: (path: string) => void
}

function ShopIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.9}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[15px] w-[15px]"
      aria-hidden="true"
    >
      <path d="M3 9 4.9 4.6h14.2L21 9q-3 1.9-6 0-3 1.9-6 0-3 1.9-6 0Z" />
      <path d="M5 10.2V20h14v-9.8" />
      <path d="M9.7 20v-4.4a2.3 2.3 0 0 1 4.6 0V20" />
    </svg>
  )
}

export default function MarketplaceAttachment({
  attachment,
  onNavigate,
}: MarketplaceAttachmentProps) {
  return (
    <div className="my-2.5 overflow-x-auto px-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex h-[68px] w-max items-center gap-2">
        <button
          type="button"
          onClick={() => onNavigate(attachment.profilePath)}
          className="flex h-full shrink-0 items-center gap-2.5 rounded-xl border border-[#ced0d4] bg-[#f7f8fa] px-3 transition-colors hover:bg-[#eef0f3] active:bg-[#e4e6eb]"
        >
          <div className="text-left">
            <p className="whitespace-nowrap text-[15px] font-semibold leading-tight text-[#050505]">
              {attachment.newItemsCount} new items
            </p>
            <p className="whitespace-nowrap text-[13px] text-[#65676b]">
              Marketplace
            </p>
          </div>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-md bg-[#e4e6eb] px-2.5 py-1.5 text-[13px] font-semibold text-[#050505]">
            <ShopIcon />
            Shop
          </span>
        </button>

        {attachment.items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.detailPath)}
            aria-label={`${item.title}, ${item.price}`}
            className="h-full w-[68px] shrink-0 overflow-hidden rounded-xl border border-[#ced0d4] bg-[#f0f2f5] transition-opacity hover:opacity-95 active:opacity-90"
          >
            <img
              src={item.thumbnailUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
