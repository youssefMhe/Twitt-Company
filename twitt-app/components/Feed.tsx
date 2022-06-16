import React from 'react';
import {RefreshIcon} from "@heroicons/react/outline";

function Feed() {
    return (
        <div className="border-x col-span-7 lg:col-span-5 sm:col-span-5 md:col-span-5">
            <div className="flex items-center justify-between ">
                <h1 className="p-5 pb-1 text-xl font-bold">
                    Home</h1>
                    <RefreshIcon className=" mr-5 mt-5 h-8 w-8
                    cursor-pointer text-twitter
                    transition-all duration-500 ease-out hover:rotate-180 active:scale-150"/>

            </div>

        </div>
    );
}

export default Feed;
