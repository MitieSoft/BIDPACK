'use client'

// Organization Settings Component
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { getCurrentOrg, updateOrgName } from '@/lib/api/orgService'
import { useAuthStore } from '@/store/authStore'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { toast } from 'react-hot-toast'
import type { Organization } from '@/types'

export default function OrgSettings() {
  const { org, setOrg } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ name: string }>({
    defaultValues: { name: org?.name || '' },
  })

  useEffect(() => {
    if (org) {
      reset({ name: org.name })
    }
  }, [org, reset])

  const onSubmit = async (data: { name: string }) => {
    setIsLoading(true)
    try {
      const updatedOrg = await updateOrgName(data.name)
      setOrg(updatedOrg)
      toast.success('Organization name updated successfully')
    } catch (error: any) {
      toast.error(error.message || 'Failed to update organization name')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Organization Details</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Organization Name"
          placeholder="Your Company Ltd"
          error={errors.name?.message}
          {...register('name', { required: 'Organization name is required' })}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </Card>
  )
}

