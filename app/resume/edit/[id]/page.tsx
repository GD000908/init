import Sidebar from "@/components/sidebar"
import ResumeEditor from "@/components/resume/resume-editor"

export default function ResumeEditPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <ResumeEditor resumeId={params.id} />
      </main>
    </div>
  )
}
