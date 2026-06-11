export type MediaType = 'single' | 'grid' | 'video'

export interface PostMedia {
  type: MediaType
  urls: string[]
  posterUrl?: string
}

export interface EventAttachmentData {
  type: 'event'
  id: string
  thumbnailUrl: string
  title: string
  interestedCount: number
  goingCount: number
  detailPath: string
}

export interface MarketplaceAttachmentData {
  type: 'marketplace'
  id: string
  thumbnailUrl: string
  title: string
  price: string
  location: string
  detailPath: string
}

export type AttachmentData = EventAttachmentData | MarketplaceAttachmentData

export interface Post {
  id: string
  actorName: string
  actorAvatarUrl: string
  timestamp: string
  caption: string
  media: PostMedia
  attachment: AttachmentData
  reactionCount: string
  commentCount: string
}

export interface EventDetail {
  id: string
  title: string
  coverUrl: string
  dateLine: string
  hostName: string
  venueName: string
  address: string
  distance: string
  goingLabel: string
  interestedLabel: string
  attendeeAvatars: string[]
  whatToExpect: string
  hostAvatarUrl: string
}

export interface MarketplaceDetail {
  id: string
  title: string
  coverUrl: string
  images: string[]
  price: string
  location: string
  distance: string
  description: string
  conditionSummary: string
  condition: string
  sellerName: string
  sellerAvatarUrl: string
  sellerRating: string
  sellerReviews: number
  buyerFirstName: string
  mapUrl: string
}

const festivalPhotos = [
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
]

export const mockPosts: Post[] = [
  {
    id: 'post-event-1',
    actorName: 'Day Trip',
    actorAvatarUrl:
      '/day-trip.jpg',
    timestamp: '2h',
    caption:
      'The countdown is on! Day Trip Festival 2026 is coming to Brooklyn this summer. Check out highlights from last year, or tap interested to get updates about the show as we get closer!',
    reactionCount: '1K',
    commentCount: '48',
    media: {
      type: 'grid',
      urls: festivalPhotos,
    },
    attachment: {
      type: 'event',
      id: 'event-day-trip-2024',
      thumbnailUrl:
        '/day-trip.jpg',
      title: 'Day Trip Festival 2026',
      interestedCount: 13,
      goingCount: 5,
      detailPath: '/event/event-day-trip-2024',
    },
  },
  {
    id: 'post-marketplace-1',
    actorName: 'Pablo Poralis',
    actorAvatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    timestamp: '9h',
    caption:
      'Well, time to say goodbye to my apartment. Everything must go by this weekend.',
    reactionCount: '14',
    commentCount: '2K',
    media: {
      type: 'single',
      urls: [
        'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
      ],
    },
    attachment: {
      type: 'marketplace',
      id: 'listing-dresser-1',
      thumbnailUrl:
        'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=96&h=96&fit=crop',
      title: 'Upcycled Wooden Dresser',
      price: '$185',
      location: 'Los Angeles, CA',
      detailPath: '/marketplace/listing-dresser-1',
    },
  },
  {
    id: 'post-video-1',
    actorName: 'Day Trip',
    actorAvatarUrl:
      '/day-trip.jpg',
    timestamp: '1d',
    caption:
      'Sneak peek from the stage — full recap coming soon. Tap to watch, or RSVP to the festival below.',
    reactionCount: '876',
    commentCount: '12',
    media: {
      type: 'video',
      urls: ['https://assets.mixkit.co/videos/14084/14084-720.mp4'],
      posterUrl: 'https://assets.mixkit.co/videos/14084/14084-thumb-720-0.jpg',
    },
    attachment: {
      type: 'event',
      id: 'event-day-trip-2024',
      thumbnailUrl:
        '/day-trip.jpg',
      title: 'Day Trip Festival 2026',
      interestedCount: 13,
      goingCount: 5,
      detailPath: '/event/event-day-trip-2024',
    },
  },
]

export const mockEvents: Record<string, EventDetail> = {
  'event-day-trip-2024': {
    id: 'event-day-trip-2024',
    title: 'Day Trip Festival 2026',
    coverUrl: festivalPhotos[0]!,
    dateLine: 'Aug 17 at 2 PM – 11 PM',
    hostName: 'Day Trip Presents',
    venueName: 'Brooklyn Mirage',
    address: '140 Stewart Ave, Brooklyn, NY 11237, United States · 4 mi',
    distance: '4 mi',
    goingLabel: '1.2K going',
    interestedLabel: '8.4K interested',
    attendeeAvatars: [
      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop',
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop',
    ],
    whatToExpect:
      'Day Trip Festival is back in 2026. A full day of house, techno, and community on the Brooklyn waterfront with three stages, food vendors, and art installations. Lineup and tickets on sale now at www.daytripfestival.com',
    hostAvatarUrl: '/day-trip.jpg',
  },
}

export const mockListings: Record<string, MarketplaceDetail> = {
  'listing-dresser-1': {
    id: 'listing-dresser-1',
    title: 'Upcycled Wooden Dresser',
    coverUrl:
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&h=600&fit=crop',
    ],
    price: '$185',
    location: 'Los Angeles, CA',
    distance: 'Nearby · 3 mi',
    description:
      'Solid wood dresser, refinished by hand. Six spacious drawers, all sliding smoothly. Minor wear consistent with age. Pickup only — must go by this weekend.',
    conditionSummary: '• Condition: Used – like new...',
    condition: 'Used – like new',
    sellerName: 'Pablo Poralis',
    sellerAvatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop',
    sellerRating: '4.9',
    sellerReviews: 12,
    buyerFirstName: 'Pablo',
    mapUrl:
      'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&h=400&fit=crop',
  },
}
