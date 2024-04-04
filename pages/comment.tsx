import { useState } from "react";
import CommentForm from "./commentForm";
import ResponseForm from "./responseForm";
import ResponseList from "./responseList";
import { formatDistanceToNow } from 'date-fns';


interface CommentProps {
    comment: {
      commentId: string;
      userId: string;
      text: string;
      username: string;
      createdAt: number;
      responses?: Response[] | undefined;
    };
  }
  
interface Response {
    responsedId: string;
    userId: string;
    text: string;
    createdAt: number;
    username: string;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
    const [showAllResponses, setShowAllResponses] = useState(false);
    

    const handleToggleResponses = () => {
        setShowAllResponses((prevShowAllResponses) => !prevShowAllResponses);
      };

    const sortedResponses = comment.responses
    ? comment.responses.slice().sort((a, b) => a.createdAt - b.createdAt)
    : [];
  
    return (
      <div>
        <div className="rounded-xl p-4 shadow-md w-full bg-slate-900 shadow-lg shadow-slate-900 mt-4">
          <div className="bg-[#22031F] p-4 rounded-lg">
           <div className="flex w-full items-center justify-between pb-3">
             <div className="flex items-center space-x-3">
               <div className="text-lg text-gray-300"><b>{comment.username}</b> a postat</div>
             </div>
             <div className="flex items-center space-x-8">
               <div className="text-xs text-gray-300">{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</div>
             </div>
           </div>

           <div className="mt-4 mb-6">
             <div className="text-md text-gray-300 max-w-full overflow-hidden overflow-y-auto whitespace-pre-line break-words">{comment.text}</div>
           </div>

          </div>
       
           <div>
             <div className="w-full flex items-center justify-between text-gray-300 pb-8 pt-4">
               <div className="flex space-x-4 md:space-x-8">
                 <div className="w-full flex cursor-pointer items-center transition hover:text-slate-600">
                   <ResponseForm parentId={comment.commentId} onResponseAdded={() => {}} />
                 </div>
               </div>
             </div>
             <div className="flex items-center justify-between text-gray-300">
             {sortedResponses.length > 0 && (
                <ResponseList responses={sortedResponses} showAll={showAllResponses} onToggleShowAll={handleToggleResponses} />
             )}
             </div>
           </div>
        </div>
        
      </div>
    );
  };
  
  export default Comment;