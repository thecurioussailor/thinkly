'use server'
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]/options"
import prisma from '@/lib/db'


function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, '-') // Replace spaces and non-word characters with a single hyphen
    .replace(/^-+|-+$/g, '');  // Remove leading or trailing hyphens
}

async function generateUniqueSlug(title: string): Promise<string> {
  const baseSlug = slugify(title);
  let slug = baseSlug;
  let count = 1;

  while (await prisma.blog.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}

export async function createBlog(formData: FormData) {

  const session = await getServerSession(authOptions);
  if (!session) {
    throw new Error('Not authenticated')
  }

  const title = formData.get('title') as string;
  const content = formData.get('content') as string
  const tagsJson = formData.get('tags') as string
  const tags = JSON.parse(tagsJson || '[]') as string[]
  const sanitizedTags = Array.isArray(tags) ? tags : [];
  const slug = await generateUniqueSlug(title);
  if (!title || !content) {
    throw new Error('Missing required fields')
  }

  const blog = await prisma.blog.create({
    data: {
      title,
      content,
      published: true,
      slug,
      author: { connect: { email: session.user?.email! } },
      tags: {
        connectOrCreate: sanitizedTags.map(tag => ({
          where: { name: tag },
          create: { name: tag },
        })),
      },
    },
    include: {
      tags: true,
    },
  })

  return blog
}

export type BlogWithAuthorAndTags = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  imageUrl: string | null
  published: boolean
  views: number
  createdAt: Date
  author: {
    name: string | null
    image: string | null
  }
  categories: { id: string; name: string }[]
  tags: { id: string; name: string }[]
}

//get all the latest blogs
export async function getLatestBlogs(page: number = 1, limit: number = 9) {
  const skip = (page - 1) * limit;

  const blogs = await prisma.blog.findMany({
    where: { 
      published: true
    },
    include: { 
      author: {
        select: {
          name: true,
          image: true
        }
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
    skip,
    take: limit
  })

  const total = await prisma.blog.count({
    where: {
      published: true,
    },
  })

  return {
    blogs ,
    hasMore: skip + blogs.length < total,
  }
}

export async function getBlogBySlug(slug: string): Promise<BlogWithAuthorAndTags | null> {
  const blog = await prisma.blog.findUnique({
    where: { slug },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })

  return blog
}

export async function searchBlogs(query: string, page: number = 1, limit: number = 9){
  const skip = (page - 1) * limit;

  const blogs = await prisma.blog.findMany({
    where: {
      published: true,
      OR: [
        {
          slug: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          content: {
            contains: query,
            mode: 'insensitive'
          }
        },
        {
          title: {
            contains: query,
            mode: 'insensitive'
          }
        }
      ]
    },
    include: { 
      author: {
        select: {
          name: true,
          image: true
        }
      },
      categories: {
        select: {
          id: true,
          name: true,
        },
      },
      tags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc'
    },
    skip,
    take: limit
  })
  const total = await prisma.blog.count({
    where: {
      published: true,
      OR: [
        {
          slug: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          content: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
  })

  return {
    blogs,
    hasMore: skip + blogs.length < total
  }
}