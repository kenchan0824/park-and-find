import { useState, useEffect } from 'react';
import { getAddress } from '../utils/geoLocation'
import { saveJSON } from '../utils/localStorage';
import moment from 'moment';

import {
  IonAlert,
  IonIcon, IonSelect, IonSelectOption, IonSpinner,
} from '@ionic/react';
import { chevronUpOutline, locationOutline, notificationsOutline, timeOutline } from 'ionicons/icons';

function ParkHere({ position, loading, setLoading }) {

  const [duration, setDuration] = useState(30);
  const [reminder, setReminder] = useState(0);
  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (position) {
      getAddress(position)
        .then((result) => {
          setAddress(result);
        })
        .finally(() => {
          setLoading(false);
        })
    }
  }, [position]);

  async function handleConfirm() {
    await saveJSON('parking', {
      position, address, duration, reminder, 
      datetime: moment().toJSON()
    });
    setAlert(true);
  };

  return (
    <>
      <IonAlert
        isOpen={alert}
        header="Done"
        message="Your parking has been recorded. </br>
        Please press <strong>Leave</strong> on checkout."
        buttons={["OK"]}
        onDidDismiss={() => setAlert(false)}
      />

      <button
        className="absolute top-3 right-3 px-3 py-1 rounded-lg 
        bg-sky-600 text-gray-50 text-sm font-medium"
        onClick={handleConfirm}
      >
        Confirm
      </button>

      <section className="font-medium flex items-center">
        <IonIcon icon={chevronUpOutline} className="mr-3 text-2xl" />
        <p className="text-xl">Park Here</p>
      </section>

      <section className="mt-6 mb-2 h-8 flex items-center">
        <IonIcon icon={locationOutline} className="mr-3 text-2xl" />
        {
        loading ?
          <IonSpinner name="lines" className="" />
          :
          <p className="whitespace-nowrap overflow-hidden">
            {address}
          </p>
        }
      </section>

      <section className="flex items-center">
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