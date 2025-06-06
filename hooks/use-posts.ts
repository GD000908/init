import { useState, useEffect } from 'react'
import { apiClient, Post } from '@/lib/api-client'

export function usePosts(userId: number) {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!userId) return

    const fetchPosts = async () => {
      try {
        setLoading(true)
        const data = await apiClient.getPosts(userId)
        setPosts(data)
      } catch (err) {
        setError(err as Error)
        console.error('Failed to fetch posts:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [userId])

  return { posts, loading, error }
}
