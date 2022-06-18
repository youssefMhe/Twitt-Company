import React, {SVGProps} from 'react';

interface Props{
    Icon:(props: SVGProps<SVGSVGElement>)=>JSX.Element
    title: string
    onClick?:()=>{}
}

function SidebarRow({Icon,title,onClick}:Props) {
    return (
        <div onClick={()=>onClick?.()}  className="flex max-w-fit cursor-pointer items-center
        space-x-2 px-4 py-3
        transition-all duration-250
        rounded-full hover:bg-gray-200
        group">
            <Icon className="h-6 w-6"/>
            <p className=" hidden md:inline-flex text-base font-light
            lg:text-xl
            group-hover:text-twitter">{title}</p>
        </div>
    );
}

export default SidebarRow;
