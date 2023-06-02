import { Channel, LocalNotifications } from '@capacitor/local-notifications'

export async function requestPermissions() {
  const { display } = await LocalNotifications.requestPermissions()
  return display === "granted";
}

async function createChannel() {
  const notificationChannel: Channel = {
      id: 'pop-notifications',
      name: 'Pop notifications',
      description: 'Pop notifications',                
      importance: 5,
      visibility: 1
  };
  const status = await LocalNotifications.requestPermissions()
  console.log('status', status);
  return LocalNotifications.createChannel(notificationChannel);
} 

export async function notifyAt(time, reminder) {
  console.log('notifyAt', time);
  try {
    await createChannel();
  } catch (error) {
    console.log('error', error);
  }
  await LocalNotifications.schedule({
    notifications: [{
      id: 191024,
      channelId: 'pop-notifications',
      title: `Your parking will expire in ${reminder} mins`,
      body: 'Tap to find the parking location',
      schedule: {
        at: time,
        repeats: false,
        allowWhileIdle: true,
      },
    }]
  });
}

export async function cancelAll() {
  console.log('cancelAll');
  try {
    await LocalNotifications.cancel({
      notifications: [
        { id: 191024 }
      ]
    });
  } catch (error) {
    console.log('error', error);
  }
}

