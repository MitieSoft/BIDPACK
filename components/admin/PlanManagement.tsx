'use client'

// Plan Management Component
import { useEffect, useState } from 'react'
import { listPlans, createPlan, updatePlan, deletePlan } from '@/lib/api/adminService'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Textarea from '@/components/ui/Textarea'
import TableSkeleton from '@/components/ui/TableSkeleton'
import EmptyState from '@/components/ui/EmptyState'
import Modal from '@/components/ui/Modal'
import { PlusIcon, PencilIcon, TrashIcon, CreditCardIcon } from '@heroicons/react/24/outline'
import { toast } from 'react-hot-toast'
import type { SubscriptionPlan } from '@/lib/api/adminService'

export default function PlanManagement() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<SubscriptionPlan | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    acus: '',
    features: '',
    description: '',
    stripePriceId: '',
    isActive: true,
  })

  useEffect(() => {
    loadPlans()
  }, [])

  const loadPlans = async () => {
    try {
      const data = await listPlans()
      setPlans(data)
    } catch (error) {
      toast.error('Failed to load plans')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingPlan(null)
    setFormData({
      name: '',
      price: '',
      acus: '',
      features: '',
      description: '',
      stripePriceId: '',
      isActive: true,
    })
    setIsModalOpen(true)
  }

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan)
    setFormData({
      name: plan.name,
      price: plan.price.toString(),
      acus: plan.acus.toString(),
      features: plan.features.join('\n'),
      description: plan.description || '',
      stripePriceId: plan.stripePriceId || '',
      isActive: plan.isActive,
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (planId: string) => {
    if (!confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      return
    }

    try {
      await deletePlan(planId)
      toast.success('Plan deleted successfully')
      loadPlans()
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete plan')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const planData = {
        name: formData.name,
        price: parseFloat(formData.price),
        acus: parseInt(formData.acus),
        features: formData.features.split('\n').filter(f => f.trim()),
        description: formData.description,
        stripePriceId: formData.stripePriceId,
        isActive: formData.isActive,
      }

      if (editingPlan) {
        await updatePlan(editingPlan.id, planData)
        toast.success('Plan updated successfully')
      } else {
        await createPlan(planData)
        toast.success('Plan created successfully')
      }
      
      setIsModalOpen(false)
      loadPlans()
    } catch (error: any) {
      toast.error(error.message || 'Failed to save plan')
    }
  }

  if (isLoading) {
    return <TableSkeleton rows={5} columns={6} />
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Subscription Plans</h2>
        <Button onClick={handleCreate}>
          <PlusIcon className="h-5 w-5 mr-2" />
          Create New Plan
        </Button>
      </div>

      {plans.length === 0 ? (
        <Card>
          <EmptyState
            icon={<CreditCardIcon className="h-16 w-16" />}
            title="No subscription plans"
            description="Create your first subscription plan to get started"
            action={{
              label: 'Create New Plan',
              onClick: handleCreate,
            }}
          />
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Plan Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    ACUs
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Features
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {plans.map((plan) => (
                  <tr key={plan.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{plan.name}</div>
                      {plan.description && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{plan.description}</div>
                      )}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      £{plan.price}/month
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {plan.acus} ACUs
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="max-w-xs">
                        <ul className="list-disc list-inside space-y-1">
                          {plan.features.slice(0, 3).map((feature, idx) => (
                            <li key={idx} className="text-xs">{feature}</li>
                          ))}
                          {plan.features.length > 3 && (
                            <li className="text-xs text-gray-400">+{plan.features.length - 3} more</li>
                          )}
                        </ul>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge variant={plan.isActive ? 'success' : 'default'} size="sm">
                        {plan.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(plan)}
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(plan.id)}
                      >
                        <TrashIcon className="h-4 w-4 text-red-600" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingPlan ? 'Edit Plan' : 'Create New Plan'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Plan Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Starter, Professional"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Price (£/month)"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="49.00"
              required
            />

            <Input
              label="ACUs per Month"
              type="number"
              value={formData.acus}
              onChange={(e) => setFormData({ ...formData, acus: e.target.value })}
              placeholder="50"
              required
            />
          </div>

          <Input
            label="Stripe Price ID"
            value={formData.stripePriceId}
            onChange={(e) => setFormData({ ...formData, stripePriceId: e.target.value })}
            placeholder="price_xxxxx"
            helperText="Stripe price ID for this plan"
          />

          <Textarea
            label="Description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            placeholder="Brief description of the plan"
          />

          <Textarea
            label="Features (one per line)"
            value={formData.features}
            onChange={(e) => setFormData({ ...formData, features: e.target.value })}
            rows={8}
            placeholder="50 ACUs per month&#10;Unlimited bids&#10;Policy library&#10;Method statement builder"
            helperText="Enter each feature on a new line"
            required
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
              Plan is active (visible to users)
            </label>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              {editingPlan ? 'Update Plan' : 'Create Plan'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}

