import { useState } from 'react';
import { motion } from 'motion/react';
import { Upload, FileText, AlertCircle, CheckCircle2, X, Loader2 } from 'lucide-react';

interface AnalysisResult {
  summary: string;
  abnormalValues: { label: string; value: string; normal: string; severity: 'high' | 'low' | 'critical' }[];
  recommendations: string[];
}

export function UploadReport() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setUploadedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setAnalysisResult(null);
    }
  };

  const handleAnalyze = async () => {
    if (!uploadedFile) return;
    
    setIsAnalyzing(true);
    // Mock API call to FastAPI backend
    setTimeout(() => {
      setAnalysisResult({
        summary: 'Your blood test results show generally healthy values with a few areas requiring attention. Your vitamin D levels are below the optimal range, and your cholesterol is slightly elevated.',
        abnormalValues: [
          { label: 'Vitamin D', value: '22 ng/mL', normal: '30-100 ng/mL', severity: 'low' },
          { label: 'LDL Cholesterol', value: '145 mg/dL', normal: '<100 mg/dL', severity: 'high' },
          { label: 'Glucose (Fasting)', value: '105 mg/dL', normal: '70-99 mg/dL', severity: 'high' },
        ],
        recommendations: [
          'Consider vitamin D supplementation - consult your doctor',
          'Reduce saturated fat intake and increase physical activity',
          'Monitor blood glucose levels and consider dietary changes',
          'Schedule a follow-up appointment in 3 months',
        ],
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Upload Medical Report</h2>
        <p className="text-gray-600">Upload your lab results or medical reports for AI-powered analysis</p>
      </motion.div>

      {/* Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-gray-200 shadow-lg"
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }`}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div>
              <p className="text-lg font-semibold text-gray-800 mb-1">
                Drag and drop your file here
              </p>
              <p className="text-gray-600">or click to browse</p>
            </div>
            <input
              type="file"
              accept=".pdf,image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all cursor-pointer"
            >
              Browse Files
            </label>
            <p className="text-sm text-gray-500">Supports PDF and image files (JPG, PNG)</p>
          </div>
        </div>

        {uploadedFile && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-10 h-10 text-blue-600" />
              <div>
                <p className="font-semibold text-gray-800">{uploadedFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setUploadedFile(null);
                setAnalysisResult(null);
              }}
              className="p-2 hover:bg-blue-100 rounded-lg transition-all"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </motion.div>
        )}

        {uploadedFile && !analysisResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6"
          >
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full bg-gradient-to-r from-blue-500 to-teal-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-teal-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing Report...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  Analyze Report
                </>
              )}
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Analysis Results */}
      {analysisResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Summary */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Analysis Summary
            </h3>
            <p className="text-gray-700 leading-relaxed">{analysisResult.summary}</p>
          </div>

          {/* Abnormal Values */}
          <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-gray-200 shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-orange-600" />
              Values Requiring Attention
            </h3>
            <div className="space-y-3">
              {analysisResult.abnormalValues.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl border-2 ${
                    item.severity === 'critical'
                      ? 'bg-red-50 border-red-300'
                      : item.severity === 'high'
                      ? 'bg-orange-50 border-orange-300'
                      : 'bg-yellow-50 border-yellow-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">{item.label}</p>
                      <p className="text-sm text-gray-600">
                        Your value: <span className="font-semibold">{item.value}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Normal range: <span className="font-semibold">{item.normal}</span>
                      </p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.severity === 'critical'
                          ? 'bg-red-200 text-red-800'
                          : item.severity === 'high'
                          ? 'bg-orange-200 text-orange-800'
                          : 'bg-yellow-200 text-yellow-800'
                      }`}
                    >
                      {item.severity === 'high' || item.severity === 'critical' ? 'High' : 'Low'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Recommendations
            </h3>
            <ul className="space-y-3">
              {analysisResult.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-sm font-semibold">{index + 1}</span>
                  </div>
                  <p className="text-blue-50">{rec}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 p-4 bg-white/20 backdrop-blur-sm rounded-xl">
              <p className="text-sm text-blue-100">
                <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and is not a substitute for professional medical advice. Please consult with your healthcare provider.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
