import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker, gotoPoint, zoom } from '../utils/googleMap';
import { getCurrentPosition } from '../utils/geoLocation';
import { loadJSON } from '../utils/localStorage';

import { IonContent, IonIcon, IonPage } from '@ionic/react';
import './Home.css';
import ParkHere from './ParkHere';
import { add, pinSharp, remove } from 'ionicons/icons';
import ParkedCar from './ParkedCar';

const Home: React.FC = () => {
  const mapHTML = useRef(null);

  const [map, setMap] = useState(null);
  const [parking, setParking] = useState(null);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState("");
  const [level, setLevel] = useState(18);

  useEffect(() => {
    (async () => {
      const googleMap = await createMap(mapHTML);
      googleMap.setOnCameraMoveStartedListener(() => {
        setLoading(true);
      })
      googleMap.setOnCameraIdleListener(({ latitude, longitude, zoom }) => {
        setPosition({ lat: latitude, lng: longitude });
        setLevel(zoom)
      });
      setMap(googleMap);

      const data = await loadJSON('parking');
      setParking(data);
    })()
  }, []);

  useEffect(() => {
    console.log('parking', parking);

    (async () => {
      let coord = null;

      if (parking) {
        coord = parking.position;
        const markerId = await addMarker(map, coord);
        setMarker(markerId);

      } else {
        setLoading(true);
        coord = await getCurrentPosition();
        setPosition(coord);
        map.removeMarker(marker);
        setMarker("")
      }

      gotoPoint(map, coord);
    })();
  }, [parking]);

  function goToCar() {
    gotoPoint(map, parking.position);
  }

  async function zoomIn() {
    zoom(map, level+1)
    setLevel(current => current+1)
  } 

  async function zoomOut() {
    zoom(map, level-1)
    setLevel(current => current-1)
  } 

  return (
    <IonPage>
      <IonContent fullscreen className="bg-transparent">
        <div className="map-container">
          <capacitor-google-map ref={mapHTML} id="map" />
          
          <IonIcon icon={add} onClick={zoomIn}
            className="text-2xl text-stone-500 p-[7px] bg-white/[0.8] 
              absolute bottom-[50%] right-[11px] border rounded-t-sm"
          />
          <IonIcon icon={remove} onClick={zoomOut}
            className="text-2xl text-stone-500 p-[7px] bg-white/[0.8]
              absolute top-[50%] right-[11px] border rounded-b-sm"
          />
          {
            !parking &&
            <IonIcon icon={pinSharp} 
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
