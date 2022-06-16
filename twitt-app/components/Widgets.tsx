import React from 'react';
import {SearchIcon} from "@heroicons/react/outline";
import {TwitterTimelineEmbed} from "react-twitter-embed";

function Widgets() {
    return (
        <div className= "col-span-2 mt-2 px-2 hidden lg:inline md:inline sm:inline ">
            {/* Search*/}
            <div className=" mt-2 flex items-center
             space-x-2 bg-gray-200 rounded-full p-3"
             >
                <SearchIcon className="h-5 w-5 text-gray-400"/>
                <input className={"flex-1 bg-transparent outline-none"} type={"text"} placeholder={"search Twitter"}/>
            </div>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="HAMZAUSS"
                options={{height: 1000}}
            />
        </div>
    );
}

export default Widgets;
