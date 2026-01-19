'use client'

// Member List Component
import { useState, useEffect } from 'react'
import { getOrgMembers, removeMember, updateMemberRole } from '@/lib/api/orgService'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import { toast } from 'react-hot-toast'
import type { User } from '@/types'

export default function MemberList() {
  const { user: currentUser } = useAuthStore()
  const [members, setMembers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [removingId, setRemovingId] = useState<string | null>(null)

  useEffect(() => {
    loadMembers()
  }, [])

  const loadMembers = async () => {
    try {
      const data = await getOrgMembers()
      setMembers(data)
    } catch (error: any) {
      toast.error(error.message || 'Failed to load members')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemove = async (memberId: string, memberName: string) => {
    if (!confirm(`Are you sure you want to remove ${memberName}?`)) {
      return
    }

    setRemovingId(memberId)
    try {
      await removeMember(memberId)
      toast.success('Member removed successfully')
      loadMembers()
    } catch (error: any) {
      toast.error(error.message || 'Failed to remove member')
    } finally {
      setRemovingId(null)
    }
  }

  const handleRoleChange = async (memberId: string, newRole: 'admin' | 'member') => {
    try {
      await updateMemberRole(memberId, newRole)
      toast.success('Member role updated')
      loadMembers()
    } catch (error: any) {
      toast.error(error.message || 'Failed to update role')
    }
  }

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'owner':
        return 'info'
      case 'admin':
        return 'success'
      default:
        return 'default'
    }
  }

  if (isLoading) {
    return <Card>Loading members...</Card>
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Team Members</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Email
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  {member.firstName} {member.lastName}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                  {member.email}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <Badge variant={getRoleBadgeVariant(member.role)} size="sm">
                    {member.role.charAt(0).toUpperCase() + member.role.slice(1)}
                  </Badge>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                  {member.role !== 'owner' && currentUser?.role === 'owner' && (
                    <>
                      {member.role === 'member' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRoleChange(member.id, 'admin')}
                        >
                          Make Admin
                        </Button>
                      )}
                      {member.role === 'admin' && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleRoleChange(member.id, 'member')}
                        >
                          Make Member
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemove(member.id, `${member.firstName} ${member.lastName}`)}
                        disabled={removingId === member.id}
                      >
                        {removingId === member.id ? 'Removing...' : 'Remove'}
                      </Button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

