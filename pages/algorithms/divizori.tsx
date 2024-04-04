import React, { useEffect, useState } from 'react';
import Codemirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { db } from '@/config/firebase';
import { doc, collection, setDoc, getDocs, onSnapshot, QuerySnapshot, addDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext'
import Footer from '@/components/Footer';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import NavbarAlgorithmPage from '@/components/NavbarAlgorithmPage';
import testCases from '@/public/numarareDivizoriTestCases.json';
import Head from 'next/head';

const divizori = () => {

  {/*Implementari articol */}

  const divBasic =
`int numarDivizori(int n)
{
    int cnt=1; //primul divizor al oricărui număr este 1
    for(int d=2; d<=n/2; d++)
        if(n%d==0)
        cnt++;
    
    cnt++;  //numărul în sine este divizor
    return cnt;
}`;

const divEficient =
`int numarDivizori(int n)
{
    int cnt=0;
    for(int d=1; d*d<=n; d++)
        if(n%d==0)
    {
        cnt++;

        if(d != n/d)
            cnt++;
    }

    return cnt;
}`

  {/*Implementarile userilor - trimitere */}

  const { user } = useAuth();

  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [idAlgorithm, setIdAlgorithm] = useState('');

  const handleSubmit = async(e:any) => {
    e.preventDefault();

    if (description === '' || code === '') {
      console.log('Completează câmpurile corespunzătoare descrierii și codului C++');
      alert('Completează câmpurile corespunzătoare descrierii și codului C++');
      return;
    }

    try {
      const programsCollection = collection(db, 'algorithms');

      const allTestsPassed = await runTests(code);

      if (allTestsPassed) {
        await addDoc(programsCollection, {
          username:user.displayName,
          description,
          code,
          idAlgorithm: 'divizori',
        });
  
        console.log('Soluția a trecut toate testele!');
        alert('Soluția a trecut toate testele!')
      } else {
        console.log('Soluția nu a trecut toate testele, prin urmare nu va fi adaugată pe pagină');
        alert('Soluția nu a trecut toate testele, prin urmare nu va fi adaugată pe pagină!');
      }

      setDescription('');
      setCode('');
      setUsername('');
      setIdAlgorithm('');
    } catch(error) {
      console.log('Error saving program: ', error);
    }
  };

  const runTest = async (cppCode: string, input: string, expectedOutput: string): Promise<boolean> => {
    try {
      const response = await fetch('/api/runCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cppCode, input }),
      });
  
      const result = await response.json();
  
      if (result && result.result) {
        return result.result.trim() === expectedOutput.trim();
      } else {
        console.error('Received unexpected response:', result);
        return false;
      }
    } catch (error) {
      console.error('Error running test: ', error);
      return false;
    }
  };

  const runTests = async (cppCode: string) => {
    try {
      for (const testCase of testCases) {
        const result = await runTest(cppCode, testCase.input, testCase.output);

        if (!result) {
          console.log(`Soluția nu a trecut testul cu următoarele date de intare: ${testCase.input}`);
          alert(`Soluția nu a trecut testul cu următoarele date de intare: ${testCase.input}`);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error running tests: ', error);
      return false;
    }
  };

  {/*Implementarile userilor - afisare */}

  const [programs, setPrograms] = useState<any>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsCollection = collection(db, 'algorithms');

        const programsSnapshot = await getDocs(programsCollection);
        const programsData = programsSnapshot.docs.map((doc: any) => ({
          id: doc.id,
          ...doc.data(),
        })).filter((data) => data.idAlgorithm === 'divizori');

        setPrograms(programsData);
      } catch(error) {
        console.log('Error fetching programs')
      }
    };

    fetchPrograms();
  }, []);

  {/*functionalitatea cardului afisaj implementari useri */}
  
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
            <title>Divizori - AlgoMore</title>
            <link rel="icon" href="/logo.png" />
      </Head>
      <NavbarAlgorithmPage />
      <div className="container mx-auto p-2 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-gray-300">Prelucrarea divizorilor unui număr</h1>
          <p className="text-gray-500 mb-4">Autor: Samoilă Alexandru, Colegiul Național de Informatică Piatra-Neamț</p>
          <div className="prose prose-lg">
            <p className="text-gray-300 font-serif text-lg md:text-md lg:text-xl xl:text-2xl leading-7">
                <b>Metoda de bază</b> <br></br>
                &rarr; Presupune parcurgerea tuturor numerelor de la 2 până la jumătatea numărului &#40; deoarece după jumătatea numărului nu se mai
                găsesc divizori &#41; și pentru fiecare număr divizibil cu n &#40; divizor &#41; efectuăm operația dorită,<b> fie îl afișăm, fie îl numărăm,
                fie îl adăugăm la o sumă etc</b>.
            </p>
           
            <Codemirror
              value={divBasic}
              theme={vscodeDark}
              extensions={[cpp()]}
              style={{fontSize: 17}}
              editable={false}
            />
            <br></br>

            
            <br></br>
            <p className="text-gray-300 font-serif text-lg md:text-md lg:text-xl xl:text-2xl leading-7">
               <b>Metoda eficientă</b> <br></br>
               &rarr; Presupune parcurgearea tuturor numerelor de la 1, iar de data aceasta doar până la &#8730;n &#40; deoarece pentru fiecare divizor al numărului
               găsit vom afla divizorul complementar raportat la n, anume n/d. &#41;, pentru fiecare număr divizibil cu n &#40; divizor &#41; efectuăm operația dorită cu el, iar
               după calculăm complementarul său în raport cu n și verificăm să fie diferit de divizor &#40; să evităm cazul unui pătrat perfect, cum ar fi 4, în care 2 ar fi luat
               și ca divizor și ca divizor complementar &#41;, și pentru acesta efectuăm operația dorită. <br></br>
               &middot; ex: n = 12 &rarr;
               divizorii până la &#8730;12  și divizorul complementar corespunzător fiecăruia &#61; &#123; 1 - 12, 2 - 6, 3 - 4 &#125;
               <br></br>
               &middot; ex: n = 16 &rarr;
               divizorii până la &#8730;16  și divizorul complementar corespunzător fiecăruia &#61; &#123; 1 - 16, 2 - 8, 4 - 4 &#125; și aici intervine condiția
               de la linia de cod 8 care împiedică algoritmul să ia în considerare același divizor de două ori
            </p>

            <Codemirror
              value={divEficient}
              theme={vscodeDark}
              extensions={[cpp()]}
              style={{fontSize: 17}}
              editable={false}
            />



         
          <hr className="w-48 h-1 mx-auto my-4 border-0 rounded md:my-10 bg-gray-700"></hr>

          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
             <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-gray-300">Implementările comunității</h1>
          </div>

          {/*Implementarile userilor afisare */}
          
          {programs.map((program:any) => (
            
            <div key={program.id} className="mb-4 w-full rounded-lg shadow bg-gray-900 border-gray-700">

            <div className="p-4 rounded-lg md:p-8 bg-gray-900" role="tabpanel">
                <h2 className="mb-3 text-2xl font-extrabold tracking-tight text-white">{program.description}</h2>
                <p className="mb-3 text-gray-400">{program.username}</p>
                <button
                  className="inline-flex items-center font-medium text-blue-500 hover:text-blue-700"
                  onClick={() => toggleShowProgram(program.id)}
                >
                  Afișează implementarea
                  <svg className="w-6 h-6 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                </button>
            </div>
          
            {selectedProgramIds?.includes(program.id) && (
              <div className="p-4 md:p-2">

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

          {/*Formular implementari useri */}

          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16">
             <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-gray-300">Ai o idee diferită de implementare ?</h1>
          </div>

          <div className="flex flex-col items-center justify-center">
            
            <div className="max-w-4xl w-full px-6 py-8 rounded-lg shadow-md">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    className="w-full px-3 py-2  bg-[#374151] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    type="text"
                    placeholder="Scrie o scurtă descriere a implementării"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-white text-sm font-bold mb-2" htmlFor="message">
                    Algoritm
                  </label>
                  <textarea
                    className="w-full px-3 py-2 bg-[#374151] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    placeholder="Se postează programul complet în C++ (chiar dacă soluția ta este construită într-un subprogram, se postează programul complet, cu citirea datelor de la tastatură, apelarea subprogramelor, afișarea datelor etc.)"
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

          </div>
        </div>
      </div>

       <Footer />
    </div>
  );
}

export default divizori;