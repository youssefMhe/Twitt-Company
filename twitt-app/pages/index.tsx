import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import Widgets from "../components/Widgets";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main>
            {/*slider*/}
            <Sidebar/>
            {/*Feed*/}
            <Feed/>
            {/*Widgets*/}
            <Widgets/>
        </main>

    </div>
  )
}

export default Home
