'use server'

import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/options"
import prisma from '@/lib/db'

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions)

  if (!session) {
    throw new Error('Not authenticated')
  }

  const title = formData.get('title') as string
  const content = formData.get('content') as string

  if (!title || !content) {
    throw new Error('Missing required fields')
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      published: true,
      author: { connect: { email: session.user?.email! } },
    },
  })

  return blog
}

export async function getPosts() {
  const blogs = await prisma.blog.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' },
  })

  return blogs
}
