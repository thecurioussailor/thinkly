"use client"
import { BlogWithAuthorAndTags, getLatestBlogs } from "@/app/actions/blog"
import BlogCard from "./BlogCard"
import { Button } from "./ui/Button";
import { useEffect, useState } from "react";

const Latest = () => {
    const [blogs, setBlogs] = useState<BlogWithAuthorAndTags[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const loadBlogs = async (pageNum: number) => {
        setIsLoading(true)
        try {
          const { blogs: newBlogs, hasMore: moreAvailable } = await getLatestBlogs(pageNum)
          if (pageNum === 1) {
            setBlogs(newBlogs)
          } else {
            setBlogs(prevBlogs => [...prevBlogs, ...newBlogs])
          }
          setHasMore(moreAvailable)
        } catch (error) {
          console.error('Failed to load blogs:', error)
        } finally {
          setIsLoading(false)
        }
      }

      useEffect(() => {
        loadBlogs(1)
      }, [])
    
      const handleLoadMore = () => {
        const nextPage = page + 1
        setPage(nextPage)
        loadBlogs(nextPage)
      }
  return (
    <div className="flex flex-col gap-10">
        <h3 className="text-[46px]">
            Latest
        </h3>
        <div className="flex flex-col gap-16">
            <div className="grid grid-cols-3 gap-10">
                {blogs.map((blog) => (
                    <BlogCard key={blog.id} blog={blog} />
                ))}
            </div>
            {hasMore && (
                <div className="w-full flex justify-center">
                <Button 
                    variant="outline" 
                    className="py-[15px] px-[26px] font-normal text-[18px] w-96 text-white bg-black border-zinc-500 hover:bg-orange-300"
                    onClick={handleLoadMore}
                    disabled={isLoading}
                >
                    {isLoading ? 'Loading...' : 'Load More'}
                </Button>
            </div>
            )}
        </div>
    </div>
  )
}

export default Latest