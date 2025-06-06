import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';

interface ActivitySummary {
  resumeCount: number;
  coverLetterCount: number;
  bookmarkCount: number;
  deadlineCount: number;
}

export function useActivitySummary(userId: number) {
  const [summary, setSummary] = useState<ActivitySummary>({
    resumeCount: 0,
    coverLetterCount: 0,
    bookmarkCount: 0,
    deadlineCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchSummary = async () => {
      try {
        setLoading(true);
        
        // 병렬로 데이터 가져오기
        const [resumes, coverLetters] = await Promise.all([
          apiClient.getResumes(userId),
          apiClient.getCoverLetters(userId),
        ]);
        
        setSummary({
          resumeCount: resumes.length,
          coverLetterCount: coverLetters.length,
          bookmarkCount: 8, // 임시 하드코딩 (추후 API 추가)
          deadlineCount: 2, // 임시 하드코딩 (추후 API 추가)
        });
      } catch (err) {
        setError(err as Error);
        console.error('Failed to fetch activity summary:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [userId]);

  return { summary, loading, error };
}
