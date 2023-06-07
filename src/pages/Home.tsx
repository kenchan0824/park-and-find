import { useEffect, useRef, useState } from 'react';
import { createMap, addMarker, gotoPoint, zoom } from '../utils/googleMap';
import { getCurrentPosition } from '../utils/geoLocation';
import { loadJSON } from '../utils/localStorage';

import { IonContent, IonIcon, IonPage } from '@ionic/react';
import { add, pinSharp, remove } from 'ionicons/icons';
import './Home.css';

import ParkHere from './ParkHere';
import ParkedCar from './ParkedCar';
import Landing from './Landing';


export default function Home() {

  const mapHTML = useRef(null);

  const [map, setMap] = useState(null);
  const [parking, setParking] = useState(null);
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(false);
  const [marker, setMarker] = useState("");
  const [level, setLevel] = useState(18);
  const [isOpen, setOpen] = useState(true);

  useEffect(() => {

    loadJSON('parking')
      .then((data) => {
        if (data) {
          setParking(data);
          setOpen(false);
        }
      });

    createMap(mapHTML)
      .then((googleMap) => {
        googleMap.setOnCameraMoveStartedListener(() => {
          setLoading(true);
        })
        googleMap.setOnCameraIdleListener(({ latitude, longitude, zoom }) => {
          setPosition({ lat: latitude, lng: longitude });
          setLevel(zoom)
        });
        setMap(googleMap);
      });

  }, []);

  useEffect(() => {
    if (!map) return;
    
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
  }, [map, parking]);

  function goToCar() {
    gotoPoint(map, parking.position);
  }

  async function zoomIn() {
    zoom(map, level + 1)
    setLevel(current => current + 1)
  }

  async function zoomOut() {
    zoom(map, level - 1)
    setLevel(current => current - 1)
  }

  return (
    <IonPage>
      {
        isOpen &&
          <Landing setOpen={setOpen} />
      }
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
                setOpen={setOpen}
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
