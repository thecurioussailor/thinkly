import Image from "next/image"
import image from "../public/featured.png"
const BlogCard = () => {
  return (
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
                <h2 className="text-[#28282894] pb-5">January 16, 2024</h2>
                <p className="text-5xl mb-4 text-[28px] font-normal text-left">
                  Axios vs Fetch | Which is Best for Beginners?
                </p>
                <p className="font-light mb-3">
                  A breakdown of the trade-offs and differences between these two different methods of making network
                </p>
            </div>
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex text-[#282828]">
                <div>
                  image
                </div>
                <p>Author Name</p>
              </div>
              <div className="flex">
                <p>#</p>
                <p>Resources</p>
              </div>
            </div>
        </div>
    </div>
  )
}

export default BlogCard