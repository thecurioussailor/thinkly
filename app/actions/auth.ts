"use server"
import prisma from "@/lib/db";
import bcrypt from "bcrypt";

export async function signUp(formData: FormData){
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!name || !email || !password) {
        throw new Error('Missing required fields')
    }

    const existingUser = await prisma.user.findUnique({
        where: { email },
    })

    if (existingUser) {
        throw new Error('User already exists')
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        },
    })

    return { id: user.id, name: user.name, email: user.email }
    
}
