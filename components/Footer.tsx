import Link from "next/link"
import { Input } from "./ui/Input"

const Footer = () => {
  return (
    <section className="pt-24 pb-11">
        <div className="px-[30px]">
            <div className="flex justify-start items-start pb-52">
                <Link className="flex" href={'/'}>
                    <h1 className="text-3xl font-semibold pr-10">Thinkly</h1>
                </Link>
                <div className="flex w-full justify-between pl-[120px]">
                    <div className="flex justify-between gap-28">
                        <div className="flex flex-col">
                            <h1 className="text-gray-500 uppercase pb-[28px]">WHAT</h1>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>How it Works</Link>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>Security</Link>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>Docs</Link>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-gray-500 uppercase pb-[28px]">who</h1>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>About Us</Link>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>Blog</Link>
                        </div>
                        <div className="flex flex-col">
                            <h1 className="text-gray-500 uppercase pb-[28px]">Connect</h1>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>Linkedin</Link>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>Twitter</Link>
                            <Link className="mb-[22px] text-[18px]" href={'/'}>Github</Link>
                        </div>
                    </div>
                    <div className="w-full max-w-[470px]">
                        <h1 className="text-gray-700 uppercase pb-7 text-base dark:text-[#fff6]">Subscribe to Updates</h1>
                        <Input className="p-10 px-5 focus:text-[18px] placeholder:text-[18px]" placeholder="Your Email"/>
                    </div>
                </div>
                
            </div>
            <div className="flex justify-between items-center border-t pt-10 text-[13px] text-gray-700 dark:text-[#ffffffb8]">
                <div>© 2024 Thinkly. All rights reserved.</div>
                <div className="flex gap-6">
                    <p>Terms</p>
                    <p>Privacy</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Footer