import React, { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns';


interface ResponseListProps {
  responses: Response[];
  showAll: boolean;
  onToggleShowAll: () => void;
}

interface Response {
  responsedId: string;
  userId: string;
  text: string;
  createdAt: number;
  username: string;
}

const ResponseList: React.FC<ResponseListProps> = ({ responses, showAll, onToggleShowAll }) => {
  const [displayedResponses, setDisplayedResponses] = useState(responses.slice(0, 3));

  useEffect(() => {
    if (showAll) {
      setDisplayedResponses(responses);
    } else {
      setDisplayedResponses(responses.slice(0, 3));
    }
  }, [responses, showAll]);

  return (
    <div>
      
      <strong>Răspunsuri</strong>
      {displayedResponses.map((response) => (
        <div key={response.responsedId}>
             <div className="w-full flex items-start px-4 py-3">
                 <div className="bg-[#523C50] p-4 rounded">
                    <div className="flex items-center justify-between">
                       <h2 className="text-lg text-gray-300 -mt-1"><b>{response.username}</b> a răspuns</h2>
                       <small className="text-sm text-gray-300 pl-8">{formatDistanceToNow(response.createdAt, { addSuffix: true })}</small>
                    </div>
                    <p className="mt-3 text-gray-300 text-sm max-w-full overflow-hidden overflow-y-auto whitespace-pre-line break-words">
                      {response.text}
                    </p>
                    
                 </div>
              </div>
         </div>
      ))}
      {responses.length > 3 && (
        <button onClick={onToggleShowAll} className="group relative text-center h-8 w-20 overflow-hidden rounded-lg bg-slate-900 text-lg shadow">
          <div className="absolute inset-0 w-3 bg-[#5865F2] shadow-[#5865f28a] transition-all duration-[250ms] ease-out group-hover:w-full"></div>
          <span className="relative text-white text-sm text-center group-hover:text-white"><b>{showAll ? "Show less" : "Show more"}</b></span>
        </button>
      )}
    </div>
  );
};

export default ResponseList;