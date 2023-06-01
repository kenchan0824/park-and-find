import { useState, useEffect } from 'react';
import { saveJSON } from '../utils/localStorage';

import {
  IonIcon, IonSelect, IonSelectOption, useIonAlert,
} from '@ionic/react';
import {
  chevronBack, chevronUpOutline, locationOutline, notificationsOutline, timeOutline
} from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import ElapsedTime from '../components/ElapsedTime';
import RemainingTime from '../components/RemainingTime';

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
      <button
        className="absolute top-3 right-3 px-4 py-1 rounded-lg 
        bg-sky-600 text-gray-50 font-medium"
        onClick={handleLeave}
      >
        Leave
      </button>

      <section className="flex items-center mt-1">
        <IonIcon icon={chevronUpOutline}
          className="mr-3 text-2xl text-slate-400" />
        <p className="font-medium text-lg">My Parked Car</p>
      </section>

      <section className="mt-6 mb-[5px] h-8 flex items-center">
        <IonIcon icon={locationOutline} className="mr-3 text-2xl" />
        <p className="whitespace-nowrap overflow-hidden grow text-sky-600"
          onClick={goToCar}
        >
          {parking.address}
        </p>
      </section>

      <Swiper loop={true} spaceBetween={30} className="py-1 border-t border-b">
        <SwiperSlide className="relative flex items-center ">
          <IonIcon icon={timeOutline} className="mr-3 text-2xl " />
          <ElapsedTime start={parking.datetime} />
          <IonIcon icon={chevronBack} 
            className="absolute top-2 right-[-4px] text-xl"
          />
        </SwiperSlide>
        <SwiperSlide className="relative flex items-center">
          <IonIcon icon={timeOutline} className="mr-3 text-2xl" />
          <RemainingTime start={parking.datetime} duration={parking.duration}/>
          <IonIcon icon={chevronBack} 
            className="absolute top-2 right-[-4px] text-xl"
          />
        </SwiperSlide>
      </Swiper>

      <section className="mt-[-5px] flex items-center ">
        <IonIcon icon={notificationsOutline} className="mr-3 text-2xl " />
        <IonSelect interface="action-sheet" value={reminder} className=""
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