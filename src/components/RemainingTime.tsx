import { useEffect, useState } from 'react';
import { remainingHours, remainingMinutes } from '../utils/datetime';
import moment from 'moment';

export default function RemainingTime({ start, duration }) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setInterval(() => setTimer(moment().valueOf()), 60000);
  }, []);

  const hours = remainingHours(start, duration);
  const minutes = remainingMinutes(start, duration);

  if (hours >= 0 || minutes >= 0) {
    return (
      <div className="flex flex-row items-baseline w-full">
        <p>Expired</p>
        <p className="font-bold text-lg invisible">_</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row items-baseline w-full">
      {
        hours > 0 &&
        <>
          <p className="font-bold text-lg mr-2">
            {hours}
          </p>
          <p className="text-base mr-2">
            {hours > 1 ? "hrs" : "hr"}
          </p>
        </>
      }
      <p className="font-bold text-lg mr-2">
        {minutes}
      </p>
      <p className="text-base mr-2">
        {minutes > 1 ? "mins remaining" : "min remaining"}
      </p>
    </div>
  );
}
