import { mockPosts } from '../data/mockPosts'
import HomeComposer from '../components/HomeComposer'
import PostCard from '../components/PostCard'
import Stories from '../components/Stories'

export default function FeedPage() {
  return (
    <div className="pb-4">
      <div className="bg-white">
        <HomeComposer />
        <div className="h-px bg-[#dadde1]" />
        <Stories />
      </div>

      <div className="mt-2 space-y-2 px-2">
        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  )
}
