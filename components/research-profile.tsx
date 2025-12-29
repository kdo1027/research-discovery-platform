"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Pencil, Save, X, Plus } from "lucide-react"
import { useEffect, useState } from "react"

interface ProfileData {
  name: string
  affiliation: string
  researchAreas: string[]
  researchTopics: string[]
  summary: string
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
      // Simulate API call - in production, this would fetch real data
      setTimeout(() => {
        setProfile(SAMPLE_PROFILE)
        setLoading(false)
        if (onProfileLoad) {
          onProfileLoad(SAMPLE_PROFILE)
        }
      }, 1500)
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
