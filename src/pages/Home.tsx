import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker } from '../utils/googleMap';

import {
  IonContent,IonPage, useIonViewDidEnter, 
} from '@ionic/react';
import './Home.css';
import ParkHere from './ParkHere';

const Home: React.FC = () => {
  const modal = useRef(null);
  const mapRef = useRef(null);
  let googleMap = null;

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
          <ParkHere />
        </main>
      </IonContent>
    </IonPage>
  );
};

export default Home;
