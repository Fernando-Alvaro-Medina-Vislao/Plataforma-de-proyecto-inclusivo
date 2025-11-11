// Custom Hook para manejar navegación
import { useState, useEffect } from 'react';
import { Location, Route } from '../models/Navigation';
import { navigationService } from '../services/NavigationService';

export function useNavigation() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
  const [currentRoute, setCurrentRoute] = useState<Route | null>(null);

  useEffect(() => {
    setLocations(navigationService.getAllLocations());
    setFavoriteLocations(navigationService.getFavoriteLocations());
  }, []);

  const searchLocations = (query: string) => {
    return navigationService.searchLocations(query);
  };

  const calculateRoute = (fromId: string, toId: string) => {
    const route = navigationService.calculateRoute(fromId, toId);
    setCurrentRoute(route);
    return route;
  };

  const getLocationById = (id: string) => {
    return navigationService.getLocationById(id);
  };

  const isAccessible = (locationId: string) => {
    return navigationService.isAccessible(locationId);
  };

  return {
    locations,
    favoriteLocations,
    currentRoute,
    searchLocations,
    calculateRoute,
    getLocationById,
    isAccessible,
  };
}
