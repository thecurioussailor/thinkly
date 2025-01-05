import BlogCard from "./BlogCard"

const Latest = () => {
  return (
    <div className="flex flex-col gap-10">
        <h3 className="text-[46px]">
            Latest
        </h3>
        <div className="flex flex-col gap-16">
            <div className="grid grid-cols-3 gap-10">
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
                <BlogCard/>
            </div>
            <div className="w-full flex justify-center">
                <div className="border text-center rounded-sm py-[15px] px-[26px] font-normal text-[18px] w-96">
                    <p>Load More</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Latest