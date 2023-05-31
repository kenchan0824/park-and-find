import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker } from '../utils/googleMap';
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
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [parking, setParking] = useState(null);
  const [marker, setMarker] = useState("");
  const [level, setLevel] = useState(18);

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
        googleMap.setOnCameraIdleListener(({ latitude, longitude, zoom }) => {
          setPosition({ lat: latitude, lng: longitude });
          console.log('zoom', zoom)
          setLevel(zoom)
        });
      }
      setMap(googleMap);
    })();
  }, [parking]);

  function goToCar() {
    map.setCamera({
      coordinate: parking.position,
      zoom: level,
      animate: true,
    });
  }

  async function zoomIn() {
    console.log('level', level)
    map.setCamera({
      zoom: level+1,
      animate: true,
    });
    setLevel(current => current+1)
  } 

  async function zoomOut() {
    console.log('level', level)
    map.setCamera({
      zoom: level-1,
      animate: true,
    });
    setLevel(current => current-1)
  } 

  return (
    <IonPage>
      <IonContent fullscreen className="bg-transparent">
        <div className="map-container">
          <capacitor-google-map ref={mapHTML} id="map" />
          
          <IonIcon icon={add} onClick={zoomIn}
              className="text-2xl text-stone-500 p-[7px] bg-white/[0.8] 
                absolute bottom-[72px] right-[11px] border rounded-sm"
          />
            <IonIcon icon={remove} onClick={zoomOut}
              className="text-2xl text-stone-500 p-[7px] bg-white/[0.8]
                absolute bottom-[24px] right-[11px] border rounded-sm"
          />
          {
            !parking &&
            <IonIcon
              icon={pinSharp} onClick={zoomOut}
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
