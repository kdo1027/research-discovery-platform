"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Copy, Check, Sparkles } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Paper {
  id: string
  title: string
  authors: string[]
  venue: string
  year: number
}

interface EmailDialogProps {
  paper: Paper
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmailDialog({ paper, open, onOpenChange }: EmailDialogProps) {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [yourName, setYourName] = useState("")
  const [yourAffiliation, setYourAffiliation] = useState("")

  const generateEmail = () => {
    const name = yourName || "[Your Name]"
    const affiliation = yourAffiliation || "[Your Institution]"

    return `Subject: Research Collaboration Inquiry - ${paper.title}

Dear ${paper.authors[0].split(" ")[0]} and colleagues,

I hope this email finds you well. My name is ${name}, and I am a researcher at ${affiliation}. I recently came across your paper "${paper.title}" published in ${paper.venue} ${paper.year}, and I found it highly relevant to my current research interests.

Your work on this topic has provided valuable insights that align closely with my research direction. I am particularly interested in exploring potential collaboration opportunities or discussing your findings in more detail.

Would you be available for a brief conversation to discuss your research and explore potential synergies? I would be happy to share more about my work and how it might complement your research.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,
${name}
${affiliation}`
  }

  const emailContent = generateEmail()

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(emailContent)
      setCopied(true)
      toast({
        title: "Email copied!",
        description: "The email template has been copied to your clipboard.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again or manually copy the text.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Generate Email to Authors
          </DialogTitle>
          <DialogDescription>
            Customize your information below to generate a professional email template for reaching out to the paper
            authors.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Paper Info */}
          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <h4 className="font-semibold text-sm mb-2">Paper Details</h4>
            <p className="text-sm text-foreground">{paper.title}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {paper.authors.join(", ")} • {paper.venue} {paper.year}
            </p>
          </div>

          {/* User Info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                placeholder="Dr. Jane Smith"
                value={yourName}
                onChange={(e) => setYourName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="affiliation">Your Institution</Label>
              <Input
                id="affiliation"
                placeholder="MIT"
                value={yourAffiliation}
                onChange={(e) => setYourAffiliation(e.target.value)}
              />
            </div>
          </div>

          {/* Generated Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Generated Email</Label>
            <Textarea
              id="email"
              value={emailContent}
              readOnly
              className="min-h-[300px] font-mono text-sm leading-relaxed"
            />
          </div>
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Cancel
          </Button>
          <Button onClick={handleCopy} className="w-full sm:w-auto gap-2">
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Email
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
