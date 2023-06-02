import { IonIcon } from '@ionic/react';
import { chevronBack, timeOutline } from 'ionicons/icons';


export default function TimeCard({ children }) {

  return (
    <div className="relative flex items-center">
      <IonIcon icon={timeOutline} className="mr-3 text-2xl " />
        <div className="flex flex-row items-baseline w-full">
          {children}
        </div>
      <IonIcon icon={chevronBack} className="absolute top-3 right-[-4px] text-xl" />
    </div>
  );
}