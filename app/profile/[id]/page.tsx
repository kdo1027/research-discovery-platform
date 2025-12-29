"use client"

import { ProfileHeader } from "@/components/profile-header"
import { ResearchProfile } from "@/components/research-profile"
import { PaperRecommendations } from "@/components/paper-recommendations"
import { Navigation } from "@/components/navigation"
import { useState } from "react"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const isSampleProfile = params.id === "sample"
  const [profileData, setProfileData] = useState<any>(null)
  const [papers, setPapers] = useState<any[]>([])

  return (
    <main className="min-h-screen">
      <Navigation />
      <ProfileHeader scholarId={params.id} isSample={isSampleProfile} profileData={profileData} papers={papers} />
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:h-[calc(100vh-12rem)]">
          <div className="lg:col-span-1 lg:overflow-y-auto lg:pr-4">
            <ResearchProfile scholarId={params.id} isSample={isSampleProfile} onProfileLoad={setProfileData} />
          </div>
          <div className="lg:col-span-2 lg:overflow-y-auto lg:pl-4">
            <PaperRecommendations scholarId={params.id} isSample={isSampleProfile} onPapersChange={setPapers} />
          </div>
        </div>
      </div>
    </main>
  )
}
