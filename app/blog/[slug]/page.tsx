import { getBlogBySlug } from '@/app/actions/blog'
import { notFound } from 'next/navigation'
import sanitizeHtml from 'sanitize-html';
export default async function Blog({ params }: { params: { slug: string } }) {
  const { slug } = await params;
    const blog = await getBlogBySlug(slug);
    if(!blog){
      notFound();
    }
  return (
    <section className='flex justify-center'>
      <div className="max-w-4xl mt-40">
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <p className="text-gray-600 mb-4">
          By {blog.author.name} on {new Date(blog.createdAt).toLocaleDateString()}
        </p>
        <div className="prose">
          <p
            className="font-light mb-3"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(
                blog.content
              ),
            }}
          />
        </div>
      </div>
    </section>
  )
}
