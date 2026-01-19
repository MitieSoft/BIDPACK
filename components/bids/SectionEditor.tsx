'use client'

// Section Editor Component (Modal)
import { useState, useEffect, useRef } from 'react'
import { createBidSection, updateBidSection } from '@/lib/api/bidService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import { useClickOutside } from '@/hooks/useClickOutside'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { BidSection } from '@/types'

interface SectionEditorProps {
  bidId: string
  section: BidSection | null
  onClose: () => void
  onSuccess: () => void
}

export default function SectionEditor({ bidId, section, onClose, onSuccess }: SectionEditorProps) {
  const [sectionName, setSectionName] = useState('')
  const [content, setContent] = useState('')
  const [sectionType, setSectionType] = useState<BidSection['sectionType']>('policy')
  const [isLoading, setIsLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)

  useClickOutside(modalRef, onClose)

  useEffect(() => {
    if (section) {
      setSectionName(section.sectionName)
      setContent(section.content)
      setSectionType(section.sectionType)
    }
  }, [section])

  const handleSubmit = async () => {
    if (!sectionName.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      if (section) {
        await updateBidSection(section.id, {
          sectionName,
          content,
          sectionType,
        })
        toast.success('Section updated successfully')
      } else {
        await createBidSection(bidId, {
          sectionType,
          sectionName,
          content,
        })
        toast.success('Section created successfully')
      }
      onSuccess()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save section')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" role="dialog" aria-modal="true">
      <div
        ref={modalRef}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {section ? 'Edit Section' : 'Create Section'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Section Type
              </label>
              <select
                value={sectionType}
                onChange={(e) => setSectionType(e.target.value as BidSection['sectionType'])}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                disabled={!!section}
              >
                <option value="policy">Policy</option>
                <option value="method_statement">Method Statement</option>
                <option value="cv">CV</option>
                <option value="case_study">Case Study</option>
                <option value="insurance">Insurance</option>
                <option value="social_value">Social Value</option>
                <option value="other">Other</option>
              </select>
            </div>
            <Input
              label="Section Name"
              value={sectionName}
              onChange={(e) => setSectionName(e.target.value)}
              placeholder="e.g., Health & Safety Policy"
              required
            />
            <Textarea
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Enter section content..."
              required
            />
          </div>
        </div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 dark:border-gray-700">
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Saving...' : section ? 'Update Section' : 'Create Section'}
          </Button>
        </div>
      </div>
    </div>
  )
}

