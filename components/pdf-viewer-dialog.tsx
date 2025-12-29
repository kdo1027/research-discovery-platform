"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink } from "lucide-react"

interface PdfViewerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  pdfUrl: string
  title: string
  externalLink?: string
}

export function PdfViewerDialog({ open, onOpenChange, pdfUrl, title, externalLink }: PdfViewerDialogProps) {
  const handleDownload = () => {
    const link = document.createElement("a")
    link.href = pdfUrl
    link.download = `${title}.pdf`
    link.click()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg pr-8">{title}</DialogTitle>
            <div className="flex gap-2">
              {externalLink && (
                <Button variant="outline" size="sm" asChild>
                  <a href={externalLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Open Link
                  </a>
                </Button>
              )}
              <Button variant="outline" size="sm" onClick={handleDownload}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </DialogHeader>
        <div className="flex-1 overflow-hidden rounded-lg border">
          <iframe src={pdfUrl} className="w-full h-full" title={title} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
