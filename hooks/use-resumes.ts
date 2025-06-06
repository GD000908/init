import { useState, useEffect } from 'react'
import { apiClient, Resume } from '@/lib/api-client'

export function useResumes(userId: number) {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchResumes = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getResumes(userId)
        setResumes(data)
      } catch (err) {
        setError(err as Error)
        console.error('Failed to fetch resumes:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchResumes()
  }, [userId])

  return { resumes, loading, error }
}
