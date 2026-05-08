import Image from "next/image";
import Link from "next/link";
import HeroSearch from "../components/hero-search";
import Companies from "../components/companies";

export default function Home() {
  return (
    <>
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-24 pb-20">
        {/* Background dancing lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg
            className="absolute top-0 left-0 w-full h-full"
            viewBox="0 0 1440 700"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#2F80FF" />
                <stop offset="100%" stopColor="#56CCF2" />
              </linearGradient>
            </defs>

            {/* Main top dancing line */}
            <path
              d="M0 120C120 10 260 20 420 95C600 180 760 170 930 70C1110 -40 1280 -10 1440 120"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Dashed line */}
            <path
              d="M0 155C120 45 260 55 420 125C600 205 760 195 930 105C1110 -5 1280 25 1440 150"
              stroke="#D8E7FF"
              strokeWidth="2"
              strokeDasharray="10 10"
              fill="none"
              strokeLinecap="round"
            />

            {/* Bottom curve */}
            <path
              d="M950 0C1080 110 1220 140 1440 40"
              stroke="url(#lineGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              opacity="0.8"
            />
          </svg>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT CONTENT */}
            <div className="max-w-xl">
              <p className="text-blue-600 font-semibold text-sm uppercase tracking-[0.2em] mb-5">
                SEO Agency
              </p>

              <h1 className="text-[42px] sm:text-[52px] lg:text-[64px] leading-[1.05] font-bold tracking-[-2px] text-[#13254A]">
                The #1 SEO agency for fast-growing companies
              </h1>

              <p className="mt-6 text-lg leading-8 text-gray-500 max-w-lg">
                We help brands dominate Google rankings with powerful SEO
                strategies, technical optimization, and AI-driven growth.
              </p>

              {/* BUTTONS */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-100"
                >
                  Contact us
                </Link>

                <Link
                  href="/case-studies"
                  className="border border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-[#173B6C] px-7 py-3.5 rounded-xl font-semibold transition-all duration-300"
                >
                  Case Studies
                </Link>
              </div>

              {/* SEARCH BAR */}
              <div className="mt-8">
                <HeroSearch />
              </div>
            </div>

            {/* RIGHT IMAGE SECTION */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[760px]">
                {/* Main Dashboard */}
                <div className="relative z-20 rounded-[28px] overflow-hidden bg-white shadow-[0_20px_80px_rgba(36,99,235,0.18)] border border-gray-100">
                  <Image
                    src="/home_1-Picsart-AiImageEnhancer.png"
                    alt="SEO Dashboard"
                    width={900}
                    height={550}
                    priority
                    className="w-full h-auto object-cover"
                  />
                </div>

                {/* Floating top card */}
                <div className="hidden md:block absolute -top-12 right-0 z-30 w-[220px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                  <Image
                    src="/home_2.PNG"
                    alt="Analytics"
                    width={220}
                    height={140}
                    className="w-full h-auto"
                  />
                </div>

                {/* Floating bottom card */}
                <div className="hidden md:block absolute bottom-6 -left-10 z-30 w-[230px] rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
                  <Image
                    src="/home_2.PNG"
                    alt="SEO Growth"
                    width={230}
                    height={140}
                    className="w-full h-auto"
                  />
                </div>

                {/* Glow */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[80%] h-[60px] bg-blue-100 blur-3xl opacity-60 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
        
          {/* TRUSTED BRANDS */}
          {/* TRUSTED BRANDS – MARQUEE */}
          <Companies />
          
      </section>
    </>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import HeroSearch from "../components/hero-search";

// export default function Home() {
//   return (
//     <>
//       {/* Hero Section with dancing line */}
//       <section
//         id="home"
//         className="relative pt-20 pb-12 overflow-hidden bg-white"
//       >
//         {/* SVG Background Curve */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <svg
//             className="absolute inset-0 w-full h-full"
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 1440 600"
//             preserveAspectRatio="none"
//           >
//             <defs>
//               <linearGradient id="heroGradient" x1="0" y1="0" x2="1" y2="1">
//                 <stop offset="0%" stopColor="#007BFF" />
//                 <stop offset="50%" stopColor="#3BA9FF" />
//                 <stop offset="100%" stopColor="#A4D8FF" />
//               </linearGradient>
//               <filter
//                 id="softShadow"
//                 x="-10%"
//                 y="-10%"
//                 width="130%"
//                 height="130%"
//               >
//                 <feDropShadow
//                   dx="0"
//                   dy="6"
//                   stdDeviation="8"
//                   floodColor="#A4C8FF"
//                   floodOpacity="0.6"
//                 />
//               </filter>
//             </defs>
//             <path
//               d="M0,450 C240,280 480,620 720,450 C960,280 1200,620 1440,320"
//               stroke="url(#heroGradient)"
//               strokeWidth="4"
//               fill="none"
//               opacity="0.95"
//               filter="url(#softShadow)"
//             />
//           </svg>
//         </div>

//         <div className="relative max-w-7xl mx-auto px-6">
//           <p className="text-blue-600 uppercase text-sm font-medium tracking-wide">
//             SEO Agency
//           </p>
//           <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mt-2 max-w-5xl">
//             The #1 SEO agency for fast-growing companies
//           </h1>
//           <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-2xl">
//             We help fast-growing companies dominate search results with
//             data-driven SEO strategies.
//           </p>

//           <div className="flex flex-wrap gap-4 mt-8">
//             <Link
//               href="/contact"
//               className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition text-center"
//             >
//               Contact us
//             </Link>
//             <Link
//               href="/case-studies"
//               className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition text-center"
//             >
//               Case Studies
//             </Link>
//           </div>

//           {/* SEARCH BAR (client component) */}
//           <HeroSearch />

//           {/* Image cluster */}
//           <div className="relative mt-12 flex justify-center">
//             <div className="relative mx-auto w-full max-w-5xl">
//               <Image
//                 src="/home_1-Picsart-AiImageEnhancer.png"
//                 alt="Main SEO dashboard"
//                 width={820}
//                 height={420}
//                 className="rounded-2xl shadow-md"
//                 style={{ width: "100%", height: "auto" }}
//                 priority
//               />
//               <div className="hidden sm:block absolute -top-10 right-20 lg:right-[-30]">
//                 <Image
//                   src="/home_2.PNG"
//                   alt="SEO metrics"
//                   width={180}
//                   height={120}
//                   className="rounded-xl shadow-md"
//                   style={{ width: "100%", height: "auto" }}
//                 />
//               </div>
//               <div className="hidden sm:block absolute -bottom-10 left-0 lg:left-[-30]">
//                 <Image
//                   src="/home_2.PNG"
//                   alt="SEO analytics"
//                   width={180}
//                   height={120}
//                   className="rounded-xl shadow-md"
//                   style={{ width: "100%", height: "auto" }}
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Trusted Companies */}
//       <div className="bg-gray-100 py-12 text-center">
//         <p className="text-gray-500 mb-6 text-lg">
//           Trusted by over <span className="text-blue-600 font-bold">100+</span>{" "}
//           fast-growing companies
//         </p>
//         <div className="flex justify-center flex-wrap gap-8">
//           <Image
//             src="/company-logo-one.jpg"
//             alt="Company 1"
//             width={120}
//             height={40}
//             className="h-10 sm:h-12 w-auto rounded-xl shadow-lg"
//             style={{ width: "auto", height: "auto" }}
//           />
//           <Image
//             src="/company-logo-two.jpg"
//             alt="Company 2"
//             width={120}
//             height={40}
//             className="h-10 sm:h-12 w-auto rounded-xl shadow-lg"
//             style={{ width: "auto", height: "auto" }}
//           />
//           <Image
//             src="/company-logo-three.jpg"
//             alt="Company 3"
//             width={120}
//             height={40}
//             className="h-10 sm:h-12 w-auto rounded-xl shadow-lg"
//             style={{ width: "auto", height: "auto" }}
//           />
//           <Image
//             src="/company-logo-four.jpg"
//             alt="Company 4"
//             width={120}
//             height={40}
//             className="h-10 sm:h-12 w-auto rounded-xl shadow-lg"
//             style={{ width: "auto", height: "auto" }}
//           />
//         </div>
//       </div>
//     </>
//   );
// }
