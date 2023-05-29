import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker } from '../utils/googleMap';

import {
  IonContent, IonIcon, IonPage, useIonViewDidEnter,
} from '@ionic/react';
import './Home.css';
import ParkHere from './ParkHere';
import { pinSharp } from 'ionicons/icons';

const Home: React.FC = () => {
  const modal = useRef(null);
  const mapRef = useRef(null);
  let googleMap = null;

  const [coord, setCoord] = useState(null);

  useEffect(() => {
    (async () => {
      googleMap = await createMap(mapRef, {
        lat: 53.48262026858102,
        lng: -2.2181485479477163
      });
      googleMap.setPadding({ bottom: 20 });
      googleMap.setOnCameraIdleListener(({ latitude, longitude }) => {
        setCoord({ latitude, longitude });
        console.log('coord', latitude, longitude);
      });
    })();
  }, []);

  useIonViewDidEnter(async () => {
    console.log('useIonViewDidEnter');
  });

  return (
    <IonPage>
      <IonContent fullscreen className="bg-transparent">
        <div className="map-container">
          <capacitor-google-map ref={mapRef} id="map" />
          <IonIcon 
            icon={pinSharp} 
            className="text-3xl text-slate-600 pin"
          />
        </div>
        <footer className="modal">
          <ParkHere coord={coord} />
        </footer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
