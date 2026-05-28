import {
  Bell,
  MapPin,
  Globe,
  User,
  ChevronRight,
  Shield,
  HelpCircle,
  LogOut,
  Settings as SettingsIcon,
} from "lucide-react";

// Import necessary dialog components
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from './ui/button';

// Update interface to accept onLogout prop
interface SettingsScreenProps {
    onLogout: () => void;
}

// Pass onLogout to the component
export function SettingsScreen({ onLogout }: SettingsScreenProps) {
  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 pt-6 pb-4 shadow-sm">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-xl font-bold text-gray-900">Settings</h1>
          <SettingsIcon size={20} className="text-blue-600" />
        </div>
        <p className="text-gray-500 text-sm">Manage your preferences</p>
      </div>

      <div className="px-6 pt-4">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
              <User size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900">Ahmad Abdullah</h3>
              <p className="text-gray-500 text-sm">
                ahmad.abdullah@email.my
              </p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </div>
        </div>

        {/* ALERT PREFERENCES - Kept for context/completeness */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell size={16} className="text-blue-600" />
              </div>
              <h3 className="text-gray-900">Alert Preferences</h3>
            </div>
          </div>
          <div className="p-4 space-y-4">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-gray-900 text-sm">Push Notifications</p>
                <p className="text-gray-500 text-xs">
                  Instant alerts on your device
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-gray-900 text-sm">SMS Alerts</p>
                <p className="text-gray-500 text-xs">
                  Critical warnings via text
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-gray-900 text-sm">Sound & Vibration</p>
                <p className="text-gray-500 text-xs">
                  Alert tones for warnings
                </p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
          </div>
        </div>

        {/* ALERT SEVERITY FILTERS - Kept for context/completeness */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-gray-900 text-sm">Alert Severity</h3>
            <p className="text-gray-500 text-xs">
              Choose which types to receive
            </p>
          </div>
          <div className="p-4 space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-red-500 to-red-600 rounded-full"></div>
                <span className="text-gray-900 text-sm">Critical Alerts</span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full"></div>
                <span className="text-gray-900 text-sm">Important Alerts</span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
            <label className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                <span className="text-gray-900 text-sm">Info & Updates</span>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
          </div>
        </div>

        {/* LOCATION SETTINGS - Kept for context/completeness */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <MapPin size={16} className="text-blue-600" />
              </div>
              <h3 className="text-gray-900 text-sm">Location</h3>
            </div>
          </div>
          <div className="p-4">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 text-sm">Primary Location</label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="Johor Bahru, Malaysia"
                  className="w-full px-4 py-2.5 pr-10 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <ChevronRight
                  size={18}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-gray-900 text-sm">Auto-detect Location</p>
                <p className="text-gray-500 text-xs">Use GPS for alerts</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  defaultChecked
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </div>
            </label>
          </div>
        </div>
        
        {/* Other Settings & App Info - Kept for context/completeness */}
        <div className="bg-white rounded-2xl shadow-md mb-4 overflow-hidden">
          <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Globe size={16} className="text-blue-600" />
              </div>
              <div className="text-left">
                <p className="text-gray-900 text-sm">Language</p>
                <p className="text-gray-500 text-xs">English / Bahasa</p>
              </div>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between border-b border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield size={16} className="text-blue-600" />
              </div>
              <p className="text-gray-900 text-sm">Privacy & Security</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <HelpCircle size={16} className="text-blue-600" />
              </div>
              <p className="text-gray-900 text-sm">Help & Support</p>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-4 mb-4">
          <div className="text-center space-y-0.5">
            <p className="text-gray-500 text-sm">AI Flood Prediction System</p>
            <p className="text-gray-400 text-xs">Version 2.1.0</p>
            <p className="text-gray-400 text-xs">© 2025 All Rights Reserved</p>
          </div>
        </div>

        {/* Logout Button wrapped in AlertDialog */}
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <button className="w-full bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-600 py-3 rounded-xl flex items-center justify-center gap-2 hover:from-red-100 hover:to-red-200 transition-all active:scale-95 shadow-sm">
                    <LogOut size={18} />
                    Logout
                </button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-md rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out of your account? You will be taken back to the login screen.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel asChild>
                        <Button variant="outline">
                            No, Stay Logged In
                        </Button>
                    </AlertDialogCancel>
                    <AlertDialogAction asChild>
                        {/* This button calls the onLogout prop passed from App.tsx */}
                        <Button 
                            onClick={onLogout} 
                            variant="destructive"
                        >
                            Yes, Log Out
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}