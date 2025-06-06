import { useState, useEffect } from 'react';
import { apiClient, Application, ApplicationStats, CreateApplicationDto } from '@/lib/api-client';

export function useApplications(userId: number) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [stats, setStats] = useState<ApplicationStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [applicationsData, statsData] = await Promise.all([
          apiClient.getApplications(userId),
          apiClient.getApplicationStats(userId)
        ]);
        setApplications(applicationsData);
        setStats(statsData);
      } catch (err) {
        setError(err as Error);
        console.error('Failed to fetch applications:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const createApplication = async (data: Omit<CreateApplicationDto, 'userId'>) => {
    try {
      const newApplication = await apiClient.createApplication({
        ...data,
        userId
      });
      setApplications(prev => [...prev, newApplication]);
      
      // 통계 업데이트
      if (stats) {
        setStats({
          ...stats,
          totalApplications: stats.totalApplications + 1,
          appliedCount: stats.appliedCount + 1
        });
      }
      
      return newApplication;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const updateApplicationStatus = async (applicationId: number, status: string) => {
    try {
      const updatedApplication = await apiClient.updateApplicationStatus(applicationId, status);
      setApplications(prev => 
        prev.map(app => app.applicationId === applicationId ? updatedApplication : app)
      );
      
      // 통계 다시 가져오기
      const newStats = await apiClient.getApplicationStats(userId);
      setStats(newStats);
      
      return updatedApplication;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const deleteApplication = async (applicationId: number) => {
    try {
      await apiClient.deleteApplication(applicationId);
      setApplications(prev => prev.filter(app => app.applicationId !== applicationId));
      
      // 통계 다시 가져오기
      const newStats = await apiClient.getApplicationStats(userId);
      setStats(newStats);
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  // 상태별로 그룹화된 지원 현황
  const applicationsByStatus = applications.reduce((acc, app) => {
    const status = app.status.toLowerCase().replace('_', '');
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(app);
    return acc;
  }, {} as Record<string, Application[]>);

  return {
    applications,
    applicationsByStatus,
    stats,
    loading,
    error,
    createApplication,
    updateApplicationStatus,
    deleteApplication
  };
}
