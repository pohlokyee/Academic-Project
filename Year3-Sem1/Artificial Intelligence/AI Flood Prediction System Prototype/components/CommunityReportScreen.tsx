import { useState } from 'react';
import { Camera, MapPin, Send, AlertCircle, CheckCircle, FileText, ArrowLeft } from 'lucide-react';

interface CommunityReportScreenProps {
  onBack: () => void;
}

export function CommunityReportScreen({ onBack }: CommunityReportScreenProps) {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [severity, setSeverity] = useState<'minor' | 'moderate' | 'severe' | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      setLocation('');
      setSeverity(null);
    }, 3000);
  };

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      {/* Header with Back Button */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <button 
            onClick={onBack}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ArrowLeft size={20} className="text-gray-600" />
          </button>
          <h1 className="text-gray-900 flex-1">Report</h1>
          <FileText size={20} className="text-blue-600" />
        </div>
        <p className="text-gray-500 text-sm ml-11">Help monitor flood conditions</p>
      </div>

      <div className="px-6 pt-4">
        {/* Success Message */}
        {submitted && (
          <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-4 mb-4 flex items-start gap-3 shadow-md border border-green-200">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle size={20} className="text-white" />
            </div>
            <div>
              <p className="text-green-900">Report submitted!</p>
              <p className="text-green-700 text-sm mt-0.5">Thank you for helping the community.</p>
            </div>
          </div>
        )}

        {/* Report Form */}
        <div className="bg-white rounded-2xl shadow-lg p-5 mb-4">
          <h2 className="text-gray-900 mb-4">Submit Flood Report</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Location Input */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Location</label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g., Johor Bahru City Centre"
                  className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
                <MapPin size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              <button
                type="button"
                className="mt-2 text-blue-600 text-sm flex items-center gap-1 hover:text-blue-700"
              >
                <MapPin size={14} />
                Use current location
              </button>
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the flood situation (e.g., water depth, affected areas)"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                required
              />
            </div>

            {/* Photo Upload */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Photo (Optional)</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:border-blue-300 transition-colors cursor-pointer bg-gradient-to-br from-gray-50 to-blue-50">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Camera size={20} className="text-blue-600" />
                </div>
                <p className="text-gray-600 text-sm mb-0.5">Click to upload photo</p>
                <p className="text-gray-400 text-xs">JPG, PNG up to 5MB</p>
              </div>
            </div>

            {/* Severity Level */}
            <div>
              <label className="block text-gray-700 mb-2 text-sm">Flood Severity</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSeverity('minor')}
                  className={`py-3 px-3 rounded-xl transition-all text-sm ${
                    severity === 'minor'
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-white shadow-md'
                      : 'bg-yellow-50 border border-yellow-200 text-yellow-700 hover:bg-yellow-100'
                  }`}
                >
                  Minor
                </button>
                <button
                  type="button"
                  onClick={() => setSeverity('moderate')}
                  className={`py-3 px-3 rounded-xl transition-all text-sm ${
                    severity === 'moderate'
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-md'
                      : 'bg-orange-50 border border-orange-200 text-orange-700 hover:bg-orange-100'
                  }`}
                >
                  Moderate
                </button>
                <button
                  type="button"
                  onClick={() => setSeverity('severe')}
                  className={`py-3 px-3 rounded-xl transition-all text-sm ${
                    severity === 'severe'
                      ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md'
                      : 'bg-red-50 border border-red-200 text-red-700 hover:bg-red-100'
                  }`}
                >
                  Severe
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Send size={18} />
              Submit Report
            </button>
          </form>
        </div>

        {/* Info Notice */}
        <div className="bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl p-4 flex items-start gap-3 border border-blue-200">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <AlertCircle size={16} className="text-white" />
          </div>
          <p className="text-blue-900 text-sm">
            Your reports help authorities respond faster to flood situations. All submissions are reviewed.
          </p>
        </div>
      </div>
    </div>
  );
}