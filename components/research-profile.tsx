"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
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

export function ResearchProfile({ scholarId, isSample }: ResearchProfileProps) {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSample) {
      setProfile(SAMPLE_PROFILE)
      setLoading(false)
    } else {
      // Simulate API call - in production, this would fetch real data
      setTimeout(() => {
        setProfile(SAMPLE_PROFILE)
        setLoading(false)
      }, 1500)
    }
  }, [scholarId, isSample])

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

  return (
    <Card className="sticky top-6">
      <CardHeader>
        <CardTitle className="text-2xl">{profile.name}</CardTitle>
        <CardDescription>{profile.affiliation}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Research Areas */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Research Areas</h3>
          <div className="flex flex-wrap gap-2">
            {profile.researchAreas.map((area) => (
              <Badge key={area} variant="default" className="bg-primary/20 text-primary hover:bg-primary/30">
                {area}
              </Badge>
            ))}
          </div>
        </div>

        {/* Research Topics */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Research Topics</h3>
          <div className="flex flex-wrap gap-2">
            {profile.researchTopics.map((topic) => (
              <Badge key={topic} variant="secondary">
                {topic}
              </Badge>
            ))}
          </div>
        </div>

        {/* Research Summary */}
        <div className="space-y-3">
          <h3 className="text-sm font-semibold text-foreground">Research Summary</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">{profile.summary}</p>
        </div>
      </CardContent>
    </Card>
  )
}
