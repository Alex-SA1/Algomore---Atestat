import React from "react";
import { useEffect, useState } from "react";
import Comment from "./comment";
import { auth, db } from '@/config/firebase';
import { doc, collection, setDoc, getDocs, onSnapshot, QuerySnapshot, addDoc } from 'firebase/firestore';
import CommentForm from "./commentForm";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavbarAlgorithmPage from "@/components/NavbarAlgorithmPage";
import Link from "next/dist/client/link";
import Head from "next/head";

interface CommentData {
    commentId: string;
    userId: string;
    text: string;
    username: string;
    createdAt: number;
    responses?: ResponseData[];
}
  
interface ResponseData {
    responsedId: string;
    userId: string;
    text: string;
    createdAt: number;
    username: string;
}


const Forum: React.FC = () => {

    const [comments, setComments] = useState<CommentData[]>([]);

    const fetchComments = async () => {
        try {
            const commentsCollection = collection(db, 'comments');
            const commentsSnapshot = await getDocs(commentsCollection);
            const commentsData: CommentData[] = [];

            for(const doc of commentsSnapshot.docs) {
                const commentData = doc.data();
                const responsesCollection = collection(commentsCollection, doc.id, 'responses');
                const responsesSnapshot = await getDocs(responsesCollection);
                
                
                const responsesData: ResponseData[] = responsesSnapshot.docs.map((responseDoc) => ({
                    responsedId: responseDoc.id,
                    ...responseDoc.data(),
                }) as ResponseData
                );
                commentsData.push({
                    commentId: doc.id,
                    ...commentData,
                    responses: responsesData || [],
                    userId: commentData.userId || "",
                    text: commentData.text || "",
                    username: commentData.username || "",
                    createdAt: commentData.createdAt,
                });
            }
            
            commentsData.sort((a, b) => b.createdAt - a.createdAt);

            setComments(commentsData);
            } catch(error:any) {
                console.error('Eroare comentarii', error.message);
            }
        };


    const handleCommentAdded = () => {
        fetchComments();
    }

    useEffect(() => {
        fetchComments();
      }, [handleCommentAdded]); 


    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };




    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<CommentData[]>([]);

    const handleSearch = () => {

        if(searchTerm === "")
        {
            console.log('Introdu cuvinte cheie');
            return;
        }

        const results = comments.filter(comment => 
            comment.text.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
    };


    return (
        <div className="bg-[#020617] h-auto">
          <Head>
            <title>Forum - AlgoMore</title>
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
                          href="/suggestAlgorithm"
                          className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                        >
                          Propune un algoritm
                        </Link>
                        <div className="flex items-center">
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Cuvinte cheie..."
                            />
                            <button
                              onClick={handleSearch}
                              className="px-4 py-2 bg-[#5865F2] text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              Search
                            </button>
                        </div>
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
                    href="/suggestAlgorithm"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                  >
                    Propune un algoritm
                  </Link>
                  <div className="flex items-center">
                            <input
                              type="text"
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Cuvinte cheie..."
                            />
                            <button
                              onClick={handleSearch}
                              className="px-4 py-2 bg-[#5865F2] text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              Search
                            </button>
                  </div>
                </div>
              </div>
            </nav>


            {searchResults.length > 0 ? (
            <ul className="flex items-center justify-center h-auto p-4">
              {searchResults.length > 0 ? (
                searchResults.map(comment => (
                    <Comment key={comment.commentId} comment={comment} />
                ))
              ) : (
                <></>
              )}
            </ul> ) : (
                <></>
            )}


            <div className="flex items-center justify-center h-auto p-4">
               <CommentForm onCommentAdded={handleCommentAdded} />
            </div>
            <div className="flex items-center justify-center h-auto p-4">
                <div>
                {comments.map((comment) => (
                   <Comment key={comment.commentId} comment={comment} />
                 ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Forum;