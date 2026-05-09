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
                SEO Agency
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] font-bold tracking-tight text-[#13254A]">
                The #1 SEO agency for fast-growing companies
              </h1>
              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg leading-7 sm:leading-8 text-gray-500 max-w-lg">
                We help brands dominate Google rankings with powerful SEO strategies, technical optimization, and AI-driven growth.
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






// import Image from "next/image";
// import Link from "next/link";
// import HeroSearch from "../components/hero-search";
// import Companies from "../components/companies";

// export default function Home() {
//   return (
//     <>
//       {/* HERO SECTION */}
//       <section className="relative overflow-hidden bg-white pt-24 pb-20">
//         {/* Background dancing lines */}
//         <div className="absolute inset-0 pointer-events-none overflow-hidden mt-0">
//           <svg
//             className="absolute top-0 left-0 w-full h-full"
//             viewBox="0 0 1440 700"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//             preserveAspectRatio="none"
//           >
//             <defs>
//               <linearGradient
//                 id="lineGradient"
//                 x1="0%"
//                 y1="0%"
//                 x2="100%"
//                 y2="0%"
//               >
//                 <stop offset="0%" stopColor="#2F80FF" />
//                 <stop offset="100%" stopColor="#56CCF2" />
//               </linearGradient>
//             </defs>

//             {/* Main top dancing line */}
//             <path
//               d="M0 120C120 10 260 20 420 95C600 180 760 170 930 70C1110 -40 1280 -10 1440 120"
//               stroke="url(#lineGradient)"
//               strokeWidth="4"
//               fill="none"
//               strokeLinecap="round"
//               opacity="0.9"
//             />

//             {/* Dashed line */}
//             <path
//               d="M0 155C120 45 260 55 420 125C600 205 760 195 930 105C1110 -5 1280 25 1440 150"
//               stroke="#D8E7FF"
//               strokeWidth="2"
//               strokeDasharray="10 10"
//               fill="none"
//               strokeLinecap="round"
//             />

//             {/* Bottom curve */}
//             <path
//               d="M950 0C1080 110 1220 740 1440 40"
//               stroke="url(#lineGradient)"
//               strokeWidth="4"
//               fill="none"
//               strokeLinecap="round"
//               opacity="0.8"
//             />
//           </svg>
//         </div>

//         <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
//           <div className="grid lg:grid-cols-2 gap-16 items-center">
//             {/* LEFT CONTENT */}
//             <div className="max-w-xl">
//               <p className="text-blue-600 font-semibold text-sm uppercase tracking-[0.2em] mb-5">
//                 SEO Agency
//               </p>

//               <h1 className="text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.05] font-bold tracking-[-2px] text-[#13254A]">
//                 The #1 SEO agency for fast-growing companies
//               </h1>

//               <p className="mt-6 text-lg leading-8 text-gray-500 max-w-lg">
//                 We help brands dominate Google rankings with powerful SEO
//                 strategies, technical optimization, and AI-driven growth.
//               </p>

//               {/* BUTTONS */}
//               <div className="mt-8 flex flex-wrap gap-4">
//                 <Link
//                   href="/contact"
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-100"
//                 >
//                   Contact us
//                 </Link>

//                 <Link
//                   href="/case-studies"
//                   className="border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-[#173B6C] px-7 py-3.5 rounded-xl font-semibold transition-all duration-300"
//                 >
//                   Case Studies
//                 </Link>
//               </div>

//               {/* SEARCH BAR */}
//               <div className="mt-8">
//                 <HeroSearch />
//               </div>
//             </div>

//             {/* RIGHT IMAGE SECTION */}
//             <div className="relative flex justify-center lg:justify-end">
//               <div className="relative w-full max-w-[760px]">
//                 {/* Main Dashboard */}
//                 <div className="relative z-20 rounded-[28px] overflow-hidden bg-white shadow-[0_20px_80px_rgba(36,99,235,0.18)] border border-gray-100">
//                   <Image
//                     src="/home_1-Picsart-AiImageEnhancer.png"
//                     alt="SEO Dashboard"
//                     width={900}
//                     height={550}
//                     priority
//                     className="w-full h-auto object-cover"
//                   />
//                 </div>

//                 {/* Floating top card */}
//                 <div className="hidden md:block absolute -top-12 right-0 z-30 w-[220px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
//                   <Image
//                     src="/home_2.PNG"
//                     alt="Analytics"
//                     width={220}
//                     height={140}
//                     className="w-full h-auto"
//                   />
//                 </div>

//                 {/* Floating bottom card */}
//                 <div className="hidden md:block absolute bottom-6 -left-10 z-30 w-[230px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
//                   <Image
//                     src="/home_2.PNG"
//                     alt="SEO Growth"
//                     width={230}
//                     height={140}
//                     className="w-full h-auto"
//                   />
//                 </div>

//                 {/* Glow */}
//                 <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[60px] bg-blue-100 blur-3xl opacity-60 rounded-full"></div>
//               </div>
//             </div>
//           </div>
//         </div>
        
//           {/* TRUSTED BRANDS */}
//           {/* TRUSTED BRANDS – MARQUEE */}
//           <Companies />
          
//       </section>
//     </>
//   );
// }
