"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function Hero() {
  const [url, setUrl] = useState("")
  const [profileType, setProfileType] = useState("google-scholar")
  const router = useRouter()

  const handleAnalyze = () => {
    if (url) {
      router.push(`/profile/sample`)
    }
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />

      <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm text-primary">
            <Sparkles className="h-4 w-4" />
            <span>Powered by AI Research Analysis</span>
          </div>

          <h1 className="text-balance text-5xl font-bold tracking-tight sm:text-7xl">
            Discover Research. <span className="text-primary">Faster.</span>
          </h1>

          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Instantly understand any researcher's work and find relevant papers through AI-powered profile analysis.
            Save hours of manual research and discover collaboration opportunities.
          </p>

          <div className="mt-10 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-3 mx-auto w-full max-w-2xl">
              <Select value={profileType} onValueChange={setProfileType}>
                <SelectTrigger className="h-14 w-full sm:w-[200px] bg-card border-border">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="google-scholar">Google Scholar</SelectItem>
                  <SelectItem value="researchgate">ResearchGate</SelectItem>
                  <SelectItem value="personal-website">Personal Website</SelectItem>
                  <SelectItem value="orcid">ORCID</SelectItem>
                  <SelectItem value="linkedin">LinkedIn</SelectItem>
                </SelectContent>
              </Select>

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Paste ${profileType === "google-scholar" ? "Google Scholar" : profileType === "researchgate" ? "ResearchGate" : profileType === "orcid" ? "ORCID" : profileType === "linkedin" ? "LinkedIn" : "profile"} URL...`}
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                  className="h-14 pl-12 pr-4 text-base bg-card border-border"
                />
              </div>
            </div>

            <Button
              size="lg"
              onClick={handleAnalyze}
              disabled={!url}
              className="h-14 px-8 text-base mx-auto w-full sm:w-auto"
            >
              Analyze Profile
            </Button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Supports Google Scholar, ResearchGate, ORCID, Personal Websites, and LinkedIn profiles
          </p>
        </div>
      </div>
    </div>
  )
}
