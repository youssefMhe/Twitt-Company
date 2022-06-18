import React from 'react';
import SidebarRow from "./SidebarRow";
import {
    BellIcon,
    BookmarkIcon,
    CollectionIcon, DotsCircleHorizontalIcon,
    HashtagIcon,
    HomeIcon,
    MailIcon,
    UserIcon
} from "@heroicons/react/outline";
import {signOut, signIn, useSession} from "next-auth/react";

function Sidebar() {
    const {data:session}=useSession()
    return (
        <div className=" col-span-2 flex flex-col items-center px-4
        sm:items-start">
            <img className="m-4 h-10 w-10" src="https://links.papareact.com/drq" alt={"logo"}/>
            <SidebarRow Icon={HomeIcon} title="Home"/>
            <SidebarRow Icon={HashtagIcon} title="Explore"/>
            <SidebarRow Icon={BellIcon} title="Notifications"/>
            <SidebarRow Icon={MailIcon} title="Messages"/>
            <SidebarRow Icon={BookmarkIcon} title="Bookmarks"/>
            <SidebarRow Icon={CollectionIcon} title="Lists"/>
            <SidebarRow Icon={UserIcon} onClick={session? signOut : signIn } title={session? 'Sign Out': 'Sign In'}/>
            <SidebarRow Icon={DotsCircleHorizontalIcon} title="More"/>

        </div>
    );
}

export default Sidebar;
