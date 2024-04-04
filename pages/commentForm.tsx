import { useState } from "react";
import { useAuth } from '@/context/AuthContext'
import { auth } from "@/config/firebase";
import { db } from '@/config/firebase';
import { doc, collection, setDoc, getDocs, onSnapshot, QuerySnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { formatDistanceToNow } from 'date-fns';


interface CommentFormProps {
    parentId?: string;
    onCommentAdded: () => void;
}


const CommentForm: React.FC<CommentFormProps> =({ parentId, onCommentAdded }) => {
    const [text, setText] = useState('');
    const { user } = useAuth();

    const handleAddComment = async (e: React.FormEvent) => {
    try{
      
        e.preventDefault();

        const createdAt = Date.now();
         
        if (text.trim() === '') {
            console.log('Scrie ceva...');
            return;
          }

        const user = auth.currentUser;

        if(!user) {
            console.log('Eroare nu exista user');
            return;
        }

        const userId = user.uid;

        if(!userId) {
            console.log('User ID nedefinit');
            return;
        }

        if (parentId) {
            const responseRef = await addDoc(collection(db, "comments", parentId, "responses"), {
              userId,
              text,
              createdAt,
            });
          } else {
            const commentRef = await addDoc(collection(db, "comments"), {
              username: user.displayName,
              userId,
              text,
              createdAt,
            });
          }

        onCommentAdded();
        setText('');
    } catch(error: any) {
        console.error('Eroare la adaugarea comentariului', error.message);
    }
    };


    return (
        <div className="bg-slate-900 shadow-lg shadow-slate-900 rounded-lg p-1">
          <form className="w-full max-w-xl rounded-lg px-4 pt-2">
              <div className="flex flex-wrap -mx-3 mb-6">
                 <h2 className="px-4 pt-3 pb-2 text-gray-300 text-lg"><b>Adaugă o întrebare, o curiozitate sau o informație relevantă</b></h2>
                 <div className="w-full md:w-full px-3 mb-2 mt-2">
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className="p-2 bg-[#374151] focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold resize-none h-[120px] rounded-md w-full text-white" 
                              name="body" placeholder='Scrie...' required></textarea>
                 </div>
                 <div className="w-full md:w-full flex items-start md:w-full px-3">
                    <div className="flex items-start w-1/2 text-gray-700 px-2 mr-auto">
                       
                    </div>
                    <div className="-mr-1">
                    <button onClick={handleAddComment} className="bg-[#5865F2] shadow-md shadow-[#5865f28a] w-fit text-gray-100 py-2 rounded-lg px-3 hover:bg-[#424bb6] ease-linear duration-300">Postează</button>
                    </div>
                </div>
              </div>
          </form>
        </div>
    )
}

export default CommentForm;

