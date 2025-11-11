# AccessiLearn - Arquitectura MVC

## Descripción General

AccessiLearn es una aplicación móvil Android para inclusión digital de estudiantes universitarios con discapacidad visual. La aplicación está construida con React y Tailwind CSS, siguiendo el patrón **MVC (Model-View-Controller)** para mantener una separación clara de responsabilidades.

## Estructura del Proyecto

```
/
├── models/                 # MODELOS - Definiciones de tipos y estructuras de datos
│   ├── User.ts            # Modelos de usuario y configuraciones
│   ├── Schedule.ts        # Modelos de horarios y clases
│   ├── Notification.ts    # Modelos de notificaciones
│   ├── Document.ts        # Modelos de documentos OCR
│   └── Navigation.ts      # Modelos de navegación y lugares
│
├── services/              # CONTROLADORES - Lógica de negocio
│   ├── ScheduleService.ts     # Gestión de horarios
│   ├── NotificationService.ts # Gestión de notificaciones
│   ├── NavigationService.ts   # Gestión de navegación
│   └── DocumentService.ts     # Gestión de documentos OCR
│
├── hooks/                 # HOOKS PERSONALIZADOS - Interfaz entre servicios y vistas
│   ├── useSchedule.ts     # Hook para horarios
│   ├── useNotifications.ts # Hook para notificaciones
│   ├── useNavigation.ts   # Hook para navegación
│   └── useDocuments.ts    # Hook para documentos
│
├── contexts/              # ESTADO GLOBAL
│   └── AppContext.tsx     # Contexto global de la aplicación
│
├── components/            # VISTAS - Componentes de interfaz
│   ├── SplashScreen.tsx
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── ProfileScreen.tsx
│   ├── ScheduleScreen.tsx
│   ├── DocumentScannerScreen.tsx
│   ├── NavigationScreen.tsx
│   ├── NotificationsScreen.tsx
│   ├── BottomNav.tsx
│   └── ui/                # Componentes UI de ShadCN
│
├── App.tsx                # Componente principal y enrutador
└── styles/
    └── globals.css        # Estilos globales y variables CSS
```

## Patrón MVC Explicado

### 1. **MODELOS** (`/models`)

Los modelos definen la **estructura de datos** y los tipos de TypeScript que se usan en toda la aplicación.

**Archivos:**
- `User.ts`: Define UserProfile, VoiceSettings, VisualSettings, AccessibilitySettings, NotificationSettings
- `Schedule.ts`: Define ClassSession, WeeklySchedule, DayOfWeek
- `Notification.ts`: Define Notification, NotificationType, NotificationPriority
- `Document.ts`: Define ScannedDocument, OCRResult
- `Navigation.ts`: Define Location, Route, NavigationStep

**Ejemplo:**
```typescript
export interface ClassSession {
  id: string;
  subject: string;
  professor: string;
  room: string;
  building: string;
  startTime: string;
  endTime: string;
  day: DayOfWeek;
  type: 'lecture' | 'lab' | 'seminar';
}
```

### 2. **CONTROLADORES/SERVICIOS** (`/services`)

Los servicios contienen toda la **lógica de negocio** y la manipulación de datos. Son clases singleton que gestionan las operaciones sobre los modelos.

**Archivos:**
- `ScheduleService.ts`: Obtener horarios, próxima clase, clases del día
- `NotificationService.ts`: Gestionar notificaciones, marcar como leídas
- `NavigationService.ts`: Buscar lugares, calcular rutas
- `DocumentService.ts`: OCR, guardar documentos, búsqueda

**Características:**
- Patrón Singleton (una única instancia)
- Mock data para desarrollo
- Métodos reutilizables
- Separación de la lógica de la UI

**Ejemplo:**
```typescript
class ScheduleService {
  getNextClass(): ClassSession | null { ... }
  getTodayClasses(): ClassSession[] { ... }
  getWeeklySchedule(): WeeklySchedule { ... }
}

export const scheduleService = new ScheduleService();
```

### 3. **HOOKS PERSONALIZADOS** (`/hooks`)

Los hooks actúan como **interfaz entre los servicios y las vistas**, proporcionando una API reactiva para React.

**Archivos:**
- `useSchedule.ts`: Hook reactivo para horarios
- `useNotifications.ts`: Hook reactivo para notificaciones
- `useNavigation.ts`: Hook reactivo para navegación
- `useDocuments.ts`: Hook reactivo para documentos

**Características:**
- Encapsulan la lógica de estado
- Proporcionan métodos reactivos
- Actualizan automáticamente los componentes
- Fáciles de testear

**Ejemplo:**
```typescript
export function useSchedule() {
  const [nextClass, setNextClass] = useState<ClassSession | null>(null);
  
  useEffect(() => {
    setNextClass(scheduleService.getNextClass());
  }, []);

  return { nextClass, ... };
}
```

### 4. **VISTAS** (`/components`)

Los componentes de React que **presentan la UI** y manejan la interacción del usuario.

**Pantallas principales:**
- `SplashScreen.tsx`: Pantalla de carga inicial
- `LoginScreen.tsx`: Autenticación del usuario
- `DashboardScreen.tsx`: Pantalla principal con resumen
- `ProfileScreen.tsx`: Configuración y preferencias
- `ScheduleScreen.tsx`: Horario semanal
- `DocumentScannerScreen.tsx`: Escaneo OCR
- `NavigationScreen.tsx`: Navegación por campus
- `NotificationsScreen.tsx`: Lista de notificaciones

**Características:**
- Componentes funcionales con hooks
- Usan hooks personalizados y contextos
- Accesibilidad WCAG AAA
- Diseño móvil responsive

## Flujo de Datos

```
┌─────────────────────────────────────────────────────┐
│                    USUARIO                          │
└────────────────────┬────────────────────────────────┘
                     │ Interacción
                     ▼
┌─────────────────────────────────────────────────────┐
│              VISTAS (Components)                     │
│  - DashboardScreen, ProfileScreen, etc.             │
└────────────────────┬────────────────────────────────┘
                     │ Usa
                     ▼
┌─────────────────────────────────────────────────────┐
│         HOOKS PERSONALIZADOS (/hooks)                │
│  - useSchedule, useNotifications, etc.              │
└────────────┬───────────────────────┬─────────────────┘
             │ Lee/Escribe           │ Lee
             ▼                       ▼
┌────────────────────────┐  ┌───────────────────────┐
│  CONTEXTO GLOBAL       │  │  SERVICIOS            │
│  (AppContext)          │  │  (ScheduleService,    │
│  - Estado compartido   │  │   etc.)               │
│  - Configuraciones     │  │  - Lógica de negocio  │
└────────────┬───────────┘  └───────────┬───────────┘
             │                          │
             │ Usa tipos de             │ Opera con
             ▼                          ▼
┌─────────────────────────────────────────────────────┐
│              MODELOS (/models)                       │
│  - Interfaces TypeScript                            │
│  - Tipos de datos                                   │
└─────────────────────────────────────────────────────┘
```

## Estado Global vs Estado Local

### **Estado Global** (AppContext)
Almacena configuraciones que se comparten entre pantallas:
- Perfil de usuario
- Configuraciones de voz
- Configuraciones visuales
- Configuraciones de accesibilidad
- Preferencias de notificaciones
- Estado de autenticación

### **Estado Local** (Hooks personalizados)
Datos específicos de funcionalidades:
- Horarios
- Notificaciones
- Lugares y rutas
- Documentos escaneados

## Características de Accesibilidad

La aplicación cumple con **WCAG AAA** e incluye:

### Requisitos Técnicos:
- ✅ Contraste mínimo 7:1
- ✅ Fuentes base de 18px
- ✅ Áreas táctiles mínimo 48x48dp
- ✅ Navegación por teclado
- ✅ Estados visuales claros
- ✅ No depende solo del color

### Funcionalidades:
- 🎙️ Síntesis de voz (Text-to-Speech)
- 🎤 Comandos de voz
- 📳 Feedback háptico
- 🌗 Modo de alto contraste
- 🔤 Tamaño de fuente ajustable
- ⏸️ Reducción de animaciones
- ♿ Soporte para Braille (preparado)

## Paleta de Colores

```css
--primary: #6200EE    /* Púrpura - Principal */
--secondary: #03DAC6  /* Turquesa - Secundario */
--accent: #FF6B35     /* Naranja - Acento */
```

## Tecnologías Utilizadas

- **React** - Framework de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **ShadCN UI** - Componentes accesibles
- **Lucide React** - Iconos
- **Sonner** - Notificaciones toast
- **Local Storage** - Persistencia de datos

## Cómo Agregar Nuevas Funcionalidades

### 1. Crear el Modelo
```typescript
// /models/NewFeature.ts
export interface NewFeature {
  id: string;
  name: string;
  // ... otros campos
}
```

### 2. Crear el Servicio
```typescript
// /services/NewFeatureService.ts
class NewFeatureService {
  getData() { ... }
  saveData() { ... }
}

export const newFeatureService = new NewFeatureService();
```

### 3. Crear el Hook
```typescript
// /hooks/useNewFeature.ts
export function useNewFeature() {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    setData(newFeatureService.getData());
  }, []);

  return { data };
}
```

### 4. Usar en la Vista
```typescript
// /components/NewFeatureScreen.tsx
export default function NewFeatureScreen() {
  const { data } = useNewFeature();
  
  return <div>{/* UI */}</div>;
}
```

## Mantenimiento y Buenas Prácticas

1. **Modelos**: Mantener las interfaces actualizadas y bien documentadas
2. **Servicios**: Un servicio por dominio, métodos pequeños y específicos
3. **Hooks**: Encapsular toda la lógica de estado
4. **Vistas**: Solo UI y manejo de eventos, delegar lógica a hooks
5. **Accesibilidad**: Siempre incluir `aria-label`, roles ARIA, y navegación por teclado

## Próximos Pasos

- [ ] Integración con backend real (Supabase)
- [ ] Implementar reconocimiento de voz real
- [ ] Integrar API de OCR real
- [ ] Añadir pruebas unitarias
- [ ] Implementar caché offline
- [ ] Añadir sistema de autenticación robusto
