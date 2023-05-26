import { useEffect, useRef } from 'react';
import { createMap, addMarker } from '../utils/googleMap';
import { StatusBar, Style } from '@capacitor/status-bar';

import {
  IonContent, IonPage, useIonViewDidEnter
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const mapRef = useRef();
  let googleMap = null;

  useEffect(() => {
    StatusBar.setBackgroundColor({ color: "#FFFFFF" });
    StatusBar.setStyle({ style: Style.Light });
  }, []);

  useIonViewDidEnter(async () => {
    console.log('useIonViewDidEnter');
    googleMap = await createMap(mapRef, {
      lat: 53.48262026858102, 
      lng: -2.2181485479477163
    });
  });

  return (
    <IonPage>
      <IonContent fullscreen className="map-container">
        <capacitor-google-map ref={mapRef} id="map" />
      </IonContent>
    </IonPage>
  );
};

export default Home;
