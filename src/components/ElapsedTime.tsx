import { useEffect, useState } from 'react';
import { elapsedHours, elapsedMinutes } from '../utils/datetime';
import moment from 'moment';

function ElapsedTime(start) {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    setInterval(() => setTimer(moment().valueOf()), 60000);
  }, []);

  const hours = elapsedHours(start);
  const minutes = elapsedMinutes(start);

  return (
    <div className="flex flex-row items-baseline">
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
        {minutes > 1 ? "mins elapsed" : "min elapsed"}
      </p>
    </div>
  );
}

export default ElapsedTime;