'use client'

// Plan Comparison Component
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { useAuthStore } from '@/store/authStore'
import { CheckIcon } from '@heroicons/react/24/solid'

const plans = [
  {
    name: 'Starter',
    price: '£49',
    period: 'per month',
    acus: 50,
    features: [
      '50 ACUs per month',
      'Unlimited bids',
      'Policy library',
      'Method statement builder',
      'Compliance matrix',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: '£149',
    period: 'per month',
    acus: 150,
    features: [
      '150 ACUs per month',
      'Unlimited bids',
      'Policy library',
      'Method statement builder',
      'Compliance matrix',
      'Social value engine',
      'AI-powered refinements',
      'Priority support',
      'Export to PDF/Word',
    ],
  },
]

export default function PlanComparison() {
  const { subscription } = useAuthStore()

  const handleUpgrade = async () => {
    // TODO: Implement Stripe checkout
    window.alert('Stripe checkout integration coming soon')
  }

  const handleDowngrade = async () => {
    if (confirm('Are you sure you want to downgrade? You will lose access to Professional features.')) {
      // TODO: Implement downgrade
      window.alert('Downgrade functionality coming soon')
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {plans.map((plan) => {
        const isCurrentPlan = subscription?.planType === plan.name.toLowerCase()
        const isStarter = plan.name === 'Starter'
        const isProfessional = plan.name === 'Professional'
        const canUpgrade = subscription?.planType === 'starter' && isProfessional
        const canDowngrade = subscription?.planType === 'professional' && isStarter

        return (
          <Card key={plan.name} className={isCurrentPlan ? 'ring-2 ring-primary-500' : ''}>
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                <span className="text-gray-600 dark:text-gray-400 ml-2">{plan.period}</span>
              </div>
              {isCurrentPlan && (
                <Badge variant="success" size="sm">
                  Current Plan
                </Badge>
              )}
            </div>
            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="space-y-2">
              {canUpgrade && (
                <Button className="w-full" onClick={handleUpgrade}>
                  Upgrade to Professional
                </Button>
              )}
              {canDowngrade && (
                <Button variant="secondary" className="w-full" onClick={handleDowngrade}>
                  Downgrade to Starter
                </Button>
              )}
              {isCurrentPlan && (
                <Button variant="ghost" className="w-full" disabled>
                  Current Plan
                </Button>
              )}
            </div>
          </Card>
        )
      })}
    </div>
  )
}

