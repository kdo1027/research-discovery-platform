import { useState, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Pen, Trash2, Check } from 'lucide-react'

interface HighlightableTextProps {
  text: string
  className?: string
}

interface Highlight {
  id: string
  start: number
  end: number
  color: string // 'yellow' | 'green' | 'blue' | 'pink'
}

const COLORS = [
  { id: "yellow", bg: "bg-yellow-200", text: "text-yellow-900", border: "border-yellow-400" },
  { id: "green", bg: "bg-green-200", text: "text-green-900", border: "border-green-400" },
  { id: "blue", bg: "bg-blue-200", text: "text-blue-900", border: "border-blue-400" },
  { id: "pink", bg: "bg-pink-200", text: "text-pink-900", border: "border-pink-400" },
]

export function HighlightableText({ text, className }: HighlightableTextProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [highlights, setHighlights] = useState<Highlight[]>([])
  const [selection, setSelection] = useState<{
    start: number
    end: number
    top: number
    left: number
    text: string
  } | null>(null)

  // Handle text selection
  useEffect(() => {
    const handleSelection = () => {
      const sel = window.getSelection()
      if (!sel || sel.rangeCount === 0 || sel.isCollapsed) {
        setSelection(null)
        return
      }

      const range = sel.getRangeAt(0)
      const container = containerRef.current
      if (!container || !container.contains(range.commonAncestorContainer)) {
        setSelection(null)
        return
      }

      // Calculate offsets relative to the full text
      // This is tricky because of the DOM structure (spans).
      // We rely on the data-start attribute of the parent span of the text node.
      
      const getOffset = (node: Node, offset: number): number => {
        if (node.nodeType === Node.TEXT_NODE) {
          const parent = node.parentElement
          if (parent && parent.hasAttribute("data-start")) {
            return parseInt(parent.getAttribute("data-start")!) + offset
          }
        }
        // Fallback or complex case (shouldn't happen with our rendering)
        return -1
      }

      const start = getOffset(sel.anchorNode!, sel.anchorOffset)
      const end = getOffset(sel.focusNode!, sel.focusOffset)

      if (start === -1 || end === -1) {
        setSelection(null)
        return
      }

      // Normalize start/end
      const finalStart = Math.min(start, end)
      const finalEnd = Math.max(start, end)

      if (finalStart === finalEnd) return

      const rect = range.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()

      setSelection({
        start: finalStart,
        end: finalEnd,
        top: rect.top - containerRect.top - 40, // Position above
        left: rect.left - containerRect.left + rect.width / 2,
        text: text.slice(finalStart, finalEnd)
      })
    }

    document.addEventListener("selectionchange", handleSelection)
    return () => document.removeEventListener("selectionchange", handleSelection)
  }, [text])

  const addHighlight = (colorId: string) => {
    if (!selection) return

    const newHighlight: Highlight = {
      id: Math.random().toString(36).substr(2, 9),
      start: selection.start,
      end: selection.end,
      color: colorId,
    }

    // But keep partial overlaps to allow "merging" visually
    setHighlights(prev => [
      ...prev.filter(h => !(h.start >= selection.start && h.end <= selection.end)),
      newHighlight
    ])
    setSelection(null)
    window.getSelection()?.removeAllRanges()
  }

  const removeHighlight = () => {
    if (!selection) return
    
    // Remove any highlight that overlaps with the selection
    setHighlights(prev => prev.filter(h => 
      !(h.start < selection.end && h.end > selection.start)
    ))
    
    setSelection(null)
    window.getSelection()?.removeAllRanges()
  }

  const hasOverlap = selection ? highlights.some(h => 
    h.start < selection.end && h.end > selection.start
  ) : false

  // Build segments for rendering
  const getSegments = () => {
    const points = new Set<number>([0, text.length])
    highlights.forEach(h => {
      points.add(h.start)
      points.add(h.end)
    })
    
    const sortedPoints = Array.from(points).sort((a, b) => a - b)
    const segments = []

    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const start = sortedPoints[i]
      const end = sortedPoints[i + 1]
      const segmentText = text.slice(start, end)
      
      // Find the latest highlight that covers this segment
      // We iterate backwards to let newer highlights sit on top
      const activeHighlight = [...highlights].reverse().find(h => 
        h.start <= start && h.end >= end
      )

      segments.push({
        start,
        end,
        text: segmentText,
        highlight: activeHighlight
      })
    }

    return segments
  }

  return (
    <div className={cn("relative group", className)} ref={containerRef}>
      {/* Text Rendering */}
      <div className="leading-relaxed cursor-text">
        {getSegments().map((segment, i) => {
          const color = segment.highlight ? COLORS.find(c => c.id === segment.highlight!.color) : null
          return (
            <span
              key={`${segment.start}-${i}`}
              data-start={segment.start}
              className={cn(
                "transition-colors duration-200",
                color ? color.bg : "hover:bg-gray-100",
                color ? color.text : "",
                // Add a subtle border to highlighted segments to make them distinct
                color && "rounded-sm px-0.5 -mx-0.5 decoration-clone"
              )}
            >
              {segment.text}
            </span>
          )
        })}
      </div>

      {/* Floating Toolbar */}
      {selection && (
        <div
          className="absolute z-50 flex items-center gap-1 p-1.5 bg-white rounded-full shadow-lg border border-gray-200 animate-in fade-in zoom-in duration-200"
          style={{
            top: `${selection.top}px`,
            left: `${selection.left}px`,
            transform: "translateX(-50%)"
          }}
        >
          <div className="flex items-center gap-1 pr-2 border-r border-gray-200 mr-1">
            <Pen className="w-3.5 h-3.5 text-gray-500" />
            <span className="text-xs font-medium text-gray-600">Highlight</span>
          </div>
          
          {COLORS.map(color => (
            <button
              key={color.id}
              onClick={() => addHighlight(color.id)}
              className={cn(
                "w-5 h-5 rounded-full border transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400",
                color.bg,
                color.border
              )}
              title={`Highlight ${color.id}`}
            />
          ))}

          {hasOverlap && (
            <div className="flex items-center pl-2 border-l border-gray-200 ml-1">
              <button
                onClick={removeHighlight}
                className="p-1 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                title="Remove highlight"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
