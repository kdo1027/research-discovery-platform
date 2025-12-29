import { BookOpen, Sparkles, Mail, TrendingUp } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Instant Profile Analysis",
    description:
      "Automatically extract research areas, topics, and generate comprehensive summaries from any Google Scholar profile.",
  },
  {
    icon: Sparkles,
    title: "AI-Powered Recommendations",
    description:
      "Get personalized paper recommendations based on publication history and research interests with relevance scoring.",
  },
  {
    icon: Mail,
    title: "One-Click Outreach",
    description:
      "Generate professional email templates to connect with authors and explore collaboration opportunities.",
  },
  {
    icon: TrendingUp,
    title: "Research Discovery",
    description:
      "Find relevant papers, identify collaboration opportunities, and stay updated with the latest research in your field.",
  },
]

export function Features() {
  return (
    <div className="py-16 sm:py-24 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
            Everything you need for research discovery
          </h2>
          <p className="mt-4 sm:mt-6 text-pretty text-base sm:text-lg leading-relaxed text-muted-foreground">
            Streamline your research workflow with AI-powered tools designed for academics, graduate students, and
            research professionals.
          </p>
        </div>

        <div className="mx-auto mt-12 sm:mt-16 lg:mt-20 max-w-6xl">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative rounded-lg border border-border bg-card p-6 sm:p-8 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 sm:h-12 sm:w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg sm:text-xl font-semibold mb-3">{feature.title}</h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
