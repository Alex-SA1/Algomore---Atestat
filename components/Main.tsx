import Link from "next/link";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { UserGroupIcon } from "@heroicons/react/24/outline";

export default function Main() {

    return (
      <section className="text-gray-600 body-font">
        <div className="max-w-5xl pt-52 pb-24 mx-auto">
          <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
            Learn. Code. Repeat.
          </h1>
          <h2 className="text-2xl font-5 font-semibold lh-6 ld-04 pt-2 pb-11 text-gray-450 text-center">
            AlgoMore reprezintă o platformă dedicată celor pasionați de algoritmică
            <br />
          </h2>
          <div className="ml-6 text-center">
            
          <div className="flex text-lg inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline">
              <Link href="/signup" className="justify-center text-decoration-line: none">
                  Creează-ți un cont
              </Link>  
          </div>
            
            
          <div className="flex text-lg inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline">
              <Link href="/login" className="justify-center text-decoration-line: none">
                  Intră în cont
              </Link> 
          </div>
            
          </div>
        </div>
        <div className="container flex flex-col items-center justify-center mx-auto">
          <img
            className="object-cover object-center w-3/4 mb-10 border shadow-md g327 rounded
            transition-all duration-300 rounded-lg blur-sm hover:blur-none"
            alt="Placeholder Image"
            src="code.png"
          ></img>
        </div>
        <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
          Ce vei găsi pe platformă?
        </h2>
        <br></br>
        <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
          
        </p>
        <div className="pt-12 pb-24 max-w-4xl mx-auto fsac4 md:px-1 px-3">
          <div className="ktq4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
               <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
          </svg>

            <h3 className="pt-3 font-semibold text-lg text-white">
              Algoritmi
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Zeci de implementări C++ ale algoritmilor utilizați atât la nivel de liceu / facultate, cât și la nivel de concursuri de programare.
              <br></br>
              De asemenea, studierea algoritmilor prezentați este utilă în pregătirea pentru interviurile de angajare.

            </p>
          </div>
          <div className="ktq4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
          </svg>

            <h3 className="pt-3 font-semibold text-lg text-white">
              Diversitatea informației
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Utilizatorii platformei pot posta implementări și explicații alternative pentru algoritmii existenți pe site sau pot propune
              algoritmi noi pentru a fi publicați pe platformă.
              <br />
            </p>
          </div>
          <div className="ktq4">
            <InformationCircleIcon className="w-6 h-6" />
            <h3 className="pt-3 font-semibold text-lg text-white">
              Validarea / corectitudinea informațiilor de pe platformă
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Implementările alternative propuse de utilizatori vor apărea pe platformă doar dacă trec toate testele pe care va fi rulată în mod automat
              soluția după trimiterea ei.
              <br />
              Algoritmii propuși pentru a fi postați pe platformă vor fi integrați doar după ce echipa de administrare a platformei validează corectitudinea
              explicațiilor și a implementării C++ corespunzătoare.
            </p>
          </div>
          <div className="ktq4">
            <UserGroupIcon className="w-6 h-6" />
            <h3 className="pt-3 font-semibold text-lg text-white">
              Comunitate
            </h3>
            <p className="pt-2 value-text text-md text-gray-200 fkrr1">
              Platforma conține un forum unde utilizatorii pot pune întrebări, pot clarifiica diferite noțiuni de natură algoritmică sau
              pot oferi sfaturi pentru anumite implementări, probleme, concursuri etc.
              <br />
              De asemenea, în bara de căutare se poate scrie o întrebare sau câteva cuvinte-cheie, iar dacă în forum se găsește o discuție pe baza
              informațiilor căutate, ea va fi afișată astfel încât utilizatorul să nu fie nevoit să dea scroll prin tot forumul.
            </p>
          </div>
        </div>
        
        <section className="relative pb-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
            <div className="py-24 md:py-36">
              <h1 className="mb-5 text-6xl font-bold text-white">
                Ce mai aștepți?
              </h1>
              <h1 className="mb-9 text-2xl font-semibold text-gray-200">
                Creează-ți un cont fiindcă e gratuit și hai în comunitatea Algomore!
              </h1>
              <div
                className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border-none rounded-lg bg-black"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="red" className="w-6 h-6">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>

              </div>
            </div>
          </div>
        </section>



          <div className="py-24 sm:py-32 text-gray-200">
           <div className="mx-auto max-w-7xl px-6 lg:px-8">
             <div className="mx-auto max-w-2xl lg:text-center">
               <h2 className="text-base font-semibold leading-7">Colegiul Național de Informatică Piatra-Neamț</h2>
               <p className="mt-2 text-3xl font-bold tracking-tightsm:text-4xl">Lucrare pentru atestarea competențelor profesionale</p>
               <p className="mt-6 text-lg leading-8"></p>
             </div>
             <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
               <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
                 <div className="relative pl-16">
                   <dt className="text-lg font-semibold leading-7">
                     Elev
                   </dt>
                   <dd className="mt-2 text-lg leading-7">Samoilă Alexandru</dd>
                 </div>
                 <div className="relative pl-16">
                   <dt className="text-lg font-semibold leading-7">
                     Clasa
                   </dt>
                   <dd className="mt-2 text-lg leading-7">XII - F</dd>
                 </div>
                 <div className="relative pl-16">
                   <dt className="text-lg font-semibold leading-7">
                     Profesor coordonator
                   </dt>
                   <dd className="mt-2 text-lg leading-7">Andone Elena</dd>
                 </div>
                 <div className="relative pl-16">
                   <dt className="text-lg font-semibold leading-7">
                     An școlar
                   </dt>
                   <dd className="mt-2 text-lg leading-7">2023 - 2024</dd>
                 </div>
               </dl>
             </div>
           </div>
         </div>
      </section>
    );
  }