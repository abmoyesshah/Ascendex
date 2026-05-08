import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const blogPosts = {
  "keyword-research-guide": {
    title: "How to do Keyword Research for SEO: A Simple Step-by-Step Guide",
    date: "September 1, 2022",
    author: "Alex Miller",
    image: "/blog.jpeg",
  },
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
    <div className="min-h-screen bg-[#f7f7f7] py-10 md:py-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-600 text-sm mb-10 hover:gap-3 transition-all"
        >
          ← back to blog
        </Link>

        <div className="flex justify-center mb-6">
          <div className="bg-blue-600 text-white text-xs px-4 py-1 rounded-md">SEO</div>
        </div>

        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-5 text-gray-500 text-sm md:text-base max-w-2xl mx-auto leading-7">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tincidunt donec vulputate ipsum erat urna auctor. Eget phasellus iaculis.
          </p>

          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="w-11 h-11 rounded-full overflow-hidden">
              <Image src="/author.jpg" alt="author" width={44} height={44} className="object-cover w-full h-full" />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold text-gray-900">{post.author}</span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">{post.date}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 md:mt-16 relative w-full rounded-2xl md:rounded-3xl overflow-hidden">
          <Image src={post.image} alt={post.title} width={1400} height={800} className="w-full h-auto object-cover" priority />
        </div>

        <div className="max-w-3xl mx-auto mt-16 md:mt-20">
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-6">What is SEO keyword research?</h2>
            <p className="text-gray-500 leading-7 md:leading-8 text-base md:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elementum lectus amet. Amet vulputate ipsum, tellus vitae odio nulla sociis. Mauris consectetur ac enim condimentum sagittis malesuada volutpat imperdiet. <span className="text-blue-600 font-medium">Habitasse ornare ut pharetra</span> purus mauris fames. Suscipit aliquet pellentesque neque, mauris sed pharetra amet.
            </p>
          </section>

          <section className="mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">Keyword research helps you to find the right SEO keywords</h3>
            <p className="text-gray-500 leading-7 md:leading-8 text-base md:text-lg mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fermentum amet id lectus sagittis, risus, molestie nibh. Duisce urna sed eget diam amet, eget lectus. Ullamcorper donec tristique.
            </p>
            <div className="bg-blue-600 rounded-2xl md:rounded-3xl overflow-hidden p-6 md:p-10 flex justify-center items-center">
              <Image src="/seo-card.png" alt="seo" width={700} height={400} className="object-contain max-w-full h-auto" />
            </div>
            <p className="text-center text-sm text-gray-400 mt-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </section>

          <section className="mb-16">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">Keyword research doesn't need to be complicated</h3>
            <p className="text-gray-500 leading-7 md:leading-8 text-base md:text-lg mb-8">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu amet nibh viverra volutpat velit vitae blandit aliquet rhoncus. <span className="text-blue-600 font-medium">Tempus nunc id egestas augue.</span> Eget lobortis maecenas orci, est aliquam vel.
            </p>
            <ul className="space-y-5 text-gray-600 pl-5 list-disc marker:text-blue-600">
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac euismod at donec tincidunt.</li>
              <li>Risus hendrerit in vulputate vel sem id diam lobortis vulputate nulla curabitur.</li>
              <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus non vel nunc.</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-6">3 steps to find great SEO keywords to rank on</h3>
            <p className="text-gray-500 leading-7 md:leading-8 text-base md:text-lg mb-10">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu amet nibh viverra volutpat velit vitae blandit aliquet rhoncus.
            </p>
            <div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4">1. Analyze which keywords your competitors are ranking for</h4>
              <p className="text-gray-500 leading-7 md:leading-8 text-base md:text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eu vestibulum urna volutpat vitae blandit aliquet rhoncus. Tempus, nunc id egestas augue.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}