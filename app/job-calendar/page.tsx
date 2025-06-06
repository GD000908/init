import Sidebar from "@/components/sidebar"
import JobCalendarView from "@/components/job-calendar/job-calendar-view"

export default function JobCalendarPage() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-x-hidden">
        <JobCalendarView />
      </main>
    </div>
  )
}
