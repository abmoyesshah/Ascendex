import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const caseStudyData = {
  "webflow-seo": {
    title: "How we helped improve Company users retention",
    tag: "Company",
    date: "December 2023",
    category: "SEO",
    image: "/seo-dashboard-preview.jpg",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Elit sem ornare lorem odio morbi vitae. Ultricies tempus.",
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cs = caseStudyData[slug];
  return { title: cs?.title || "Case Study", description: cs?.title };
}

export default async function CaseStudySinglePage({ params }) {
  const { slug } = await params;
  const cs = caseStudyData[slug];
  if (!cs) notFound();

  return (
    <section className="min-h-screen bg-[#f7f7f7] py-14 md:py-20 font-sans">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <Link href="/case-studies" className="inline-flex items-center gap-2 text-blue-600 text-sm font-semibold mb-10 hover:gap-3 transition-all">
          ← Back to Case Studies
        </Link>

        <div className="flex justify-center items-center gap-3 text-sm mb-6">
          <span className="text-blue-600 font-semibold">{cs.tag}</span>
          <span className="text-gray-300">—</span>
          <span className="text-gray-500">{cs.date}</span>
        </div>

        <div className="text-center max-w-4xl mx-auto mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">{cs.title}</h1>
          <p className="text-gray-500 leading-7 text-base md:text-lg max-w-2xl mx-auto">{cs.content}</p>
        </div>

        {/* Hero Blue Section */}
        <div className="relative mb-32">
          <div className="bg-[#2F80ED] rounded-2xl md:rounded-[38px] h-[520px] md:h-[620px] relative overflow-hidden">
            {/* Left Card */}
            <div className="absolute left-[6%] top-[15%] w-[280px] sm:w-[360px] md:w-[470px] bg-white rounded-2xl md:rounded-[28px] shadow-2xl p-5 md:p-7 rotate-[-4deg]">
              <div className="space-y-5">
                <div className="h-3 w-24 bg-gray-200 rounded-full" />
                <div>
                  <div className="h-4 w-full bg-[#2F80ED] rounded-full mb-3" />
                  <div className="h-3 w-40 bg-[#65D64E] rounded-full mb-3" />
                  <div className="h-3 w-52 bg-gray-200 rounded-full" />
                </div>
                <div>
                  <div className="h-4 w-[85%] bg-[#2F80ED] rounded-full mb-3" />
                  <div className="h-3 w-32 bg-[#65D64E] rounded-full mb-3" />
                  <div className="h-3 w-48 bg-gray-200 rounded-full" />
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="absolute right-[6%] top-[10%] w-[260px] sm:w-[320px] md:w-[420px] bg-white rounded-2xl md:rounded-[28px] shadow-2xl p-5 md:p-7 rotate-[5deg]">
              <div className="flex items-end gap-3 h-[140px] mb-8">
                {[40, 80, 50, 110, 120, 55, 95].map((h, i) => (
                  <div key={i} className="bg-[#65D64E] rounded-full w-full" style={{ height: `${h}px` }} />
                ))}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#65D64E]" />
                  <div className="flex-1">
                    <div className="h-3 w-32 bg-gray-200 rounded-full mb-3" />
                    <div className="h-3 w-20 bg-gray-200 rounded-full" />
                  </div>
                  <div className="w-14 h-3 bg-[#2F80ED] rounded-full" />
                </div>
                <div className="flex justify-end">
                  <div className="w-14 h-3 bg-[#2F80ED] rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Floating Stats Card */}
          <div className="absolute left-1/2 -translate-x-1/2 -bottom-16 md:-bottom-20 bg-white rounded-2xl md:rounded-[28px] shadow-xl w-[95%] max-w-3xl p-6 md:p-10">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 items-center">
              <div>
                <h3 className="text-blue-600 font-semibold text-sm mb-5">Services</h3>
                <div className="space-y-3 text-gray-900 text-sm">
                  <p>Growth Marketing Search</p>
                  <p>Engine Optimization</p>
                </div>
              </div>
              <div>
                <h3 className="text-blue-600 font-semibold text-sm mb-5">Platforms</h3>
                <div className="space-y-3 text-gray-900 text-sm">
                  <p>Google and Bing</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-2xl md:rounded-[22px] p-6 md:p-8 text-center">
                <p className="text-blue-600 font-semibold text-sm mb-3">Results</p>
                <h2 className="text-4xl md:text-5xl font-bold text-blue-600 mb-3">291%</h2>
                <p className="text-gray-500 text-sm leading-6">Increase in<br />Organic Traffic</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-8">Project Overview</h2>
          <div className="space-y-8 text-gray-500 leading-7 md:leading-8 text-base md:text-lg">
            <p>Lorem ipsum dolor sit amet... (same content as before)</p>
          </div>

          <div className="mt-20 bg-[#2F80ED] rounded-2xl md:rounded-[32px] p-6 md:p-12 overflow-hidden">
            {/* bottom blue card content... keep it as before */}
          </div>
        </div>
      </div>
    </section>
  );
}