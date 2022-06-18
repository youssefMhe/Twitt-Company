import React, {useState} from 'react';
import {PhotographIcon, SearchCircleIcon, EmojiHappyIcon, CalendarIcon, LocationMarkerIcon} from "@heroicons/react/outline";
import {useSession} from "next-auth/react";

function TweetBox() {
    const [input ,setInput ]=useState<string>("")
const {data:session}=useSession()

    return (
        <div className="flex space-x-2 p-5">
            <img className="object-cover  mt-4 rounded-full h-14 w-14"
                 src={session?.user?.image || "https://links.papareact.com/gll"} alt={"perso"}/>
                 <div className="flex flex-1 items-center pl-2">
                     <form className="flex flex-1 flex-col">
                         <input type="text"
                                value={input}
                                onChange={e=> setInput(e.target.value)}
                                placeholder="What's happening"
                                className="h-24 w-full text-xl outline-none placeholder:text-xl"/>
                         <div className="flex  items-center">
                             <div className="flex flex-1  space-x-2 text-twitter">
                                 {/*Icon*/}
                                 <PhotographIcon className="w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
                                 <SearchCircleIcon className="w-5 h-5"/>
                                 <EmojiHappyIcon className="w-5 h-5"/>
                                 <CalendarIcon className="w-5 h-5"/>
                                 <LocationMarkerIcon className="w-5 h-5"/>
                             </div>
                             <button  disabled={!input|| !session} className=" rounded-full text-white px-5 py-2 font-bold bg-twitter disabled:opacity-40">Tweet</button>
                         </div>
                     </form>
                 </div>

        </div>
    );
}

export default TweetBox;
