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
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Everything you need for research discovery
          </h2>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground">
            Streamline your research workflow with AI-powered tools designed for academics, graduate students, and
            research professionals.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="relative rounded-lg border border-border bg-card p-8 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
