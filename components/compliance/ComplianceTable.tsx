'use client'

// Compliance Table Component
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import StatusIndicator from './StatusIndicator'
import MappingModal from './MappingModal'
import AIActionButton from '@/components/ai/AIActionButton'
import { PencilIcon, TrashIcon, LinkIcon } from '@heroicons/react/24/outline'
import type { BidRequirement } from '@/types'

interface ComplianceTableProps {
  requirements: BidRequirement[]
  onUpdate: (id: string, data: Partial<BidRequirement>) => void
  onDelete: (id: string) => void
}

export default function ComplianceTable({ requirements, onUpdate, onDelete }: ComplianceTableProps) {
  const [mappingRequirement, setMappingRequirement] = useState<BidRequirement | null>(null)

  const handleStatusChange = (requirementId: string, newStatus: BidRequirement['status']) => {
    onUpdate(requirementId, { status: newStatus })
  }

  if (requirements.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No requirements added yet</p>
        </div>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Requirement
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Mapped To
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
              {requirements.map((requirement) => (
                <tr key={requirement.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <StatusIndicator status={requirement.status} />
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      {requirement.requirementText}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {requirement.requirementCategory && (
                      <Badge variant="default" size="sm">
                        {requirement.requirementCategory}
                      </Badge>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {requirement.mappedToSectionId ? (
                      <span className="text-sm text-primary-600 dark:text-primary-400 flex items-center">
                        <LinkIcon className="h-4 w-4 mr-1" />
                        {requirement.mappedToType}
                      </span>
                    ) : (
                      <span className="text-sm text-gray-400">Not mapped</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                    <select
                      value={requirement.status}
                      onChange={(e) =>
                        handleStatusChange(requirement.id, e.target.value as BidRequirement['status'])
                      }
                      className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-xs focus:outline-none focus:ring-1 focus:ring-primary-500"
                    >
                      <option value="missing">Missing</option>
                      <option value="covered">Covered</option>
                      <option value="non_compliant">Non-Compliant</option>
                    </select>
                    {requirement.status === 'non_compliant' && (
                      <AIActionButton
                        actionType="compliance_gap_explain"
                        prompt={`Explain why this requirement is non-compliant: ${requirement.requirementText}`}
                        bidId={requirement.bidId}
                        onSuccess={(explanation) => {
                          // Could show explanation in a modal or tooltip
                          console.log('Explanation:', explanation)
                        }}
                        size="sm"
                        variant="ghost"
                      />
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setMappingRequirement(requirement)}
                    >
                      Map
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(requirement.id)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {mappingRequirement && (
        <MappingModal
          requirement={mappingRequirement}
          onClose={() => setMappingRequirement(null)}
          onMap={(sectionId, sectionType) => {
            onUpdate(mappingRequirement.id, {
              mappedToSectionId: sectionId,
              mappedToType: sectionType,
              status: 'covered',
            })
            setMappingRequirement(null)
          }}
        />
      )}
    </>
  )
}

