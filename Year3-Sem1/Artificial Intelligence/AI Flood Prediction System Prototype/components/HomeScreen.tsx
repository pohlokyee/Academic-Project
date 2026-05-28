import { CloudRain, MapPin, MessageSquare, Info, Shield, Phone, BookOpen, Bell, Cloud, AlertTriangle, Sun, Zap } from 'lucide-react';
import { cn } from './ui/utils'; 
// Import Dialog components to replace the Accordion for AI Details
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog'; 

interface HomeScreenProps {
  onNavigateToData: () => void;
  onNavigateToReport: () => void;
  onNavigateToNotifications: () => void;
  onNavigateToInfo: () => void;
}

// Mock Weather Data and Styles
const weatherStates = {
  sunny: {
    temp: '32°C',
    condition: 'Sunny',
    icon: <Sun size={20} className="text-yellow-500" />,
    tempColor: 'text-yellow-700',
  },
  cloudy: {
    temp: '28°C',
    condition: 'Partly Cloudy',
    icon: <Cloud size={20} className="text-gray-400" />,
    tempColor: 'text-gray-700',
  },
  rainy: {
    temp: '25°C',
    condition: 'Moderate Rain',
    icon: <CloudRain size={20} className="text-blue-500" />,
    tempColor: 'text-blue-700',
  },
  stormy: {
    temp: '22°C',
    condition: 'Thunderstorm',
    icon: <Zap size={20} className="text-indigo-600" />,
    tempColor: 'text-indigo-700',
  }
};

// --- Set the current weather type for the prototype (Example: 'rainy') ---
const currentWeatherType = 'rainy';
const weatherData = weatherStates[currentWeatherType];
// -------------------------------------------------------------------------

// --- Mock AI Prediction Data for showcase ---
const aiPredictionData = {
  confidence: '92%',
  keyFactor: 'Uplands Runoff (120mm)',
  predictionSummary: 'Moderate rainfall expected in the next 2-4 hours. Monitor river levels in Skudai area.',
  modelVersion: 'v5.1 - Hydronet',
}
// --------------------------------------------

// --- Dynamic Risk Styling Logic ---
const RISK_LEVEL = 'Moderate'; // Placeholder for actual risk state: Low, Moderate, High, Severe
const RISK_COLORS = {
    'Moderate': { bg: 'bg-yellow-50', border: 'border-yellow-200', text: 'text-orange-600', gaugeColor: '#F59E0B' },
    'Low': { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-600', gaugeColor: '#22c55e' },
    'High': { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', gaugeColor: '#f97316' },
    'Severe': { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', gaugeColor: '#ef4444' },
};
const RISK_STYLE = RISK_COLORS[RISK_LEVEL as keyof typeof RISK_COLORS];
// ----------------------------------


export function HomeScreen({ onNavigateToData, onNavigateToReport, onNavigateToNotifications, onNavigateToInfo }: HomeScreenProps) {
  const riskPercentage = 55;

  // Circular Gauge Calculation
  const radius = 35;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (riskPercentage / 100) * circumference;

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      {/* Header (Compact) */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        
        {/* Top Row: Location, Title, Date & Notification Button */}
        <div className="flex items-start justify-between">
          
          {/* Left Block: Location, Title, Date */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin size={16} />
              <span className="font-bold text-xl">Johor Bahru, Malaysia</span>
            </div>
            {/* Weather Information */}
            <div className="flex items-center gap-2">
                {weatherData.icon}
                <span className={cn("text-xl font-bold", weatherData.tempColor)}>{weatherData.temp}</span>
            </div>
            <p className="text-gray-500 text-sm mb-2">{weatherData.condition}</p>
            <p className="text-gray-500 text-sm">Thursday, Dec 11, 2025</p>
          </div>
          
          {/* Right Block: Weather & Notification Button */}
          <div className="flex flex-col items-end gap-1">

            {/* Notification Button */}
            <button 
              onClick={onNavigateToNotifications}
              className="p-0 size-10 flex items-center justify-center bg-white rounded-xl transition-shadow relative hover:shadow-sm active:scale-95 flex-shrink-0 border border-gray-100"
              aria-label="View notifications"
            >
              <Bell size={24} className="text-gray-900" />
              {/* Indicator with '2' */}
              <span className="absolute top-0.5 right-0.5 block h-4 w-4 rounded-full ring-2 ring-white bg-red-500 flex items-center justify-center text-white text-xs font-medium leading-none">
                  2
              </span>
            </button>
          </div>
        </div>
        
      </div>

      <div className="px-6 pt-4">
        {/* Static Notification Bar (Non-clickable) */}
        <div 
          role="alert"
          className="bg-gradient-to-r from-orange-400 to-red-400 rounded-xl px-4 py-3 mb-4 flex items-center gap-2 shadow-md"
        >
          <AlertTriangle size={18} className="text-white flex-shrink-0" />
          <p className="text-white text-sm flex-1 font-medium">CRITICAL ALERT: River level rising rapidly in Pasir Gudang.</p>
        </div>

        {/* Risk Level Card (DYNAMIC BACKGROUND & MODAL FOR AI DETAILS) */}
        <div className={cn("rounded-3xl shadow-lg p-6 mb-4 border", RISK_STYLE.bg, RISK_STYLE.border)}>
          
          {/* 1. Risk Status & Gauge (Top Section) */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <div>
              <p className="text-gray-600 mb-1">Current Flood Risk</p>
              {/* Use dynamic text color for the level */}
              <h2 className={cn("text-2xl font-bold", RISK_STYLE.text)}>{RISK_LEVEL} Level</h2>
              
              {/* AI Prediction Summary */}
              <p className="text-gray-700 text-sm mt-3">
                <span className="font-semibold text-blue-600">Summary:</span> {aiPredictionData.predictionSummary}
              </p>
            </div>
            
            {/* Circular Gauge (Refined Design - Percentage Only) */}
            <div className="relative w-24 h-24 flex-shrink-0">
                <svg className="transform -rotate-90 w-full h-full">
                    {/* Background Ring (Track) */}
                    <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke="#E9EBEE" 
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    />
                    {/* Progress Ring */}
                    <circle
                    cx="48"
                    cy="48"
                    r={radius}
                    stroke={RISK_STYLE.gaugeColor} 
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000 drop-shadow-md" 
                    />
                </svg>
                {/* Text inside the circle (Percentage Only) */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-900 text-2xl font-bold">{riskPercentage}%</span>
                </div>
            </div>
          </div>

          {/* 2. AI Prediction Details (Modal Trigger) */}
          <Dialog>
            <DialogTrigger asChild>
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 text-left font-medium p-0 flex items-center justify-between transition-colors">
                    <span>View Comprehensive AI Analysis</span>
                    <Info size={16} />
                </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-xl">
                <DialogHeader>
                    <DialogTitle>AI Flood Analysis Summary</DialogTitle>
                    <p className="text-gray-500 text-sm mt-1">Generated by **Hydronet Model {aiPredictionData.modelVersion}** based on real-time sensor data.</p>
                </DialogHeader>
                <div className="text-sm space-y-4 pt-2">
                    {/* Key Driver of Risk */}
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-1">Main Driver of Risk:</p>
                        <p className="text-gray-700 text-sm">{aiPredictionData.keyFactor}</p>
                    </div>

                    {/* Predicted Outcome */}
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                        <p className="font-semibold text-gray-900 mb-1">Predicted Outcome:</p>
                        <p className="text-gray-700 text-sm">{aiPredictionData.predictionSummary}</p>
                    </div>

                    {/* Confidence & Model */}
                    <p className="text-gray-700 flex justify-between items-center">
                        <span className="font-semibold text-gray-900">Confidence Score:</span> 
                        <span className="text-blue-800 bg-blue-200 px-3 py-1 rounded-full text-sm font-bold">
                            {aiPredictionData.confidence}
                        </span>
                    </p>

                    <p className="text-gray-500 text-xs italic border-t pt-2 mt-2">
                        Analysis updates every 15 minutes based on real-time sensor data.
                    </p>
                </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Flood Information & Resources (Full clickable button) */}
        <button
          onClick={onNavigateToInfo}
          className="w-full bg-white rounded-2xl shadow-md p-5 mb-4 text-left border border-gray-100 flex flex-col hover:shadow-lg transition-all active:scale-98"
        >
          <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <BookOpen size={20} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                      <h3 className="text-gray-900 font-medium mb-0.5">Flood Information & Safety</h3>
                      <p className="text-gray-500 text-xs">Essential guidelines & resources</p>
                  </div>
              </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-gray-100">
              <div className="bg-blue-50 rounded-xl p-2.5 border border-blue-200 flex flex-col items-center justify-center">
                  <Shield size={16} className="text-blue-600 mb-1" />
                  <p className="text-blue-800 text-xs text-center">Safety Tips</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-2.5 border border-blue-200 flex flex-col items-center justify-center">
                  <Phone size={16} className="text-blue-600 mb-1" />
                  <p className="text-blue-800 text-xs text-center">Emergency</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-2.5 border border-blue-200 flex flex-col items-center justify-center">
                  <MapPin size={16} className="text-blue-600 mb-1" />
                  <p className="text-blue-800 text-xs text-center">Flood Zones</p>
              </div>
          </div>
        </button>

        {/* Recent Updates - Compact */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-gray-900 mb-3 font-medium">Recent Updates</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-xl">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                <CloudRain size={16} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm">Moderate rainfall detected</p>
                <p className="text-gray-500 text-xs">Kulai • 32 mins ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
    </div>
  );
}