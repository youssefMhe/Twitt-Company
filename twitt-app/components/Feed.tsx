import React from 'react';
import {RefreshIcon} from "@heroicons/react/outline";
import TweetBox from "./TweetBox";
import {Tweet} from "../typing";
interface Props{
    tweets:Tweet[]
}
function Feed({tweets}:Props) {
    return (
        <div className="border-x col-span-7 lg:col-span-5 sm:col-span-5 md:col-span-5">
            <div className="flex items-center justify-between ">
                <h1 className="p-5 pb-1 text-xl font-bold">
                    Home</h1>
                    <RefreshIcon className=" mr-5 mt-5 h-8 w-8
                    cursor-pointer text-twitter
                    transition-all duration-500 ease-out hover:rotate-180 active:scale-150"/>
            </div>
            {/*Tweetbox*/}
            <TweetBox/>
            <div>

            </div>

        </div>
    );
}

export default Feed;
