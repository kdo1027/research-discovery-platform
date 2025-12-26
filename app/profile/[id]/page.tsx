import { ProfileHeader } from "@/components/profile-header"
import { ResearchProfile } from "@/components/research-profile"
import { PaperRecommendations } from "@/components/paper-recommendations"

export default function ProfilePage({ params }: { params: { id: string } }) {
  const isSampleProfile = params.id === "sample"

  return (
    <main className="min-h-screen bg-background">
      <ProfileHeader scholarId={params.id} isSample={isSampleProfile} />
      <div className="mx-auto max-w-[1600px] px-6 py-8 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[380px_1fr]">
          {/* Left column: Research Profile */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <ResearchProfile scholarId={params.id} isSample={isSampleProfile} />
          </div>

          {/* Right column: Filters and Papers */}
          <div className="min-w-0">
            <PaperRecommendations scholarId={params.id} isSample={isSampleProfile} />
          </div>
        </div>
      </div>
    </main>
  )
}
