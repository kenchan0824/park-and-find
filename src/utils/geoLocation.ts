import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';
import _ from 'lodash';

export async function checkPermission() {
  const { location } = await Geolocation.checkPermissions();
  return location === "granted";
}

export async function getCurrentPosition() {
  console.log('getDevicePosition');
  const { coords } = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
    maximumAge: 1000,
  });
  return { lat: coords.latitude, lng: coords.longitude };
}

export const getAddress = _.memoize(async ({ lat, lng }) => {
  console.log('getAddress', lat, lng);
  const { data } = await axios.get('https://us1.locationiq.com/v1/reverse',
    {
      params: {
        key: import.meta.env.VITE_REV_GEOCODING_API_KEY,
        lat, lon: lng,
        format: 'json',
      }
    });
  const { apartments, house_number, road, postcode } = data.address;
  console.log({ apartments, house_number, road, postcode });
  return (apartments ?? (house_number ?? '') + ' ' + road) + ', ' + postcode;
}, ({ lat, lng }) => `${lat.toFixed(4)}, ${lng.toFixed(4)}`);
