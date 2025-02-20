import Featured from "@/components/Featured";
import Filter from "@/components/Filter";
import Latest from "@/components/Latest";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 mt-24 px-8 dark:bg-black">
      <Filter/>
      <Featured/>
      <Latest/>
    </div>
  );
}
