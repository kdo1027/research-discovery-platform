"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { X } from "lucide-react"
import { useState } from "react"

export interface FilterState {
  yearRange: [number, number]
  topics: string[]
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterState) => void
  availableTopics?: string[]
}

const CURRENT_YEAR = new Date().getFullYear()
const MIN_YEAR = 2000
const MAX_YEAR = CURRENT_YEAR

export function FilterSidebar({ onFilterChange, availableTopics = [] }: FilterSidebarProps) {
  const [filters, setFilters] = useState<FilterState>({
    yearRange: [MIN_YEAR, MAX_YEAR],
    topics: [],
  })

  const handleYearRangeChange = (value: number[]) => {
    const newFilters = {
      ...filters,
      yearRange: [value[0], value[1]] as [number, number],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleTopicToggle = (topic: string) => {
    const newTopics = filters.topics.includes(topic)
      ? filters.topics.filter((t) => t !== topic)
      : [...filters.topics, topic]

    const newFilters = { ...filters, topics: newTopics }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const newFilters: FilterState = {
      yearRange: [MIN_YEAR, MAX_YEAR],
      topics: [],
    }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const hasActiveFilters =
    filters.yearRange[0] !== MIN_YEAR || filters.yearRange[1] !== MAX_YEAR || filters.topics.length > 0

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Filters</CardTitle>
          {hasActiveFilters && (
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent hover:scrollbar-thumb-muted-foreground/30">
        {/* Year Range Filter */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-semibold">Publication Year</Label>
            <span className="text-xs text-muted-foreground">
              {filters.yearRange[0]} - {filters.yearRange[1]}
            </span>
          </div>
          <div className="px-2">
            <Slider
              min={MIN_YEAR}
              max={MAX_YEAR}
              step={1}
              value={filters.yearRange}
              onValueChange={handleYearRangeChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>{MIN_YEAR}</span>
            <span>{MAX_YEAR}</span>
          </div>
        </div>

        <Separator />

        {/* Topic Filter */}
        <div className="space-y-3">
          <Label className="text-sm font-semibold">Topics</Label>
          {availableTopics.length > 0 ? (
            <div className="space-y-2">
              {availableTopics.map((topic) => (
                <div key={topic} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`topic-${topic}`}
                    checked={filters.topics.includes(topic)}
                    onChange={() => handleTopicToggle(topic)}
                    className="h-4 w-4 rounded border-input bg-background accent-primary cursor-pointer"
                  />
                  <Label htmlFor={`topic-${topic}`} className="font-normal cursor-pointer leading-tight text-sm">
                    {topic}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No topics available</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
