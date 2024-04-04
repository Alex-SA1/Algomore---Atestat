import { useAuth } from '@/context/AuthContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { ArrowDownRightIcon, ArrowLongRightIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Footer from '@/components/Footer';
import Head from 'next/head';

const Menu = () => {

    const { user, logout } = useAuth()
    const router = useRouter()

    return (
      
    <div className="bg-[#020617]">
      <Head>
        <title>Pagina principală - AlgoMore</title>
        <link rel="icon" href="/logo.png" />
      </Head>

        <div className="bg-[#0f172a] py-16 text-gray-300">
          <div className="container mx-auto">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-4xl font-bold mb-4 p-2 text-center">Bine ai venit în platformă!</h2>
              <h2 className="text-2xl mb-4 p-2 text-center">Ce poți face?</h2>
              <p className="text-lg text-center mb-8">Învață algoritmi noi, postează implementări alternative, propune algoritmi care nu se regăsesc pe site, 
                                                      <br />începe sau ia parte la diverse discuții pe forum</p>
              <Link href="/" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full shadow-lg">Home</Link>
            </div>
          </div>
        </div>

      
        <div className="bg-[#020617] container mx-auto p-4 relative h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mt-10">
            <div className="bg-[#0f172a] p-10 rounded-lg shadow-lg text-gray-300 text-center">
              <Link href="/algorithmsmenu" className="text-2xl font-bold">Algoritmi</Link>
            </div>
            <div className="bg-[#0f172a] p-10 rounded-lg shadow-lg text-gray-300 text-center">
              <Link href="/suggestAlgorithm" className="text-2xl font-bold">Propune un algoritm</Link>
            </div>
            <div className="bg-[#0f172a] p-10 rounded-lg shadow-lg text-gray-300 text-center">
              <Link href="/forum" className="text-2xl font-bold">Forum</Link>
            </div>
            <div className="bg-[#0f172a] p-10 rounded-lg shadow-lg text-gray-300 text-center">
              <Link onClick={() => {
                                        logout()
                                        router.push('/')
                                       } } 
                        href="/" className="text-2xl font-bold">Log out</Link>
            </div>
          </div>
        </div>

      <Footer />

    </div>
    )
}

export default Menu;