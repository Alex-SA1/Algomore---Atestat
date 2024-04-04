import Link from 'next/link';
import React, { useState } from 'react';
import { Nav } from 'react-bootstrap';

export default function NavbarAlgorithmPage() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
       setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
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
                          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Forum
                        </Link>
                      </div>
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
        </>
    )
}

