// Organization Settings Page
import OrgSettings from '@/components/settings/OrgSettings'
import MemberList from '@/components/settings/MemberList'
import InviteMemberButton from '@/components/settings/InviteMemberButton'
import PageHeader from '@/components/PageHeader'

export default function OrganizationSettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Organization Settings"
        description="Manage your organization details and team members"
      />
      <OrgSettings />
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Team Members</h2>
        <InviteMemberButton />
      </div>
      <MemberList />
    </div>
  )
}

