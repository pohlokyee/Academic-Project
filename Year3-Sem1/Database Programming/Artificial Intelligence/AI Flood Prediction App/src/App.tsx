import { useState } from 'react';
import { Home, Map, BarChart3, Settings, MessageSquare } from 'lucide-react';
import { HomeScreen } from './components/HomeScreen';
import { LiveMapScreen } from './components/LiveMapScreen';
import { SensorDataScreen, SensorType } from './components/SensorDataScreen';
import { SensorDetailScreen } from './components/SensorDetailScreen'; 
import { CommunityReportScreen } from './components/CommunityReportScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { NotificationsScreen } from './components/NotificationsScreen';
import { FloodInformationScreen } from './components/FloodInformationScreen';
import { LoginScreen } from './components/LoginScreen';
import { ChannelScreen } from './components/ChannelScreen'; // New Import
import { MaintenanceDashboard } from './components/MaintenanceDashboard'; // New Import

// Updated Screen type
type Screen = 'login' | 'home' | 'map' | 'data' | 'report' | 'settings' | 'notifications' | 'info' | 'detail' | 'channel' | 'maintenance'; 

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [sensorDetailType, setSensorDetailType] = useState<SensorType | null>(null); 

  const navigateToLogin = () => setCurrentScreen('login');
  const navigateToHome = () => setCurrentScreen('home');

  const navigateToSensorDetail = (sensorType: SensorType) => {
    setSensorDetailType(sensorType);
    setCurrentScreen('detail');
  }

  const renderScreen = () => {
    if (currentScreen === 'login') {
      return (
        <LoginScreen 
          onLogin={navigateToHome} 
          onMaintenanceLogin={() => setCurrentScreen('maintenance')} 
        />
      );
    }

    if (currentScreen === 'detail' && sensorDetailType) {
      return <SensorDetailScreen 
               sensorType={sensorDetailType} 
               onBack={() => setCurrentScreen('data')} 
             />;
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigateToData={() => setCurrentScreen('data')} onNavigateToReport={() => setCurrentScreen('report')} onNavigateToNotifications={() => setCurrentScreen('notifications')} onNavigateToInfo={() => setCurrentScreen('info')} />;
      case 'map':
        return <LiveMapScreen />;
      case 'channel':
        return <ChannelScreen />;
      case 'maintenance':
        return <MaintenanceDashboard onLogout={navigateToLogin} />;
      case 'data':
        return <SensorDataScreen onNavigateToDetail={(type) => navigateToSensorDetail(type)} onNavigateToNotifications={() => setCurrentScreen('notifications')} />;
      case 'report':
        return <CommunityReportScreen onBack={navigateToHome} />;
      case 'settings':
        return <SettingsScreen onLogout={navigateToLogin} />; 
      case 'notifications':
        return <NotificationsScreen onBack={navigateToHome} />;
      case 'info':
        return <FloodInformationScreen onBack={navigateToHome} />;
      default:
        return <HomeScreen onNavigateToData={() => setCurrentScreen('data')} onNavigateToReport={() => setCurrentScreen('report')} onNavigateToNotifications={() => setCurrentScreen('notifications')} onNavigateToInfo={() => setCurrentScreen('info')} />;
    }
  };

  const isSensorActive = currentScreen === 'data' || currentScreen === 'detail';
  // Hide navigation on Login and Maintenance screens
  const isNavVisible = currentScreen !== 'login' && currentScreen !== 'maintenance'; 

  return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col max-w-md mx-auto">
        <div className={`flex-1 ${isNavVisible ? 'pb-20' : ''} overflow-hidden`}>
          {renderScreen()}
        </div>

        {isNavVisible && (
          <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto shadow-lg">
            <div className="flex justify-around items-center h-16 px-2">
              <button
                onClick={() => {setCurrentScreen('map'); setSensorDetailType(null);}}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                  currentScreen === 'map' ? 'text-blue-600 scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Map size={24} strokeWidth={currentScreen === 'map' ? 2.5 : 2} />
                <span className="text-xs">Map</span>
              </button>

              <button
                onClick={() => {setCurrentScreen('channel'); setSensorDetailType(null);}}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                  currentScreen === 'channel' ? 'text-blue-600 scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <MessageSquare size={24} strokeWidth={currentScreen === 'channel' ? 2.5 : 2} />
                <span className="text-xs">Channel</span>
              </button>

              <button
                onClick={() => {setCurrentScreen('home'); setSensorDetailType(null);}}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                  currentScreen === 'home' ? 'text-blue-600 scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Home size={24} strokeWidth={currentScreen === 'home' ? 2.5 : 2} />
                <span className="text-xs">Home</span>
              </button>

              <button
                onClick={() => {setCurrentScreen('data'); setSensorDetailType(null);}}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                  isSensorActive ? 'text-blue-600 scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <BarChart3 size={24} strokeWidth={isSensorActive ? 2.5 : 2} />
                <span className="text-xs">Sensor</span>
              </button>

              <button
                onClick={() => {setCurrentScreen('settings'); setSensorDetailType(null);}}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-all ${
                  currentScreen === 'settings' ? 'text-blue-600 scale-105' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Settings size={24} strokeWidth={currentScreen === 'settings' ? 2.5 : 2} />
                <span className="text-xs">Settings</span>
              </button>
            </div>
          </nav>
        )}
      </div>
  );
}