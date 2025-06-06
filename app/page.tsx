import Sidebar from "@/components/sidebar"
import Dashboard from "@/components/dashboard"

export default function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <Dashboard />
      </main>
    </div>
  )
}
