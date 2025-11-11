import { useState, useEffect } from 'react';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import DashboardScreen from './components/DashboardScreen';
import ProfileScreen from './components/ProfileScreen';
import ScheduleScreen from './components/ScheduleScreen';
import DocumentScannerScreen from './components/DocumentScannerScreen';
import NavigationScreen from './components/NavigationScreen';
import NotificationsScreen from './components/NotificationsScreen';
import { Toaster } from './components/ui/sonner';
import { AppProvider } from './contexts/AppContext';
import { initMobileAccessibility } from './utils/mobileUtils';

export type Screen = 
  | 'splash' 
  | 'login' 
  | 'dashboard' 
  | 'profile' 
  | 'schedule' 
  | 'documents' 
  | 'navigation' 
  | 'notifications';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Inicializar configuraciones móviles para accesibilidad
    initMobileAccessibility();
    
    // Check if user is already logged in
    const savedAuth = localStorage.getItem('accessilearnAuth');
    if (savedAuth === 'true') {
      setIsLoggedIn(true);
      setCurrentScreen('dashboard');
    } else {
      // Simulate splash screen duration
      const timer = setTimeout(() => {
        setCurrentScreen('login');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('accessilearnAuth', 'true');
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('accessilearnAuth', 'false');
    setCurrentScreen('login');
  };

  const navigateTo = (screen: Screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-md mx-auto min-h-screen bg-background">
        {currentScreen === 'splash' && <SplashScreen />}
        {currentScreen === 'login' && <LoginScreen onLogin={handleLogin} />}
        {currentScreen === 'dashboard' && (
          <DashboardScreen onNavigate={navigateTo} />
        )}
        {currentScreen === 'profile' && (
          <ProfileScreen onNavigate={navigateTo} onLogout={handleLogout} />
        )}
        {currentScreen === 'schedule' && (
          <ScheduleScreen onNavigate={navigateTo} />
        )}
        {currentScreen === 'documents' && (
          <DocumentScannerScreen onNavigate={navigateTo} />
        )}
        {currentScreen === 'navigation' && (
          <NavigationScreen onNavigate={navigateTo} />
        )}
        {currentScreen === 'notifications' && (
          <NotificationsScreen onNavigate={navigateTo} />
        )}
        <Toaster />
      </div>
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;