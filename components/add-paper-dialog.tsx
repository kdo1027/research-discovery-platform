"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Plus, X } from "lucide-react"

interface AddPaperDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAddPaper: (paper: any) => void
}

export function AddPaperDialog({ open, onOpenChange, onAddPaper }: AddPaperDialogProps) {
  const [title, setTitle] = useState("")
  const [authors, setAuthors] = useState("")
  const [venue, setVenue] = useState("")
  const [year, setYear] = useState(new Date().getFullYear().toString())
  const [keywords, setKeywords] = useState("")
  const [abstract, setAbstract] = useState("")
  const [link, setLink] = useState("")
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfDataUrl, setPdfDataUrl] = useState<string>("")

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file && file.type === "application/pdf") {
      setPdfFile(file)

      // Convert to data URL for storage
      const reader = new FileReader()
      reader.onload = () => {
        setPdfDataUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemovePdf = () => {
    setPdfFile(null)
    setPdfDataUrl("")
  }

  const handleSubmit = () => {
    const newPaper = {
      id: Date.now().toString(),
      title: title || "Untitled Paper",
      authors: authors ? authors.split(",").map((a) => a.trim()) : ["Unknown Author"],
      venue: venue || "Unknown Venue",
      year: Number.parseInt(year) || new Date().getFullYear(),
      keywords: keywords ? keywords.split(",").map((k) => k.trim()) : [],
      abstract: abstract || "No abstract provided.",
      relevanceScore: 80,
      relevanceReason: "User-added paper",
      link: link || "",
      pdfData: pdfDataUrl || null,
    }

    onAddPaper(newPaper)

    // Reset form
    setTitle("")
    setAuthors("")
    setVenue("")
    setYear(new Date().getFullYear().toString())
    setKeywords("")
    setAbstract("")
    setLink("")
    setPdfFile(null)
    setPdfDataUrl("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Paper</DialogTitle>
          <DialogDescription>
            Upload a PDF and/or manually enter paper details. All fields are optional.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* PDF Upload */}
          <div className="space-y-2">
            <Label>Upload PDF (Optional)</Label>
            {!pdfFile ? (
              <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="pdf-upload"
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">Click to upload PDF</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF files only, max 10MB</p>
                </label>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Upload className="h-4 w-4 text-primary" />
                  <span className="text-sm">{pdfFile.name}</span>
                </div>
                <Button variant="ghost" size="icon" onClick={handleRemovePdf}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Paper Title *</Label>
            <Input
              id="title"
              placeholder="Enter paper title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Authors */}
          <div className="space-y-2">
            <Label htmlFor="authors">Authors (comma-separated)</Label>
            <Input
              id="authors"
              placeholder="John Doe, Jane Smith, etc."
              value={authors}
              onChange={(e) => setAuthors(e.target.value)}
            />
          </div>

          {/* Venue and Year */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="venue">Venue</Label>
              <Input
                id="venue"
                placeholder="Conference/Journal"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                type="number"
                placeholder="2024"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>
          </div>

          {/* Keywords */}
          <div className="space-y-2">
            <Label htmlFor="keywords">Keywords (comma-separated)</Label>
            <Input
              id="keywords"
              placeholder="Machine Learning, NLP, etc."
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
            />
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <Label htmlFor="abstract">Abstract</Label>
            <Textarea
              id="abstract"
              placeholder="Enter paper abstract"
              rows={4}
              value={abstract}
              onChange={(e) => setAbstract(e.target.value)}
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="link">Paper URL (Optional)</Label>
            <Input
              id="link"
              type="url"
              placeholder="https://arxiv.org/abs/..."
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <p className="text-xs text-muted-foreground">DOI, arXiv link, or any paper URL</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!title}>
            <Plus className="h-4 w-4 mr-2" />
            Add Paper
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
