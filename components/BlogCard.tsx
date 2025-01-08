import Image from "next/image"
import image from "../public/featured.png"
import { BlogWithAuthorAndTags } from "@/app/actions/blog"
import Link from "next/link"
import sanitizeHtml from "sanitize-html";

const BlogCard = ({blog}: {blog: BlogWithAuthorAndTags}) => {
  return (
    <Link href={`/blog/${blog.slug}`}>
    <div className="border bg-[#efebe8] text-base rounded-[8px] flex flex-col justify-start overflow-hidden text-[#282828]">
        <div>
            <Image
                src={image}
                className=""
                alt="image"
            />
        </div>
        <div className="flex flex-col justify-between pt-8 px-6 pb-6 relative">
            <div className="text-[#282828] flex flex-col justify-start pb-[30px]">
                <h2 className="text-[#28282894] pb-5">{new Date(blog.createdAt).toLocaleDateString('en-US', {month: 'long', day: 'numeric', year: 'numeric'})}</h2>
                <p className="text-5xl mb-4 text-[28px] font-normal text-left">
                  {blog.title}
                </p>
                <p
  className="font-light mb-3"
  dangerouslySetInnerHTML={{
    __html: sanitizeHtml(
      blog.content.length > 120
        ? blog.content.slice(0, 120) + "..."
        : blog.content
    ),
  }}
/>
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center gap-4 text-[#282828]">
                <div className="rounded-sm border border-black overflow-hidden w-10">
                  <img src={blog.author.image as string}/>
                </div>
                <p>{blog.author.name}</p>
              </div>
              <div className="flex">
                <p>#</p>
                {blog.tags && blog.tags.length > 0 ? (
                  blog.tags.map((tag, index) => (
                    <p key={index}>{tag.name}</p>
                  ))
                ) : (
                  <p>No tags</p>
                )}
              </div>
            </div>
        </div>
    </div>
    </Link>
  )
}

export default BlogCard