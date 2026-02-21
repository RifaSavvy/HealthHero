import { motion } from 'motion/react';
import { Flame, Award, Calendar } from 'lucide-react';

export function MedicationStreakCard() {
  const streakDays = 15;
  const adherencePercentage = 93;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.15 }}
      className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-16 translate-x-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-12 -translate-x-12"></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Flame className="w-5 h-5" fill="currentColor" />
            Medication Streak
          </h3>
          <Award className="w-6 h-6 opacity-80" />
        </div>

        <div className="flex items-center justify-center py-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="relative"
          >
            <Flame className="w-24 h-24" fill="currentColor" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-3xl font-bold text-orange-900">{streakDays}</span>
            </div>
          </motion.div>
        </div>

        <div className="text-center mb-6">
          <p className="text-2xl font-bold mb-1">{streakDays} Days Strong!</p>
          <p className="text-orange-100">Keep up the amazing work</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Adherence Rate</span>
            <span className="text-lg font-bold">{adherencePercentage}%</span>
          </div>
          <div className="w-full bg-white/30 rounded-full h-3 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${adherencePercentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-white rounded-full"
            ></motion.div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-2 text-sm">
          <Calendar className="w-4 h-4" />
          <span className="opacity-90">Last missed: 15 days ago</span>
        </div>
      </div>
    </motion.div>
  );
}
