'use client'

// Mapping Modal Component
import { useState, useEffect } from 'react'
import { listBidSections } from '@/lib/api/bidService'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { BidRequirement, BidSection } from '@/types'

interface MappingModalProps {
  requirement: BidRequirement
  onClose: () => void
  onMap: (sectionId: string, sectionType: string) => void
}

export default function MappingModal({ requirement, onClose, onMap }: MappingModalProps) {
  const [sections, setSections] = useState<BidSection[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedSection, setSelectedSection] = useState<string>('')

  useEffect(() => {
    loadSections()
  }, [])

  const loadSections = async () => {
    try {
      const data = await listBidSections(requirement.bidId)
      setSections(data)
    } catch (error) {
      console.error('Failed to load sections')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMap = () => {
    if (!selectedSection) {
      return
    }

    const section = sections.find((s) => s.id === selectedSection)
    if (section) {
      onMap(section.id, section.sectionType)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Map Requirement</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Requirement:</p>
            <p className="text-gray-900 dark:text-white">{requirement.requirementText}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Section to Map
            </label>
            {isLoading ? (
              <p className="text-gray-500 dark:text-gray-400">Loading sections...</p>
            ) : sections.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400">No sections available</p>
            ) : (
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a section...</option>
                {sections.map((section) => (
                  <option key={section.id} value={section.id}>
                    {section.sectionName} ({section.sectionType})
                  </option>
                ))}
              </select>
            )}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleMap} disabled={!selectedSection}>
              Map Requirement
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

