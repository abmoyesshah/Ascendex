"use client";

import Link from "next/link";

const caseStudies = [
  {
    slug: "webflow-seo",
    title: "How we helped improve Company users retention",
    description:
      "Discover how our SEO strategy improved rankings and increased conversions.",
    image: "/case_study_2.jpeg",
    category: "SEO",
    author: "Clark Howell",
    date: "October 15, 2024",
  },

  {
    slug: "brand-presence",
    title: "5 Proven Strategies to Boost Your Online Brand Presence",
    description:
      "Discover the best strategies to increase your online visibility.",
    image: "/case_study_1.jpeg",
    category: "Marketing",
    author: "Emma Johnson",
    date: "November 2, 2024",
  },
];

export default function CaseStudyPage() {
  return (
    <section className="bg-white py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div className="max-w-3xl">
            <p className="text-blue-600 uppercase tracking-[0.2em] text-sm font-semibold mb-3">
              Case Studies
            </p>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13254A] leading-tight">
              Great results obtained by our agency
            </h1>

            <p className="mt-5 text-gray-500 text-base sm:text-lg leading-8">
              Explore real-world SEO campaigns and growth strategies that helped
              brands scale their traffic and visibility.
            </p>
          </div>

          <Link
            href="/contact"
            className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-4 rounded-xl font-semibold transition w-full sm:w-fit text-center"
          >
            Contact us
          </Link>
        </div>

        {/* CASE STUDIES */}
        <div className="space-y-16">
          {caseStudies.map((item) => (
            <Link
              href={`/case-studies/${item.slug}`}
              key={item.slug}
              className="group block"
            >
              <div className="relative flex flex-col xl:flex-row items-center gap-6 xl:gap-0">
                {/* IMAGE */}
                <div className="w-full xl:ml-auto xl:w-[760px] rounded-[28px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[260px] sm:h-[360px] lg:h-[460px] object-cover group-hover:scale-[1.02] transition duration-500"
                  />
                </div>

                {/* CARD */}
                <div className="relative xl:absolute xl:left-0 xl:top-1/2 xl:-translate-y-1/2 bg-white w-full xl:max-w-[520px] rounded-[28px] p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-gray-100">
                  <span className="inline-flex bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full mb-5">
                    {item.category}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold text-[#13254A] leading-tight mb-4 group-hover:text-blue-600 transition">
                    {item.title}
                  </h2>

                  <p className="text-gray-500 leading-7 text-sm sm:text-base mb-6">
                    {item.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <img
                      src="/avatar.jpg"
                      alt={item.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div>
                      <p className="font-semibold text-sm text-[#13254A]">
                        {item.author}
                      </p>

                      <p className="text-xs text-gray-500">{item.date}</p>
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