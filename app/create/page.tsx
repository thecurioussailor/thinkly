"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { createBlog } from '../actions/blog'
import TiptapEditor from '@/components/TiptapEditor'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('') // State for Tiptap content
  const [tags, setTags] = useState<string[]>([])
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    console.log(formData)
    formData.append('content', content) // Add content
    formData.append('tags', JSON.stringify(tags)) // Add tags as JSON
    try {
      await createBlog(formData)
      router.push('/')
    } catch (error) {
      console.log(error)
      alert('Failed to create post')
    }
  }

  return (
    <section className='flex justify-center h-screen'>
      <div className="w-1/2 mt-40">
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-10">
          <div>
            <input
              type='text'
              name="Title"
              placeholder="Title"
              className="border-none outline-none w-full shadow-none text-3xl font-bold mb-4 placeholder:text-3xl"
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
          <Button type="submit" className="text-white bg-green-700 w-20 hover:bg-green-900">
            Publish
          </Button>
        </form>
      </div>
    </section>
  )
}
