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
    <div className="border-b border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10 shrink-0" onClick={() => router.push("/")}>
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold truncate">Research Profile Analysis</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">AI-generated insights and recommendations</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:gap-2">
            {user && (
              <Button
                variant={isSaved ? "secondary" : "default"}
                size="sm"
                onClick={handleSaveProfile}
                disabled={isSaved}
                className="gap-2"
              >
                {isSaved ? (
                  <>
                    <BookmarkCheck className="h-4 w-4" />
                    <span className="hidden sm:inline">Saved</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="h-4 w-4" />
                    <span className="hidden sm:inline">Save Profile</span>
                  </>
                )}
              </Button>
            )}
            {!isSample && (
              <Button variant="outline" size="sm" asChild className="gap-2">
                <a
                  href={`https://scholar.google.com/citations?user=${scholarId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="hidden sm:inline">View on</span>
                  <span>Google Scholar</span>
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
