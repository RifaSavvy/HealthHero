import { motion } from 'motion/react';
import { Clock, Pill, Calendar, Activity, Bell } from 'lucide-react';

const reminders = [
  {
    id: 1,
    type: 'medication',
    title: 'Aspirin 100mg',
    time: '2:00 PM',
    icon: Pill,
    color: 'blue',
  },
  {
    id: 2,
    type: 'appointment',
    title: 'Dr. Smith Checkup',
    time: 'Tomorrow, 10:00 AM',
    icon: Calendar,
    color: 'teal',
  },
  {
    id: 3,
    type: 'task',
    title: 'Log Blood Pressure',
    time: '6:00 PM',
    icon: Activity,
    color: 'purple',
  },
  {
    id: 4,
    type: 'medication',
    title: 'Vitamin D',
    time: '8:00 PM',
    icon: Pill,
    color: 'orange',
  },
];

const colorClasses = {
  blue: 'bg-blue-100 text-blue-600',
  teal: 'bg-teal-100 text-teal-600',
  purple: 'bg-purple-100 text-purple-600',
  orange: 'bg-orange-100 text-orange-600',
};

export function UpcomingReminders() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
        <Bell className="w-5 h-5 text-blue-600" />
        Upcoming Reminders
      </h3>

      <div className="space-y-3">
        {reminders.map((reminder, index) => {
          const Icon = reminder.icon;
          return (
            <motion.div
              key={reminder.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
            >
              <div className={`w-10 h-10 ${colorClasses[reminder.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{reminder.title}</p>
                <p className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {reminder.time}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all">
        View All Reminders
      </button>
    </motion.div>
  );
}
