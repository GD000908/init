import Sidebar from "@/components/sidebar"
import ResumeList from "@/components/resume/resume-list"

export default function ResumePage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <ResumeList />
      </main>
    </div>
  )
}
