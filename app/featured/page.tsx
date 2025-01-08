import Filter from "@/components/Filter"
import Latest from "@/components/Latest"

const page = () => {
  return (
    <div className="flex flex-col gap-10 mt-24 px-8">
        <Filter/>
        <Latest/>
    </div>
  )
}

export default page