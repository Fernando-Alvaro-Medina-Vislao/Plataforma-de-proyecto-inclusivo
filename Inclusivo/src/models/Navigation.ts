// Navigation Model - Modelo de datos de navegación
export interface Location {
  id: string;
  name: string;
  building: string;
  floor: number;
  room?: string;
  type: 'classroom' | 'cafeteria' | 'library' | 'office' | 'bathroom' | 'entrance' | 'other';
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  accessibility: {
    wheelchairAccessible: boolean;
    hasElevator: boolean;
    hasBrailleSignage: boolean;
  };
}

export interface Route {
  from: Location;
  to: Location;
  distance: number; // en metros
  estimatedTime: number; // en minutos
  steps: NavigationStep[];
}

export interface NavigationStep {
  instruction: string;
  distance: number;
  direction: 'straight' | 'left' | 'right' | 'up' | 'down';
  landmark?: string;
}
