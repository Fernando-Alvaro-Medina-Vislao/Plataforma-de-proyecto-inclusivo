import { Home, Calendar, FolderOpen, Map, User } from 'lucide-react';
import { Screen } from '../App';
import { Badge } from './ui/badge';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  const navItems = [
    { 
      id: 'dashboard' as Screen, 
      icon: Home, 
      label: 'Inicio',
      badge: 0
    },
    { 
      id: 'schedule' as Screen, 
      icon: Calendar, 
      label: 'Horarios',
      badge: 0
    },
    { 
      id: 'documents' as Screen, 
      icon: FolderOpen, 
      label: 'Documentos',
      badge: 2
    },
    { 
      id: 'navigation' as Screen, 
      icon: Map, 
      label: 'Navegar',
      badge: 0
    },
    { 
      id: 'profile' as Screen, 
      icon: User, 
      label: 'Perfil',
      badge: 0
    },
  ];

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-lg z-30"
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center justify-center min-w-[3.5rem] h-full px-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${
                isActive 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              aria-label={`${item.label}${item.badge > 0 ? `, ${item.badge} nuevos` : ''}${isActive ? ', pantalla actual' : ''}`}
              aria-current={isActive ? 'page' : undefined}
            >
              <div className="relative">
                <Icon 
                  className={`w-6 h-6 mb-1 ${isActive ? 'scale-110' : ''} transition-transform`} 
                  aria-hidden="true" 
                />
                {item.badge > 0 && (
                  <Badge 
                    className="absolute -top-1 -right-2 w-4 h-4 flex items-center justify-center p-0 bg-destructive text-destructive-foreground text-xs rounded-full"
                    aria-hidden="true"
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              <span className={`text-xs ${isActive ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
