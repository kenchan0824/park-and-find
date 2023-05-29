import {
  IonIcon, IonSelect, IonSelectOption, 
} from '@ionic/react';
import { chevronUpOutline, locationOutline, notificationsOutline, timeOutline } from 'ionicons/icons';
import { useState } from 'react';

function ParkHere({ coord }) {
  const [duration, setDuration] = useState(30);
  const [reminder, setReminder] = useState(0);

  return (
    <>
      <button 
        className="absolute top-3 right-3 px-3 py-1 rounded-lg 
        bg-sky-600 text-gray-50 text-sm font-medium"
      >
        Confirm
      </button>

      <section className="font-medium flex items-center">
        <IonIcon icon={chevronUpOutline} className="mr-3 text-2xl" />
        <p className="text-lg">Park Here</p>
      </section>

      <section className="mt-5 flex items-start">
        <IonIcon icon={locationOutline} className="mr-3 text-2xl" />
        <p className="whitespace-nowrap overflow-hidden">
          Milliners Wharf, 2 Munday Street, M4 7BG
        </p>
      </section>
    
      <section className="mt-2 flex items-center">
        <IonIcon icon={timeOutline} className="mr-3 text-2xl" />
        <IonSelect interface="action-sheet" value={duration}
          onIonChange={({ target }) => setDuration(target.value)}
        >
          <IonSelectOption value={30}>30 mins</IonSelectOption>
          <IonSelectOption value={60}>60 mins</IonSelectOption>
          <IonSelectOption value={90}>90 mins</IonSelectOption>
          <IonSelectOption value={120}>2 hours</IonSelectOption>
          <IonSelectOption value={180}>3 hours</IonSelectOption>
        </IonSelect>
      </section>

      <section className="flex items-center">
        <IonIcon icon={notificationsOutline} className="mr-3 text-2xl" />
        <IonSelect interface="action-sheet" value={reminder}
          onIonChange={({ target }) => setReminder(target.value)}
        >
          <IonSelectOption value={0}>Disabled</IonSelectOption>
          <IonSelectOption value={5}>5 mins before</IonSelectOption>
          <IonSelectOption value={10}>10 mins before</IonSelectOption>
          <IonSelectOption value={15}>15 mins before</IonSelectOption>
          <IonSelectOption value={30}>30 mins before</IonSelectOption>
        </IonSelect>
      </section>
    </>
  );
}

export default ParkHere;