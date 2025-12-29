"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

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
    // Check if user is logged in (from localStorage for demo)
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
      // Load saved profiles for this user
      const storedProfiles = localStorage.getItem(`profiles_${JSON.parse(storedUser).id}`)
      if (storedProfiles) {
        setSavedProfiles(JSON.parse(storedProfiles))
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // TODO: Replace with actual API call
    const mockUser: User = {
      id: "1",
      email,
      name: email.split("@")[0],
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))

    // Load saved profiles
    const storedProfiles = localStorage.getItem(`profiles_${mockUser.id}`)
    if (storedProfiles) {
      setSavedProfiles(JSON.parse(storedProfiles))
    }

    router.push("/dashboard")
  }

  const signup = async (email: string, password: string, name: string) => {
    // TODO: Replace with actual API call
    const mockUser: User = {
      id: "1",
      email,
      name,
    }
    setUser(mockUser)
    localStorage.setItem("user", JSON.stringify(mockUser))
    router.push("/dashboard")
  }

  const logout = () => {
    setUser(null)
    setSavedProfiles([])
    localStorage.removeItem("user")
    router.push("/")
  }

  const saveProfile = (profile: Omit<SavedProfile, "id" | "userId" | "savedAt">) => {
    if (!user) return

    const newProfile: SavedProfile = {
      ...profile,
      id: Date.now().toString(),
      userId: user.id,
      savedAt: new Date().toISOString(),
    }

    const updatedProfiles = [...savedProfiles, newProfile]
    setSavedProfiles(updatedProfiles)
    localStorage.setItem(`profiles_${user.id}`, JSON.stringify(updatedProfiles))
  }

  const deleteProfile = (profileId: string) => {
    if (!user) return

    const updatedProfiles = savedProfiles.filter((p) => p.id !== profileId)
    setSavedProfiles(updatedProfiles)
    localStorage.setItem(`profiles_${user.id}`, JSON.stringify(updatedProfiles))
  }

  const updateProfile = (profileId: string, updates: Partial<SavedProfile>) => {
    if (!user) return

    const updatedProfiles = savedProfiles.map((p) => (p.id === profileId ? { ...p, ...updates } : p))
    setSavedProfiles(updatedProfiles)
    localStorage.setItem(`profiles_${user.id}`, JSON.stringify(updatedProfiles))
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
