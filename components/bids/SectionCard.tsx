'use client'

// Section Card Component
import Card from '@/components/ui/Card'
import Badge from '@/components/ui/Badge'
import Button from '@/components/ui/Button'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { BidSection } from '@/types'

interface SectionCardProps {
  section: BidSection
  onEdit: () => void
  onDelete: () => void
}

export default function SectionCard({ section, onEdit, onDelete }: SectionCardProps) {
  const preview = section.content.substring(0, 150) + (section.content.length > 150 ? '...' : '')

  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900 dark:text-white">{section.sectionName}</h4>
        <Badge variant="info" size="sm">
          v{section.version}
        </Badge>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{preview}</p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onEdit}>
          <PencilIcon className="h-4 w-4 mr-1" />
          Edit
        </Button>
        <Button variant="ghost" size="sm" onClick={onDelete}>
          <TrashIcon className="h-4 w-4 mr-1" />
          Delete
        </Button>
      </div>
    </Card>
  )
}

