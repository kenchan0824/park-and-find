import { useEffect, useState } from 'react';
import { elapsedHours, elapsedMinutes } from '../utils/datetime';

export default function ElapsedTime({ start }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setInterval(() => setCount(current => current+1), 15000);
  }, []);

  const hours = elapsedHours(start);
  const minutes = elapsedMinutes(start);

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
        {minutes > 1 ? "mins elapsed" : "min elapsed"}
      </p>
    </div>
  );
}
