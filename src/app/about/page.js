import Image from 'next/image';

export default function AboutPage() {
  const stats = [
    { number: '100+', label: 'Clients Worldwide' },
    { number: '575+', label: 'Projects Completed' },
    { number: '50+', label: 'Team Members' },
    { number: '90m+', label: 'Traffic Generated' },
  ];

  return (
    <section id="about" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden bg-white">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aboutGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#007BFF" /><stop offset="50%" stopColor="#3BA9FF" /><stop offset="100%" stopColor="#A4D8FF" />
            </linearGradient>
            <filter id="softShadowAbout" x="-10%" y="-10%" width="130%" height="130%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#A4C8FF" floodOpacity="0.6" />
            </filter>
          </defs>
          <path d="M0,420 C200,480 400,360 600,420 C800,520 1000,200 1200,320 C1320,220 1440,260 1440,260" stroke="url(#aboutGradient)" strokeWidth="4" fill="none" opacity="0.9" filter="url(#softShadowAbout)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-blue-500 uppercase text-xs sm:text-sm font-medium tracking-wide mb-3 sm:mb-4">about the team</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
          A team of technical SEO experts ready to help you
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed">
          Our team of technical SEO experts ensures your website is optimized for performance, crawlability, and rankings.
        </p>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
        <Image src="/about.jpeg" alt="Our team of SEO experts" width={1200} height={500} className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-2xl sm:rounded-3xl shadow-lg" />
        <div className="max-w-4xl mx-auto -mt-8 sm:-mt-12 lg:-mt-16 bg-white shadow-lg rounded-xl sm:rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 py-6 sm:py-8 px-4 sm:px-6 relative z-10 mx-2 sm:mx-4 lg:mx-auto">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <h3 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold text-gray-900">{stat.number}</h3>
              <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






// import Image from 'next/image';

// export default function AboutPage() {
//   const stats = [
//     { number: '100+', label: 'Clients Worldwide' },
//     { number: '575+', label: 'Projects Completed' },
//     { number: '50+', label: 'Team Members' },
//     { number: '90m+', label: 'Traffic Generated' },
//   ];

//   return (
//     <section id="about" className="relative py-16 overflow-hidden bg-white">
//       {/* Dancing line SVG */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <svg
//           className="absolute inset-0 w-full h-full"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1440 600"
//           preserveAspectRatio="none"
//         >
//           <defs>
//             <linearGradient id="aboutGradient" x1="0" y1="0" x2="1" y2="1">
//               <stop offset="0%" stopColor="#007BFF" />
//               <stop offset="50%" stopColor="#3BA9FF" />
//               <stop offset="100%" stopColor="#A4D8FF" />
//             </linearGradient>
//             <filter id="softShadowAbout" x="-10%" y="-10%" width="130%" height="130%">
//               <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#A4C8FF" floodOpacity="0.6" />
//             </filter>
//           </defs>
//           <path
//             d="M0,420 C200,480 400,360 600,420 C800,520 1000,200 1200,320 C1320,220 1440,260 1440,260"
//             stroke="url(#aboutGradient)"
//             strokeWidth="4"
//             fill="none"
//             opacity="0.9"
//             filter="url(#softShadowAbout)"
//           />
//         </svg>
//       </div>

//       <div className="relative max-w-6xl mx-auto px-6 text-center">
//         <p className="text-blue-500 uppercase text-sm font-medium tracking-wide">about the team</p>
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mt-3">
//           A team of technical SEO experts ready to help you
//         </h2>
//         <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-base">
//           Our team of technical SEO experts ensures your website is optimized for performance, crawlability, and rankings.
//         </p>
//       </div>

//       <div className="relative max-w-6xl mx-auto px-6 mt-10">
//         <Image
//           src="/about.jpeg"
//           alt="Our team of SEO experts in a modern office"
//           width={1200}
//           height={500}
//           className="w-full h-64 sm:h-96 object-cover rounded-3xl shadow-lg"
//           style={{ width: '100%', height: 'auto' }}
//         />
//         <div className="max-w-4xl mx-auto -mt-10 sm:-mt-16 bg-white shadow-lg rounded-2xl grid grid-cols-2 sm:grid-cols-4 gap-6 py-8 px-6 relative z-10">
//           {stats.map((stat, i) => (
//             <div key={i} className="text-center">
//               <h3 className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.number}</h3>
//               <p className="text-gray-500 text-sm">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }