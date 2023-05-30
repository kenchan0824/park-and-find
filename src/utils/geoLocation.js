import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';

export async function checkPermission() {
  const { location } = await Geolocation.checkPermissions();
  return location === "granted";
}

export async function getCurrLocation() {
  console.log('getCurrLocation');
  const { lat, lng } = await getDevicePostion({
    enableHighAccuracy: true,
    maximumAge: 1000,
  });
  const addr = await getAddress(lat, lng);
  return { lat, lng, ...addr };
}

export async function getCurrentPosition() {
  console.log('getDevicePosition');
  const { coords } = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    maximumAge: 1000,
  });
  return { lat: coords.latitude, lng: coords.longitude };
}

export async function getAddress(lat, lon) {
  console.log('getAddress', lat, lon);
  const { data } = await axios.get('https://us1.locationiq.com/v1/reverse',
    {
      params: {
        key: import.meta.env.VITE_REV_GEOCODING_API_KEY,
        lat, lon,
        format: 'json',
      }
    });
  const { apartments, house_number, road, postcode } = data.address;
  console.log({ apartments, house_number, road, postcode });
  return (apartments ?? (house_number ?? '') + ' ' + road) + ', ' + postcode;
}
