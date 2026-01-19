'use client'

// Section Type Selector Component
import { XMarkIcon } from '@heroicons/react/24/outline'
import type { BidSection } from '@/types'

interface SectionTypeSelectorProps {
  onSelect: (type: BidSection['sectionType']) => void
  onClose: () => void
}

const sectionTypes: { type: BidSection['sectionType']; label: string; description: string }[] = [
  { type: 'policy', label: 'Policy', description: 'Company policies and procedures' },
  { type: 'method_statement', label: 'Method Statement', description: 'Construction method statements' },
  { type: 'cv', label: 'CV', description: 'Key personnel CVs' },
  { type: 'case_study', label: 'Case Study', description: 'Previous project case studies' },
  { type: 'insurance', label: 'Insurance', description: 'Insurance documentation' },
  { type: 'social_value', label: 'Social Value', description: 'Social value commitments' },
  { type: 'other', label: 'Other', description: 'Other documentation' },
]

export default function SectionTypeSelector({ onSelect, onClose }: SectionTypeSelectorProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Select Section Type</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sectionTypes.map(({ type, label, description }) => (
              <button
                key={type}
                onClick={() => onSelect(type)}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors text-left"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{label}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

