import { useState, useEffect } from 'react';
import { saveJSON } from '../utils/localStorage';
import { notifyAt, cancelAll } from '../utils/notification';

import { IonIcon, useIonAlert, useIonToast } from '@ionic/react';
import { chevronUpOutline, locationOutline } from 'ionicons/icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import ElapsedTime from '../components/ElapsedTime';
import RemainingTime from '../components/RemainingTime';
import EndTime from '../components/EndTime';
import Reminder from '../components/Reminder';
import moment from 'moment';


function ParkedCar({ parking, setParking, goToCar, setOpen }) {

  const [reminder, setReminder] = useState(parking.reminder);
  const [alert] = useIonAlert();
  const [toast] = useIonToast();

  function handleLeave() {
    saveJSON('parking', null);
    alert({
      header: "Done",
      message: "Thank you for using Park & Find!",
      buttons: ["OK"],
      onDidDismiss: () => {
        setParking(null);
        setOpen(true);
      }
    });
  }

  function handleReminder(alarm) {
    if (alarm) {
      const diff = parking.duration - alarm;
      const remindTime = moment(parking.datetime).add(diff, 'minutes');
      notifyAt(remindTime, alarm);
      toast({
        message: "Reminder updated.",
        duration: 2000,
        position: "bottom"
      })
    } else {
      cancelAll();
      toast({
        message: "Reminder cancelled.",
        duration: 2000,
        position: "bottom"
      })
    }
  }

  return (
    <>
      <section className="flex items-center ">
        <IonIcon icon={chevronUpOutline}
          className="mr-3 text-2xl text-slate-400" />
        <p className="pt-1 font-medium text-lg grow">
          Parked Car
        </p>
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
          <RemainingTime start={parking.datetime} duration={parking.duration} />
        </SwiperSlide>
        <SwiperSlide>
          <EndTime start={parking.datetime} duration={parking.duration} />
        </SwiperSlide>
      </Swiper>

      <Reminder reminder={reminder} setReminder={setReminder} onChange={handleReminder} />
    </>
  );
}

export default ParkedCar;