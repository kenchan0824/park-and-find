import { endTime, endSession } from '../utils/datetime';
import TimeCard from './TimeCard';


export default function EndTime({ start, duration }) {

  const time = endTime(start, duration);
  const session = endSession(start, duration);

  return (
    <TimeCard>
      <p className="text-base mr-2">
        Ends at
      </p>
      <p className="font-bold text-lg mr-2">
        {time}
      </p>
      <p className="font-bold text-base mr-2">
        {session}
      </p>
    </TimeCard>
  );
}
