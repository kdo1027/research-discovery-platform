"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"

interface ProfileHeaderProps {
  scholarId: string
  isSample?: boolean
}

export function ProfileHeader({ scholarId, isSample }: ProfileHeaderProps) {
  const router = useRouter()

  return (
    <div className="border-b border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => router.push("/")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Research Profile Analysis</h1>
              <p className="text-sm text-muted-foreground">AI-generated insights and recommendations</p>
            </div>
          </div>
          {!isSample && (
            <Button variant="outline" size="sm" asChild>
              <a
                href={`https://scholar.google.com/citations?user=${scholarId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                View on Google Scholar
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
