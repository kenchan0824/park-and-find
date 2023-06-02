import { useEffect } from "react";
import { requestPermissions } from "../utils/notification";

import { IonIcon, IonSelect, IonSelectOption, useIonToast } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";

export default function Reminder({ reminder, setReminder, onChange=undefined }) {
  const [alert] = useIonToast();

  async function handleChange(alarm) {
    setReminder(alarm);
    if (alarm > 0) {
      const granted = await requestPermissions();
      if (!granted) {
        alert({
          message: "Please go to Settings > Apps & notifications to enbale notifications",
          duration: 3000,
          position: "bottom"
        })
        console.log("about set alarm 0")
        setReminder(0);
        return;
      }
    }
    console.log("after alarm > 0")
    onChange && onChange(alarm);
  }

  return (
    <section className="h-11  flex items-center ">
      <IonIcon icon={notificationsOutline} className="mr-3 text-2xl " />
      <IonSelect interface="action-sheet" value={reminder} className="min-h-0"
        onIonChange={({ target }) => handleChange(target.value)}
      >
        <IonSelectOption value={0}>Disabled</IonSelectOption>
        <IonSelectOption value={5}>5 mins before</IonSelectOption>
        <IonSelectOption value={10}>10 mins before</IonSelectOption>
        <IonSelectOption value={15}>15 mins before</IonSelectOption>
        <IonSelectOption value={30}>30 mins before</IonSelectOption>
      </IonSelect>
    </section>
  );

}