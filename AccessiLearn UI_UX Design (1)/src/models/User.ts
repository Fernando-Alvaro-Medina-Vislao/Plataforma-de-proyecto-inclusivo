// User Model - Modelo de datos del usuario
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  program: string;
  level: string;
  photoUrl?: string;
  createdAt: Date;
}

export interface VoiceSettings {
  speed: number;
  pitch: number;
  autoRead: boolean;
}

export interface VisualSettings {
  highContrast: boolean;
  fontSize: number;
  animationsEnabled: boolean;
}

export interface AccessibilitySettings {
  interactionMode: 'voice' | 'gestures' | 'both';
  brailleEnabled: boolean;
  vibrationEnabled: boolean;
  vibrationIntensity: number;
}

export interface NotificationSettings {
  enabled: boolean;
  academic: boolean;
  grades: boolean;
  emergency: boolean;
}
