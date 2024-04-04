import React, { useEffect, useState } from 'react';
import Codemirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { db } from '@/config/firebase';
import { useAuth } from '@/context/AuthContext';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Head from 'next/head';


const SuggestAlgorithm = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
       setIsMenuOpen(!isMenuOpen);
    };

    {/* trimitere algoritm */}

    const { user } = useAuth();

    const [username, setUsername] = useState('');
    const [institution, setInstitution] = useState('');
    const [title, setTitle] = useState('');
    const [explanation, setExplanation] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = async(e:any) => {
      e.preventDefault();

      if (title === '' || explanation === '' || code === '') {
        console.log('Completează câmpurile corespunzătoare titlului, explicației și codului C++');
        alert('Completează câmpurile corespunzătoare titlului, explicației și codului C++');
        return;
      }

      try {
        const programsCollection = collection(db, 'suggestedAlgorithms');

        await addDoc(programsCollection, {
          username:user.displayName,
          institution,
          title,
          explanation,
          code,
        });
        
        setUsername('');
        setInstitution('');
        setTitle('');
        setExplanation('');
        setCode('');
      } catch(error) {
        console.log('Error saving form: ', error);
      }
    };

    {/* afisare algoritmi propusi */}

    const [programs, setPrograms] = useState<any>([]);

    useEffect(() => {
      const fetchPrograms = async () => {
        try {
          const programsCollection = collection(db, 'suggestedAlgorithms');
  
          const programsSnapshot = await getDocs(programsCollection);
          const programsData = programsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
  
          setPrograms(programsData);
        } catch(error) {
          console.log('Error fetching programs')
        }
      };
  
      fetchPrograms();
    }, []);


    {/* afisaj card algoritm */}

    const [selectedProgramIds, setSelectedProgramIds] = useState<string[]>([]);

    const toggleShowProgram = (programId: string) => {
      setSelectedProgramIds((prevSelectedIds:any) => {
        if(prevSelectedIds.includes(programId)) {
          return prevSelectedIds.filter((id:any) => id !== programId);
        } else {
          return [...prevSelectedIds, programId];
        }
      })
    }


    return (
        <div className="bg-[#020617] min-h-screen">
          <Head>
            <title>Propune un algoritm - AlgoMore</title>
            <link rel="icon" href="/logo.png" />
          </Head>
            
            <nav className="bg-[#0f172a] p-2 rounded-lg">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img className="h-20 w-20 rounded-full p-1" src="/logo.png" alt="Logo" />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        <Link
                          href="/menu"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                        >
                          Meniu
                        </Link>
                        <Link
                          href="/algorithmsmenu"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                        >
                          Algoritmi
                        </Link>
                        <Link
                          href="/forum"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-md font-medium"
                        >
                          Forum
                        </Link>
                      </div>
                    </div>

                    <div className="hidden md:block p-5">
                    </div>

                  </div>

                  <div className="-mr-2 flex md:hidden">
                    <button
                      onClick={toggleMenu}
                      type="button"
                      className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      aria-controls="mobile-menu"
                      aria-expanded={isMenuOpen}
                    >
                      <span className="sr-only">Open main menu</span>
                      <svg
                        className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                      <svg
                        className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
        
              <div
                className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}
                id="mobile-menu"
              >
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Link
                    href="/menu"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Meniu
                  </Link>
                  <Link
                    href="/algorithmsmenu"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Algoritmi
                  </Link>
                  <Link
                    href="/forum"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Forum
                  </Link>
                </div>
              </div>
            </nav>

            <div className="container max-w-4xl mx-auto p-2 py-8">

            <div className="flex flex-col items-center justify-center">
            
                <div className="max-w-4xl w-full px-6 py-8 rounded-lg shadow-md">
                  <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                      <textarea
                        className="w-full px-3 py-2  bg-[#374151] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="Scrie titlul articolului"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <textarea
                        className="w-full px-3 py-2  bg-[#374151] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="Scrie explicația algoritmului pe care dorești să îl propui"
                        value={explanation}
                        rows={4}
                        onChange={(e) => setExplanation(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <input
                        className="w-full px-3 py-2  bg-[#374151] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        type="text"
                        placeholder="Instituția de la care provii (liceu, facultate etc.) (opțional)"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
                        Algoritm
                      </label>
                      <textarea
                        className="w-full px-3 py-2 bg-[#374151] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                        placeholder="Copiază aici implementarea C++ a algoritmului descris"
                        value={code}
                        rows={4}
                        onChange={(e) => setCode(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-md p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="submit"
                    >
                      Trimite
                    </button>
                  </form>
                </div>
          </div>

          <hr className="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700"></hr>

          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
             <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-gray-300">Algoritmi propuși pentru a fi postați pe platformă</h1>
             <h1 className="mb-4 pt-2 tracking-tight leading-none md:text-xl lg:text-2xl text-gray-300">Până vor fi integrați în secțiunea <Link href="/algorithmsmenu">Algoritmi</Link>, vor apărea aici</h1>
          </div>

          {programs.map((program:any) => (
            
            <div key={program.id} className="mb-4 w-full rounded-lg shadow bg-gray-900 border-gray-700">

            <div className="p-4 rounded-lg md:p-8 bg-gray-900" role="tabpanel">
                <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">{program.username}</h2>
                <p className="mb-3 text-gray-400">{program.institution}</p>
                <button
                  className="inline-flex items-center font-medium text-blue-500 hover:text-blue-700"
                  onClick={() => toggleShowProgram(program.id)}
                >
                  Afișează
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </button>
            </div>
          
            {selectedProgramIds?.includes(program.id) && (
                
               <div className="p-4 md:p-2">
               
               <h2 className="mb-3 font-bold text-gray-400 pb-2">{program.title}</h2>
               <p className="mb-3 text-gray-400 pb-5">{program.explanation}</p>
                     
                 <Codemirror
                 value={program.code}
                 theme={vscodeDark}
                 extensions={[cpp()]}
                 editable={false}
                 style={{fontSize: 17}}
                 /> 
   
               </div>
            )}

            </div>
            
          ))}

        </div>
            
        <Footer />    
        </div>
    )
}

export default SuggestAlgorithm;