import Image from "next/image";
import Link from "next/link";
import HeroSearch from "../components/hero-search";
import Companies from "../components/companies";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-white pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="max-w-xl">
              <p className="text-blue-600 font-semibold text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 sm:mb-5">
                SEO • AEO • GEO Agency
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-bold tracking-tight text-[#13254A]">
                The #1 agency for Search, Answer & Generative Engine Optimization
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-gray-500 max-w-lg">
                We optimise your website for Google (SEO), AI‑powered answers (AEO), and generative engines like ChatGPT & Perplexity (GEO) – all in one place.
              </p>
              <div className="mt-6 sm:mt-8 flex flex-wrap gap-3 sm:gap-4">
                <Link href="/contact" className="bg-blue-600 hover:bg-blue-700 text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition">
                  Contact us
                </Link>
                <Link href="/case-studies" className="border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-[#173B6C] px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition">
                  Case Studies
                </Link>
              </div>
              <div className="mt-6 sm:mt-8">
                <HeroSearch />
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[600px] lg:max-w-[760px]">
                <div className="relative z-10 rounded-2xl sm:rounded-[28px] overflow-hidden bg-white shadow-[0_20px_80px_rgba(36,99,235,0.18)] border border-gray-100">
                  <Image
                    src="/home_1-Picsart-AiImageEnhancer.png"
                    alt="SEO Dashboard"
                    width={900}
                    height={550}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="hidden md:block absolute -top-8 sm:-top-12 right-0 z-20 w-[160px] sm:w-[220px] rounded-2xl bg-white shadow-2xl overflow-hidden">
                  <Image src="/home_2.PNG" alt="Analytics" width={220} height={140} className="w-full h-auto" />
                </div>
                <div className="hidden md:block absolute bottom-4 sm:bottom-6 -left-6 sm:-left-10 z-20 w-[180px] sm:w-[230px] rounded-2xl bg-white shadow-2xl overflow-hidden">
                  <Image src="/home_2.PNG" alt="SEO Growth" width={230} height={140} className="w-full h-auto" />
                </div>
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[60px] bg-blue-100 blur-3xl opacity-60 rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <Companies />
      </section>
    </>
  );
}