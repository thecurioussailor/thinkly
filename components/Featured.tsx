import Image from "next/image"
import featuredImg from "../public/featured.png";
const Featured = () => {
  return (
    <div className="flex flex-col gap-10">
        <div>
            <h1 className="text-[46px]">Featured</h1>
        </div>
        <div className="flex border rounded-2xl overflow-hidden">
            <div className="w-[57%]">
                <Image 
                    src={featuredImg}
                    alt="Featured Image"
                    className="w-full h-full"
                />
            </div>
            <div className="w-[43%] py-10 px-14 flex flex-col justify-between relative">
                <div className="flex flex-col justify-start ">
                    <h2 className="pb-5">December 30, 2023</h2>
                    <p className="text-5xl mb-4">
                        Testing Frontend — Lessons from over a million lines of TypeScript at Palantir
                    </p>
                    <p className="font-light mb-3">
                        The most critical three learnings for testing frontend, from ten years helping lead frontend engineering at Palantir.
                    </p>
                </div>
                <div className="flex">
                    <div>
                        <div>
                            <img alt="author image"></img>
                        </div>
                        <p>Author Name</p>
                    </div>
                    <div></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured