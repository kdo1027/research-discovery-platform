"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { authApi, profilesApi } from "@/lib/api"

interface User {
  id: string
  email: string
  name: string
}

interface SavedProfile {
  id: string
  userId: string
  name: string
  affiliation: string
  url: string
  profileType: string
  savedAt: string
  researchAreas: string[]
  researchTopics: string[]
  summary: string
  papers: any[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isLoading: boolean
  savedProfiles: SavedProfile[]
  saveProfile: (profile: Omit<SavedProfile, "id" | "userId" | "savedAt">) => void
  deleteProfile: (profileId: string) => void
  updateProfile: (profileId: string, updates: Partial<SavedProfile>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [savedProfiles, setSavedProfiles] = useState<SavedProfile[]>([])
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    const token = localStorage.getItem("token")
    
    if (storedUser && token) {
      const user = JSON.parse(storedUser)
      setUser(user)
      // Load saved profiles from API
      loadSavedProfiles(token)
    }
    setIsLoading(false)
  }, [])

  const loadSavedProfiles = async (token: string) => {
    try {
      const result = await profilesApi.list()
      if (result.data) {
        setSavedProfiles(result.data.profiles || [])
      }
    } catch (error) {
      console.error("Failed to load profiles:", error)
    }
  }

  const login = async (email: string, password: string) => {
    const result = await authApi.login(email, password)
    
    if (result.error || !result.data) {
      throw new Error(result.error || "Login failed")
    }
    
    const { user: userData, access_token } = result.data
    const user: User = {
      id: String(userData.id),
      email: userData.email,
      name: userData.name || userData.full_name || email.split("@")[0],
    }
    
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", access_token)

    // Load saved profiles from API
    await loadSavedProfiles(access_token)

    router.push("/dashboard")
  }

  const signup = async (email: string, password: string, name: string) => {
    const result = await authApi.register(email, password, name)
    
    if (result.error || !result.data) {
      throw new Error(result.error || "Signup failed")
    }
    
    const { user: userData, access_token } = result.data
    const user: User = {
      id: String(userData.id),
      email: userData.email,
      name: userData.name || userData.full_name || name,
    }
    
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
    localStorage.setItem("token", access_token)
    
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    setSavedProfiles([])
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    router.push("/")
  }

  const saveProfile = async (profile: Omit<SavedProfile, "id" | "userId" | "savedAt">) => {
    if (!user) return

    const result = await profilesApi.save(profile)
    
    if (result.error || !result.data) {
      console.error("Failed to save profile:", result.error)
      return
    }
    
    const newProfile = result.data.profile
    const updatedProfiles = [...savedProfiles, newProfile]
    setSavedProfiles(updatedProfiles)
  }

  const deleteProfile = async (profileId: string) => {
    if (!user) return

    const result = await profilesApi.delete(profileId)
    
    if (result.error) {
      console.error("Failed to delete profile:", result.error)
      return
    }
    
    const updatedProfiles = savedProfiles.filter((p) => p.id !== profileId)
    setSavedProfiles(updatedProfiles)
  }

  const updateProfile = async (profileId: string, updates: Partial<SavedProfile>) => {
    if (!user) return

    const result = await profilesApi.update(profileId, updates)
    
    if (result.error || !result.data) {
      console.error("Failed to update profile:", result.error)
      return
    }
    
    const updatedProfile = result.data.profile
    const updatedProfiles = savedProfiles.map((p) => 
      p.id === profileId ? updatedProfile : p
    )
    setSavedProfiles(updatedProfiles)
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, savedProfiles, saveProfile, deleteProfile, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
