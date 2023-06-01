import { GoogleMap } from '@capacitor/google-maps';
import { getCurrentPosition } from './geoLocation';

export async function createMap(mapHTML) {
  console.log('createMap', mapHTML);
  if (!mapHTML.current) return;

  const center = await getCurrentPosition();
  const map = await GoogleMap.create({
    id: 'map',
    element: mapHTML.current,
    apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    config: {
      center,
      zoom: 18
    }
  })
  map.setPadding({ bottom: 40 });
  map.enableCurrentLocation(true);

  return map;
}

export async function addMarker(map, coord) {
  const markerId = await map.addMarker({
    coordinate: coord,
  });
  return markerId;
}

export async function gotoPoint(map, coord) {
  map.setCamera({
    coordinate: coord,
    zoom: 18,
    animate: true,
  });
}

export async function zoom(map, level) {
  map.setCamera({
    zoom: level,
    animate: true,
  });
}