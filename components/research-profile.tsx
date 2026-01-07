"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Save, X, Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { profilesApi } from "@/lib/api"

interface ProfileData {
  name: string
  affiliation: string
  researchAreas: string[]
  researchTopics: string[]
  summary: string
  url?: string
  profileType?: string
  papers?: any[]
}

interface ResearchProfileProps {
  scholarId: string
  isSample?: boolean
  onProfileLoad?: (data: ProfileData) => void
}

const SAMPLE_PROFILE: ProfileData = {
  name: "Dr. Sarah Chen",
  affiliation: "Stanford University, Department of Computer Science",
  researchAreas: ["Machine Learning", "Natural Language Processing", "Computer Vision"],
  researchTopics: [
    "Deep Learning",
    "Transformer Models",
    "Neural Networks",
    "AI Ethics",
    "Multimodal Learning",
    "Few-Shot Learning",
  ],
  summary:
    "Dr. Sarah Chen is a leading researcher in machine learning and artificial intelligence, with a focus on developing novel neural network architectures for natural language understanding. Her work bridges theoretical foundations with practical applications, particularly in low-resource settings and ethical AI deployment. With over 50 publications in top-tier venues and 5,000+ citations, she has made significant contributions to transformer architectures and multimodal learning systems.",
}

export function ResearchProfile({ scholarId, isSample, onProfileLoad }: ResearchProfileProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedProfile, setEditedProfile] = useState<ProfileData | null>(null)
  const [newArea, setNewArea] = useState("")
  const [newTopic, setNewTopic] = useState("")

  useEffect(() => {
    if (isSample) {
      setProfile(SAMPLE_PROFILE)
      setLoading(false)
      if (onProfileLoad) {
        onProfileLoad(SAMPLE_PROFILE)
      }
    } else {
      // Check if scholarId is a saved profile ID (numeric)
      const isSavedProfileId = /^\d+$/.test(scholarId)
      
      if (isSavedProfileId) {
        // Load saved profile
        const loadSavedProfile = async () => {
          try {
            const result = await profilesApi.get(scholarId)
            if (result.data && result.data.profile) {
              const profile = result.data.profile
              const transformedProfile: ProfileData = {
                name: profile.name || '',
                affiliation: profile.affiliation || '',
                researchAreas: profile.researchAreas || [],
                researchTopics: profile.researchTopics || [],
                summary: profile.summary || '',
                url: profile.url || '',
                profileType: profile.profileType || 'google-scholar',
                papers: profile.papers || [],
              }
              setProfile(transformedProfile)
              if (onProfileLoad) {
                onProfileLoad(transformedProfile)
              }
            }
          } catch (error) {
            console.error('Error loading saved profile:', error)
            setProfile(SAMPLE_PROFILE)
            if (onProfileLoad) {
              onProfileLoad(SAMPLE_PROFILE)
            }
          } finally {
            setLoading(false)
          }
        }
        loadSavedProfile()
      } else {
        // Call backend API to analyze profile
        const analyzeProfile = async () => {
          try {
            // Construct profile URL based on scholarId
            // If scholarId is a URL, decode it; otherwise assume Google Scholar
            let profileUrl = scholarId
            if (!scholarId.startsWith('http')) {
              try {
                profileUrl = decodeURIComponent(scholarId)
              } catch {
                profileUrl = `https://scholar.google.com/citations?user=${scholarId}`
              }
            }
            
            // Determine profile type from URL
            let profileType = 'google-scholar'
            if (profileUrl.includes('researchgate.net')) {
              profileType = 'researchgate'
            } else if (profileUrl.includes('orcid.org')) {
              profileType = 'orcid'
            } else if (profileUrl.includes('linkedin.com')) {
              profileType = 'linkedin'
            }
            
            const result = await profilesApi.analyze(profileUrl, profileType)
            
            if (result.error || !result.data) {
              console.error('Failed to analyze profile:', result.error)
              // Fallback to sample data on error
              setProfile(SAMPLE_PROFILE)
              setLoading(false)
              if (onProfileLoad) {
                onProfileLoad(SAMPLE_PROFILE)
              }
              return
            }
            
            const profileData = result.data.profile
            const transformedProfile: ProfileData = {
              name: profileData.name || '',
              affiliation: profileData.affiliation || '',
              researchAreas: profileData.researchAreas || [],
              researchTopics: profileData.researchTopics || [],
              summary: profileData.summary || '',
              url: profileData.url || profileUrl,
              profileType: profileData.profileType || profileType,
              papers: profileData.papers || [],
            }
            
            setProfile(transformedProfile)
            if (onProfileLoad) {
              onProfileLoad(transformedProfile)
            }
          } catch (error) {
            console.error('Error analyzing profile:', error)
            // Fallback to sample data on error
            setProfile(SAMPLE_PROFILE)
            if (onProfileLoad) {
              onProfileLoad(SAMPLE_PROFILE)
            }
          } finally {
            setLoading(false)
          }
        }
        
        analyzeProfile()
      }
    }
  }, [scholarId, isSample, onProfileLoad])

  const handleEdit = () => {
    setEditedProfile({ ...profile! })
    setIsEditing(true)
  }

  const handleSave = () => {
    setProfile(editedProfile!)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditedProfile(null)
    setIsEditing(false)
    setNewArea("")
    setNewTopic("")
  }

  const handleAddArea = () => {
    if (newArea.trim() && editedProfile) {
      setEditedProfile({
        ...editedProfile,
        researchAreas: [...editedProfile.researchAreas, newArea.trim()],
      })
      setNewArea("")
    }
  }

  const handleRemoveArea = (area: string) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        researchAreas: editedProfile.researchAreas.filter((a) => a !== area),
      })
    }
  }

  const handleAddTopic = () => {
    if (newTopic.trim() && editedProfile) {
      setEditedProfile({
        ...editedProfile,
        researchTopics: [...editedProfile.researchTopics, newTopic.trim()],
      })
      setNewTopic("")
    }
  }

  const handleRemoveTopic = (topic: string) => {
    if (editedProfile) {
      setEditedProfile({
        ...editedProfile,
        researchTopics: editedProfile.researchTopics.filter((t) => t !== topic),
      })
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2 mt-2" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-28" />
            </div>
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-20 w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!profile) return null

  const displayProfile = isEditing ? editedProfile! : profile

  return (
    <Card>
      <CardHeader>
        {isEditing ? (
          <div className="space-y-3">
            <Input
              value={editedProfile?.name}
              onChange={(e) => setEditedProfile({ ...editedProfile!, name: e.target.value })}
              className="text-2xl font-bold h-auto py-2"
            />
            <Input
              value={editedProfile?.affiliation}
              onChange={(e) => setEditedProfile({ ...editedProfile!, affiliation: e.target.value })}
              className="text-sm"
            />
          </div>
        ) : (
          <>
            <CardTitle className="text-2xl">{displayProfile.name}</CardTitle>
            <CardDescription>{displayProfile.affiliation}</CardDescription>
          </>
        )}

        <div className="flex gap-2 pt-2">
          {!isEditing ? (
            <Button size="sm" variant="outline" onClick={handleEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button size="sm" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Research Areas</h3>
          <div className="flex flex-wrap gap-2">
            {displayProfile.researchAreas.map((area) => (
              <Badge
                key={area}
                variant="default"
                className="bg-primary/20 text-primary hover:bg-primary/30 relative group"
              >
                {area}
                {isEditing && (
                  <button onClick={() => handleRemoveArea(area)} className="ml-2 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add new research area..."
                value={newArea}
                onChange={(e) => setNewArea(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddArea()}
                className="text-sm"
              />
              <Button size="sm" onClick={handleAddArea}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Research Topics</h3>
          <div className="flex flex-wrap gap-2">
            {displayProfile.researchTopics.map((topic) => (
              <Badge key={topic} variant="secondary" className="relative group">
                {topic}
                {isEditing && (
                  <button onClick={() => handleRemoveTopic(topic)} className="ml-2 hover:text-destructive">
                    <X className="h-3 w-3" />
                  </button>
                )}
              </Badge>
            ))}
          </div>
          {isEditing && (
            <div className="flex gap-2">
              <Input
                placeholder="Add new topic..."
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAddTopic()}
                className="text-sm"
              />
              <Button size="sm" onClick={handleAddTopic}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Research Summary</h3>
          {isEditing ? (
            <Textarea
              value={editedProfile?.summary}
              onChange={(e) => setEditedProfile({ ...editedProfile!, summary: e.target.value })}
              className="text-sm min-h-[150px]"
            />
          ) : (
            <p className="text-sm leading-relaxed text-muted-foreground">{displayProfile.summary}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
