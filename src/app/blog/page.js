"use client";

import Link from "next/link";

const blogPosts = [
  {
    slug: "keyword-research-guide",
    title: "How to do Keyword Research for SEO: A Simple Step-by-Step Guide",
    description:
      "Learn a simple, step-by-step approach to keyword research for SEO.",
    image: "/blog.jpeg",
    author: "Clark Howell",
    date: "October 15, 2024",
    category: "SEO",
  },
];

export default function BlogPage() {
  return (
    <section
      id="blog"
      className="bg-white py-14 sm:py-16 lg:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="mb-12 lg:mb-16 max-w-3xl">
          <p className="text-blue-600 uppercase tracking-[0.2em] text-sm font-semibold mb-3">
            Blog
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13254A] leading-tight">
            Articles & News
          </h2>

          <p className="mt-5 text-gray-500 text-base sm:text-lg leading-8">
            Stay updated with the latest SEO insights, digital marketing
            strategies, and industry trends to help grow your business online.
          </p>
        </div>

        {/* BLOG CARDS */}
        <div className="space-y-12">
          {blogPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block"
            >
              <div className="relative flex flex-col xl:flex-row items-center gap-6 xl:gap-0">
                {/* IMAGE */}
                <div className="w-full xl:ml-auto xl:w-[760px] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-[260px] sm:h-[360px] lg:h-[460px] object-cover group-hover:scale-[1.02] transition duration-500"
                  />
                </div>

                {/* CONTENT CARD */}
                <div className="relative xl:absolute xl:left-0 xl:top-1/2 xl:-translate-y-1/2 bg-white w-full xl:max-w-[520px] rounded-[28px] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                  <span className="inline-flex bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                    {post.category}
                  </span>

                  <h3 className="text-2xl sm:text-3xl font-bold text-[#13254A] leading-tight mb-4 group-hover:text-blue-600 transition">
                    {post.title}
                  </h3>

                  <p className="text-gray-500 leading-7 text-sm sm:text-base mb-6">
                    {post.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src="/avatar.jpg"
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-semibold text-sm text-[#13254A]">
                        {post.author}
                      </p>

                      <p className="text-xs text-gray-500">{post.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}