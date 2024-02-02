"use client"

import Link from 'next/link'
import PostAddIcon from '@mui/icons-material/PostAdd'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import { RiDiscordFill,RiTeamFill } from "react-icons/ri";

export default function PlayerNavBar() {
    return (
        <aside className="h-full w-16 flex flex-col space-y-10 items-center justify-center relative bg-violet-600 text-white">
            <Link className="text-white" href='/player/'>
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <RiTeamFill />
                </div>
            </Link>
            <Link className="text-white" href='/player/reports'>
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <ArticleOutlinedIcon />
                </div>
            </Link>
            <Link className="text-white" href='/player/reports/add'>
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <PostAddIcon />
                </div>
            </Link>
            <a className="text-white" href='https://discord.gg/NTGPjD5BNK'>
                <div className="h-10 w-10 flex items-center justify-center rounded-lg cursor-pointer hover:text-gray-800 hover:bg-white  hover:duration-300 hover:ease-linear focus:bg-white">
                    <RiDiscordFill size={25}/>
                </div>
            </a>
        </aside>
    )
}