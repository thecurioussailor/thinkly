import Link from "next/link"

const Footer = () => {
  return (
    <section>
        <div className="px-[30px]">
            <div className="flex justify-start items-start">
                <Link href={'/'}>
                    <h1>Thinkly</h1>
                </Link>
                <div>
                    <div>
                        <div className="flex flex-col">
                            <h1>WHAT</h1>
                            <Link href={'/'}>How it Works</Link>
                            <Link href={'/'}>Security</Link>
                            <Link href={'/'}>Docs</Link>
                        </div>
                        <div></div>
                        <div></div>
                    </div>
                    <div></div>
                </div>
                
            </div>
            <div></div>
        </div>
    </section>
  )
}

export default Footer