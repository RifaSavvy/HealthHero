import { Sidebar } from "../components/dashboard/Sidebar";
import { WelcomeSection } from "../components/dashboard/WelcomeSection";
import { VitalityCard } from "../components/dashboard/VitalityCard";
import { MedicationStreak } from "../components/dashboard/MedicationStreak";
import { QuickStats } from "../components/dashboard/QuickStats";
import { UploadReportWidget } from "../components/dashboard/UploadReportWidget";
import { RecentActivity } from "../components/dashboard/RecentActivity";
import { UpcomingReminders } from "../components/dashboard/UpcomingReminders";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto">
        <div className="p-8 max-w-7xl mx-auto">
          {/* Welcome Section */}
          <WelcomeSection />

          {/* Top Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <VitalityCard />
            <MedicationStreak />
            <QuickStats />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Larger Content */}
            <div className="lg:col-span-2 space-y-6">
              <UploadReportWidget />
              <RecentActivity />
            </div>

            {/* Right Column - Sidebar Content */}
            <div className="space-y-6">
              <UpcomingReminders />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
