import Image from "next/image"
import image from "../public/featured.png"
const BlogCard = () => {
  return (
    <div className="border bg-[#efebe8] text-base rounded-[8px] flex flex-col justify-start text-[#282828]">
        <div>
            <Image
                src={image}
                className=""
                alt="image"
            />
        </div>
    </div>
  )
}

export default BlogCard