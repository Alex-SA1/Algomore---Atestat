import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { auth, db } from "@/config/firebase";
import { addDoc, collection } from "firebase/firestore";

interface ResponseFormProps {
  parentId: string;
  onResponseAdded: () => void;
}

const ResponseForm: React.FC<ResponseFormProps> = ({ parentId, onResponseAdded }) => {
  const [text, setText] = useState("");
  const { user } = useAuth();

  const handleAddResponse = async () => {
    try {

      const createdAt = Date.now();

      if (text === "") {
        console.log("Scrie ceva...");
        return;
      }

      const currentUser = auth.currentUser;

      if (!currentUser) {
        console.log("Eroare nu exista user");
        return;
      }

      const userId = currentUser.uid;

      if (!userId) {
        console.log("User ID nedefinit");
        return;
      }

      await addDoc(collection(db, "comments", parentId, "responses"), {
        username: user.displayName,
        userId,
        text,
        createdAt,
      });

      onResponseAdded();
      setText("");
    } catch (error: any) {
      console.error("Eroare la adaugarea raspunsului", error.message);
    }
    
  };

  return (
  <div className="w-full flex">
    <div>
    <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Adaugă un răspuns..." className="p-2 bg-[#374151] focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold resize-none h-[120px] rounded-md w-full text-white"></textarea>
    <div className="flex justify-end">
      <button onClick={handleAddResponse} className="text-sm font-semibold absolute bg-[#5865F2] shadow-md shadow-[#5865f28a] w-fit text-gray-100 py-2 rounded-lg px-3 hover:bg-[#424bb6] ease-linear duration-300">Postează</button>
    </div>
    </div>
  </div>
  );
};

export default ResponseForm;