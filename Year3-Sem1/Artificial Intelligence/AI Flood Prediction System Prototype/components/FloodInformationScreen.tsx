import { ArrowLeft, Info, AlertTriangle, ShieldCheck, MapPin, Droplets, Home, Phone } from 'lucide-react';

interface FloodInformationScreenProps {
  onBack: () => void;
}

export function FloodInformationScreen({ onBack }: FloodInformationScreenProps) {
  const infoCategories = [
    {
      id: 1,
      icon: AlertTriangle,
      title: 'Flood Safety Tips',
      color: 'from-orange-400 to-orange-600',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      items: [
        'Move to higher ground immediately when flooding begins',
        'Never walk or drive through flood waters',
        'Stay away from power lines and electrical wires',
        'Keep children and pets away from flood water',
        'Turn off utilities if instructed to do so',
      ]
    },
    {
      id: 2,
      icon: ShieldCheck,
      title: 'Emergency Preparedness',
      color: 'from-blue-400 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      items: [
        'Keep emergency kit with water, food, flashlight, and first aid',
        'Store important documents in waterproof containers',
        'Know your evacuation routes and safe meeting points',
        'Have a fully charged power bank and mobile phone',
        'Keep emergency contact numbers readily available',
      ]
    },
    {
      id: 3,
      icon: Home,
      title: 'Protecting Your Home',
      color: 'from-teal-400 to-teal-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600',
      items: [
        'Install water barriers at doorways and windows',
        'Move valuable items to upper floors',
        'Clear drainage systems and gutters regularly',
        'Sandbag low-lying areas around your property',
        'Turn off gas, electricity, and water if flooding is imminent',
      ]
    },
    {
      id: 4,
      icon: MapPin,
      title: 'Flood-Prone Areas in Johor',
      color: 'from-purple-400 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      items: [
        'Pasir Gudang - Near industrial areas and river basins',
        'Skudai - Low-lying residential zones',
        'Kulai - Agricultural areas with poor drainage',
        'Kota Tinggi - Coastal areas and river valleys',
        'Segamat - River confluence zones',
      ]
    },
    {
      id: 5,
      icon: Phone,
      title: 'Emergency Contacts',
      color: 'from-red-400 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      items: [
        '999 - Emergency Services (Police, Fire, Ambulance)',
        '991 - Civil Defence Force',
        '1-800-88-5151 - JKR Flood Hotline',
        '06-222 2424 - Johor State Disaster Management',
        '07-224 5599 - Johor Bahru District Office',
      ]
    },
    {
      id: 6,
      icon: Droplets,
      title: 'Understanding Flood Risk Levels',
      color: 'from-indigo-400 to-indigo-600',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      items: [
        'Low (Green): Normal conditions, stay alert',
        'Medium (Yellow): Monitor closely, prepare emergency kit',
        'High (Orange): Be ready to evacuate, follow authorities',
        'Severe (Red): Evacuate immediately, danger to life',
        'Check this app regularly for real-time updates',
      ]
    },
  ];

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-teal-50">
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
            <h1 className="text-xl font-bold text-gray-900">Flood Information</h1>
            <p className="text-gray-500 text-sm">Essential knowledge & resources</p>
          </div>
          <Info size={20} className="text-blue-600" />
        </div>
      </div>

      {/* Information Cards */}
      <div className="px-6 pt-4 pb-24 overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="space-y-4">
          {infoCategories.map((category) => {
            const Icon = category.icon;
            return (
              <div key={category.id} className="bg-white rounded-2xl shadow-md overflow-hidden">
                {/* Category Header */}
                <div className={`bg-gradient-to-r ${category.color} p-4 flex items-center gap-3`}>
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Icon size={20} className="text-white" />
                  </div>
                  <h3 className="text-white flex-1">{category.title}</h3>
                </div>
                
                {/* Category Content */}
                <div className="p-4">
                  <ul className="space-y-2.5">
                    {category.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700 text-sm flex-1">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          {/* Bottom Notice */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-2xl p-4 shadow-lg">
            <p className="text-white text-sm text-center">
              <strong>Remember:</strong> Your safety is our priority. Always follow instructions from local authorities during flood emergencies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
