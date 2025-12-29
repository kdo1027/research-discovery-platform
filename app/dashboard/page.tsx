"use client"

import { useEffect } from "react"
import { Navigation } from "@/components/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BookmarkIcon, ExternalLink, Trash2 } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { user, isLoading, savedProfiles, deleteProfile } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleDelete = (profileId: string) => {
    deleteProfile(profileId)
  }

  if (isLoading) {
    return null
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <div className="flex-1 w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="mb-8 lg:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold">My Saved Profiles</h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base">
              Manage and access your analyzed research profiles
            </p>
          </div>

          {savedProfiles.length === 0 ? (
            <Card className="max-w-2xl mx-auto">
              <CardContent className="flex flex-col items-center justify-center py-16 sm:py-20 px-6">
                <div className="rounded-full bg-primary/10 p-4 mb-6">
                  <BookmarkIcon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 text-center">No saved profiles yet</h3>
                <p className="text-muted-foreground mb-6 text-center text-sm sm:text-base max-w-md">
                  Start analyzing research profiles to save them here for quick access
                </p>
                <Link href="/">
                  <Button size="lg">Analyze a Profile</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 sm:gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {savedProfiles.map((profile) => (
              <Card key={profile.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{profile.name}</CardTitle>
                      <CardDescription className="mt-1">{profile.affiliation}</CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {profile.profileType}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Research Areas</p>
                      <div className="flex flex-wrap gap-2">
                        {profile.researchAreas.slice(0, 3).map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4">
                      <p className="text-xs text-muted-foreground">
                        Saved {new Date(profile.savedAt).toLocaleDateString()}
                      </p>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Link href={`/profile/${profile.id}`} className="flex-1">
                        <Button variant="default" size="sm" className="w-full">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Profile
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(profile.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  )
}
