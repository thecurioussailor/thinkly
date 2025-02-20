"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { createBlog } from '../actions/blog'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import TiptapEditor from '@/components/TiptapEditor'

export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('') // State for Tiptap content
  const [tags, setTags] = useState<string[]>([])
  const [currentTag, setCurrentTag] = useState('')
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

  const handleAddTag = () => {
    if (currentTag && !tags.includes(currentTag)) {
      setTags([...tags, currentTag])
      setCurrentTag('')
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="flex flex-col justify-center items-center w-full p-40">
      <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[740px] gap-10">
        <div>
          <Input
            name="title"
            placeholder="Title"
            className="border-none focus-visible:ring-0 shadow-none"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <TiptapEditor content={content} onChange={setContent} />
        </div>
        <div>
          <Label htmlFor="tags">Tags</Label>
          <div className="flex space-x-2 mt-2">
            <Input
              id="tags"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              placeholder="Add a tag"
            />
            <Button type="button" onClick={handleAddTag}>
              Add Tag
            </Button>
          </div>
          <div className="mt-2 space-x-2">
            {tags.map(tag => (
              <Badge key={tag} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                {tag} ×
              </Badge>
            ))}
          </div>
        </div>
        <Button type="submit" className="text-white bg-green-700 w-20 hover:bg-green-900">
          Publish
        </Button>
      </form>
    </div>
  )
}
