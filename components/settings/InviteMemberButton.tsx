'use client'

// Invite Member Button Component
import { useState } from 'react'
import Button from '@/components/ui/Button'
import InviteMemberModal from './InviteMemberModal'
import { UserPlusIcon } from '@heroicons/react/24/outline'

export default function InviteMemberButton() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>
        <UserPlusIcon className="h-5 w-5 mr-2" />
        Invite Member
      </Button>
      <InviteMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          // Optionally refresh member list
          window.location.reload()
        }}
      />
    </>
  )
}

