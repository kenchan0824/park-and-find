import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker } from '../utils/googleMap';
import { getCurrentPosition } from '../utils/geoLocation';
import { loadJSON } from '../utils/localStorage';

import { IonContent, IonIcon, IonPage } from '@ionic/react';
import './Home.css';
import ParkHere from './ParkHere';
import { pinSharp } from 'ionicons/icons';
import ParkedCar from './ParkedCar';

const Home: React.FC = () => {
  const mapHTML = useRef(null);

  const [map, setMap] = useState(null);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parking, setParking] = useState(null);
  const [marker, setMarker] = useState("");

  useEffect(() => {
    (async () => {
      const data = await loadJSON('parking');
      setParking(data);
    })()
  }, []);

  useEffect(() => {
    console.log('parking', parking);
    let googleMap = null;

    (async () => {
      let coord = null;
      if (parking) {
        coord = parking.position;
      } else {
        setLoading(true);
        coord = await getCurrentPosition();
        setPosition(coord);
      }
      googleMap = await createMap(mapHTML, coord);
      googleMap.setPadding({ bottom: 20 });
      googleMap.setOnCameraMoveStartedListener(() => {
        setLoading(true);
      })
      if (parking) {
        const markerId = await googleMap.addMarker({
          coordinate: parking.position
        });
        setMarker(markerId);
      } else {
        if (marker) {
          googleMap.removeMarker(marker);
          setMarker("")
        }
        googleMap.setOnCameraIdleListener(({ latitude, longitude }) => {
          setPosition({ lat: latitude, lng: longitude });
        });
      }
      setMap(googleMap);
    })();
  }, [parking]);

  async function goToCar() {
    await map.setCamera({
      coordinate: parking.position,
      zoom: 18,
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen className="bg-transparent">
        <div className="map-container">
          <capacitor-google-map ref={mapHTML} id="map" />
          {
            !parking &&
            <IonIcon
              icon={pinSharp}
              className="text-3xl text-slate-600 pin"
            />
          }
        </div>
        <footer className="modal">
        {
          parking ?
            <ParkedCar
              parking={parking} setParking={setParking}
              goToCar={goToCar}
            />
            :
            <ParkHere 
              position={position} 
              loading={loading} setLoading={setLoading} 
              setParking={setParking} 
            />
        }
        </footer>
      </IonContent>
    </IonPage>
  );
};

export default Home;
