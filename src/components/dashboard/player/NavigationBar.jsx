import { useState,useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from 'next/navigation'
export default function NavigationBar() {
    const [user, setUser] = useState('')

    useEffect(() => {
        setUser(localStorage.getItem('name'))
    }, [])
    const currentPath = usePathname()
    return (
        <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
            <div>


                <div className="mt-8 text-center">
                    <Image src="/EaglesBlack.png" width={100} height={100} className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28" />
                    <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">{user}</h5>
                    <span className="hidden text-gray-400 lg:block">Player</span>
                </div>

                <ul className="space-y-2 tracking-wide mt-8">
                    <li>
                        <Link href="/player" aria-label="dashboard" className={currentPath == "/player" ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 " : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"}>
                            <svg className="-ml-1 h-6 w-6" viewBox="0 0 24 24" fill="none">
                                <path d="M6 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8ZM6 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-1Z" className="fill-current text-blue-500 dark:fill-gray-600"></path>
                                <path d="M13 8a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V8Z" className="fill-current text-blue-300 group-hover:text-blue-400"></path>
                                <path d="M13 15a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-1Z" className="fill-current group-hover:text-blue-700"></path>
                            </svg>
                            <span className="group-hover:text-gray-700">Your Team</span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/player/reports" className={currentPath == "/player/reports" ? "relative px-4 py-3 flex items-center space-x-4 rounded-xl text-white bg-gradient-to-r from-sky-600 to-cyan-400 " : "px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path className="fill-current text-gray-600 group-hover:text-cyan-600" fillRule="evenodd" d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z" clipRule="evenodd" />
                                <path className="fill-current text-gray-300 group-hover:text-cyan-300" d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
                            </svg>
                            <span className="group-hover:text-gray-700">Reports</span>
                        </Link>
                    </li>
                </ul>
            </div>

        </aside>
    )
}