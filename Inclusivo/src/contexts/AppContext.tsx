import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, VoiceSettings, VisualSettings, AccessibilitySettings, NotificationSettings } from '../models/User';

interface AppContextType {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  voiceSettings: VoiceSettings;
  updateVoiceSettings: (settings: Partial<VoiceSettings>) => void;
  visualSettings: VisualSettings;
  updateVisualSettings: (settings: Partial<VisualSettings>) => void;
  accessibilitySettings: AccessibilitySettings;
  updateAccessibilitySettings: (settings: Partial<AccessibilitySettings>) => void;
  notificationSettings: NotificationSettings;
  updateNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  speak: (text: string, interrupt?: boolean) => void;
  stopSpeaking: () => void;
  isSpeaking: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_USER: UserProfile = {
  id: '1',
  name: 'Juan Pérez',
  email: 'juan.perez@universidad.edu',
  program: 'Ingeniería de Software',
  level: '6to Semestre',
  createdAt: new Date(),
};

const DEFAULT_VOICE_SETTINGS: VoiceSettings = {
  speed: 1.0,
  pitch: 1.0,
  autoRead: true,
};

const DEFAULT_VISUAL_SETTINGS: VisualSettings = {
  highContrast: false,
  fontSize: 1.0,
  animationsEnabled: false,
};

const DEFAULT_ACCESSIBILITY_SETTINGS: AccessibilitySettings = {
  interactionMode: 'both',
  brailleEnabled: false,
  vibrationEnabled: true,
  vibrationIntensity: 2,
};

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
  enabled: true,
  academic: true,
  grades: true,
  emergency: true,
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>(DEFAULT_VOICE_SETTINGS);
  const [visualSettings, setVisualSettings] = useState<VisualSettings>(DEFAULT_VISUAL_SETTINGS);
  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>(DEFAULT_ACCESSIBILITY_SETTINGS);
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('accessilearnUser');
    const savedVoice = localStorage.getItem('accessilearnVoice');
    const savedVisual = localStorage.getItem('accessilearnVisual');
    const savedAccessibility = localStorage.getItem('accessilearnAccessibility');
    const savedNotifications = localStorage.getItem('accessilearnNotifications');
    const savedAuth = localStorage.getItem('accessilearnAuth');

    if (savedUser) setUser(JSON.parse(savedUser));
    if (savedVoice) setVoiceSettings(JSON.parse(savedVoice));
    if (savedVisual) setVisualSettings(JSON.parse(savedVisual));
    if (savedAccessibility) setAccessibilitySettings(JSON.parse(savedAccessibility));
    if (savedNotifications) setNotificationSettings(JSON.parse(savedNotifications));
    if (savedAuth) setIsAuthenticated(JSON.parse(savedAuth));
  }, []);

  // Apply visual settings to document
  useEffect(() => {
    if (visualSettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }

    document.documentElement.style.setProperty('--user-font-size', `${visualSettings.fontSize}`);
    
    if (visualSettings.animationsEnabled) {
      document.documentElement.classList.remove('reduce-motion');
    } else {
      document.documentElement.classList.add('reduce-motion');
    }
  }, [visualSettings]);

  const updateVoiceSettings = (settings: Partial<VoiceSettings>) => {
    const newSettings = { ...voiceSettings, ...settings };
    setVoiceSettings(newSettings);
    localStorage.setItem('accessilearnVoice', JSON.stringify(newSettings));
  };

  const updateVisualSettings = (settings: Partial<VisualSettings>) => {
    const newSettings = { ...visualSettings, ...settings };
    setVisualSettings(newSettings);
    localStorage.setItem('accessilearnVisual', JSON.stringify(newSettings));
  };

  const updateAccessibilitySettings = (settings: Partial<AccessibilitySettings>) => {
    const newSettings = { ...accessibilitySettings, ...settings };
    setAccessibilitySettings(newSettings);
    localStorage.setItem('accessilearnAccessibility', JSON.stringify(newSettings));
  };

  const updateNotificationSettings = (settings: Partial<NotificationSettings>) => {
    const newSettings = { ...notificationSettings, ...settings };
    setNotificationSettings(newSettings);
    localStorage.setItem('accessilearnNotifications', JSON.stringify(newSettings));
  };

  const speak = (text: string, interrupt: boolean = false) => {
    if (!('speechSynthesis' in window)) {
      console.warn('Speech synthesis not supported');
      return;
    }

    if (interrupt) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = voiceSettings.speed;
    utterance.pitch = voiceSettings.pitch;
    utterance.lang = 'es-ES';

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  // Save user when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('accessilearnUser', JSON.stringify(user));
    }
  }, [user]);

  // Initialize user with default on first load
  useEffect(() => {
    const savedUser = localStorage.getItem('accessilearnUser');
    if (!savedUser && !user) {
      setUser(DEFAULT_USER);
    }
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        voiceSettings,
        updateVoiceSettings,
        visualSettings,
        updateVisualSettings,
        accessibilitySettings,
        updateAccessibilitySettings,
        notificationSettings,
        updateNotificationSettings,
        speak,
        stopSpeaking,
        isSpeaking,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}