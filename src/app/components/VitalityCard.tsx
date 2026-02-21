import { motion } from 'motion/react';
import { Heart, TrendingUp } from 'lucide-react';

export function VitalityCard() {
  const vitalityScore = 85;
  const getHealthLevel = (score: number) => {
    if (score >= 80) return { label: 'Excellent', color: 'from-green-500 to-emerald-500', textColor: 'text-green-600' };
    if (score >= 60) return { label: 'Good', color: 'from-blue-500 to-cyan-500', textColor: 'text-blue-600' };
    if (score >= 40) return { label: 'Fair', color: 'from-yellow-500 to-orange-500', textColor: 'text-yellow-600' };
    return { label: 'Needs Attention', color: 'from-red-500 to-pink-500', textColor: 'text-red-600' };
  };

  const healthLevel = getHealthLevel(vitalityScore);
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (vitalityScore / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.1 }}
      className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500" fill="currentColor" />
          Vitality Score
        </h3>
        <div className={`px-3 py-1 bg-gradient-to-r ${healthLevel.color} text-white text-sm font-semibold rounded-full`}>
          {healthLevel.label}
        </div>
      </div>

      <div className="flex items-center justify-center py-6">
        <div className="relative">
          {/* Background Circle */}
          <svg className="w-40 h-40 transform -rotate-90">
            <circle
              cx="80"
              cy="80"
              r="70"
              stroke="#e5e7eb"
              strokeWidth="12"
              fill="none"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="80"
              cy="80"
              r="70"
              stroke="url(#gradient)"
              strokeWidth="12"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
          {/* Score Display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent"
            >
              {vitalityScore}
            </motion.span>
            <span className="text-sm text-gray-500 font-medium">out of 100</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-200">
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">120/80</p>
          <p className="text-xs text-gray-500">Blood Pressure</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">72</p>
          <p className="text-xs text-gray-500">Heart Rate</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">98.6°F</p>
          <p className="text-xs text-gray-500">Temperature</p>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-2 rounded-lg">
        <TrendingUp className="w-4 h-4" />
        <span className="font-medium">+5 points from last week</span>
      </div>
    </motion.div>
  );
}
