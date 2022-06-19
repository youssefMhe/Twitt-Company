import React, {Dispatch, SetStateAction, useRef, useState} from 'react';
import {Upload} from "upload-js";
import {
    PhotographIcon,
    SearchCircleIcon,
    EmojiHappyIcon,
    CalendarIcon,
    LocationMarkerIcon, CloudUploadIcon, XCircleIcon
} from "@heroicons/react/outline";
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {Tweet, TweetBody} from "../typing";
import {fetchTweets} from "../utils/fetchTweets";

interface Props {
    setTweets: React.Dispatch<React.SetStateAction<Tweet[]>>
}

function TweetBox({setTweets}: Props) {
    const upload = new Upload({apiKey: "free"});
    const [input, setInput] = useState<string>("")
    const [image, setImage] = useState<string>("")
    const {data: session} = useSession()
    const [imageUrlBoxOpen, setImageUrlBoxOpen] = useState<boolean>(false)
    const imageInputRef = useRef<HTMLInputElement>(null)

    async function onFileSelected(event) {
        setImage("")
        const [file] = event.target.files;
        const {fileUrl} = await upload.uploadFile({
            file,
            onBegin: ({cancel}) => console.log("File upload started!"),
            onProgress: ({progress}) => (
                toast.success(`File uploading... ${progress}%`, {id: 1},
                )),

        });
        console.log(`File uploaded! ${fileUrl}`);
        setImage(`${fileUrl}`)
    }

    const addImageToTweet = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        if (!imageInputRef.current?.value) return;
        //setImage(imageInputRef.current?.value)
        imageInputRef.current.value = ''
        setImageUrlBoxOpen(false)
    }
    const postTweet = async () => {
        const tweetInfo: TweetBody = {
            text: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            image: image
        }
        const result = await fetch(`/api/addTweet`, {
            body: JSON.stringify(tweetInfo),
            method: 'POST',
        })

        const json = await result.json()
        const newTweets = await fetchTweets();
        setTweets(newTweets)
        toast('Tweet Posted ', {
            icon: '✅'
        })
        return json
    }
    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        await postTweet()
        setImage('')
        setInput('')
        setImageUrlBoxOpen(false)

    }

    return (
        <div className="flex space-x-2 p-5">
            <img className="object-cover  mt-4 rounded-full h-14 w-14"
                 src={session?.user?.image || "https://links.papareact.com/gll"} alt={session?.user?.image}/>
            <div className="flex flex-1 items-center pl-2">
                <form className="flex flex-1 flex-col">
                    <input type="text"
                           value={input}
                           onChange={e => setInput(e.target.value)}
                           placeholder="What's happening"
                           className="h-24 w-full text-xl outline-none placeholder:text-xl"/>
                    <div className="flex  items-center">
                        <div className="flex flex-1  space-x-2 text-twitter">
                            {/*Icon*/}
                            <div hidden={!session}>
                                <PhotographIcon
                                    onClick={() => setImageUrlBoxOpen(!imageUrlBoxOpen)}
                                    className="w-5 h-5 cursor-pointer transition-transform duration-150 ease-out hover:scale-150"/>
                            </div>
                            <SearchCircleIcon className="w-5 h-5"/>
                            <EmojiHappyIcon className="w-5 h-5"/>
                            <CalendarIcon className="w-5 h-5"/>
                            <LocationMarkerIcon className="w-5 h-5"/>
                        </div>
                        <button disabled={!input || !session}
                                onClick={handleSubmit}
                                className=" rounded-full text-white px-5 py-2 font-bold bg-twitter disabled:opacity-40">
                            Tweet
                        </button>
                    </div>
                    {imageUrlBoxOpen && (
                        <form className=" mt-5 flex  space-x-5 py-2 px-4">
                            {/*<input ref={imageInputRef}
                                    className="flex-1 bg-transparent p-2 text-white outline-none placeholder:text-white"
                                    type="text" placeholder="Enter Image URL ..."/>*/}
                            <label
                                className="mt-5 flex  py-2 px-4  flex flex-col  bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer hover:bg-green-500 hover:text-white text-green-500  ease-linear transition-all duration-150">
                                <CloudUploadIcon className="fas fa-cloud-upload-alt fa-3x"/>
                                <span className="mt-2 text-base leading-normal">Select a image</span>
                                <input hidden
                                       className="flex-1  bg-twitter/40 rounded-lg w-5 bg-transparent p-2 text-white outline-none placeholder:text-white"
                                       type="file" onChange={() => onFileSelected(event)}/>
                            </label>

                            {image && <label className="mt-5 flex  py-2 px-4  flex flex-col  bg-white rounded-md shadow-md tracking-wide uppercase border border-blue cursor-pointer
                            hover:bg-red-500 hover:text-white text-red-500 ease-linear transition-all duration-150">
                                <XCircleIcon className="fas fa-cloud-upload-alt fa-3x"/>
                                <span className="mt-2 text-base leading-normal">delete image</span>
                                <input hidden
                                       className="flex-1  bg-twitter/40 rounded-lg w-5 bg-transparent p-2 text-white outline-none placeholder:text-white"
                                       type="" onClick={() => {
                                    setImage("")
                                    setImageUrlBoxOpen(!imageUrlBoxOpen)
                                }}/>
                            </label>}
                            {/*<button className="font-bold text-white" type="submit" onClick={addImageToTweet}>Add image
                            </button>*/}
                        </form>
                    )
                    }
                    {image && <img src={image} className="mt-10 max-h-40 w-full rounded-xl object-contain shadow-lg"
                                   alt={image}/>}

                </form>
            </div>

        </div>
    );
}

export default TweetBox;
