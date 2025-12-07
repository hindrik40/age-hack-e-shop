import RevisionsDashboard from '@/components/RevisionsDashboard'
import RevisionsDashboardProtected from '@/components/RevisionsDashboardProtected'

export default function RevisionsDashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <RevisionsDashboardProtected>
        <RevisionsDashboard />
      </RevisionsDashboardProtected>
    </div>
  )
}