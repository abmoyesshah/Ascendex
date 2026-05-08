import Link from 'next/link';
import Image from 'next/image';

const posts = [
  {
    slug: 'keyword-research-guide',
    title: 'How to do Keyword Research for SEO: A Simple Step-by-Step Guide',
    author: 'Clark Howell',
    date: 'October 15, 2024',
    category: 'SEO',
    image: '/blog.jpeg',
  },
];

export default function BlogPage() {
  return (
    <section id="blog" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-blue-600 text-sm uppercase mb-3">blog</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Articles & News</h2>
        <p className="text-gray-600 max-w-2xl text-sm sm:text-base mb-12">
          Stay updated with the latest articles and news in SEO.
        </p>

        {posts.map((post) => (
          <div key={post.slug} className="relative flex justify-center items-center rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
            <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-6 sm:gap-8">
              <div className="lg:ml-auto w-full lg:w-[620px] xl:w-[760px] h-[280px] sm:h-[350px] lg:h-[400px] xl:h-[440px] bg-white rounded-2xl sm:rounded-[2rem] shadow-lg sm:shadow-2xl overflow-hidden z-0">
                <Image src={post.image} alt={post.title} fill className="object-cover rounded-2xl sm:rounded-[2rem]" />
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="w-full lg:w-[480px] xl:w-[540px] h-auto lg:h-[320px] xl:h-[360px] bg-white rounded-xl sm:rounded-[1.75rem] shadow-lg sm:shadow-xl z-10 flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-8 lg:absolute lg:top-8 xl:top-14 lg:left-4 xl:left-8 lg:-translate-x-4 xl:-translate-x-6 cursor-pointer hover:shadow-xl sm:hover:shadow-2xl transition"
              >
                <span className="inline-block self-start bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4">{post.category}</span>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4 sm:mb-6">Learn a simple step-by-step approach to keyword research.</p>
                <div className="flex items-center text-sm text-gray-500">
                  <Image src="/avatar.jpg" alt={post.author} width={32} height={32} className="rounded-full mr-3 object-cover" />
                  <div>
                    <p className="font-medium text-gray-900">{post.author}</p>
                    <p className="text-gray-500 text-xs">{post.date}</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}