import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = {
  'keyword-research-guide': { title: 'How to do Keyword Research for SEO: A Simple Step-by-Step Guide', date: 'October 15, 2024', author: 'Alex Miller', image: '/blog.jpeg' },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  return { title: post?.title, description: post?.title };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = blogPosts[slug];
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-[#f7f7f7] py-8 sm:py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-blue-600 text-xs sm:text-sm mb-6 sm:mb-8 hover:gap-3 transition">
          ← back to blog
        </Link>

        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="bg-blue-600 text-white text-xs px-3 sm:px-4 py-1 rounded-md">SEO</div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">{post.title}</h1>
          <p className="mt-3 sm:mt-5 text-gray-500 text-sm sm:text-base max-w-2xl mx-auto leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          <div className="flex items-center justify-center gap-3 mt-6 sm:mt-8">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
              <Image src="/author.jpg" alt="author" width={44} height={44} className="object-cover w-full h-full" />
            </div>
            <div className="flex items-center gap-2 text-xs sm:text-sm">
              <span className="font-semibold text-gray-900">{post.author}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{post.date}</span>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-16 relative w-full rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
          <Image src={post.image} alt={post.title} width={1400} height={800} className="w-full h-auto object-cover" priority />
        </div>

        <div className="max-w-3xl mx-auto mt-12 sm:mt-16 md:mt-20">
          <section className="mb-10 sm:mb-14">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">What is SEO keyword research?</h2>
            <p className="text-gray-500 leading-7 text-sm sm:text-base md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </section>
          <section className="mb-10 sm:mb-14">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Keyword research helps you find the right keywords</h3>
            <p className="text-gray-500 leading-7 text-sm sm:text-base md:text-lg mb-6 sm:mb-10">
              Lorem ipsum dolor sit amet...
            </p>
            <div className="bg-blue-600 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden p-4 sm:p-6 md:p-10 flex justify-center items-center">
              <Image src="/seo-card.png" alt="seo" width={700} height={400} className="object-contain max-w-full h-auto" />
            </div>
          </section>
          <section className="mb-10 sm:mb-14">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Keyword research doesn't need to be complicated</h3>
            <p className="text-gray-500 leading-7 text-sm sm:text-base md:text-lg mb-6 sm:mb-8">
              Lorem ipsum dolor sit amet...
            </p>
            <ul className="space-y-3 sm:space-y-5 text-gray-600 pl-5 list-disc marker:text-blue-600 text-sm sm:text-base">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
              <li>Risus hendrerit in vulputate vel sem id diam.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            </ul>
          </section>
          <section>
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">3 steps to find great SEO keywords</h3>
            <p className="text-gray-500 leading-7 text-sm sm:text-base md:text-lg mb-6 sm:mb-10">
              Lorem ipsum dolor sit amet...
            </p>
            <div>
              <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4">1. Analyze competitor keywords</h4>
              <p className="text-gray-500 leading-7 text-sm sm:text-base md:text-lg">
                Lorem ipsum dolor sit amet...
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

