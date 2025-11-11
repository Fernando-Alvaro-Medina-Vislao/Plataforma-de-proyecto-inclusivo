// Navigation Service - Controlador de lógica de navegación
import { Location, Route, NavigationStep } from '../models/Navigation';

class NavigationService {
  private locations: Location[] = [
    {
      id: '1',
      name: 'Aula 301',
      building: 'Edificio A',
      floor: 3,
      room: '301',
      type: 'classroom',
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        hasBrailleSignage: true,
      },
    },
    {
      id: '2',
      name: 'Laboratorio de Computación 102',
      building: 'Edificio C',
      floor: 1,
      room: 'Lab 102',
      type: 'classroom',
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        hasBrailleSignage: true,
      },
    },
    {
      id: '3',
      name: 'Biblioteca Central',
      building: 'Edificio B',
      floor: 2,
      type: 'library',
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        hasBrailleSignage: true,
      },
    },
    {
      id: '4',
      name: 'Cafetería Estudiantil',
      building: 'Edificio Principal',
      floor: 1,
      type: 'cafeteria',
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        hasBrailleSignage: true,
      },
    },
    {
      id: '5',
      name: 'Aula 205',
      building: 'Edificio B',
      floor: 2,
      room: '205',
      type: 'classroom',
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: true,
        hasBrailleSignage: true,
      },
    },
    {
      id: '6',
      name: 'Oficina de Registro',
      building: 'Edificio Principal',
      floor: 1,
      type: 'office',
      accessibility: {
        wheelchairAccessible: true,
        hasElevator: false,
        hasBrailleSignage: true,
      },
    },
  ];

  // Obtener todos los lugares
  getAllLocations(): Location[] {
    return [...this.locations];
  }

  // Buscar lugares por nombre o edificio
  searchLocations(query: string): Location[] {
    const lowerQuery = query.toLowerCase();
    return this.locations.filter(
      loc =>
        loc.name.toLowerCase().includes(lowerQuery) ||
        loc.building.toLowerCase().includes(lowerQuery) ||
        loc.room?.toLowerCase().includes(lowerQuery)
    );
  }

  // Obtener lugar por ID
  getLocationById(id: string): Location | null {
    return this.locations.find(loc => loc.id === id) || null;
  }

  // Calcular ruta entre dos lugares
  calculateRoute(fromId: string, toId: string): Route | null {
    const from = this.getLocationById(fromId);
    const to = this.getLocationById(toId);

    if (!from || !to) return null;

    // Simulación simple de cálculo de ruta
    const steps: NavigationStep[] = this.generateSteps(from, to);
    const distance = steps.reduce((sum, step) => sum + step.distance, 0);
    const estimatedTime = Math.ceil(distance / 50); // ~50m por minuto caminando

    return {
      from,
      to,
      distance,
      estimatedTime,
      steps,
    };
  }

  // Generar pasos de navegación (simplificado)
  private generateSteps(from: Location, to: Location): NavigationStep[] {
    const steps: NavigationStep[] = [];

    // Salir del lugar actual
    steps.push({
      instruction: `Sal de ${from.name}`,
      distance: 10,
      direction: 'straight',
    });

    // Si están en diferentes edificios
    if (from.building !== to.building) {
      steps.push({
        instruction: `Dirígete hacia ${to.building}`,
        distance: 120,
        direction: 'straight',
        landmark: 'Sigue el pasillo principal',
      });
      steps.push({
        instruction: `Gira a la derecha en la entrada de ${to.building}`,
        distance: 15,
        direction: 'right',
      });
    }

    // Si están en diferentes pisos
    if (from.floor !== to.floor) {
      if (to.accessibility.hasElevator) {
        steps.push({
          instruction: `Toma el elevador al piso ${to.floor}`,
          distance: 20,
          direction: 'up',
          landmark: 'El elevador está a tu izquierda',
        });
      } else {
        steps.push({
          instruction: `Sube por las escaleras al piso ${to.floor}`,
          distance: 25,
          direction: 'up',
        });
      }
    }

    // Llegar al destino
    if (to.room) {
      steps.push({
        instruction: `Camina por el pasillo hasta ${to.room}`,
        distance: 40,
        direction: 'straight',
      });
    }

    steps.push({
      instruction: `Has llegado a ${to.name}`,
      distance: 0,
      direction: 'straight',
    });

    return steps;
  }

  // Obtener lugares favoritos/frecuentes
  getFavoriteLocations(): Location[] {
    // En producción, esto vendría de preferencias del usuario
    return this.locations.filter(loc => 
      loc.type === 'classroom' || loc.type === 'library'
    ).slice(0, 5);
  }

  // Verificar accesibilidad de un lugar
  isAccessible(locationId: string): boolean {
    const location = this.getLocationById(locationId);
    return location?.accessibility.wheelchairAccessible ?? false;
  }
}

// Singleton
export const navigationService = new NavigationService();
