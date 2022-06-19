import React, {useEffect, useState} from 'react';
import {Tweet, Comment, TweetBody} from '../typing';
import TimeAgo from 'react-timeago'
import {fetchComments} from '../utils/fetchComments';
import {HeartIcon, SwitchHorizontalIcon, UploadIcon, ChatAlt2Icon} from '@heroicons/react/outline';
import {useSession} from "next-auth/react";
import {fetchTweets} from "../utils/fetchTweets";
import {toast} from "react-hot-toast";


interface Props {
    tweet: Tweet
    setComments: React.Dispatch<React.SetStateAction<Comment[]>>
}

function Tweet({tweet}: Props) {
    const [comments, setComments] = useState<Comment[]>([])
    const [commentBoxVisible, setCommentBoxVisible] = useState<boolean>(false)
    const [input, setInput] = useState<string>('')
    const {data: session} = useSession()


    const refreshComments = async () => {
        const comments: Comment[] = await fetchComments(tweet._id)
        setComments(comments)
    }
    useEffect(() => {
        refreshComments()
    }, [])


    const postComment= async () => {
        const CommentInfo: TweetBody = {
            comment: input,
            username: session?.user?.name || 'Unknown User',
            profileImg: session?.user?.image || 'https://links.papareact.com/gll',
            tweet: 'ed99da87-00eb-48d2-ad38-a555089c6a59'
        }
        const result = await fetch(`/api/addComment`, {
            body: JSON.stringify(CommentInfo),
            method: 'POST',
        })
        console.log(result.status)
        const json = await result.json()
        const newComments = await fetchComments();
        setComments(newComments)
        toast('Comment Posted ', {
            icon: '✅'
        })
        return json
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await postComment()

        setInput('')
        setCommentBoxVisible(false)

    }

    //console.log(comments)
    return (
        <div className="flex flex-col space-x-3 border-y border-gray-200 p-5">
            <div className="flex space-x-3">
                <img className=" h-10 w-10  object-cover rounded-full" src={tweet.profileImg} alt={tweet.username}/>
                <div>
                    <div className="flex items-center space-x-1">
                        <p className="mr-1 font-bold">{tweet.username}</p>
                        <p className="hidden text-sm text-gray-500 md:inline">@{tweet.username.replace(/\s+/g, '').toLowerCase()} .</p>
                        <TimeAgo className="text-sm text-gray-500" date={tweet._createdAt}/>
                    </div>
                    <p>{tweet.text}</p>
                    {tweet.image && (<img src={tweet.image} alt={tweet.image}
                                          className="m-5 mb-1 ml-0 max-h-60 rounded-lg object-cover shadow-xl"/>)
                    }

                </div>
            </div>
            <div className=" mt-5 justify-between flex">
                <div className=" flex cursor-pointer items-center space-x-3 text-gray-400" onClick={() => {
                    session && setCommentBoxVisible(!commentBoxVisible)
                }}>
                    <ChatAlt2Icon className="h-5 w-5"/>
                    <p>{comments.length}</p>
                </div>
                <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
                    <SwitchHorizontalIcon className="h-5 w-5"/>
                </div>
                <div className=" flex cursor-pointer items-center space-x-3 text-gray-400">
                    <UploadIcon className="h-5 w-5"/>
                </div>
            </div>
            {
                commentBoxVisible && (
                    <form onSubmit={handleSubmit} className="mt-3 flex space-x-3">
                        <input value={input}
                               onChange={(e) => setInput(e.target.value)}
                               className="flex-1 rounded-lg bg-gray-200 p-2 outline-none" type="text"
                               placeholder="write a comment"/>
                        <button disabled={!input}
                                type="submit"
                                className="text-twitter disbabled:text-gray-200">Post
                        </button>

                    </form>
                )
            }
            {comments?.length > 0 && (
                <div className="p-5 my-2 mt-5 max-h-44 space-y-5 overflow-y-scroll border-t border-gray-200 ">
                    {comments.map(comment => (
                        <div key={comment._id} className="relative flex space-x-2">
                            <hr className="absolute left-5 top-10 h-8 border-x border-twitter"/>
                            <img className="mt-2 h-7 w-7 rounded-full object-cover " src={comment.profileImg}
                                 alt={comment.profileImg}/>
                            <div>
                                <div className="flex items-center space-x-1">
                                    <p className=" mr-1 font-bold">{comment.username}</p>
                                    <p className=" hidden text-sm text-gray-500 lg:inline">@{comment.username.replace(/\s+/g, '').toLowerCase()} .</p>
                                    <TimeAgo className="text-sm text-gray-500" date={comment._createdAt}/>
                                </div>

                                <p>{comment.comment}</p>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Tweet;
