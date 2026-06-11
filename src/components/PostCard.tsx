import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../data/mockPosts'
import EventAttachment from './EventAttachment'
import MarketplaceAttachment from './MarketplaceAttachment'
import MediaBlock from './MediaBlock'
import MediaViewer from './MediaViewer'
import PostFooter from './PostFooter'
import PostHeader from './PostHeader'

interface PostCardProps {
  post: Post
}

export default function PostCard({ post }: PostCardProps) {
  const navigate = useNavigate()
  const [viewerOpen, setViewerOpen] = useState(false)
  const [viewerStartIndex, setViewerStartIndex] = useState(0)

  const openViewer = (startIndex = 0) => {
    setViewerStartIndex(startIndex)
    setViewerOpen(true)
  }

  return (
    <article className="relative overflow-hidden rounded-lg bg-white shadow-sm">
      <PostHeader
        actorName={post.actorName}
        actorAvatarUrl={post.actorAvatarUrl}
        timestamp={post.timestamp}
      />

      {post.caption && (
        <p className="px-3 pb-2 text-[15px] leading-snug text-[#050505]">
          {post.caption}
        </p>
      )}

      <MediaBlock media={post.media} onOpenMedia={openViewer} />

      {post.attachment.type === 'event' ? (
        <EventAttachment
          attachment={post.attachment}
          onNavigate={navigate}
        />
      ) : (
        <MarketplaceAttachment
          attachment={post.attachment}
          onNavigate={navigate}
        />
      )}

      <PostFooter
        reactionCount={post.reactionCount}
        commentCount={post.commentCount}
      />

      {viewerOpen &&
        createPortal(
          <MediaViewer
            media={post.media}
            startIndex={viewerStartIndex}
            onClose={() => setViewerOpen(false)}
          />,
          document.getElementById('phone-frame') ?? document.body,
        )}
    </article>
  )
}
