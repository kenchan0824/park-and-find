import { useEffect, useState } from 'react';
import { endTime, endSession } from '../utils/datetime';

export default function EndTime({ start, duration }) {

  const time = endTime(start, duration);
  const session = endSession(start, duration);

  return (
    <div className="flex flex-row items-baseline w-full">
      <p className="text-base mr-2">
        Ends at
      </p>
      <p className="font-bold text-lg mr-2">
        {time}
      </p>
      <p className="font-bold text-base mr-2">
        {session}
      </p>
    </div>
  );
}
