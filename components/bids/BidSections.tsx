'use client'

// Bid Sections Component
import { useEffect, useState } from 'react'
import { listBidSections, createBidSection, deleteBidSection } from '@/lib/api/bidService'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import SectionCard from './SectionCard'
import SectionEditor from './SectionEditor'
import SectionTypeSelector from './SectionTypeSelector'
import { PlusIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { BidSection } from '@/types'

interface BidSectionsProps {
  bidId: string
}

export default function BidSections({ bidId }: BidSectionsProps) {
  const [sections, setSections] = useState<BidSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [editingSection, setEditingSection] = useState<BidSection | null>(null)
  const [isTypeSelectorOpen, setIsTypeSelectorOpen] = useState(false)

  useEffect(() => {
    loadSections()
  }, [bidId])

  const loadSections = async () => {
    try {
      const data = await listBidSections(bidId)
      setSections(data)
    } catch (error) {
      toast.error('Failed to load sections')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateSection = (sectionType: BidSection['sectionType']) => {
    setEditingSection(null)
    setIsTypeSelectorOpen(false)
    setIsEditorOpen(true)
  }

  const handleEditSection = (section: BidSection) => {
    setEditingSection(section)
    setIsEditorOpen(true)
  }

  const handleDeleteSection = async (sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section?')) {
      return
    }

    try {
      await deleteBidSection(sectionId)
      toast.success('Section deleted successfully')
      loadSections()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete section')
    }
  }

  const handleEditorClose = () => {
    setIsEditorOpen(false)
    setEditingSection(null)
  }

  const handleEditorSuccess = () => {
    loadSections()
    handleEditorClose()
  }

  const sectionsByType = {
    policy: sections.filter((s) => s.sectionType === 'policy'),
    method_statement: sections.filter((s) => s.sectionType === 'method_statement'),
    cv: sections.filter((s) => s.sectionType === 'cv'),
    case_study: sections.filter((s) => s.sectionType === 'case_study'),
    insurance: sections.filter((s) => s.sectionType === 'insurance'),
    social_value: sections.filter((s) => s.sectionType === 'social_value'),
    other: sections.filter((s) => s.sectionType === 'other'),
  }

  if (isLoading) {
    return <Card>Loading sections...</Card>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Bid Sections</h3>
        <Button onClick={() => setIsTypeSelectorOpen(true)}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Add Section
        </Button>
      </div>

      {Object.entries(sectionsByType).map(([type, typeSections]) => {
        if (typeSections.length === 0) return null

        return (
          <div key={type}>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 capitalize">
              {type.replace('_', ' ')}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {typeSections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  onEdit={() => handleEditSection(section)}
                  onDelete={() => handleDeleteSection(section.id)}
                />
              ))}
            </div>
          </div>
        )
      })}

      {sections.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No sections yet</p>
            <Button onClick={() => setIsTypeSelectorOpen(true)}>Add Your First Section</Button>
          </div>
        </Card>
      )}

      {isTypeSelectorOpen && (
        <SectionTypeSelector
          onSelect={handleCreateSection}
          onClose={() => setIsTypeSelectorOpen(false)}
        />
      )}

      {isEditorOpen && (
        <SectionEditor
          bidId={bidId}
          section={editingSection}
          onClose={handleEditorClose}
          onSuccess={handleEditorSuccess}
        />
      )}
    </div>
  )
}

