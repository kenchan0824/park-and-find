import { useState, useEffect } from 'react';
import { getAddress } from '../utils/geoLocation'
import { saveJSON } from '../utils/localStorage';
import moment from 'moment';

import {
  IonAlert,
  IonButton,
  IonIcon, IonSelect, IonSelectOption, IonSpinner, useIonAlert,
} from '@ionic/react';
import { chevronUpOutline, locationOutline, notificationsOutline, timeOutline } from 'ionicons/icons';

function ParkHere({ position, loading, setLoading, setParking }) {

  const [duration, setDuration] = useState(30);
  const [reminder, setReminder] = useState(0);
  const [address, setAddress] = useState("");
  const [alert] = useIonAlert();

  useEffect(() => {
    console.log("position", position);
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
    const parking = {
      position, address, duration, reminder, 
      datetime: moment().toJSON()
    }
    await saveJSON('parking', parking);
    alert({
      header: "Done",
      message: `Your parking has been recorded. </br>
        Please press <strong>Leave</strong> on checkout.`,        
      buttons: ["OK"],
      onDidDismiss: () => {
        setParking(parking);
      }
    });
  };

  return (
    <>
      <button
        className="absolute top-3 right-3 px-4 py-1 rounded-lg 
        bg-sky-600 disabled:bg-slate-400 text-gray-50 font-medium"
        onClick={handleConfirm}
        disabled={loading}
      >
        Confirm
      </button>

      <section className="flex items-center mt-1">
        <IonIcon icon={chevronUpOutline} 
          className="mr-3 text-2xl text-slate-400" />
        <p className="font-medium text-lg">Park Here</p>
      </section>

      <section className="mt-6 h-8 flex items-center">
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

      <section className="mt-1 flex items-center">
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

      <section className="mt-[-4px] flex items-center">
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