import { useState, useEffect } from 'react';
import { apiClient, User } from '@/lib/api-client';

export function useUser(userId: number) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getUser(userId);
        setUser(data);
      } catch (err) {
        setError(err as Error);
        console.error('Failed to fetch user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const updateUser = async (data: Partial<User>) => {
    if (!userId) return;
    
    try {
      const updatedUser = await apiClient.updateUser(userId, data);
      setUser(updatedUser);
      return updatedUser;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return { user, loading, error, updateUser };
}
