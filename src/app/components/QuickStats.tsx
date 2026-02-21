import { motion } from 'motion/react';
import { Activity, Pill, FileText, TrendingUp } from 'lucide-react';

const stats = [
  {
    label: 'Reports Analyzed',
    value: '12',
    change: '+2 this month',
    icon: FileText,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    label: 'Active Medications',
    value: '5',
    change: 'All on track',
    icon: Pill,
    color: 'from-teal-500 to-green-500',
  },
  {
    label: 'Symptoms Logged',
    value: '8',
    change: 'Last 30 days',
    icon: Activity,
    color: 'from-purple-500 to-pink-500',
  },
  {
    label: 'Health Score',
    value: '85',
    change: '+5 this week',
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
  },
];

export function QuickStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + index * 0.05 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl p-5 border border-gray-200 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</p>
            <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
