import { useState } from 'react';
import { CloudRain, Droplets, Waves, Wind, TrendingUp, Activity, ArrowRight, MapPin, Search, AlertTriangle, Bell, Zap } from 'lucide-react';
// NEW: Import Dialog components for the pop-out window
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog'; 

type TimeRange = 'daily' | 'weekly' | 'monthly';
export type SensorType = 'rainfall' | 'riverlevel' | 'humidity' | 'drainage';

// NEW: Update props interface
interface SensorDataScreenProps {
  onNavigateToDetail: (sensorType: SensorType, location: string) => void;
  onNavigateToNotifications: () => void;
}

const currentReadings = {
  rainfall: {
    title: 'Rainfall',
    icon: CloudRain,
    value: '12.5 mm/h',
    trend: '+3.2 from avg',
    trendColor: 'text-blue-600',
    gradient: 'from-blue-400 to-blue-600',
  },
  humidity: {
    title: 'Humidity',
    icon: Droplets,
    value: '78%',
    trend: '+5% from avg',
    trendColor: 'text-teal-600',
    gradient: 'from-teal-400 to-teal-600',
  },
  riverlevel: {
    title: 'River Level',
    icon: Waves,
    value: '3.8 m',
    trend: '+0.8m from avg',
    trendColor: 'text-orange-600',
    gradient: 'from-blue-500 to-blue-700',
  },
  drainage: {
    title: 'Drainage',
    icon: Wind,
    value: '42%',
    trend: 'Normal range',
    trendColor: 'text-green-600',
    gradient: 'from-green-400 to-green-600',
  },
};

// --- Updated: Mock AI Analysis Data for informative pop-up ---
const aiAnalysisData = {
  status: 'Critical Alert: High Risk Mode',
  riskColor: 'from-orange-500 to-red-500', 
  mainCause: {
    icon: '🌧️',
    title: 'Sustained Heavy Rainfall',
    detail: 'Continuous rainfall (12.5 mm/h) over the past 4 hours has saturated the ground and significantly raised river levels. This is the main trigger for the current flood risk.',
    sensorKey: 'rainfall',
  },
  prediction: {
    icon: '🌊',
    title: 'Critical River Overspill',
    detail: 'AI predicts the River Level will exceed the critical flood threshold of 4.0m within the next 4-6 hours, potentially leading to widespread localized flooding.',
    sensorKey: 'riverlevel',
  },
  userFocus: {
    icon: '🚨',
    title: 'Focus on River Level & Evacuation',
    detail: 'Monitor the River Level sensor closely (currently 3.8m). Secure valuable assets on the ground floor and be prepared to execute your evacuation plan immediately.',
  },
};
// ------------------------------------------------------------


export function SensorDataScreen({ onNavigateToDetail, onNavigateToNotifications }: SensorDataScreenProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>('daily');
  const [currentLocation, setCurrentLocation] = useState('Johor Bahru, Malaysia');
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentLocation(searchQuery.trim());
      setSearchQuery('');
    }
  };


  // Helper component to render a structured detail block
  const DetailBlock = ({ data }: { data: typeof aiAnalysisData.mainCause }) => (
    <div className="bg-gray-50 p-4 rounded-xl space-y-1">
      <div className="flex items-center gap-2">
        <span className="text-xl flex-shrink-0">{data.icon}</span>
        <p className="text-gray-900 font-bold">{data.title}</p>
      </div>
      <p className="text-gray-700 text-sm pl-8">
        {data.detail}
      </p>
      {data.sensorKey && (
        <button
          onClick={() => onNavigateToDetail(data.sensorKey as SensorType, currentLocation)}
          className="text-blue-600 text-xs flex items-center gap-1 font-medium pt-1 pl-8 hover:text-blue-700"
        >
          View Source Data <ArrowRight size={12} />
        </button>
      )}
    </div>
  );


  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">Sensor Data</h1>
          <div className='flex items-center gap-3'>
            <Activity size={20} className="text-blue-600" />
            
          </div>
        </div>
        {/* Current Location Display (New) */}
        <div className="flex items-center gap-2 text-gray-600 text-sm">
          <MapPin size={16} className="text-blue-600" />
          <p>{currentLocation}</p>
        </div>
      </div>

      <div className="px-6 pt-4">
        {/* Search Bar (New) */}
        <form onSubmit={handleSearch} className="mb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search other location, e.g., Skudai"
              className="w-full px-4 py-2.5 pl-10 pr-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm text-sm"
            />
            <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600">
              <Search size={18} />
            </button>
          </div>
        </form>
        
        {/* Time Range Toggle */}
        <div className="bg-white rounded-2xl shadow-md p-1.5 mb-4 flex gap-1.5">
          <button
            onClick={() => setTimeRange('daily')}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all text-sm ${
              timeRange === 'daily' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => setTimeRange('weekly')}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all text-sm ${
              timeRange === 'weekly' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`flex-1 py-2.5 px-3 rounded-xl transition-all text-sm ${
              timeRange === 'monthly' 
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' 
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            Monthly
          </button>
        </div>

        {/* Current Readings Cards - Now clickable */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {(Object.keys(currentReadings) as SensorType[]).map((key) => {
            const reading = currentReadings[key];
            const Icon = reading.icon;
            return (
              <button
                key={key}
                onClick={() => onNavigateToDetail(key, currentLocation)}
                className="bg-white rounded-2xl p-4 shadow-md text-left hover:shadow-lg transition-all active:scale-98"
              >
                <div className="flex justify-between items-start">
                  <div className={`w-10 h-10 bg-gradient-to-br ${reading.gradient} rounded-xl flex items-center justify-center mb-3 shadow-md flex-shrink-0`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <ArrowRight size={18} className="text-gray-400 mt-1" />
                </div>
                <p className="text-gray-500 text-sm mb-1">{reading.title}</p>
                <p className="text-xl font-medium text-gray-900">{reading.value}</p>
                <div className="flex items-center gap-1 text-xs mt-2">
                  <TrendingUp size={12} className={reading.trendColor} />
                  <span className={`font-medium ${reading.trendColor}`}>{reading.trend}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* --- AI Prediction Summary Card (Now uses Dialog for details) --- */}
        <Dialog>
            <DialogTrigger asChild>
                <button 
                    className={`w-full bg-white rounded-2xl shadow-lg p-5 mb-4 border border-blue-200 text-left hover:shadow-xl transition-all active:scale-98`}
                >
                    <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 bg-gradient-to-br ${aiAnalysisData.riskColor} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md`}>
                            <AlertTriangle size={20} className="text-white" />
                        </div>
                        <div className='flex-1'>
                            <h3 className="text-gray-900 font-bold text-lg mb-0.5">AI Flood Prediction: {aiAnalysisData.status}</h3>
                            <p className="text-gray-500 text-sm">Prediction for {currentLocation} - Tap to view detailed analysis</p>
                        </div>
                        <ArrowRight size={20} className="text-gray-400 self-center" />
                    </div>
                </button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <div className="flex items-center gap-3">
                        <Zap size={20} className="text-blue-600" />
                        <DialogTitle className="text-lg">AI Flood Analysis Report</DialogTitle>
                    </div>
                </DialogHeader>
                
                <div className="space-y-4 pt-2">
                    {/* Overall Status */}
                    <div className="bg-red-50 border border-red-200 p-3 rounded-xl">
                        <p className="text-red-700 font-bold text-sm">{aiAnalysisData.status} for {currentLocation}</p>
                    </div>

                    {/* Main Cause */}
                    <DetailBlock data={aiAnalysisData.mainCause} />

                    {/* Prediction */}
                    <DetailBlock data={aiAnalysisData.prediction} />

                    {/* User Focus / Action */}
                    <DetailBlock data={aiAnalysisData.userFocus} />

                </div>
                
                {/* Call to Action Button */}
                <div className="pt-2">
                    <button
                        onClick={() => onNavigateToDetail(aiAnalysisData.prediction.sensorKey as SensorType, currentLocation)}
                        className="w-full bg-blue-600 to-blue-700 text-white py-2.5 rounded-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 font-medium"
                    >
                        View Critical Sensor Details <ArrowRight size={14} />
                    </button>
                </div>
            </DialogContent>
        </Dialog>
        
        {/* Info Notice */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <p className="text-gray-700 text-sm">
            Tap on any sensor card above to view detailed historical data and analysis for that specific environmental parameter.
          </p>
        </div>
      </div>
    </div>
  );
}