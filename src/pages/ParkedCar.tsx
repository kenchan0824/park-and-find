import { useState, useEffect } from 'react';
import moment from 'moment';
import { saveJSON } from '../utils/localStorage';

import {
  IonAlert,
  IonIcon, IonSelect, IonSelectOption, IonSpinner, useIonAlert,
} from '@ionic/react';
import { chevronUpOutline, locationOutline, notificationsOutline, timeOutline } from 'ionicons/icons';

function ParkedCar({ parking, setParking }) {
  const [reminder, setReminder] = useState(parking.reminder);
  const [alert] = useIonAlert();

  function handleLeave() {
    saveJSON('parking', null);
    alert({
      header: "Done",
      message: "Thank you for using Park & Find!",
      buttons: ["OK"],
      onDidDismiss: () => {
        setParking(null);
      }
    });
  }

  return (
    <>
      <button
        className="absolute top-3 right-3 px-4 py-1 rounded-lg 
        bg-sky-600 text-gray-50 font-medium"
        onClick={handleLeave}
      >
        Leave
      </button>

      <section className="flex items-center mt-1">
        <IonIcon icon={chevronUpOutline} 
          className="mr-3 text-2xl text-slate-400" />
        <p className="font-medium text-lg">My Parked Car</p>
      </section>

      <section className="mt-6 mb-2 h-8 flex items-center">
        <IonIcon icon={locationOutline} className="mr-3 text-2xl" />
        <p className="whitespace-nowrap overflow-hidden">
          {parking.address}
        </p>
      </section>

      <section className="flex items-center">
        <IonIcon icon={timeOutline} className="mr-3 text-2xl" />
        <div className="flex flex-row items-baseline">
          <p className="font-bold text-lg mr-2">2</p>
          <p className="text-base mr-2">hrs</p>
          <p className="font-bold text-lg mr-2">32</p>
          <p className="text-base mr-2">mind elapsed</p>
        </div>
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

export default ParkedCar;