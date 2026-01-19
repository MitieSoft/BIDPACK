'use client'

// AI Action Button Component
import { useState } from 'react'
import { getAIQuote, executeAI } from '@/lib/api/aiService'
import { getACUBalance } from '@/lib/api/acuService'
import AIConfirmationModal from './AIConfirmationModal'
import Button from '@/components/ui/Button'
import { SparklesIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'

interface AIActionButtonProps {
  actionType: 'generate_paragraph' | 'refine_section' | 'compliance_gap_explain' | 'social_value_refine'
  prompt: string
  context?: string
  bidId?: string
  onSuccess?: (content: string) => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function AIActionButton({
  actionType,
  prompt,
  context,
  bidId,
  onSuccess,
  variant = 'secondary',
  size = 'md',
  className,
}: AIActionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentBalance, setCurrentBalance] = useState<number | null>(null)

  const handleClick = async () => {
    try {
      const balance = await getACUBalance()
      setCurrentBalance(balance.balance)
      setIsModalOpen(true)
    } catch (error) {
      toast.error('Failed to check ACU balance')
    }
  }

  const handleConfirm = async () => {
    try {
      const result = await executeAI({
        actionType,
        prompt,
        context,
        bidId,
      })
      toast.success('AI action completed successfully')
      onSuccess?.(result.content)
      
      // Refresh ACU balance
      const balance = await getACUBalance()
      setCurrentBalance(balance.balance)
    } catch (error: any) {
      throw error
    }
  }

  return (
    <>
      <Button variant={variant} size={size} onClick={handleClick} className={className}>
        <SparklesIcon className="h-4 w-4 mr-2" />
        AI Assist
      </Button>
      <AIConfirmationModal
        isOpen={isModalOpen}
        actionType={actionType}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
      />
    </>
  )
}

