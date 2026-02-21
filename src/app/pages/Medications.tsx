import { useState } from 'react';
import { motion } from 'motion/react';
import { Pill, Plus, Clock, Calendar, CheckCircle2, XCircle, Edit, Trash2 } from 'lucide-react';

interface Medication {
  id: number;
  name: string;
  dosage: string;
  frequency: string;
  time: string[];
  startDate: string;
  status: 'active' | 'paused';
  adherence: number;
}

const mockMedications: Medication[] = [
  {
    id: 1,
    name: 'Aspirin',
    dosage: '100mg',
    frequency: 'Once daily',
    time: ['8:00 AM'],
    startDate: '2026-01-15',
    status: 'active',
    adherence: 95,
  },
  {
    id: 2,
    name: 'Lisinopril',
    dosage: '10mg',
    frequency: 'Once daily',
    time: ['8:00 AM'],
    startDate: '2026-01-20',
    status: 'active',
    adherence: 98,
  },
  {
    id: 3,
    name: 'Metformin',
    dosage: '500mg',
    frequency: 'Twice daily',
    time: ['8:00 AM', '8:00 PM'],
    startDate: '2026-02-01',
    status: 'active',
    adherence: 91,
  },
  {
    id: 4,
    name: 'Vitamin D',
    dosage: '2000 IU',
    frequency: 'Once daily',
    time: ['8:00 PM'],
    startDate: '2026-01-10',
    status: 'active',
    adherence: 88,
  },
  {
    id: 5,
    name: 'Omega-3',
    dosage: '1000mg',
    frequency: 'Once daily',
    time: ['8:00 AM'],
    startDate: '2026-01-10',
    status: 'paused',
    adherence: 85,
  },
];

export function Medications() {
  const [medications, setMedications] = useState(mockMedications);
  const [showAddForm, setShowAddForm] = useState(false);

  const activeMeds = medications.filter(m => m.status === 'active');
  const avgAdherence = Math.round(
    activeMeds.reduce((sum, m) => sum + m.adherence, 0) / activeMeds.length
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Medications</h2>
          <p className="text-gray-600">Manage your medication schedule and track adherence</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Medication
        </button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <Pill className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{activeMeds.length}</p>
              <p className="text-sm text-gray-600">Active Medications</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{avgAdherence}%</p>
              <p className="text-sm text-gray-600">Adherence Rate</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">3</p>
              <p className="text-sm text-gray-600">Doses Today</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Medications List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Your Medications</h3>
        <div className="space-y-4">
          {medications.map((med, index) => (
            <motion.div
              key={med.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className={`p-5 rounded-xl border-2 transition-all ${
                med.status === 'active'
                  ? 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                  : 'bg-gray-50 border-gray-200 opacity-60'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    med.status === 'active' ? 'bg-gradient-to-br from-blue-500 to-teal-500' : 'bg-gray-400'
                  }`}>
                    <Pill className="w-7 h-7 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-lg font-bold text-gray-800">{med.name}</h4>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        med.status === 'active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-gray-200 text-gray-700'
                      }`}>
                        {med.status}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-2">{med.dosage} • {med.frequency}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {med.time.join(', ')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        Since {new Date(med.startDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Adherence */}
                  <div className="text-center">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#e5e7eb"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke={med.adherence >= 90 ? '#10b981' : med.adherence >= 75 ? '#f59e0b' : '#ef4444'}
                          strokeWidth="6"
                          fill="none"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${2 * Math.PI * 28 * (1 - med.adherence / 100)}`}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold text-gray-800">{med.adherence}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Adherence</p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button className="p-2 hover:bg-blue-50 rounded-lg transition-all">
                      <Edit className="w-5 h-5 text-blue-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition-all">
                      <Trash2 className="w-5 h-5 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Today's Schedule
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Morning (8:00 AM)</span>
              <CheckCircle2 className="w-5 h-5 text-green-300" />
            </div>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Aspirin 100mg</li>
              <li>• Lisinopril 10mg</li>
              <li>• Metformin 500mg</li>
              <li>• Omega-3 1000mg</li>
            </ul>
          </div>
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold">Evening (8:00 PM)</span>
              <XCircle className="w-5 h-5 text-yellow-300" />
            </div>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Metformin 500mg</li>
              <li>• Vitamin D 2000 IU</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
