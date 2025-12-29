"use client"

import { ProfileHeader } from "@/components/profile-header"
import { ResearchProfile } from "@/components/research-profile"
import { PaperRecommendations } from "@/components/paper-recommendations"
import { Navigation } from "@/components/navigation"
import { use, useState } from "react"

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const isSampleProfile = id === "sample"
  const [profileData, setProfileData] = useState<any>(null)
  const [papers, setPapers] = useState<any[]>([])

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
                <ResearchProfile scholarId={id} isSample={isSampleProfile} onProfileLoad={setProfileData} />
              </div>
            </aside>

            {/* Main content - Paper Recommendations */}
            <div className="order-1 lg:order-2 min-w-0">
              <PaperRecommendations scholarId={id} isSample={isSampleProfile} onPapersChange={setPapers} />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
