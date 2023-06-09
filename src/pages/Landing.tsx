import { IonIcon } from '@ionic/react';
import { arrowForward } from 'ionicons/icons';
import logo from '../assets/logo.png';
import './Landing.css';

export default function Landing({ setOpen }) {

  function handleClose() {
    setOpen(false);
  }

  return (
    <div className="absolute top-0 left-0 h-full w-full z-20 bg ">
      <div className="bg-black/[0.4] h-full">

        <header className="absolute left-6 top-8 flex flex-row items-end" >
          <img src={logo} className="h-16 mr-4" />
          <h1 className="text-white text-2xl font-bold">
            Park & Find
          </h1>
        </header>

        <section className="absolute left-6 top-52 mr-6 ">
          <h2 className="text-white text-2xl font-bold">
            Forgot when and where you parked?
          </h2>
          <h3 className="mt-4 text-white text-lg">
            Try our app now
          </h3>

          <button onClick={handleClose}
            className="mt-32 absolute right-0 
            border-solid border-2 border-white rounded-xl
            py-1 px-4 text-white text-lg font-bold
            flex flex-row items-center"
          >
            Start
            <IonIcon icon={arrowForward} className="ml-2 text-2xl" />
          </button>
        </section>

      </div>
    </div>
  );
}
