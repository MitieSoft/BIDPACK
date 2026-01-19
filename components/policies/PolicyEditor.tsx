'use client'

// Policy Editor Component
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createPolicy, updatePolicy, getPolicy } from '@/lib/api/policyService'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import Card from '@/components/ui/Card'
import AIActionButton from '@/components/ai/AIActionButton'
import { toast } from 'react-hot-toast'
import type { Policy, PolicyType } from '@/types'

interface PolicyEditorProps {
  policyId?: string
}

export default function PolicyEditor({ policyId }: PolicyEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingPolicy, setIsLoadingPolicy] = useState(!!policyId)
  const [policyType, setPolicyType] = useState<PolicyType>('h&s_cdm')
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (policyId) {
      loadPolicy()
    }
  }, [policyId])

  const loadPolicy = async () => {
    try {
      const policy = await getPolicy(policyId!)
      if (policy) {
        setPolicyType(policy.policyType)
        setTitle(policy.title)
        setContent(policy.content)
      }
    } catch (error) {
      toast.error('Failed to load policy')
    } finally {
      setIsLoadingPolicy(false)
    }
  }

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      if (policyId) {
        await updatePolicy(policyId, { title, content })
        toast.success('Policy updated successfully')
      } else {
        const newPolicy = await createPolicy({ policyType, title, content })
        toast.success('Policy created successfully')
        router.push(`/policies/${newPolicy.id}`)
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to save policy')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingPolicy) {
    return <Card>Loading policy...</Card>
  }

  return (
    <Card>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Policy Type
          </label>
          <select
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value as PolicyType)}
            disabled={!!policyId}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:bg-gray-100 dark:disabled:bg-gray-700"
          >
            <option value="h&s_cdm">H&S CDM</option>
            <option value="quality">Quality</option>
            <option value="environmental">Environmental</option>
            <option value="equality_diversity">Equality & Diversity</option>
            <option value="modern_slavery">Modern Slavery</option>
            <option value="gdpr">GDPR</option>
            <option value="anti_bribery">Anti-Bribery</option>
            <option value="safeguarding">Safeguarding</option>
            <option value="carbon_reduction">Carbon Reduction</option>
            <option value="social_value">Social Value</option>
            <option value="supply_chain">Supply Chain</option>
            <option value="ethical_procurement">Ethical Procurement</option>
            <option value="business_continuity">Business Continuity</option>
          </select>
        </div>

        <Input
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Health & Safety Policy"
          required
        />

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Content
            </label>
            <AIActionButton
              actionType="generate_paragraph"
              prompt={`Generate a paragraph for ${title} policy`}
              context={content}
              onSuccess={(generatedContent) => {
                setContent((prev) => prev + '\n\n' + generatedContent)
              }}
              size="sm"
            />
          </div>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={20}
            placeholder="Enter policy content..."
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="ghost" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Saving...' : policyId ? 'Update Policy' : 'Create Policy'}
          </Button>
        </div>
      </div>
    </Card>
  )
}

