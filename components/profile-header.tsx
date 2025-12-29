"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink, Bookmark, BookmarkCheck } from "lucide-react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useState, useEffect } from "react"
import { useToast } from "@/hooks/use-toast"

interface ProfileHeaderProps {
  scholarId: string
  isSample?: boolean
  profileData?: any
}

export function ProfileHeader({ scholarId, isSample, profileData }: ProfileHeaderProps) {
  const router = useRouter()
  const { user, savedProfiles, saveProfile } = useAuth()
  const { toast } = useToast()
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    if (user && profileData) {
      const alreadySaved = savedProfiles.some(
        (p) => p.name === profileData.name && p.affiliation === profileData.affiliation,
      )
      setIsSaved(alreadySaved)
    }
  }, [user, savedProfiles, profileData])

  const handleSaveProfile = () => {
    if (!user) {
      toast({
        title: "Sign in required",
        description: "Please sign in to save profiles",
        variant: "destructive",
      })
      router.push("/login")
      return
    }

    if (!profileData) return

    saveProfile({
      name: profileData.name,
      affiliation: profileData.affiliation,
      url: profileData.url || "",
      profileType: profileData.profileType || "Google Scholar",
      researchAreas: profileData.researchAreas,
      researchTopics: profileData.researchTopics,
      summary: profileData.summary,
      papers: profileData.papers || [],
    })

    setIsSaved(true)
    toast({
      title: "Profile saved",
      description: "This profile has been added to your dashboard",
    })
  }

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Research Profile Analysis</h1>
              <p className="text-sm text-muted-foreground">AI-generated insights and recommendations</p>
            </div>
          </div>
          <div className="flex gap-2">
            {user && (
              <Button
                variant={isSaved ? "secondary" : "default"}
                size="sm"
                onClick={handleSaveProfile}
                disabled={isSaved}
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4 mr-2" />
                    Saved
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save Profile
                  </>
                )}
              </Button>
            )}
            {!isSample && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={`https://scholar.google.com/citations?user=${scholarId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gap-2"
                >
                  View on Google Scholar
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
