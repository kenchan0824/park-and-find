import { GoogleMap } from '@capacitor/google-maps';

export async function createMap(mapRef, center) {
  console.log('createMap', mapRef);
  if (!mapRef.current) return;

  const mapObj = await GoogleMap.create({
    id: 'map',
    element: mapRef.current,
    apiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
    config: {
      center,
      zoom: 18
    }
  })
  await mapObj.enableCurrentLocation(true);
  return mapObj;
}

export async function addMarker(mapObj, coord) {
  console.log('addMarker', mapObj, coord);
  const markerId = await mapObj.addMarker({
    coordinate: coord,
    // title: location.address1,
    // snippet: `${location.address2}, ${location.postcode}`
  });
  return markerId;
}
