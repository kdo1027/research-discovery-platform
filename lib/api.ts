/**
 * API utility functions for backend communication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api'

export interface ApiResponse<T> {
  data?: T
  error?: string
}

/**
 * Get authentication token from localStorage
 */
function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem('token')
}

/**
 * Make authenticated API request
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const token = getToken()
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Request failed' }))
      return { error: errorData.error || `HTTP ${response.status}` }
    }
    
    const data = await response.json()
    return { data }
  } catch (error) {
    return { error: error instanceof Error ? error.message : 'Network error' }
  }
}

/**
 * Authentication API
 */
export const authApi = {
  login: async (email: string, password: string) => {
    return apiRequest<{ user: any; access_token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
  },
  
  register: async (email: string, password: string, name: string) => {
    return apiRequest<{ user: any; access_token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })
  },
  
  getCurrentUser: async () => {
    return apiRequest<{ user: any }>('/auth/me', {
      method: 'GET',
    })
  },
}

/**
 * Profiles API
 */
export const profilesApi = {
  analyze: async (url: string, profileType: string) => {
    return apiRequest<{ profile: any; profile_id: string }>('/profiles/analyze', {
      method: 'POST',
      body: JSON.stringify({ url, profile_type: profileType }),
    })
  },
  
  list: async () => {
    return apiRequest<{ profiles: any[] }>('/profiles', {
      method: 'GET',
    })
  },
  
  get: async (profileId: string) => {
    return apiRequest<{ profile: any }>(`/profiles/${profileId}`, {
      method: 'GET',
    })
  },
  
  save: async (profile: any) => {
    return apiRequest<{ message: string; profile: any }>('/profiles', {
      method: 'POST',
      body: JSON.stringify(profile),
    })
  },
  
  update: async (profileId: string, updates: any) => {
    return apiRequest<{ profile: any }>(`/profiles/${profileId}`, {
      method: 'PUT',
      body: JSON.stringify(updates),
    })
  },
  
  delete: async (profileId: string) => {
    return apiRequest<{ message: string }>(`/profiles/${profileId}`, {
      method: 'DELETE',
    })
  },
}

/**
 * Recommendations API
 */
export const recommendationsApi = {
  search: async (query: string, topK: number = 10, includeExplainability: boolean = false) => {
    return apiRequest<{
      recommendations: any[]
      explainability?: any
      sentence_explanations?: any
    }>('/recommendations/search', {
      method: 'POST',
      body: JSON.stringify({
        query,
        top_k: topK,
        include_explainability: includeExplainability,
      }),
    })
  },
}

