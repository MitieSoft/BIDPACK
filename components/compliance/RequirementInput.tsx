'use client'

// Requirement Input Component
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Textarea from '@/components/ui/Textarea'
import { PlusIcon } from '@heroicons/react/24/outline'

interface RequirementInputProps {
  onCreate: (text: string, category?: string) => void
}

export default function RequirementInput({ onCreate }: RequirementInputProps) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleSubmit = () => {
    if (!text.trim()) {
      return
    }

    onCreate(text.trim(), category || undefined)
    setText('')
    setCategory('')
    setIsAdding(false)
  }

  return (
    <Card>
      {!isAdding ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Add requirements manually or paste a list
          </p>
          <Button onClick={() => setIsAdding(true)}>
            <PlusIcon className="h-5 w-5 mr-2" />
            Add Requirement
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Textarea
            label="Requirement Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder="Enter requirement text..."
            autoFocus
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category (optional)
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="e.g., Policies, Method Statements"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={!text.trim()}>
              Add Requirement
            </Button>
          </div>
        </div>
      )}
    </Card>
  )
}

