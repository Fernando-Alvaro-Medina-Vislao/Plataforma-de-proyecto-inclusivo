import { useState } from 'react';
import { Accessibility, User, Lock, Eye, EyeOff, Mic, Fingerprint, ScanFace } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { toast } from 'sonner';

interface LoginScreenProps {
  onLogin: () => void;
}

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    
    if (!username || !password) {
      setError('Por favor completa todos los campos');
      toast.error('Por favor completa todos los campos');
      return;
    }

    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast.success('¡Inicio de sesión exitoso!');
      setTimeout(onLogin, 500);
    }, 1500);
  };

  const handleVoiceAuth = () => {
    toast.info('Autenticación por voz activada. Por favor, di tu nombre de usuario.');
  };

  const handleBiometricAuth = (type: 'fingerprint' | 'face') => {
    const message = type === 'fingerprint' 
      ? 'Autenticación por huella digital activada'
      : 'Autenticación facial activada';
    toast.info(message);
    
    setTimeout(() => {
      toast.success('Autenticación exitosa');
      setTimeout(onLogin, 500);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center mb-4">
          <Accessibility className="w-14 h-14 text-primary-foreground" aria-hidden="true" />
        </div>
        <h1 className="text-center mb-2">AccessiLearn</h1>
        <p className="text-muted-foreground text-center">Acceso Accesible</p>
      </div>

      {/* Form Section */}
      <div className="mb-6">
        <h2 className="mb-6">Inicia sesión con tus credenciales</h2>

        {/* Username Field */}
        <div className="mb-4">
          <Label htmlFor="username" className="mb-2 block">
            Usuario o Email
          </Label>
          <div className="relative">
            <User 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" 
              aria-hidden="true"
            />
            <Input
              id="username"
              type="text"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`h-14 pl-14 pr-4 border-2 ${error && !username ? 'border-destructive' : 'border-input'} focus:border-primary rounded-lg`}
              aria-invalid={error && !username ? 'true' : 'false'}
              aria-describedby={error && !username ? 'username-error' : undefined}
            />
          </div>
          {error && !username && (
            <p id="username-error" className="text-destructive mt-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs">!</span>
              Campo requerido
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="mb-2">
          <Label htmlFor="password" className="mb-2 block">
            Contraseña
          </Label>
          <div className="relative">
            <Lock 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-muted-foreground" 
              aria-hidden="true"
            />
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`h-14 pl-14 pr-14 border-2 ${error && !password ? 'border-destructive' : 'border-input'} focus:border-primary rounded-lg`}
              aria-invalid={error && !password ? 'true' : 'false'}
              aria-describedby={error && !password ? 'password-error' : undefined}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center text-muted-foreground hover:text-foreground rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <EyeOff className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Eye className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
          {error && !password && (
            <p id="password-error" className="text-destructive mt-2 flex items-center gap-2">
              <span className="w-4 h-4 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center text-xs">!</span>
              Campo requerido
            </p>
          )}
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <button
            className="text-primary underline min-h-[3rem] min-w-[3rem] px-2 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => toast.info('Función de recuperación de contraseña')}
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Login Button */}
        <Button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full h-14 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          {isLoading ? 'Verificando...' : 'Iniciar Sesión'}
        </Button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-4 text-muted-foreground">
            o accede con
          </span>
        </div>
      </div>

      {/* Alternative Authentication Methods */}
      <div className="mb-8">
        <h3 className="mb-4">Métodos accesibles de autenticación</h3>

        {/* Voice Authentication */}
        <Button
          variant="outline"
          onClick={handleVoiceAuth}
          className="w-full h-14 mb-3 border-2 border-primary text-primary hover:bg-primary/5 justify-start gap-3 rounded-lg"
        >
          <Mic className="w-8 h-8" aria-hidden="true" />
          <span>Autenticación por Voz</span>
        </Button>

        {/* Fingerprint */}
        <Button
          variant="outline"
          onClick={() => handleBiometricAuth('fingerprint')}
          className="w-full h-14 mb-3 border-2 border-primary text-primary hover:bg-primary/5 justify-start gap-3 rounded-lg"
        >
          <Fingerprint className="w-8 h-8" aria-hidden="true" />
          <span>Huella Digital</span>
        </Button>

        {/* Facial Recognition */}
        <Button
          variant="outline"
          onClick={() => handleBiometricAuth('face')}
          className="w-full h-14 border-2 border-primary text-primary hover:bg-primary/5 justify-start gap-3 rounded-lg"
        >
          <ScanFace className="w-8 h-8" aria-hidden="true" />
          <span>Reconocimiento Facial</span>
        </Button>
      </div>

      {/* Register Section */}
      <div className="text-center mb-4">
        <span className="text-muted-foreground">¿No tienes cuenta? </span>
        <button
          className="text-primary underline min-h-[3rem] min-w-[3rem] px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => toast.info('Función de registro')}
        >
          Regístrate aquí
        </button>
      </div>

      {/* Footer Legal */}
      <div className="text-center text-muted-foreground leading-relaxed pb-6">
        Al continuar, aceptas nuestros{' '}
        <button 
          className="underline min-h-[2.5rem] min-w-[2.5rem] px-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => toast.info('Términos de Servicio')}
        >
          Términos de Servicio
        </button>
        {' '}y{' '}
        <button 
          className="underline min-h-[2.5rem] min-w-[2.5rem] px-1 rounded focus:outline-none focus:ring-2 focus:ring-primary"
          onClick={() => toast.info('Política de Privacidad')}
        >
          Política de Privacidad
        </button>
      </div>

      {/* Screen reader announcement */}
      <div className="sr-only" role="status" aria-live="polite">
        {isLoading && 'Verificando credenciales, por favor espera'}
        {error && error}
      </div>
    </div>
  );
}
