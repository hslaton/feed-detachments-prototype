import { useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import type { Post } from '../data/mockPosts'
import EventAttachment from './EventAttachment'
import EventReminderAttachment from './EventReminderAttachment'
import LinkAttachment from './LinkAttachment'
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

  const linkAttachment =
    post.attachment?.type === 'link' ? post.attachment : undefined

  const handleMediaClick = linkAttachment
    ? () => navigate(linkAttachment.detailPath)
    : openViewer

  return (
    <article className="relative overflow-hidden rounded-lg bg-white shadow-sm">
      <PostHeader
        actorName={post.actorName}
        actorAvatarUrl={post.actorAvatarUrl}
        timestamp={post.timestamp}
      />

      {(post.caption || post.captionLink) && (
        <p className="px-3 pb-2 text-[15px] leading-snug text-[#050505]">
          {post.caption}
          {post.captionLink && (
            <>
              {'\n'}
              <button
                type="button"
                onClick={() => navigate(post.captionLink!.detailPath)}
                className="text-left text-[#1877f2] hover:underline"
              >
                {post.captionLink.displayUrl}
              </button>
            </>
          )}
        </p>
      )}

      <MediaBlock
        media={post.media}
        onOpenMedia={handleMediaClick}
        actionLabel={linkAttachment ? 'Open listing' : undefined}
      />

      {post.attachment?.type === 'event' ? (
        <EventAttachment
          attachment={post.attachment}
          onNavigate={navigate}
        />
      ) : post.attachment?.type === 'marketplace' ? (
        <MarketplaceAttachment
          attachment={post.attachment}
          onNavigate={navigate}
        />
      ) : post.attachment?.type === 'link' ? (
        <LinkAttachment attachment={post.attachment} onNavigate={navigate} />
      ) : post.attachment?.type === 'eventReminder' ? (
        <EventReminderAttachment attachment={post.attachment} />
      ) : null}

      <PostFooter
        reactionCount={post.reactionCount}
        commentCount={post.commentCount}
      />

      {viewerOpen && !linkAttachment &&
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
