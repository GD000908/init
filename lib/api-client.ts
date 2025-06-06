const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // User APIs
  async getUser(userId: number) {
    return this.request<User>(`/users/${userId}`);
  }

  async updateUser(userId: number, data: Partial<User>) {
    return this.request<User>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Resume APIs
  async getResumes(userId: number) {
    return this.request<Resume[]>(`/resumes?userId=${userId}`);
  }

  // Post APIs
  async getPosts(userId: number) {
    return this.request<Post[]>(`/posts?userId=${userId}`);
  }

  async createPost(data: CreatePostDto) {
    return this.request<Post>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(postId: number, data: Partial<CreatePostDto>) {
    return this.request<Post>(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(postId: number) {
    return this.request<void>(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  // Application APIs
  async getApplications(userId: number) {
    return this.request<Application[]>(`/applications?userId=${userId}`);
  }

  async getApplicationStats(userId: number) {
    return this.request<ApplicationStats>(`/applications/stats?userId=${userId}`);
  }

  async createApplication(data: CreateApplicationDto) {
    return this.request<Application>('/applications', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateApplicationStatus(applicationId: number, status: string) {
    return this.request<Application>(`/applications/${applicationId}/status?status=${status}`, {
      method: 'PUT',
    });
  }

  async deleteApplication(applicationId: number) {
    return this.request<void>(`/applications/${applicationId}`, {
      method: 'DELETE',
    });
  }

  // Company APIs
  async getCompanies() {
    return this.request<Company[]>('/companies');
  }

  // Cover Letter APIs (추후 구현)
  async getCoverLetters(userId: number) {
    // 임시 데이터 반환
    return Promise.resolve([]);
  }
}

// Types
export interface User {
  userId: number;
  name: string;
  careerLevel: string;
  jobCategory: string;
  profileImageUrl?: string;
  isMatchingEnabled: boolean;
  email?: string;
  phone?: string;
  jobTitle?: string;
  introduction?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Resume {
  resumeId: number;
  userId: number;
  title: string;
  isPrimary: boolean;
  jobCategory?: string;
  targetCompanyType?: string;
  targetLocation?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  applicationId: number;
  userId: number;
  companyId: number;
  companyName: string;
  resumeId?: number;
  resumeTitle?: string;
  coverLetterId?: number;
  coverLetterTitle?: string;
  status: 'APPLIED' | 'DOCUMENT_PASS' | 'FINAL_PASS' | 'REJECTED';
  appliedDate: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApplicationStats {
  totalApplications: number;
  appliedCount: number;
  documentPassCount: number;
  finalPassCount: number;
  rejectedCount: number;
  documentPassRate: number;
  finalPassRate: number;
}

export interface Company {
  companyId: number;
  name: string;
  industry?: string;
  size: string;
  location?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateApplicationDto {
  userId: number;
  companyId: number;
  resumeId?: number;
  coverLetterId?: number;
  status?: string;
  appliedDate: string;
  notes?: string;
}

export interface Post {
  postId: number;
  userId: number;
  userName: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostDto {
  userId: number;
  content: string;
}

export const apiClient = new ApiClient();
