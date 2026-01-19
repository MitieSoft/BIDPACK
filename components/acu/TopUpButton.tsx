'use client'

// Top-up Button Component
import { useState } from 'react'
import Button from '@/components/ui/Button'
import TopUpModal from './TopUpModal'
import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

export default function TopUpButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <CurrencyDollarIcon className="h-5 w-5 mr-2" />
        Top Up ACUs
      </Button>
      <TopUpModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Refresh page to update balance
          window.location.reload()
        }}
      />
    </>
  )
}

