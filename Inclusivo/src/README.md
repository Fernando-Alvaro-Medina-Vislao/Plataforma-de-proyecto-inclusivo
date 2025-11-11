# AccessiLearn - Aplicación de Inclusión Digital

Aplicación móvil Android de inclusión digital para estudiantes universitarios con discapacidad visual.

## 🎯 Características Principales

### Accesibilidad

- ✅ **Contraste 7:1 (WCAG AAA)** para usuarios con visión parcial
- ✅ **Fuentes grandes** (mínimo 18px base)
- ✅ **Áreas táctiles** mínimo 48x48dp, recomendado 56x56dp
- ✅ **Espaciado generoso** entre elementos (mínimo 16dp)
- ✅ **Iconos + texto** en todos los botones
- ✅ **Estados visuales claros** (normal, hover, focus, disabled)
- ✅ **Compatible con lectores de pantalla**
- ✅ **Modo de alto contraste** disponible
- ✅ **Navegación con teclado** completamente funcional

### Pantallas Implementadas

#### 1. **Splash Screen**

- Logo centrado con animación
- Indicador de carga
- Transición automática al login

#### 2. **Login / Autenticación**

- Campos de usuario y contraseña accesibles
- Validación de formulario con mensajes claros
- Métodos alternativos de autenticación:
  - Autenticación por voz
  - Huella digital
  - Reconocimiento facial
- Estados de error y carga

#### 3. **Dashboard / Pantalla Principal**

- Saludo personalizado
- Card destacado con próxima actividad
- Grid de acciones rápidas (2x3):
  - Mis Horarios
  - Calificaciones
  - Leer Documentos (OCR)
  - Navegación
  - Asistente Virtual
  - Mi Perfil
- Notificaciones recientes
- FAB para comando de voz
- Bottom Navigation Bar

#### 4. **Configuración de Perfil y Accesibilidad**

- Información personal editable
- **Preferencias de voz:**
  - Control de velocidad (0.5x - 2.0x)
  - Control de tono
  - Idioma de síntesis
  - Lectura automática
- **Modo de interacción:**
  - Solo voz
  - Solo gestos
  - Voz + gestos (recomendado)
- **Soporte Braille:**
  - Habilitar/deshabilitar
  - Conexión de dispositivos
- **Ajustes visuales:**
  - Modo alto contraste
  - Tamaño de fuente (1.0x - 3.0x)
  - Animaciones on/off
  - Feedback háptico
- **Notificaciones:**
  - Configuración granular
  - Lectura automática
  - Patrones de vibración
- Botón guardar con feedback

#### 5. **Mis Horarios**

- Selector de semana
- Tabs de días navegables
- Lista de clases con:
  - Horario y ubicación
  - Profesor
  - Estado (completada, en curso, pendiente)
  - Tipo (teórica, laboratorio, tutoría, evaluación)
- Acciones rápidas:
  - Cómo llegar
  - Ver materiales
  - Marcar asistencia

#### 6. **Lector de Documentos (OCR)**

- **Vista de cámara:**
  - Marco guía para alinear documentos
  - Indicador de iluminación
  - Control de flash
  - Acceso a galería
  - Historial de escaneos
- **Procesamiento:**
  - Barra de progreso
  - Indicador de precisión
- **Resultado:**
  - Vista previa de imagen
  - Texto extraído seleccionable
  - Controles de reproducción de audio
  - Acciones: guardar, compartir, editar, generar audio

#### 7. **Navegación por Campus**

- **Vista de búsqueda:**
  - Campo de búsqueda con voz
  - Chips de destinos frecuentes
  - Mapa simplificado
  - Lugares destacados
- **Navegación activa:**
  - Ruta visual en mapa
  - Instrucciones paso a paso
  - Distancia y tiempo estimado
  - Indicador de ruta accesible
  - Anuncios por voz
  - Próximos pasos visibles

#### 8. **Notificaciones**

- Indicador de notificaciones sin leer
- Filtros por tipo:
  - Todas
  - Sin leer
  - Académicas
  - Calificaciones
  - Emergencias
- Cards con información completa
- Priorización visual (colores en borde)
- **Notificaciones de emergencia especiales:**
  - Diseño destacado
  - Confirmación obligatoria
  - No descartables hasta confirmar
- Acciones:
  - Reproducir por voz
  - Marcar como leída
  - Más opciones
- Estado vacío

## 🎨 Sistema de Diseño

### Paleta de Colores

```css
--primary: #6200ee /* Púrpura vibrante */ --secondary: #03dac6
  /* Turquesa */ --accent: #ff6b35 /* Naranja cálido */
  --success: #4caf50 /* Verde */ --warning: #ff9800 /* Ámbar */
  --info: #2196f3 /* Azul */ --destructive: #f44336 /* Rojo */;
```

### Modo Alto Contraste

```css
--primary: #ffd700 /* Amarillo dorado */ --secondary: #00ffff
  /* Cyan brillante */ --background: #000000 /* Negro puro */
  --foreground: #ffffff /* Blanco puro */;
```

### Tipografía

- Fuente base: 18px (1.125rem)
- Escala accesible con line-height mínimo 1.5
- Weights: 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Espaciado

- Sistema basado en múltiplos de 8dp
- Margins laterales: 16dp (1.5rem)
- Gap entre elementos: 12-16dp
- Padding en cards: 16dp

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Tailwind CSS v4** - Estilos
- **shadcn/ui** - Componentes base
- **Lucide React** - Iconos
- **Sonner** - Toast notifications

## 📱 Componentes Reutilizables

- `Button` - Botones con múltiples variantes
- `Card` - Contenedores con elevation
- `Badge` - Indicadores y etiquetas
- `Input` - Campos de texto accesibles
- `Switch` - Interruptores on/off
- `Slider` - Controles deslizantes
- `RadioGroup` - Grupos de radio buttons
- `Checkbox` - Casillas de verificación
- `Progress` - Barras de progreso
- `BottomNav` - Navegación inferior

## 🚀 Cómo Usar

1. La aplicación inicia en el **Splash Screen**
2. Después de 2 segundos, navega automáticamente al **Login**
3. Puedes iniciar sesión con cualquier credencial o usar métodos alternativos
4. Una vez autenticado, accedes al **Dashboard**
5. Usa la **navegación inferior** para moverte entre secciones principales
6. Accede a **Mi Perfil** para configurar preferencias de accesibilidad
7. Activa el **Modo Alto Contraste** desde Mi Perfil si tienes visión parcial

## ⌨️ Navegación con Teclado

- **Tab** - Navegar entre elementos interactivos
- **Enter/Space** - Activar botones y links
- **Arrow Keys** - Navegar en listas y sliders
- **Escape** - Cerrar modals y dialogs

## 📢 Lectores de Pantalla

La aplicación incluye:

- Labels descriptivos en todos los controles
- Anuncios en vivo (aria-live) para cambios de estado
- Roles ARIA apropiados
- Descripciones alternativas para iconos
- Navegación lógica (landmarks)

## 🎯 Características de Accesibilidad Implementadas

### Visual

- ✅ Contraste mínimo 7:1 en todos los textos
- ✅ Sin información solo por color (iconos + texto siempre)
- ✅ Fuentes escalables sin romper layout
- ✅ Estados de focus visibles

### Táctil

- ✅ Áreas táctiles generosas (48-56dp)
- ✅ Espaciado entre elementos
- ✅ Feedback visual en todas las interacciones

### Navegación

- ✅ Orden de lectura lógico
- ✅ Focus order correcto
- ✅ Breadcrumbs e indicación de ubicación

### Contenido

- ✅ Mensajes de error claros y accionables
- ✅ Labels descriptivos en formularios
- ✅ Confirmaciones para acciones importantes

### Interacción

- ✅ Compatible con lectores de pantalla
- ✅ Comandos de voz simulados
- ✅ Sin límites de tiempo estrictos
- ✅ Confirmaciones para acciones destructivas

## 🔊 Funcionalidades de Voz

- **Síntesis de voz (TTS):** Control de velocidad y tono
- **Reconocimiento de voz:** Búsqueda y comandos
- **Lectura automática:** Notificaciones y documentos
- **Autenticación por voz:** Método alternativo de login

## 📍 Navegación Indoor

- Búsqueda de destinos con voz
- Rutas accesibles priorizadas
- Instrucciones paso a paso
- Indicadores visuales y por voz
- Puntos de interés destacados

## 📄 OCR y Lectura de Documentos

- Escaneo con guía visual
- Procesamiento con feedback de progreso
- Extracción de texto con alta precisión
- Reproducción de audio
- Exportación en múltiples formatos

## 🔔 Sistema de Notificaciones

- Priorización visual por importancia
- Filtros granulares
- Lectura automática opcional
- Notificaciones de emergencia especiales
- Confirmación obligatoria para alertas críticas

## 🌙 Modos de Visualización

### Modo Normal

- Diseño limpio y moderno
- Colores vibrantes con buen contraste
- Ideal para usuarios con visión normal o parcial leve

### Modo Alto Contraste

- Fondo negro puro (#000000)
- Texto blanco puro (#FFFFFF)
- Colores primarios muy brillantes
- Bordes más gruesos
- Sin sombras ni transparencias
- Ideal para usuarios con visión parcial severa

## 🎓 Casos de Uso

1. **Estudiante con ceguera total:**
   - Navega con lector de pantalla
   - Usa comandos de voz
   - Recibe feedback háptico
   - Escucha notificaciones automáticamente

2. **Estudiante con visión parcial:**
   - Activa modo alto contraste
   - Aumenta tamaño de fuente
   - Usa navegación visual con ayuda de voz
   - Escanea documentos con OCR

3. **Estudiante con baja visión temporal:**
   - Ajusta temporalmente contraste y fuente
   - Usa tanto gestos como voz
   - Accede a rutas con buena iluminación

## 📊 Métricas de Accesibilidad

- **Contraste de texto:** 7:1 o superior (WCAG AAA)
- **Tamaño de fuente mínimo:** 18px (1.125rem)
- **Área táctil mínima:** 48x48dp (3rem x 3rem)
- **Espaciado entre elementos:** 16dp (1rem)
- **Line height:** 1.5 o superior
- **Compatible con:** TalkBack, VoiceOver

## 🔄 Próximas Características

- [ ] Integración real con API de síntesis de voz
- [ ] OCR real con Tesseract.js o similar
- [ ] Navegación con GPS y sensores
- [ ] Sincronización con sistema académico
- [ ] Conexión Bluetooth con displays Braille
- [ ] Reconocimiento de voz real
- [ ] Modo offline completo
- [ ] Widget de acceso rápido

## 📝 Notas Técnicas

### Componentes Protegidos

- `/components/figma/ImageWithFallback.tsx` - No modificar

### Estructura de Navegación

```
App.tsx
├── SplashScreen
├── LoginScreen
├── DashboardScreen
│   └── BottomNav
├── ProfileScreen
├── ScheduleScreen
│   └── BottomNav
├── DocumentScannerScreen
│   └── BottomNav
├── NavigationScreen
│   └── BottomNav
└── NotificationsScreen
```

### Estados Globales

- `currentScreen` - Pantalla actual
- `isLoggedIn` - Estado de autenticación
- `highContrastMode` - Modo de alto contraste

## 🤝 Contribuciones

Este proyecto fue diseñado siguiendo las pautas WCAG 2.1 AAA y las mejores prácticas de accesibilidad para aplicaciones móviles.

## 📄 Licencia

Proyecto educativo - AccessiLearn

---

**Hecho con ❤️ pensando en la inclusión digital**