import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";
import {fetchTweets} from "../utils/fetchTweets";
import {Tweet} from "../typing";
import {Toaster} from "react-hot-toast";
interface Props{
    tweets:Tweet[]
}

const Home= ({tweets}:Props) => {

    return (
        <div className="mx-auto  max-h-screen overflow-hidden lg:max-w-7xl">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Toaster/>
            <main className="grid grid-cols-9">
                {/*slider*/}
                <Sidebar/>
                {/*Feed*/}
                <Feed tweets={tweets}/>
                {/*Widgets*/}
                <Widgets/>
            </main>

        </div>
    )
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
    const tweets = await fetchTweets();

    return {
        props: {
            tweets,
        }
    }
}
