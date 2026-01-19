import PageHeader from '@/components/PageHeader'

export default function HomePage() {
  return (
    <div>
      <PageHeader
        title="ACU & Bid Overview"
        subtitle="This is a mock dashboard using demo data. Connect the real API later without changing the UI."
      />
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
          <p className="text-xs font-medium text-gray-500">ACU Balance</p>
          <p className="mt-2 text-2xl font-semibold text-primary-600">112 / 150</p>
          <p className="mt-1 text-xs text-gray-500">
            Professional plan • Renews 1 Feb 2026 (mock data)
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
          <p className="text-xs font-medium text-gray-500">Active Bids</p>
          <p className="mt-2 text-2xl font-semibold">2</p>
          <p className="mt-1 text-xs text-gray-500">
            Based on mock bid list. Replace with API later.
          </p>
        </div>
        <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-gray-900">
          <p className="text-xs font-medium text-gray-500">Compliance Risk</p>
          <p className="mt-2 text-2xl font-semibold text-amber-500">Medium</p>
          <p className="mt-1 text-xs text-gray-500">
            Some mock requirements are missing or non-compliant.
          </p>
        </div>
      </div>
    </div>
  )
}


