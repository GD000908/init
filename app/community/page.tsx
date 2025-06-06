import Sidebar from "@/components/sidebar"
import CommunityFeed from "@/components/community/community-feed"

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <CommunityFeed />
      </main>
    </div>
  )
}
