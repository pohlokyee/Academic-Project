import { Droplets, Mail, Facebook, Apple, User, Settings2 } from 'lucide-react';
import * as React from 'react';
import { Button } from './ui/button'; 

interface LoginScreenProps {
  onLogin: () => void;
  onMaintenanceLogin: () => void; // New prop for maintenance access
}

export function LoginScreen({ onLogin, onMaintenanceLogin }: LoginScreenProps) {
  return (
    <div className="h-screen overflow-y-auto bg-gradient-to-br from-blue-50 to-teal-50 flex flex-col items-center justify-center p-8">
      
      <div className="text-center mb-10">
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-xl">
            <Droplets size={40} className="text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-1">Flood AI Predict</h1>
        <p className="text-gray-600 text-sm">Real-time risk assessment & community alerts</p>
      </div>

      <div className="w-full max-w-xs space-y-4">
        
        <Button 
          onClick={onLogin} 
          variant="outline" 
          className="w-full h-12 bg-white border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <Mail size={20} className="mr-2 text-red-500" />
          Continue with Email
        </Button>
        <Button 
          onClick={onLogin} 
          variant="outline" 
          className="w-full h-12 bg-white border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <Facebook size={20} className="mr-2 text-blue-600" />
          Login with Facebook
        </Button>
        <Button 
          onClick={onLogin} 
          variant="outline" 
          className="w-full h-12 bg-white border-gray-200 text-gray-700 shadow-sm hover:bg-gray-50"
        >
          <Apple size={20} className="mr-2 text-gray-900" />
          Sign in with Apple ID
        </Button>

        <div className="flex items-center space-x-2 py-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-xs text-gray-500 uppercase">Or</span>
            <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <Button 
          onClick={onLogin} 
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg hover:shadow-xl active:scale-95"
        >
          <User size={20} className="mr-2" />
          Continue as Guest
        </Button>

        {/* Maintenance Team Access Button */}
        <button 
          onClick={onMaintenanceLogin}
          className="w-full py-3 flex items-center justify-center gap-2 text-gray-500 hover:text-blue-600 transition-colors text-sm font-medium border-t border-gray-200 mt-4"
        >
          <Settings2 size={16} />
          Maintenance Team Access
        </button>
      </div>
      
      <p className="text-gray-500 text-xs mt-8 px-4 text-center">
        By logging in, you agree to our Terms of Service and Privacy Policy.
      </p>

    </div>
  );
}