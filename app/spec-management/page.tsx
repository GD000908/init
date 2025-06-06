import Sidebar from "@/components/sidebar"
import SpecManagement from "@/components/spec-management"

export default function SpecManagementPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <SpecManagement />
      </main>
    </div>
  )
}
