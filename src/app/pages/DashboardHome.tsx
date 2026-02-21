import { motion } from 'motion/react';
import {
  Flame,
  TrendingUp,
  Calendar,
  MessageSquare,
  Upload,
  Activity,
  Heart,
  ArrowRight,
  CheckCircle2,
  Clock,
  Zap,
} from 'lucide-react';
import { VitalityCard } from '../components/VitalityCard';
import { MedicationStreakCard } from '../components/MedicationStreakCard';
import { UpcomingReminders } from '../components/UpcomingReminders';
import { QuickStats } from '../components/QuickStats';

export function DashboardHome() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-500 to-teal-500 rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Hero! 👋</h1>
            <p className="text-blue-100 text-lg">
              You're doing great! Keep up the healthy habits.
            </p>
          </div>
          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
            <Zap className="w-5 h-5 text-yellow-300" fill="currentColor" />
            <span className="font-semibold">5-day streak!</span>
          </div>
        </div>
      </motion.div>

      {/* Quick Stats */}
      <QuickStats />

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Vitality & Streak Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <VitalityCard />
            <MedicationStreakCard />
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-800">Upload Report</p>
                  <p className="text-sm text-gray-600">Analyze medical reports</p>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center gap-3 p-4 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-800">Log Symptoms</p>
                  <p className="text-sm text-gray-600">Track how you feel</p>
                </div>
                <ArrowRight className="w-5 h-5 text-teal-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center gap-3 p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-800">Ask Assistant</p>
                  <p className="text-sm text-gray-600">Get health insights</p>
                </div>
                <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="flex items-center gap-3 p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl hover:shadow-md transition-all group">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-800">View Calendar</p>
                  <p className="text-sm text-gray-600">Check appointments</p>
                </div>
                <ArrowRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-xl border border-green-200">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Medication taken</p>
                  <p className="text-sm text-gray-600">Aspirin 100mg - Morning dose</p>
                  <p className="text-xs text-gray-500 mt-1">Today at 8:00 AM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Vitals recorded</p>
                  <p className="text-sm text-gray-600">Blood pressure: 120/80 mmHg</p>
                  <p className="text-xs text-gray-500 mt-1">Yesterday at 6:30 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-800">Symptom logged</p>
                  <p className="text-sm text-gray-600">Mild headache - Resolved</p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          <UpcomingReminders />

          {/* Health Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg"
          >
            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Health Tip of the Day
            </h3>
            <p className="text-blue-100 mb-4">
              Stay hydrated! Aim for 8 glasses of water daily to maintain optimal health and energy levels.
            </p>
            <button className="w-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all px-4 py-2 rounded-xl font-semibold">
              View More Tips
            </button>
          </motion.div>

          {/* Quick Chat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-blue-600" />
              Quick Chat
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Have a health question? Our AI assistant is here to help.
            </p>
            <input
              type="text"
              placeholder="Ask a health question..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <button className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all">
              Send Message
            </button>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Not a substitute for medical advice
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
