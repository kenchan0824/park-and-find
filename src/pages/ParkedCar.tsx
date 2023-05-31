import { useState, useEffect } from 'react';
import { elapsedHours, elapsedMinutes } from '../utils/datetime';
import { saveJSON } from '../utils/localStorage';

import {
  IonIcon, IonSelect, IonSelectOption, useIonAlert,
} from '@ionic/react';
import {
  arrowForward, chevronUpOutline, locationOutline,
  notificationsOutline, timeOutline
} from 'ionicons/icons';
import moment from 'moment';

function ParkedCar({ parking, setParking, goToCar }) {

  const [reminder, setReminder] = useState(parking.reminder);
  const [dummy, setDummy] = useState(0);
  const [alert] = useIonAlert();

  useEffect(() => {
    setInterval(() => setDummy(moment().valueOf()), 60000);
  }, []);

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
        <p className="whitespace-nowrap overflow-hidden grow">
          {parking.address}
        </p>
        <IonIcon icon={arrowForward} className="px-2 text-2xl text-sky-600"
          onClick={() => goToCar()} />
      </section>

      <section className="flex items-center">
        <IonIcon icon={timeOutline} className="mr-3 text-2xl" />
        <div className="flex flex-row items-baseline">
          {
            elapsedHours(parking.datetime) ?
              <>
                <p className="font-bold text-lg mr-2">
                  {elapsedHours(parking.datetime)}
                </p>
                <p className="text-base mr-2">
                  {
                    elapsedHours(parking.datetime) > 1 ?
                      "hrs" :  "hr"
                  }
                </p>
              </>
              : ""
          }
          <p className="font-bold text-lg mr-2">
            {elapsedMinutes('2023-05-31T14:24:00')}
          </p>
          <p className="text-base mr-2">mins elapsed</p>
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