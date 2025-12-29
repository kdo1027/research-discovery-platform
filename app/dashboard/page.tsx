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
    <>
      <Navigation />
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">My Saved Profiles</h1>
          <p className="text-muted-foreground mt-2">Manage and access your analyzed research profiles</p>
        </div>

        {savedProfiles.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookmarkIcon className="h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No saved profiles yet</h3>
              <p className="text-muted-foreground mb-4 text-center">
                Start analyzing research profiles to save them here
              </p>
              <Link href="/">
                <Button>Analyze a Profile</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
    </>
  )
}
