"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ExternalLink, Mail, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { EmailDialog } from "@/components/email-dialog"

interface Paper {
  id: string
  title: string
  authors: string[]
  venue: string
  year: number
  keywords: string[]
  abstract: string
  relevanceScore: number
  relevanceReason: string
  link: string
}

interface PaperRecommendationsProps {
  scholarId: string
  isSample?: boolean
}

const SAMPLE_PAPERS: Paper[] = [
  {
    id: "1",
    title: "Attention Is All You Need: A Comprehensive Survey of Transformer Architectures",
    authors: ["John Smith", "Emily Johnson", "Michael Brown"],
    venue: "NeurIPS",
    year: 2024,
    keywords: ["Transformers", "Attention Mechanisms", "Deep Learning", "Neural Architectures", "NLP"],
    abstract:
      "This paper presents a comprehensive survey of transformer architectures and their applications across various domains. We analyze the evolution of attention mechanisms from the original Transformer model to modern variants like GPT, BERT, and Vision Transformers. Our analysis covers architectural innovations, training strategies, and performance benchmarks across language understanding, generation, and multimodal tasks.",
    relevanceScore: 95,
    relevanceReason:
      "Highly relevant to your work on transformer models and neural network architectures. This survey provides comprehensive coverage of recent advances that align with your research on attention mechanisms.",
    link: "https://arxiv.org/abs/example1",
  },
  {
    id: "2",
    title: "Few-Shot Learning in Low-Resource Environments: Challenges and Opportunities",
    authors: ["Sarah Williams", "David Lee", "Anna Martinez"],
    venue: "ICML",
    year: 2024,
    keywords: ["Few-Shot Learning", "Meta-Learning", "Transfer Learning", "Low-Resource NLP", "Model Efficiency"],
    abstract:
      "We explore the challenges of few-shot learning in resource-constrained settings and propose novel approaches to improve model performance with limited training data. Our method combines meta-learning with efficient fine-tuning strategies, achieving state-of-the-art results on benchmark datasets while reducing computational requirements by 60%. We demonstrate applications in medical imaging, endangered language processing, and scientific literature analysis.",
    relevanceScore: 92,
    relevanceReason:
      "Aligns perfectly with your research on few-shot learning and low-resource applications. The proposed methods could complement your work on efficient model adaptation.",
    link: "https://arxiv.org/abs/example2",
  },
  {
    id: "3",
    title: "Ethical Considerations in Large Language Model Deployment",
    authors: ["Robert Taylor", "Lisa Anderson", "James Wilson"],
    venue: "ACL",
    year: 2024,
    keywords: ["AI Ethics", "Bias Mitigation", "Responsible AI", "Fairness", "LLM Deployment"],
    abstract:
      "This work examines the ethical implications of deploying large language models at scale, focusing on bias mitigation, fairness, and responsible AI practices. We present a framework for evaluating model outputs across demographic groups and propose technical interventions to reduce harmful biases. Our study includes case studies from real-world deployments and provides actionable guidelines for practitioners.",
    relevanceScore: 88,
    relevanceReason:
      "Connects directly to your interest in AI ethics and responsible deployment. This framework could inform your ongoing work on ethical AI systems.",
    link: "https://arxiv.org/abs/example3",
  },
  {
    id: "4",
    title: "Multimodal Learning: Bridging Vision and Language Understanding",
    authors: ["Maria Garcia", "Thomas Moore", "Jennifer Davis"],
    venue: "CVPR",
    year: 2023,
    keywords: ["Multimodal Learning", "Vision-Language Models", "Cross-Modal Attention", "Image Captioning", "VQA"],
    abstract:
      "We present a novel framework for multimodal learning that effectively combines visual and linguistic information for improved understanding and generation tasks. Our approach uses cross-modal attention mechanisms to align representations across modalities, achieving significant improvements on image captioning, visual question answering, and text-to-image generation benchmarks. We also introduce a new dataset of 100K image-text pairs with fine-grained annotations.",
    relevanceScore: 85,
    relevanceReason:
      "Relevant to your work on multimodal learning and cross-domain applications. The cross-modal attention approach could enhance your current research on vision-language models.",
    link: "https://arxiv.org/abs/example4",
  },
]

export function PaperRecommendations({ scholarId, isSample }: PaperRecommendationsProps) {
  const [papers, setPapers] = useState<Paper[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null)
  const [emailDialogOpen, setEmailDialogOpen] = useState(false)

  useEffect(() => {
    if (isSample) {
      setPapers(SAMPLE_PAPERS)
      setLoading(false)
    } else {
      // Simulate API call - in production, this would fetch real recommendations
      setTimeout(() => {
        setPapers(SAMPLE_PAPERS)
        setLoading(false)
      }, 2000)
    }
  }, [scholarId, isSample])

  const handleContactAuthors = (paper: Paper) => {
    setSelectedPaper(paper)
    setEmailDialogOpen(true)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold">Recommended Papers</h2>
          <p className="text-sm text-muted-foreground mt-1">AI-generated recommendations based on research profile</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Recommended Papers</h2>
        <p className="text-sm text-muted-foreground mt-1">
          AI-generated recommendations based on research profile ({papers.length} papers found)
        </p>
      </div>

      <div className="space-y-4">
        {papers.map((paper) => (
          <Card
            key={paper.id}
            className={`transition-all ${selectedPaper?.id === paper.id ? "ring-2 ring-primary" : "hover:border-primary/50"}`}
          >
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl leading-tight">{paper.title}</CardTitle>
                  <CardDescription className="mt-2">
                    {paper.authors.join(", ")} • {paper.venue} {paper.year}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">{paper.relevanceScore}%</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {paper.keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                  >
                    #{keyword}
                  </span>
                ))}
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground">{paper.abstract}</p>

              <div className="rounded-lg bg-primary/5 p-3">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">Why this matters:</span> {paper.relevanceReason}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <a href={paper.link} target="_blank" rel="noopener noreferrer" className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Paper
                  </a>
                </Button>
                <Button
                  variant={selectedPaper?.id === paper.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleContactAuthors(paper)}
                  className="gap-2"
                >
                  <Mail className="h-4 w-4" />
                  Contact Authors
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedPaper && <EmailDialog paper={selectedPaper} open={emailDialogOpen} onOpenChange={setEmailDialogOpen} />}
    </div>
  )
}
