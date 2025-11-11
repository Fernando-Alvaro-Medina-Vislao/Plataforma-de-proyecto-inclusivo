import { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Hand, Grid3x3, Eye, Bell, Save, Check, Play, Bluetooth, Edit2, Camera, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { toast } from 'sonner';
import { Screen } from '../App';
import { useApp } from '../contexts/AppContext';

interface ProfileScreenProps {
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
}

export default function ProfileScreen({ onNavigate, onLogout }: ProfileScreenProps) {
  const {
    user,
    voiceSettings,
    updateVoiceSettings,
    visualSettings,
    updateVisualSettings,
    accessibilitySettings,
    updateAccessibilitySettings,
    notificationSettings,
    updateNotificationSettings,
    speak,
  } = useApp();

  const [voiceSpeed, setVoiceSpeed] = useState([voiceSettings.speed]);
  const [voicePitch, setVoicePitch] = useState([voiceSettings.pitch]);
  const [autoRead, setAutoRead] = useState(voiceSettings.autoRead);
  const [interactionMode, setInteractionMode] = useState(accessibilitySettings.interactionMode);
  const [brailleEnabled, setBrailleEnabled] = useState(accessibilitySettings.brailleEnabled);
  const [fontSize, setFontSize] = useState([visualSettings.fontSize]);
  const [animationsEnabled, setAnimationsEnabled] = useState(visualSettings.animationsEnabled);
  const [vibrationEnabled, setVibrationEnabled] = useState(accessibilitySettings.vibrationEnabled);
  const [vibrationIntensity, setVibrationIntensity] = useState([accessibilitySettings.vibrationIntensity]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(notificationSettings.enabled);
  const [academicNotifs, setAcademicNotifs] = useState(notificationSettings.academic);
  const [gradesNotifs, setGradesNotifs] = useState(notificationSettings.grades);
  const [emergencyNotifs] = useState(notificationSettings.emergency);
  const [highContrastMode, setHighContrastMode] = useState(visualSettings.highContrast);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Sincronizar con el contexto cuando cambien los valores
  useEffect(() => {
    setVoiceSpeed([voiceSettings.speed]);
    setVoicePitch([voiceSettings.pitch]);
    setAutoRead(voiceSettings.autoRead);
  }, [voiceSettings]);

  useEffect(() => {
    setFontSize([visualSettings.fontSize]);
    setAnimationsEnabled(visualSettings.animationsEnabled);
    setHighContrastMode(visualSettings.highContrast);
  }, [visualSettings]);

  useEffect(() => {
    setInteractionMode(accessibilitySettings.interactionMode);
    setBrailleEnabled(accessibilitySettings.brailleEnabled);
    setVibrationEnabled(accessibilitySettings.vibrationEnabled);
    setVibrationIntensity([accessibilitySettings.vibrationIntensity]);
  }, [accessibilitySettings]);

  useEffect(() => {
    setNotificationsEnabled(notificationSettings.enabled);
    setAcademicNotifs(notificationSettings.academic);
    setGradesNotifs(notificationSettings.grades);
  }, [notificationSettings]);

  const handleSave = () => {
    setIsSaving(true);
    setSaved(false);

    // Guardar todas las configuraciones en el contexto
    updateVoiceSettings({
      speed: voiceSpeed[0],
      pitch: voicePitch[0],
      autoRead,
    });

    updateVisualSettings({
      highContrast: highContrastMode,
      fontSize: fontSize[0],
      animationsEnabled,
    });

    updateAccessibilitySettings({
      interactionMode,
      brailleEnabled,
      vibrationEnabled,
      vibrationIntensity: vibrationIntensity[0],
    });

    updateNotificationSettings({
      enabled: notificationsEnabled,
      academic: academicNotifs,
      grades: gradesNotifs,
      emergency: emergencyNotifs,
    });

    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      toast.success('Configuración actualizada');
      speak('Configuración guardada exitosamente');
      
      if (vibrationEnabled && 'vibrate' in navigator) {
        navigator.vibrate(200);
      }

      setTimeout(() => setSaved(false), 3000);
    }, 1500);
  };

  const testVoice = (type: 'speed' | 'pitch') => {
    const message = type === 'speed' 
      ? `Esta es la velocidad seleccionada a ${voiceSpeed[0]}x`
      : `Este es el tono seleccionado`;
    speak(message);
  };

  const handleLogoutClick = () => {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
      speak('Cerrando sesión');
      setTimeout(() => {
        onLogout();
      }, 500);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Top App Bar */}
      <header className="bg-card shadow-md px-6 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('dashboard')}
            className="w-12 h-12 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
            aria-label="Volver al inicio"
          >
            <ArrowLeft className="w-6 h-6" aria-hidden="true" />
          </button>
          <h1>Mi Perfil y Preferencias</h1>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6 overflow-y-auto">
        {/* Personal Information Section */}
        <Card className="p-4 shadow-md">
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-3">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary" aria-hidden="true">
                  {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                </span>
              </div>
              <button
                className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Cambiar foto de perfil"
              >
                <Camera className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex-1">
                <p className="text-muted-foreground">Nombre</p>
                <p>{user?.name || 'Usuario'}</p>
              </div>
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Editar nombre"
              >
                <Edit2 className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex-1">
                <p className="text-muted-foreground">Programa académico</p>
                <p>{user?.program || 'No especificado'}</p>
              </div>
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Editar programa académico"
              >
                <Edit2 className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="flex-1">
                <p className="text-muted-foreground">Nivel académico</p>
                <p>{user?.level || 'No especificado'}</p>
              </div>
              <button 
                className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
                aria-label="Editar nivel académico"
              >
                <Edit2 className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex items-center gap-3 py-3">
              <p className="text-muted-foreground">Email</p>
              <p className="flex-1">{user?.email || 'No especificado'}</p>
            </div>

            <div className="pt-3">
              <Button 
                onClick={handleLogoutClick}
                variant="outline" 
                className="w-full h-12 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="w-5 h-5 mr-2" aria-hidden="true" />
                Cerrar Sesión
              </Button>
            </div>
          </div>
        </Card>

        {/* Voice Preferences Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Volume2 className="w-6 h-6 text-primary" aria-hidden="true" />
            <h2>Síntesis de Voz</h2>
          </div>

          <Card className="p-4 shadow-md space-y-5">
            {/* Voice Speed */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="voice-speed">Velocidad de lectura</Label>
                <span className="text-muted-foreground" aria-live="polite">
                  {voiceSpeed[0]}x {voiceSpeed[0] === 1.0 && '(Normal)'}
                </span>
              </div>
              <Slider
                id="voice-speed"
                min={0.5}
                max={2.0}
                step={0.1}
                value={voiceSpeed}
                onValueChange={setVoiceSpeed}
                className="mb-3"
                aria-label="Control de velocidad de voz"
              />
              <div className="flex justify-between text-muted-foreground mb-3">
                <span>0.5x</span>
                <span>1.0x</span>
                <span>1.5x</span>
                <span>2.0x</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => testVoice('speed')}
                className="w-full h-10"
              >
                <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                Probar
              </Button>
            </div>

            {/* Voice Pitch */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="voice-pitch">Tono de voz</Label>
                <span className="text-muted-foreground" aria-live="polite">
                  {voicePitch[0]} {voicePitch[0] === 1.0 && '(Normal)'}
                </span>
              </div>
              <Slider
                id="voice-pitch"
                min={0.5}
                max={1.5}
                step={0.1}
                value={voicePitch}
                onValueChange={setVoicePitch}
                className="mb-3"
                aria-label="Control de tono de voz"
              />
              <div className="flex justify-between text-muted-foreground mb-3">
                <span>Grave</span>
                <span>Normal</span>
                <span>Agudo</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => testVoice('pitch')}
                className="w-full h-10"
              >
                <Play className="w-4 h-4 mr-2" aria-hidden="true" />
                Probar
              </Button>
            </div>

            {/* Auto Read */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 pr-4">
                <Label htmlFor="auto-read">Lectura automática de notificaciones</Label>
                <p className="text-muted-foreground mt-1">
                  Lee las notificaciones al llegar
                </p>
              </div>
              <Switch
                id="auto-read"
                checked={autoRead}
                onCheckedChange={setAutoRead}
                aria-label="Lectura automática de notificaciones"
              />
            </div>
          </Card>
        </div>

        {/* Interaction Mode Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Hand className="w-6 h-6 text-primary" aria-hidden="true" />
            <h2>Modo de Interacción</h2>
          </div>

          <Card className="p-4 shadow-md">
            <p className="text-muted-foreground mb-4">
              Selecciona cómo prefieres interactuar con la app
            </p>

            <RadioGroup value={interactionMode} onValueChange={setInteractionMode}>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="voice" id="voice" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="voice" className="cursor-pointer">
                      Solo comandos de voz
                    </Label>
                    <p className="text-muted-foreground mt-1">
                      Navega completamente con tu voz
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border-2 border-border hover:border-primary transition-colors">
                  <RadioGroupItem value="gestures" id="gestures" className="mt-1" />
                  <div className="flex-1">
                    <Label htmlFor="gestures" className="cursor-pointer">
                      Solo gestos y toques
                    </Label>
                    <p className="text-muted-foreground mt-1">
                      Navega tocando la pantalla
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border-2 border-primary bg-primary/5">
                  <RadioGroupItem value="both" id="both" className="mt-1" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="both" className="cursor-pointer">
                        Voz y gestos combinados
                      </Label>
                      <Badge variant="secondary">Recomendado</Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">
                      Usa ambos métodos (recomendado)
                    </p>
                  </div>
                </div>
              </div>
            </RadioGroup>
          </Card>
        </div>

        {/* Braille Support Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Grid3x3 className="w-6 h-6 text-primary" aria-hidden="true" />
            <h2>Soporte Braille</h2>
          </div>

          <Card className="p-4 shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex-1 pr-4">
                <Label htmlFor="braille-enabled">Soporte para pantalla Braille</Label>
              </div>
              <Switch
                id="braille-enabled"
                checked={brailleEnabled}
                onCheckedChange={setBrailleEnabled}
              />
            </div>

            {brailleEnabled && (
              <div className="space-y-4 pt-4 border-t border-border">
                <div>
                  <p className="text-muted-foreground mb-2">Dispositivo Braille</p>
                  <div className="flex items-center gap-3 mb-3">
                    <Bluetooth className="w-5 h-5 text-muted-foreground" aria-hidden="true" />
                    <p className="text-muted-foreground">No hay dispositivo conectado</p>
                  </div>
                  <Button variant="outline" className="w-full h-12">
                    Buscar dispositivos
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Visual Settings Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Eye className="w-6 h-6 text-primary" aria-hidden="true" />
            <div>
              <h2>Ajustes Visuales</h2>
              <p className="text-muted-foreground">Para usuarios con visión parcial</p>
            </div>
          </div>

          <Card className="p-4 shadow-md space-y-5">
            {/* High Contrast */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 pr-4">
                <Label htmlFor="high-contrast">Modo alto contraste</Label>
                <p className="text-muted-foreground mt-1">
                  Mejora la legibilidad
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrastMode}
                onCheckedChange={setHighContrastMode}
              />
            </div>

            {/* Font Size */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="font-size">Tamaño del texto</Label>
                <span className="text-muted-foreground" aria-live="polite">
                  {fontSize[0]}x
                </span>
              </div>
              <div className="mb-3">
                <p style={{ fontSize: `${fontSize[0]}rem` }}>
                  Texto de ejemplo
                </p>
              </div>
              <Slider
                id="font-size"
                min={1.0}
                max={3.0}
                step={0.25}
                value={fontSize}
                onValueChange={setFontSize}
                className="mb-3"
              />
              <div className="flex justify-between text-muted-foreground">
                <span>Normal</span>
                <span>Grande</span>
                <span>Extra</span>
                <span>Máximo</span>
              </div>
            </div>

            {/* Animations */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-1 pr-4">
                <Label htmlFor="animations">Animaciones y transiciones</Label>
                <p className="text-muted-foreground mt-1">
                  Desactiva las animaciones
                </p>
              </div>
              <Switch
                id="animations"
                checked={animationsEnabled}
                onCheckedChange={setAnimationsEnabled}
              />
            </div>

            {/* Haptic Vibration */}
            <div>
              <div className="flex items-center justify-between py-2 mb-3">
                <div className="flex-1 pr-4">
                  <Label htmlFor="vibration">Feedback por vibración</Label>
                  <p className="text-muted-foreground mt-1">
                    Vibra al interactuar
                  </p>
                </div>
                <Switch
                  id="vibration"
                  checked={vibrationEnabled}
                  onCheckedChange={setVibrationEnabled}
                />
              </div>

              {vibrationEnabled && (
                <div>
                  <Label htmlFor="vibration-intensity" className="mb-3 block">
                    Intensidad
                  </Label>
                  <Slider
                    id="vibration-intensity"
                    min={1}
                    max={3}
                    step={1}
                    value={vibrationIntensity}
                    onValueChange={setVibrationIntensity}
                    className="mb-3"
                  />
                  <div className="flex justify-between text-muted-foreground">
                    <span>Bajo</span>
                    <span>Medio</span>
                    <span>Alto</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Notifications Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-6 h-6 text-primary" aria-hidden="true" />
            <h2>Notificaciones</h2>
          </div>

          <Card className="p-4 shadow-md space-y-4">
            <div className="flex items-center justify-between py-2">
              <Label htmlFor="notifications-enabled">Recibir notificaciones</Label>
              <Switch
                id="notifications-enabled"
                checked={notificationsEnabled}
                onCheckedChange={setNotificationsEnabled}
              />
            </div>

            {notificationsEnabled && (
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="academic-notifs"
                    checked={academicNotifs}
                    onCheckedChange={(checked) => setAcademicNotifs(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="academic-notifs" className="cursor-pointer">
                      Avisos de clases y tareas
                    </Label>
                    <p className="text-muted-foreground mt-1">
                      Horarios, cambios, recordatorios
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="grades-notifs"
                    checked={gradesNotifs}
                    onCheckedChange={(checked) => setGradesNotifs(checked as boolean)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor="grades-notifs" className="cursor-pointer">
                      Nuevas notas publicadas
                    </Label>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="emergency-notifs"
                    checked={emergencyNotifs}
                    disabled
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="emergency-notifs" className="cursor-not-allowed opacity-70">
                        Alertas críticas
                      </Label>
                      <Badge variant="destructive" className="text-xs">
                        No se puede desactivar
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Save Button - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border p-4 z-20">
        <div className="max-w-md mx-auto">
          <Button
            onClick={handleSave}
            disabled={isSaving || saved}
            className={`w-full h-14 shadow-lg transition-all ${
              saved ? 'bg-success hover:bg-success' : ''
            }`}
          >
            {isSaving && 'Guardando...'}
            {saved && (
              <>
                <Check className="w-5 h-5 mr-2" aria-hidden="true" />
                Guardado ✓
              </>
            )}
            {!isSaving && !saved && (
              <>
                <Save className="w-5 h-5 mr-2" aria-hidden="true" />
                Guardar Configuración
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Screen reader announcements */}
      <div className="sr-only" role="status" aria-live="polite">
        {isSaving && 'Guardando configuración'}
        {saved && 'Configuración guardada exitosamente'}
      </div>
    </div>
  );
}