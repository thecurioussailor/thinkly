"use client"

import { signIn } from 'next-auth/react';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Signin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
            const formObject: Record<string, string> = {};
            data.forEach((value, key) => {
                formObject[key] = value as string;
            });
        const result = await signIn('credentials', {
          redirect: false,
          email: formObject.email,
          password: formObject.password,
        })
        router.push('/')
      }
      
  return (
    <div className="flex flex-col justify-center items-center h-screen">
        <div className="flex flex-col w-full justify-center items-center">
            <section className="flex flex-col gap-6 w-full overflow-hidden border border-neutral-700 text-base font-normal text-center sm:max-w-xl sm:rounded-lg p-4">
                <div className="flex flex-col pt-4 gap-4 justify-center items-center">
                    <button onClick={() => signIn("google", {callbackUrl: '/'})} className="rounded text-white bg-black py-3 px-6 w-full text-center text-xl font-medium">Sign in with Google</button>
                    <p>OR</p>
                    <form className="flex flex-col w-full gap-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] uppercase w-full text-left">EMAIL</label>
                            <input 
                                name='email'
                                type='email'
                                required
                                className="border border-[#525252] rounded-[3px] px-3 py-1 text-[12px]"
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[14px] uppercase w-full text-left">PASSWORD</label>
                            <input 
                                name='password'
                                type="password"
                                required
                                className="border border-[#525252] rounded-[3px] px-3 py-1 text-[12px]"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type='submit' className="rounded text-white bg-black py-3 px-6 w-full text-center text-xl font-medium">Sign in with Email</button>
                    </form>
                </div>
                <div>
                    <Link href={'/signup'}>Don't have an account? Sign up</Link>
                </div>
            </section>
            
        </div>
    </div>
  )
}
export default Signin