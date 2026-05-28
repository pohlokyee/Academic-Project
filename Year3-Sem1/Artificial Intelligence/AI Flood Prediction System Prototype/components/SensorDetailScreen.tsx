import { ArrowLeft, CloudRain, Droplets, Waves, Wind, Activity, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { AreaChart as AreaChartType, LineChart as LineChartType } from 'recharts';

export type SensorType = 'rainfall' | 'riverlevel' | 'humidity' | 'drainage';

interface SensorDetailScreenProps {
  sensorType: SensorType;
  onBack: () => void;
}

// Re-using data structure from the original SensorDataScreen
const mockSensorData = {
  rainfall: {
    title: 'Rainfall Intensity (mm/h)',
    icon: CloudRain,
    currentValue: '12.5',
    unit: 'mm/h',
    trend: '+3.2 from avg',
    trendColor: 'text-blue-600',
    gradient: 'from-blue-400 to-blue-600',
    chartData: [
      { time: '00:00', value: 2 },
      { time: '04:00', value: 3 },
      { time: '08:00', value: 7 },
      { time: '12:00', value: 12 },
      { time: '16:00', value: 15 },
      { time: '20:00', value: 10 },
      { time: '23:59', value: 8 },
    ],
    chartColor: '#3b82f6', // blue-500
    chartFillColor: '#3b82f6',
    chartType: 'area' as 'area',
  },
  riverlevel: {
    title: 'River Water Level (m)',
    icon: Waves,
    currentValue: '3.8',
    unit: 'm',
    trend: '+0.8m from avg',
    trendColor: 'text-orange-600',
    gradient: 'from-blue-500 to-blue-700',
    chartData: [
      { time: '00:00', value: 2.8 },
      { time: '04:00', value: 3.0 },
      { time: '08:00', value: 3.2 },
      { time: '12:00', value: 3.5 },
      { time: '16:00', value: 3.8 },
      { time: '20:00', value: 3.6 },
      { time: '23:59', value: 3.4 },
    ],
    chartColor: '#1d4ed8', // blue-700
    chartFillColor: 'none',
    chartType: 'line' as 'line',
  },
  humidity: {
    title: 'Humidity Level (%)',
    icon: Droplets,
    currentValue: '78',
    unit: '%',
    trend: '+5% from avg',
    trendColor: 'text-teal-600',
    gradient: 'from-teal-400 to-teal-600',
    chartData: [
      { time: '00:00', value: 72 },
      { time: '04:00', value: 75 },
      { time: '08:00', value: 78 },
      { time: '12:00', value: 76 },
      { time: '16:00', value: 78 },
      { time: '20:00', value: 80 },
      { time: '23:59', value: 77 },
    ],
    chartColor: '#14b8a6', // teal-500
    chartFillColor: '#14b8a6',
    chartType: 'area' as 'area',
  },
  drainage: {
    title: 'Drainage Capacity (%)',
    icon: Wind,
    currentValue: '42',
    unit: '%',
    trend: 'Normal range',
    trendColor: 'text-green-600',
    gradient: 'from-green-400 to-green-600',
    chartData: [
      { time: '00:00', value: 38 },
      { time: '04:00', value: 40 },
      { time: '08:00', value: 42 },
      { time: '12:00', value: 44 },
      { time: '16:00', value: 42 },
      { time: '20:00', value: 40 },
      { time: '23:59', value: 39 },
    ],
    chartColor: '#22c55e', // green-500
    chartFillColor: 'none',
    chartType: 'line' as 'line',
  },
};

export function SensorDetailScreen({ sensorType, onBack }: SensorDetailScreenProps) {
  const sensor = mockSensorData[sensorType];
  const Icon = sensor.icon;

  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="flex items-center gap-3 mb-1">
          <button 
            onClick={onBack}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} className="text-gray-700" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{sensor.title.split('(')[0].trim()}</h1>
            <p className=" text-gray-500 text-sm">Detailed Sensor Data</p>
          </div>
          <Icon size={20} className={sensorType === 'rainfall' ? 'text-blue-600' : sensorType === 'riverlevel' ? 'text-blue-700' : sensorType === 'humidity' ? 'text-teal-600' : 'text-green-600'} />
        </div>
      </div>

      <div className="px-6 pt-4">
        {/* Current Reading Card (Large) */}
        <div className={`bg-white rounded-2xl p-6 shadow-lg mb-4`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-gray-500 text-sm mb-1">Current Reading</p>
              <p className="text-3xl font-bold text-gray-900">{sensor.currentValue} <span className="text-base font-normal text-gray-500">{sensor.unit}</span></p>
            </div>
            <div className={`w-14 h-14 bg-gradient-to-br ${sensor.gradient} rounded-xl flex items-center justify-center shadow-md`}>
              <Icon size={24} className="text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-sm mt-2">
            <TrendingUp size={16} className={sensor.trendColor} />
            <span className={sensor.trendColor}>{sensor.trend}</span>
          </div>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <h3 className="text-gray-900 mb-3 font-medium">24-Hour Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            {sensor.chartType === 'area' ? (
              <AreaChart data={sensor.chartData}>
                <defs>
                  <linearGradient id={`${sensorType}Gradient`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={sensor.chartColor} stopOpacity={0.3} />
                    <stop offset="95%" stopColor={sensor.chartColor} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" width={30} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                  }}
                  formatter={(value) => [`${value} ${sensor.unit}`, sensor.title.split('(')[0].trim()]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Area type="monotone" dataKey="value" stroke={sensor.chartColor} strokeWidth={2.5} fill={`url(#${sensorType}Gradient)`} />
              </AreaChart>
            ) : (
              <LineChart data={sensor.chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="time" tick={{ fontSize: 11 }} stroke="#9ca3af" />
                <YAxis tick={{ fontSize: 11 }} stroke="#9ca3af" width={30} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
                  }}
                  formatter={(value) => [`${value} ${sensor.unit}`, sensor.title.split('(')[0].trim()]}
                  labelFormatter={(label) => `Time: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke={sensor.chartColor} 
                  strokeWidth={2.5} 
                  dot={{ fill: sensor.chartColor, r: 3 }} 
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Metadata/Info */}
        <div className="bg-white rounded-2xl shadow-md p-4">
          <h3 className="text-gray-900 mb-3 font-medium">Sensor Information</h3>
          <div className="space-y-2 text-sm text-gray-700">
            <p><strong>Location:</strong> Johor Bahru Monitoring Hub</p>
            <p><strong>Last Updated:</strong> 1 minute ago</p>
            <p><strong>Threshold:</strong> {sensorType === 'riverlevel' ? 'Critical at 4.0m' : sensorType === 'rainfall' ? 'Heavy at 20mm/h' : 'N/A'}</p>
            <p><strong>Status:</strong> <span className="text-green-600 font-medium">Operational</span></p>
          </div>
        </div>
      </div>
    </div>
  );
}