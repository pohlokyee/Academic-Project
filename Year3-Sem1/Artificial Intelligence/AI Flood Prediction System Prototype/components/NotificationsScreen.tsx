import { useState } from 'react';
import { Bell, AlertTriangle, Info, CheckCircle, ArrowLeft, MapPin, Clock, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';

interface Notification {
  id: number;
  type: 'warning' | 'alert' | 'info' | 'success';
  title: string;
  message: string;
  location: string;
  time: string;
  read: boolean;
  details: string; // Added details field for pop-out
}

interface NotificationsScreenProps {
  onBack: () => void;
}

export function NotificationsScreen({ onBack }: NotificationsScreenProps) {
  // Removed state and functions for SMS setup

  const notifications: Notification[] = [
    {
      id: 1,
      type: 'warning',
      title: 'River level rising',
      message: 'River level rising in Pasir Gudang',
      location: 'Pasir Gudang',
      time: '15 mins ago',
      read: false,
      details: 'The water level at Pasir Gudang River Station has reached 3.5m, slightly above the critical threshold of 3.2m. Authorities have been alerted and are monitoring the situation closely. Residents in low-lying areas should prepare for possible evacuation.',
    },
    {
      id: 2,
      type: 'alert',
      title: 'Moderate rainfall detected',
      message: 'Moderate rainfall detected in Kulai area',
      location: 'Kulai',
      time: '32 mins ago',
      read: false,
      details: 'Consistent moderate rainfall (12mm/hr) has been detected over the last 3 hours in the Kulai catchment zone. Flooding risk remains moderate for the next 4 hours. Avoid unnecessary travel in the area.',
    },
    {
      id: 3,
      type: 'info',
      title: 'System update',
      message: 'New sensor installed at Senai Station',
      location: 'Senai',
      time: '2 hours ago',
      read: true,
      details: 'A new generation water level and flow sensor has been successfully deployed at the Senai River Station, enhancing prediction accuracy for the central region of Johor.',
    },
    {
      id: 4,
      type: 'success',
      title: 'Water level normal',
      message: 'Water levels returned to normal in Skudai',
      location: 'Skudai',
      time: '3 hours ago',
      read: true,
      details: 'Following earlier rainfall, river water levels in Skudai have receded to a safe level (1.5m). The immediate flood threat is over, but users are advised to remain vigilant.',
    },
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return <AlertTriangle size={20} className="text-orange-500" />;
      case 'alert':
        return <AlertTriangle size={20} className="text-red-500" />;
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      default:
        return <Info size={20} className="text-blue-500" />;
    }
  };

  const getBgColor = (type: Notification['type']) => {
    switch (type) {
      case 'warning':
        return 'bg-orange-50';
      case 'alert':
        return 'bg-red-50';
      case 'success':
        return 'bg-green-50';
      default:
        return 'bg-blue-50';
    }
  };

  const NotificationDetailDialog = ({ notification }: { notification: Notification }) => (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className={`${getBgColor(notification.type)} rounded-2xl p-4 shadow-sm w-full text-left transition-shadow ${
            !notification.read ? 'border-2 border-blue-300' : ''
          } hover:shadow-md`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-gray-900 mb-1 font-medium">{notification.title}</h4>
              <p className="text-gray-700 text-sm mb-2 truncate">
                {notification.message}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <MapPin size={12} className="text-gray-400" />
                <span>{notification.location}</span>
                <span>•</span>
                <Clock size={12} className="text-gray-400" />
                <span>{notification.time}</span>
              </div>
            </div>
            {!notification.read && (
              <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
            )}
            <ChevronRight size={20} className="text-gray-400 self-center" />
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getIcon(notification.type)}
            <DialogTitle className="text-lg">{notification.title}</DialogTitle>
          </div>
          <DialogDescription>
            <div className="flex items-center gap-2 text-xs mt-1">
              <MapPin size={14} className="text-muted-foreground" />
              <span>{notification.location}</span>
              <span>•</span>
              <Clock size={14} className="text-muted-foreground" />
              <span>{notification.time}</span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="text-sm text-gray-700 space-y-3 pt-2">
          <p className="font-medium text-base">{notification.message}</p>
          <p>{notification.details}</p>
          {notification.type === 'alert' || notification.type === 'warning' ? (
            <div className="bg-red-50 border border-red-200 p-3 rounded-lg flex items-start gap-2">
              <AlertTriangle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 text-xs">Always prioritize safety. If you are in a high-risk area, follow evacuation procedures.</p>
            </div>
          ) : null}
        </div>
        <div className="pt-2">
          {/* Using button from ui/button */}
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Acknowledge
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

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
            <h1 className="text-xl font-bold text-gray-900">Alerts & Notifications</h1>
            <p className="text-gray-500 text-sm">
              {notifications.filter(n => !n.read).length} unread
            </p>
          </div>
          <Bell size={20} className="text-blue-600" />
        </div>
      </div>

      {/* Notifications List (scrollable content area starts right after header) */}
      <div className="px-6 pt-4 pb-24 overflow-y-auto" style={{ height: 'calc(100vh - 120px)' }}> 
        <div className="space-y-3">
          {notifications.map((notification) => (
            <NotificationDetailDialog key={notification.id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
}