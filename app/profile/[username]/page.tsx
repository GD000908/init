"use client"
import { useParams } from "next/navigation"
import UserProfile from "@/components/community/user-profile"

export default function ProfilePage() {
  const params = useParams()
  const username = params.username as string

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <UserProfile username={username} />
    </div>
  )
}
