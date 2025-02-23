'use client'
import { useState, useEffect, useRef } from 'react'
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { searchBlogs, BlogWithAuthorAndTags } from "@/app/actions/blog"
import { useDebounce } from "@/lib/hooks/use-debounce"
import { Button } from './ui/Button'
import { Input } from './ui/Input'

const Filter = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<BlogWithAuthorAndTags[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false)
  const debouncedSearchQuery = useDebounce(searchQuery, 300)
  const router = useRouter()
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (debouncedSearchQuery) {
        setIsLoading(true)
        try {
          const { blogs } = await searchBlogs(debouncedSearchQuery)
          setSearchResults(blogs)
          setShowDropdown(true)
        } catch (error) {
          console.error('Failed to fetch search results:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setSearchResults([])
        setShowDropdown(false)
      }
    }

    fetchSearchResults()
  }, [debouncedSearchQuery])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const handleSearchResultClick = (slug: string) => {
    router.push(`/blog/${slug}`)
    setShowDropdown(false)
  }

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-20">
      <div className="overflow-x-auto">
        <ul className="flex gap-4 whitespace-nowrap">
          <li><Link href={'/'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">All</Button></Link></li>
          <li><Link href={'/featured'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">Featured</Button></Link></li>
          <li><Link href={'/latest'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">Latest</Button></Link></li>
          <li><Link href={'/category/software-development'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">Software Development</Button></Link></li>
          <li><Link href={'/category/typescript'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">TypeScript</Button></Link></li>
          <li><Link href={'/category/nextjs'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">Next.js</Button></Link></li>
          <li><Link href={'/category/react'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">React</Button></Link></li>
          <li><Link href={'/category/tailwind'}><Button variant="outline" className="py-2 px-4 text-base rounded-[4px] text-white bg-black hover:bg-[#e39670]">Tailwind</Button></Link></li>
        </ul>
      </div>
      <div className="relative" ref={dropdownRef}>
        <Input
          type="text"
          className="w-full md:w-72 rounded-sm"
          placeholder="Search Blogs"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        {showDropdown && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoading ? (
              <p className="p-2 text-gray-500">Loading...</p>
            ) : searchResults.length > 0 ? (
              <ul className="py-1">
                {searchResults.map((blog) => (
                  <li
                    key={blog.id}
                    className="cursor-pointer hover:bg-gray-100 px-4 py-2"
                    onClick={() => handleSearchResultClick(blog.slug)}
                  >
                    <h3 className="font-semibold text-sm">{blog.title}</h3>
                    <p className="text-xs text-gray-500 truncate">{blog.excerpt || blog.content.substring(0, 100)}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="p-2 text-gray-500">No results found</p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Filter

