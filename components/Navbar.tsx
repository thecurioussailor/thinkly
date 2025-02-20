"use client"
import { signOut, useSession } from "next-auth/react"
import Link from "next/link"
import { Button } from "./ui/Button"
import { useState } from "react"
import { DarkModeToggle } from "./DarkModeToggle"

const Navbar = () => {
    const {data: session, status} = useSession();
    const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="fixed top-0 w-full border-b py-4 border-dashed border-[#a0a8adb8] bg-white z-50">
        <div className="px-8">
            <div className="flex justify-between items-center">
                <Link href={'/'}>
                    <h1 className="text-2xl font-semibold">
                        Thinkly
                    </h1>
                </Link>
                <nav className="flex gap-4 items-center">
                    <ul className="flex gap-10">
                        <li>Explore</li>
                        <li>About Us</li>
                        <li>Membership</li>
                        <li><Link href={'/create'}>Write</Link></li>
                    </ul>
                </nav>
                <div className="cursor-pointer flex gap-2 items-center">
                <DarkModeToggle />
                    {status === "authenticated" ? (
                        <div
                            className="relative"
                            onClick={() => setIsHovered(!isHovered)}
                        >
                                
                                {session.user?.image && (
                                    <img
                                        src={session.user.image}
                                        width={20}
                                        height={20}
                                        alt={`${session.user.name}'s avatar`}
                                        className="w-8 h-8 rounded-full border border-gray-300"
                                    />
                                )}
                                {isHovered && (
                                    <div 
                                        onMouseLeave={() => setIsHovered(false)}
                                        className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 shadow-lg rounded-md">
                                        <Button
                                            onClick={() => signOut()}
                                            className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                                        >
                                            Sign Out
                                        </Button>
                                    </div>
                                )}
                        </div>
                    ) : (
                        <>
                            <Link href={'/signin'}>
                                <Button>
                                    Sign in
                                </Button>
                            </Link>
                            <Link href={"/signup"}>
                                <Button className="py-2 px-4 border text-base rounded-[4px] bg-[#e39670]">Get Started</Button> 
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Navbar