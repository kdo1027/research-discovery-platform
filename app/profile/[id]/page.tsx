"use client"

import { ProfileHeader } from "@/components/profile-header"
import { ResearchProfile } from "@/components/research-profile"
import { PaperRecommendations } from "@/components/paper-recommendations"
import { Navigation } from "@/components/navigation"
import { use, useState, useEffect } from "react"
import { profilesApi } from "@/lib/api"

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  // Check if it's a sample profile or a saved profile ID
  const isSampleProfile = id === "sample"
  // Check if it's a numeric ID (saved profile) or a URL/encoded string (new analysis)
  const isSavedProfile = !isSampleProfile && /^\d+$/.test(id)
  const [profileData, setProfileData] = useState<any>(null)
  const [papers, setPapers] = useState<any[]>([])

  // Load saved profile if it's a saved profile ID
  useEffect(() => {
    if (isSavedProfile) {
      const loadSavedProfile = async () => {
        try {
          const result = await profilesApi.get(id)
          if (result.data && result.data.profile) {
            const profile = result.data.profile
            const profileDataObj = {
              name: profile.name,
              affiliation: profile.affiliation,
              url: profile.url,
              profileType: profile.profileType,
              researchAreas: profile.researchAreas || [],
              researchTopics: profile.researchTopics || [],
              summary: profile.summary,
              papers: profile.papers || [],
            }
            setProfileData(profileDataObj)
            // Transform papers to match Paper interface
            const transformedPapers = (profile.papers || []).map((paper: any) => ({
              id: paper.id || String(Math.random()),
              title: paper.title || '',
              authors: paper.authors || [],
              venue: paper.venue || '',
              year: paper.year || 2024,
              keywords: paper.keywords || [],
              abstract: paper.abstract || '',
              relevanceScore: paper.relevanceScore || 0,
              relevanceReason: paper.relevanceReason || '',
              link: paper.link || '',
              pdfData: paper.pdfData || null,
            }))
            setPapers(transformedPapers)
          }
        } catch (error) {
          console.error('Failed to load saved profile:', error)
        }
      }
      loadSavedProfile()
    }
  }, [id, isSavedProfile])

  // Update papers when profileData changes (from profile analysis)
  useEffect(() => {
    if (profileData && profileData.papers && !isSavedProfile) {
      const transformedPapers = profileData.papers.map((paper: any) => ({
        id: paper.id || paper.paper_id || String(Math.random()),
        title: paper.title || '',
        authors: paper.authors || [],
        venue: paper.venue || paper.topic || '',
        year: paper.year || 2024,
        keywords: paper.keywords || [],
        abstract: paper.abstract || '',
        relevanceScore: paper.relevanceScore || Math.round((paper.score || 0) * 100),
        relevanceReason: paper.relevanceReason || paper.relevance_reason || '',
        link: paper.link || paper.url || '',
        pdfData: paper.pdfData || null,
      }))
      setPapers(transformedPapers)
    }
  }, [profileData, isSavedProfile])

  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navigation />
      <ProfileHeader scholarId={id} isSample={isSampleProfile} profileData={profileData} />
      <div className="flex-1 w-full">
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr] xl:grid-cols-[400px_1fr]">
            {/* Left sidebar - Research Profile */}
            <aside className="order-2 lg:order-1">
              <div className="lg:sticky lg:top-6">
                <ResearchProfile 
                  scholarId={id} 
                  isSample={isSampleProfile || isSavedProfile} 
                  onProfileLoad={setProfileData} 
                />
              </div>
            </aside>

            {/* Main content - Paper Recommendations */}
            <div className="order-1 lg:order-2 min-w-0">
              <PaperRecommendations 
                scholarId={id} 
                isSample={isSampleProfile || isSavedProfile} 
                onPapersChange={setPapers} 
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
