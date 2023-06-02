import { useState, useEffect } from 'react';
import { saveJSON } from '../utils/localStorage';

import {
  IonIcon, IonSelect, IonSelectOption, useIonAlert,
} from '@ionic/react';
import {
  chevronUpOutline, locationOutline, notificationsOutline
} from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ElapsedTime from '../components/ElapsedTime';
import RemainingTime from '../components/RemainingTime';
import EndTime from '../components/EndTime';

function ParkedCar({ parking, setParking, goToCar }) {

  const [reminder, setReminder] = useState(parking.reminder);
  const [alert] = useIonAlert();

  function handleLeave() {
    saveJSON('parking', null);
    alert({
      header: "Done",
      message: "Thank you for using Park & Find!",
      buttons: ["OK"],
      onDidDismiss: () => {
        setParking(null);
      }
    });
  }

  return (
    <>
      <section className="flex items-center ">
        <IonIcon icon={chevronUpOutline}
          className="mr-3 text-2xl text-slate-400" />
        <p className="pt-1 font-medium text-lg grow">Parked Car</p>
        <button
          className="px-4 py-1 rounded-lg font-medium text-base 
          bg-sky-600 disabled:bg-slate-400 text-gray-50 "
          onClick={handleLeave}
        >
          Leave
        </button>
      </section>


      <section className="mt-5 h-11 flex items-center">
        <IonIcon icon={locationOutline} className="mr-3 text-2xl" />
        <p className="whitespace-nowrap overflow-hidden grow text-sky-600"
          onClick={goToCar}
        >
          {parking.address}
        </p>
      </section>

      <Swiper loop={true} spaceBetween={30} className="h-11 border-t border-b">
        <SwiperSlide>
          <ElapsedTime start={parking.datetime} />
        </SwiperSlide>
        <SwiperSlide>
          <RemainingTime start={parking.datetime} duration={parking.duration}/>
        </SwiperSlide>
        <SwiperSlide>
          <EndTime start={parking.datetime} duration={parking.duration}/>
        </SwiperSlide>
      </Swiper>

      <section className="h-11  flex items-center ">
        <IonIcon icon={notificationsOutline} className="mr-3 text-2xl " />
        <IonSelect interface="action-sheet" value={reminder} className="min-h-0"
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

export default ParkedCar;