import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { FaHome, FaLock, FaPaperPlane, FaRegGrinBeam, FaRegIdBadge, FaUser } from 'react-icons/fa';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Head from "next/head";

const Signup = () => {

  const router = useRouter();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, signup } = useAuth()
  
  const [data, setData] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
    displayName: '',
  })

  const handleSignup = async (e: any) => {
    e.preventDefault()

    if(data.password !== data.passwordConfirm) {
      return setError(true);
    }

    try{
      setError(false);  
      setLoading(true);
      await signup(data.email, data.password, data.displayName)
      router.push('/login')
    } catch {
      setError(true)
    }

    setLoading(false);
  }

  return (
    
    
  <div className="block bg-black h-screen items-center justify-center p-4 md:flex">
    <Head>
        <title>Creare cont - AlgoMore</title>
        <link rel="icon" href="/logo.png" />
    </Head>

    <div className="bg-cover
    items-center max-w-screen-sm flex flex-col
    overflow-hidden rounded-lg shadow-lg text-gray-600
    w-full
    ">


      <div className="bg-[#101111] flex flex-col items-center p-4 space-y-8 w-full md:w-1/2">
        <div className="flex flex-col items-center">
          <h1 className="font-medium text-white text-2xl">Creează-ți un cont</h1>
        </div>

        {error && (
        <div className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md" role="alert">
        <div className="flex">
          <div className="py-1"><svg className="fill-current h-6 w-6 text-teal-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
          <div>
            <p className="font-bold">Parolele sunt diferite</p>
            <p className="text-sm">Asigură-te că ai scris parola la fel în ambele chenare</p>
          </div>
        </div>
      </div>
      )
      }
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSignup}>
          <div className="relative">
            <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400"><FaUser /></span>
            <input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" 
            type="email"
            placeholder="Enter email"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                email: e.target.value,
              })
            }
            value={data.email} />

          </div>

          <div className="relative">
            <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400"><FaLock /></span>
            <input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" 
            type="password"
            placeholder="Password"
            minLength={6}
            required
            onChange={(e: any) =>
              setData({
                ...data,
                password: e.target.value,
              })
            }
            value={data.password} />

          </div>

          <div className="relative">
            <span className="absolute flex inset-y-0 items-center pl-4 text-gray-400"><FaLock /></span>
            <input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" 
            type="password"
            placeholder="Confirm Password"
            minLength={6}
            required
            onChange={(e: any) =>
              setData({
                ...data,
                passwordConfirm: e.target.value,
              })
            }
            value={data.passwordConfirm} />

          </div>

          <div className="relative">
            <span className="absolute flex inset-y-0 items-center pl-3 text-gray-400"><FaRegIdBadge className="text-xl" /></span>
            <input className="border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-green-300" 
            type="text"
            placeholder="Enter a nickname"
            required
            onChange={(e: any) =>
              setData({
                ...data,
                displayName: e.target.value,
              })
            }
            value={data.displayName} />

          </div>

          

          <button disabled={loading} className="bg-gradient-to-r from-blue-500 to-blue-800 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition" type="submit">
            <FaPaperPlane className="mr-2" />
            Submit
          </button>
        </form>

        <div className="flex flex-col items-center">
          <p className="italic text-gray-450">Ai deja un cont?</p>
          <Link href="/login">
            <p className="ml-1 text-blue-400 hover:underline">Intră în cont de aici</p>
          </Link>

          <Link href="/" className="ml-1 text-blue-400 text-2xl mt-4">
          <FaHome />
          </Link>
        </div>
      </div>

    </div>
  </div>

  )
}

export default Signup