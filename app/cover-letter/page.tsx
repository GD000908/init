import Sidebar from "@/components/sidebar"
import CoverLetterEditor from "@/components/cover-letter/cover-letter-editor"

export default function CoverLetterPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <CoverLetterEditor />
      </main>
    </div>
  )
}
