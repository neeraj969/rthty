import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface DNDContextType {
  isDNDEnabled: boolean;
  toggleDND: () => void;
  showNotification: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  notifications: Notification[];
  removeNotification: (id: string) => void;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
}

const DNDContext = createContext<DNDContextType | undefined>(undefined);

export function DNDProvider({ children }: { children: ReactNode }) {
  const [isDNDEnabled, setIsDNDEnabled] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load DND preference from localStorage
    const savedDNDState = localStorage.getItem('studynet_dnd');
    if (savedDNDState) {
      setIsDNDEnabled(JSON.parse(savedDNDState));
    }
  }, []);

  const toggleDND = () => {
    const newState = !isDNDEnabled;
    setIsDNDEnabled(newState);
    localStorage.setItem('studynet_dnd', JSON.stringify(newState));
    
    // Show confirmation notification
    if (newState) {
      // Don't show notification when enabling DND
      console.log('Do Not Disturb mode enabled');
    } else {
      showNotification('Do Not Disturb mode disabled. You will now receive notifications.', 'info');
    }
  };

  const showNotification = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    // Don't show notifications if DND is enabled
    if (isDNDEnabled) {
      console.log('Notification blocked by DND:', message);
      return;
    }

    const notification: Notification = {
      id: Date.now().toString(),
      message,
      type,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto-remove notification after 5 seconds
    setTimeout(() => {
      removeNotification(notification.id);
    }, 5000);
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <DNDContext.Provider value={{
      isDNDEnabled,
      toggleDND,
      showNotification,
      notifications,
      removeNotification
    }}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        removeNotification={removeNotification} 
      />
    </DNDContext.Provider>
  );
}

// Notification Container Component
function NotificationContainer({ 
  notifications, 
  removeNotification 
}: { 
  notifications: Notification[];
  removeNotification: (id: string) => void;
}) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`p-4 rounded-lg shadow-lg border-l-4 bg-white transform transition-all duration-300 hover:scale-105 ${
            notification.type === 'success' ? 'border-green-500' :
            notification.type === 'error' ? 'border-red-500' :
            notification.type === 'warning' ? 'border-yellow-500' :
            'border-blue-500'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                notification.type === 'success' ? 'text-green-800' :
                notification.type === 'error' ? 'text-red-800' :
                notification.type === 'warning' ? 'text-yellow-800' :
                'text-blue-800'
              }`}>
                {notification.message}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {notification.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export function useDND() {
  const context = useContext(DNDContext);
  if (context === undefined) {
    throw new Error('useDND must be used within a DNDProvider');
  }
  return context;
}