import { Preferences } from '@capacitor/preferences';

export async function saveJSON(key, object) {
  await Preferences.set({
    key,
    value: JSON.stringify(object),
  })
}

export async function loadJSON(key) {
  const { value } = await Preferences.get({ key })
  return JSON.parse(value);
}

export async function removeJSON(key) {
  await Preferences.remove({ key })
}