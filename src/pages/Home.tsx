import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker } from '../utils/googleMap';

import {
  IonContent, IonIcon, IonPage, useIonViewDidEnter,
} from '@ionic/react';
import './Home.css';
import ParkHere from './ParkHere';
import { pinSharp } from 'ionicons/icons';
import { getCurrentPosition } from '../utils/geoLocation';

const Home: React.FC = () => {
  const modal = useRef(null);
  const mapRef = useRef(null);
  let googleMap = null;

  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      const coord = await getCurrentPosition();
      googleMap = await createMap(mapRef, coord);
      googleMap.setPadding({ bottom: 20 });
      googleMap.setOnCameraMoveStartedListener(() => {
        setLoading(true);
      })
      googleMap.setOnCameraIdleListener(({ latitude, longitude }) => {
        setPosition({ lat: latitude, lng: longitude });
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
          <ParkHere position={position} loading={loading} setLoading={setLoading} />
        </footer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
