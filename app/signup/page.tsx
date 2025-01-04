"use client"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { signUp } from "../actions/auth"
import { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"

const Signup = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await signUp(new FormData(e.currentTarget));
            router.push('/signin');
        } catch( error ){
            console.log((error as Error).message)
        }
    }
  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)]">
        <div className="flex flex-col w-full justify-center items-center">
            <section className="flex flex-col gap-6 w-full overflow-hidden border border-neutral-700 text-base font-normal mt-36 text-center sm:max-w-xl sm:rounded-lg p-4">
                <div className="flex flex-col gap-4 justify-center items-center">
                    <button onClick={ async () =>signIn("google")} 
                            className="rounded text-white bg-black py-3 px-6 w-full text-center text-xl font-medium">Sign up with Google</button>
                    <p>OR</p>
                    <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] uppercase w-full text-left">NAME</label>
                            <input 
                                name="name"
                                type="text"
                                required
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)} 
                                className="border border-[#525252] rounded-[3px] px-3 py-1 text-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] uppercase w-full text-left">EMAIL</label>
                            <input 
                                name="email"
                                type="email"
                                required
                                value={email}
                                placeholder="Email address"
                                onChange={(e) => setEmail(e.target.value)} 
                                className="border border-[#525252] rounded-[3px] px-3 py-1 text-[12px]"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] uppercase w-full text-left">PASSWORD</label>
                            <input 
                                name="password"
                                type="password"
                                required
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} 
                                className="border border-[#525252] rounded-[3px] px-3 py-1 text-[12px]"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="rounded text-white bg-black py-3 px-6 w-full text-center text-xl font-medium"
                        >
                            Sign up with Email
                        </button>
                    </form>
                </div>
                <div>
                    <Link href={'/signin'}>Already have an account? Sign in</Link>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Signup