import React, { useEffect, useState } from 'react';
import Codemirror from "@uiw/react-codemirror";
import { cpp } from "@codemirror/lang-cpp"
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { db } from '@/config/firebase';
import { doc, collection, setDoc, getDocs, onSnapshot, QuerySnapshot, addDoc } from 'firebase/firestore';

const CppProgram = () => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    try {
      const programsCollection = collection(db, 'algorithms');

      await addDoc(programsCollection, {
        name,
        code,
      });

      setName('');
      setCode('');
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  const [programs, setPrograms] = useState<any>([]);

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const programsCollection = collection(db, 'algorithms');

        
        const programsSnapshot = await getDocs(programsCollection);
        const programsData = programsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPrograms(programsData);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Program Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <textarea
        placeholder="Enter your C++ code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      ></textarea>
      <button type="submit">Save Program</button>
    </form>

    {programs.map((program:any) => (
        <div key={program.id}>
          <h3>{program.name}</h3>
          <Codemirror
            value={program.code}
            theme={vscodeDark}
            extensions={[cpp()]}
            style={{fontSize: 17}}
            editable={false}

            className="p-4"
          />
        </div>
      ))}

      </>
  );
};

export default CppProgram;