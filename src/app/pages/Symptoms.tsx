import { useState } from 'react';
import { motion } from 'motion/react';
import { Activity, Plus, Calendar, TrendingUp, User } from 'lucide-react';

interface Symptom {
  id: number;
  date: string;
  bodyPart: string;
  painType: string;
  severity: number;
  notes?: string;
}

const mockSymptoms: Symptom[] = [
  {
    id: 1,
    date: '2026-02-21',
    bodyPart: 'Head',
    painType: 'Throbbing',
    severity: 6,
    notes: 'Started in the afternoon, improved after rest',
  },
  {
    id: 2,
    date: '2026-02-19',
    bodyPart: 'Lower Back',
    painType: 'Dull',
    severity: 4,
    notes: 'After exercise',
  },
  {
    id: 3,
    date: '2026-02-17',
    bodyPart: 'Knee',
    painType: 'Sharp',
    severity: 7,
    notes: 'Left knee, occurred when climbing stairs',
  },
];

const bodyParts = [
  'Head', 'Neck', 'Chest', 'Upper Back', 'Lower Back', 
  'Abdomen', 'Shoulder', 'Elbow', 'Wrist', 'Hand',
  'Hip', 'Knee', 'Ankle', 'Foot'
];

export function Symptoms() {
  const [symptoms, setSymptoms] = useState(mockSymptoms);
  const [showForm, setShowForm] = useState(false);
  const [bodyPart, setBodyPart] = useState('');
  const [painType, setPainType] = useState('Sharp');
  const [severity, setSeverity] = useState(5);
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newSymptom: Symptom = {
      id: symptoms.length + 1,
      date: new Date().toISOString().split('T')[0],
      bodyPart,
      painType,
      severity,
      notes,
    };
    setSymptoms([newSymptom, ...symptoms]);
    setShowForm(false);
    setBodyPart('');
    setPainType('Sharp');
    setSeverity(5);
    setNotes('');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Symptom Tracker</h2>
          <p className="text-gray-600">Log and monitor your symptoms over time</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Log Symptom
        </button>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">{symptoms.length}</p>
              <p className="text-sm text-gray-600">Total Logged</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">5.7</p>
              <p className="text-sm text-gray-600">Avg Severity</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-800">7</p>
              <p className="text-sm text-gray-600">Days Since Last</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Add Symptom Form */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">Log New Symptom</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Body Part Selector with Avatar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Tap body part to log symptoms
              </label>
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-8 mb-4">
                <div className="flex flex-col items-center">
                  <div className="w-48 h-64 bg-white rounded-3xl shadow-lg flex items-center justify-center relative">
                    <User className="w-32 h-32 text-blue-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-around p-4">
                      <button
                        type="button"
                        onClick={() => setBodyPart('Head')}
                        className={`w-12 h-12 rounded-full transition-all ${
                          bodyPart === 'Head'
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                        }`}
                      >
                        H
                      </button>
                      <div className="flex gap-8">
                        <button
                          type="button"
                          onClick={() => setBodyPart('Shoulder')}
                          className={`w-10 h-10 rounded-full transition-all ${
                            bodyPart === 'Shoulder'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                          }`}
                        >
                          S
                        </button>
                        <button
                          type="button"
                          onClick={() => setBodyPart('Shoulder')}
                          className={`w-10 h-10 rounded-full transition-all ${
                            bodyPart === 'Shoulder'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                          }`}
                        >
                          S
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => setBodyPart('Abdomen')}
                        className={`w-12 h-12 rounded-full transition-all ${
                          bodyPart === 'Abdomen'
                            ? 'bg-blue-500 text-white'
                            : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                        }`}
                      >
                        A
                      </button>
                      <div className="flex gap-12">
                        <button
                          type="button"
                          onClick={() => setBodyPart('Knee')}
                          className={`w-10 h-10 rounded-full transition-all ${
                            bodyPart === 'Knee'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                          }`}
                        >
                          K
                        </button>
                        <button
                          type="button"
                          onClick={() => setBodyPart('Knee')}
                          className={`w-10 h-10 rounded-full transition-all ${
                            bodyPart === 'Knee'
                              ? 'bg-blue-500 text-white'
                              : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                          }`}
                        >
                          K
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-4">
                    {bodyPart ? `Selected: ${bodyPart}` : 'Select a body part'}
                  </p>
                </div>
              </div>
              <select
                value={bodyPart}
                onChange={(e) => setBodyPart(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Or select from dropdown...</option>
                {bodyParts.map((part) => (
                  <option key={part} value={part}>{part}</option>
                ))}
              </select>
            </div>

            {/* Pain Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pain Type
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Sharp', 'Dull', 'Throbbing'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setPainType(type)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all ${
                      painType === type
                        ? 'bg-gradient-to-r from-blue-500 to-teal-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Severity Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Severity: <span className="text-2xl font-bold text-blue-600">{severity}</span>/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={severity}
                onChange={(e) => setSeverity(parseInt(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>Mild</span>
                <span>Moderate</span>
                <span>Severe</span>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes (Optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={3}
                placeholder="Describe the symptom, triggers, or any other details..."
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-teal-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all"
              >
                Save Symptom
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Symptom History Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Symptom History</h3>
        <div className="space-y-4">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={symptom.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  symptom.severity >= 7
                    ? 'bg-red-100 text-red-600'
                    : symptom.severity >= 4
                    ? 'bg-yellow-100 text-yellow-600'
                    : 'bg-green-100 text-green-600'
                }`}>
                  <Activity className="w-6 h-6" />
                </div>
                {index < symptoms.length - 1 && (
                  <div className="w-0.5 h-full bg-gray-200 my-2"></div>
                )}
              </div>
              <div className="flex-1 pb-6">
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-bold text-gray-800 text-lg">{symptom.bodyPart}</h4>
                      <p className="text-sm text-gray-600">
                        {symptom.painType} pain • Severity: {symptom.severity}/10
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(symptom.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  {symptom.notes && (
                    <p className="text-gray-700 mt-2">{symptom.notes}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
