import { Button } from "./ui/Button"
import { Input } from "./ui/Input"

const Filter = () => {
  return (
    <div className="flex flex-start justify-between gap-20">
        <div>
            <ul className="flex gap-4">
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">All</Button></li>
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">Featured</Button></li>
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">JavaScript</Button></li>
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">Software Development</Button></li>
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">TypeScript</Button></li>
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">Next.js</Button></li>
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">React</Button></li>
            <li><Button className="py-2 px-4 border text-base rounded-[4px] hover:bg-[#e39670] bg-white text-black dark:bg-black">Tailwind</Button></li>
            </ul>
        </div>
        <div>
            <Input type="text" className="w-72 rounded-sm" placeholder="Search Blogs"/>
        </div>
    </div>
  )
}

export default Filter