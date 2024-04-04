import Image from "next/image";
import { FaReact } from "react-icons/fa";
import { SiTypescript } from "react-icons/si";
import { AiOutlineClockCircle } from "react-icons/ai";
import { VscChecklist } from "react-icons/vsc";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

export default function AlorithmCard({title, difficulty, language, pageLink}:{title:string, difficulty:string, language:string, pageLink:string}) {
  return (
    <div className="md:w-[50rem] md:h-[15rem] w-[20.5rem] h-[20rem] p-4 rounded-2xl bg-slate-900 shadow-lg shadow-slate-900 flex flex-col ease-linear duration-300 md:flex-row-reverse mb-5">
      <div className="h-full w-full mr-2 rounded-2xl ">
        <p className="m-2 font-bold pl-1 text-md text-[#5865F2]">{difficulty}</p>
        <h1 className="m-2 text-3xl font-bold text-gray-300">
          {title}
        </h1>

        <div className=" pt-1 pr-2 pl-2">
          <div className="flex flex-row items-center m-2">
            <h1 className="text-white">Limbaj: {language}</h1>
          </div>
        </div>

        <div className="flex flex-row">
          <button className="md:m-2 m-auto mt-4 bg-[#5865F2] shadow-md shadow-[#5865f28a]  pt-2 pb-2 pl-6 pr-4 rounded-xl flex flex-row justify-center items-center hover:bg-[#424bb6] ease-linear duration-300">
            <FaPlay className="animate-ping" size={10} color="#fff" />
            <h1 className="text-gray-100 text-sm font-semibold pl-2">
              <Link href={pageLink}>Intră pe pagină</Link>
            </h1>
          </button>
        </div>
      </div>
    </div>
  );
}