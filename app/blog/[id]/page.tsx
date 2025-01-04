import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'

const post = {
    title: "You are great",
    author: {
        name: "ASHut"
    },
    content: "her is the code for everything",
    createdAt: "23"
}

const prisma = new PrismaClient()

export default async function Post({ params }: { params: { id: string } }) {
//   const post = await prisma.post.findUnique({
//     where: { id: params.id },
//     include: { author: true },
//   })

//   if (!post) {
//     notFound()
//   }

  return (
    <div className="max-w-2xl mt-40 mx-auto">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">
        By {post.author.name} on {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose">{post.content}</div>
    </div>
  )
}
