'use client'

// Cancel Subscription Button Component
import { useState } from 'react'
import Button from '@/components/ui/Button'
import CancelSubscriptionModal from './CancelSubscriptionModal'

export default function CancelSubscriptionButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button variant="ghost" onClick={() => setIsModalOpen(true)}>
        Cancel Subscription
      </Button>
      <CancelSubscriptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Optionally refresh page
          window.location.reload()
        }}
      />
    </>
  )
}

