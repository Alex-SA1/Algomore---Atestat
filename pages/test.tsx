import React, { useEffect, useState } from 'react';
import Codemirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp"
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { db } from '@/config/firebase';
import { doc, collection, setDoc, getDocs, onSnapshot, QuerySnapshot, addDoc, DocumentReference, updateDoc, DocumentData } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext'
import Footer from '@/components/Footer';
import { ArrowUturnLeftIcon } from '@heroicons/react/24/outline';
import NavbarAlgorithmPage from '@/components/NavbarAlgorithmPage';
import testCases from '../public/testCases.json';


const test = () => {

  {/*Implementari articol */}

  const oglindit =
`#include <iostream>`;
  

  {/*Implementarile userilor - trimitere */}

  const { user } = useAuth();

  const [description, setDescription] = useState('');
  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [idAlgorithm, setIdAlgorithm] = useState('');

  const [testResults, setTestResults] = useState<Array<{ input: string; output: string; passed: boolean }>>([]);


  const handleSubmit = async(e:any) => {
    e.preventDefault();

    if (description === '' || code === '') {
      console.log('Completează câmpurile corespunzătoare descrierii și codului C++');
      return;
    }


    try {
      const programsCollection = collection(db, 'algorithms');


      const allTestsPassed = await runTests(code);

      if (allTestsPassed) {
        await addDoc(programsCollection, {
          username: user.displayName,
          description,
          code,
          idAlgorithm: 'testAlgorithm',
        });

        console.log('Solution added to the database.');
      } else {
        console.log('Solution did not pass all tests. It will not be added to the database.');
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
          console.log(`Test failed for input: ${testCase.input}`);
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
        })).filter((data) => data.idAlgorithm === 'testAlgorithm');

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
      <NavbarAlgorithmPage />
      <div className="container mx-auto p-2 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg">
          

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
                    placeholder="Copiază aici programul C++"
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

export default test;