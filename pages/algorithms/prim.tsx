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
import testCases from '@/public/primTestCases.json';
import Head from 'next/head';

const prim = () => {

  {/*Implementari articol */}

  const prim1 =
`bool prim(int x)
{
    if(x<2)
        return false;
    if(x==2)
        return true;
    if(x%2==0)
        return false;

    for(int d=3; d*d<=x; d+=2)
        if(x%d==0)
        return false;

    return true;
}`;

  const prim2 = 
`bool prim(int x)
{
    if(x<=3)
        return x>=2;

    if(x%2==0 || x%3==0)
        return false;

    for(int d=5; d*d<=x; d+=6)
        if(x%d==0 || x%(d+2)==0)
        return false;

    return true;
}`;


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
          idAlgorithm: 'prim',
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
        })).filter((data) => data.idAlgorithm === 'prim');

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
            <title>Verificare primalitate - AlgoMore</title>
            <link rel="icon" href="/logo.png" />
      </Head>
      <NavbarAlgorithmPage />
      <div className="container mx-auto p-2 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl lg:text-6xl text-gray-300">Verificarea primalității unui număr</h1>
          <p className="text-gray-500 mb-4">Autor: Samoilă Alexandru, Colegiul Național de Informatică Piatra-Neamț</p>
          <div className="prose prose-lg">
            <p className="text-gray-300 font-serif text-lg md:text-md lg:text-xl xl:text-2xl leading-7">
            &middot; Un număr este <b> prim </b> dacă are doar 2 divizori, anume pe 1 și pe el însuși.
              <br></br>
              &rarr; 1 nu este prim, deoarece singurul său divizor coincide cu el <br></br>
              &rarr; 2 este prim, are divizorii &#123;1, 2&#125; <br></br>
              &rarr; 17 este prim, are divizorii &#123;1, 17&#125; <br></br>
              &rarr; 49 nu este prim, are divizorii &#123;1, 7, 49&#125; <br></br>
              &rarr; 12 nu este prim, are divizorii &#123;1, 2, 3, 4, 6, 12&#125;
              <br></br>
              Pentru a verifica dacă un număr este prim putem utiliza mai multe implementări, de diferite complexități timp. <br></br>
              În acest articol voi prezenta două implementări, una clasică și una mai eficientă.

              <br></br><br></br>

              &middot; Metoda clasică implică, în primă instanță, verificarea parității numărului, iar în cazul în care este impar, căutarea de divizori până la
              radical din valoarea numărului, deoarece dacă nu se găsesc divizori pentru număr până la radical din el, nu se vor mai găsi după radical.
            </p>
           
            <Codemirror
              value={prim1}
              theme={vscodeDark}
              extensions={[cpp()]}
              style={{fontSize: 17}}
              editable={false}
            />
            <br></br>
            <p className="text-gray-300 font-serif text-lg md:text-md lg:text-xl xl:text-2xl leading-7">
            &middot; A doua metodă este mai eficientă și se bazează pe observația că orice număr poate fi scris sub forma 6k+p, cu p ∈ &#123; -1, 0, 1, 2, 3, 4 &#125;
              <br></br>
              &rarr; dacă p = &#123; 0, 2, 4 &#125; numerele de forma 6k, 6k+2, 6k+4 nu sunt prime
              <br></br>
              &rarr; dacă p = 3 numerele de forma 6k+3 nu sunt prime
              <br></br>
              &rarr; dacă p = &#123; -1, 1 &#125; avem posibilitatea să găsim un număr prim
              <br></br>
              rămâne să căutăm toate perechile de forma 6k±1 cum ar fi &#40;5, 7&#41;, &#40;11, 13&#41; ș.a.m.d.
            </p>
            <Codemirror
              value={prim2}
              theme={vscodeDark}
              extensions={[cpp()]}
              style={{fontSize: 17}}
              editable={false}
            />

            <br></br>


         
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

export default prim;