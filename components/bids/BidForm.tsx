'use client'

// Bid Form Component
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { createBid } from '@/lib/api/bidService'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { toast } from 'react-hot-toast'

const bidSchema = z.object({
  clientName: z.string().min(2, 'Client name must be at least 2 characters'),
  deadline: z.string().min(1, 'Deadline is required'),
  status: z.enum(['draft', 'in_progress', 'ready', 'submitted']).optional(),
})

type BidFormData = z.infer<typeof bidSchema>

interface BidFormProps {
  bidId?: string
  initialData?: Partial<BidFormData>
  onSuccess?: () => void
}

export default function BidForm({ bidId, initialData, onSuccess }: BidFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BidFormData>({
    resolver: zodResolver(bidSchema),
    defaultValues: {
      status: 'draft',
      ...initialData,
    },
  })

  const onSubmit = async (data: BidFormData) => {
    setIsLoading(true)
    try {
      if (bidId) {
        // Update existing bid
        const { updateBid } = await import('@/lib/api/bidService')
        await updateBid(bidId, data)
        toast.success('Bid updated successfully')
      } else {
        // Create new bid
        const newBid = await createBid(data)
        toast.success('Bid created successfully')
        router.push(`/bids/${newBid.id}`)
      }
      onSuccess?.()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save bid')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        label="Client Name"
        placeholder="e.g., Manchester City Council"
        error={errors.clientName?.message}
        {...register('clientName')}
        required
      />

      <Input
        label="Deadline"
        type="datetime-local"
        error={errors.deadline?.message}
        {...register('deadline')}
        required
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Status
        </label>
        <select
          {...register('status')}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <option value="draft">Draft</option>
          <option value="in_progress">In Progress</option>
          <option value="ready">Ready</option>
          <option value="submitted">Submitted</option>
        </select>
      </div>

      <div className="flex justify-end space-x-3">
        <Button type="button" variant="ghost" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : bidId ? 'Update Bid' : 'Create Bid'}
        </Button>
      </div>
    </form>
  )
}

