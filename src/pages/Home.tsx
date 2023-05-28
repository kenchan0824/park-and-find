import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker } from '../utils/googleMap';

import {
  IonBackdrop, IonHeader, IonItem, IonLabel, IonModal,  IonTitle, IonToolbar, 
  IonContent,IonPage, useIonViewDidEnter, IonIcon, IonSelect, IonSelectOption, 
} from '@ionic/react';
import { chevronUpOutline, locationOutline, notificationsOutline, timeOutline } from 'ionicons/icons';
import './Home.css';

const Home: React.FC = () => {
  const modal = useRef(null);
  const mapRef = useRef(null);
  let googleMap = null;

  const [duration, setDuration] = useState(30);
  const [reminder, setReminder] = useState(0);

  useEffect(() => {
    (async () => {
      googleMap = await createMap(mapRef, {
        lat: 53.48262026858102,
        lng: -2.2181485479477163
      });
      googleMap.setPadding({ bottom: 20 });  
    }) ();
  }, []);

  useIonViewDidEnter(async () => {
    console.log('useIonViewDidEnter');
  });

  return (
    <IonPage>
      <IonContent className="map-container">
        <capacitor-google-map ref={mapRef} id="map"/>
        <main className="modal rounded-xl">
          <button 
            className="absolute top-3 right-3 px-3 rounded-md bg-sky-600 text-gray-50 font-medium"
          >
            Confirm
          </button>
          <section className="font-medium flex items-center">
            <IonIcon icon={chevronUpOutline} className="mr-3 text-2xl" />
            <p className="text-lg">Park Here</p>
          </section>
          <section className="font-medium">
          </section>
          <section className="mt-2 flex items-center">
            <IonIcon icon={locationOutline} className="mr-3 text-2xl" />
            <p className="text-base">2 Munday Street, M4 7BG</p>
          </section>
          <section className="mt-2 flex items-center">
            <IonIcon icon={timeOutline} className="mr-3 text-2xl" />
            <IonSelect interface="action-sheet" value={duration}
              className="font-medium"
              onIonChange={({ target }) => setDuration(target.value)}
            >
              <IonSelectOption value={30}>30 mins</IonSelectOption>
              <IonSelectOption value={45}>45 mins</IonSelectOption>
              <IonSelectOption value={60}>60 mins</IonSelectOption>
              <IonSelectOption value={90}>90 mins</IonSelectOption>
              <IonSelectOption value={120}>2 hours</IonSelectOption>
              <IonSelectOption value={180}>3 hours</IonSelectOption>
            </IonSelect>
          </section>
          <section className="flex items-center">
            <IonIcon icon={notificationsOutline} className="mr-3 text-2xl" />
            <IonSelect interface="action-sheet" value={reminder}
              className="font-medium"
              onIonChange={({ target }) => setReminder(target.value)}
            >
              <IonSelectOption value={0}>Disabled</IonSelectOption>
              <IonSelectOption value={5}>5 mins before</IonSelectOption>
              <IonSelectOption value={10}>10 mins before</IonSelectOption>
              <IonSelectOption value={15}>15 mins before</IonSelectOption>
              <IonSelectOption value={30}>30 mins before</IonSelectOption>
            </IonSelect>
          </section>
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Home;
