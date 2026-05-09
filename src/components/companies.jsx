"use client";
import Image from "next/image";

export default function Companies() {
  const logos = [
    "/Werner_Enterprises-Logo.wine.png",
    "/Exxon_Mobil_Logo.svg.png",
    "/walmart.png",
    "/The_New_York_Times_logo.png",
    "/moffitt-cancer-center-logo.png",
    "/Capital-One-Symbol.png",
  ];

  return (
    <section className="py-10 sm:py-14 md:py-16 lg:py-20 text-center w-full overflow-hidden bg-white">
      <p className="text-gray-700 mb-6 sm:mb-8 md:mb-10 lg:mb-12 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold px-4">
        Trusted by millions. Built for you.
      </p>

      <div className="relative w-full overflow-hidden">
        <div className="absolute left-0 top-0 h-full w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-r from-white via-white/95 to-transparent z-10" />
        <div className="absolute right-0 top-0 h-full w-12 sm:w-16 md:w-24 lg:w-32 bg-gradient-to-l from-white via-white/95 to-transparent z-10" />

        <div className="flex items-center gap-6 sm:gap-10 md:gap-14 lg:gap-16 xl:gap-20 animate-scrollCompanies hover:[animation-play-state:paused] w-max">
          {[...logos, ...logos].map((logo, i) => (
            <div key={i} className="flex items-center justify-center w-20 sm:w-24 md:w-28 lg:w-32 xl:w-36 h-8 sm:h-10 md:h-12 lg:h-14">
              <Image
                src={logo}
                alt="company logo"
                width={140}
                height={50}
                className="object-contain opacity-60 sm:opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300 w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






// "use client";
// import Image from "next/image";

// export default function Companies() {
//   const logos = [
//     "/Werner_Enterprises-Logo.wine.png",
//     "/Exxon_Mobil_Logo.svg.png",
//     "/walmart.png",
//     "/The_New_York_Times_logo.png",
//     "/moffitt-cancer-center-logo.png",
//     "/Capital-One-Symbol.png",
//   ];

//   return (
//     <section className="py-12 sm:py-16 md:py-20 text-center w-full overflow-hidden bg-white">
//       <p className="text-gray-700 mb-8 sm:mb-10 md:mb-12 lg:mb-14 text-xl sm:text-2xl md:text-3xl font-semibold px-4">
//         Trusted by millions. Built for you.
//       </p>

//       <div className="relative w-full overflow-hidden">
//         {/* left fade - responsive width */}
//         <div className="absolute left-0 top-0 h-full w-20 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-r from-white via-white/90 to-transparent z-10" />
        
//         {/* right fade - responsive width */}
//         <div className="absolute right-0 top-0 h-full w-20 sm:w-24 md:w-32 lg:w-40 bg-gradient-to-l from-white via-white/90 to-transparent z-10" />

//         <div className="flex items-center gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 animate-scrollCompanies hover:[animation-play-state:paused] w-max">
//           {[...logos, ...logos].map((logo, i) => (
//             <div
//               key={i}
//               className="flex items-center justify-center w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40 h-10 sm:h-12 md:h-14 lg:h-15"
//             >
//               <Image
//                 src={logo}
//                 alt="company logo"
//                 width={160}
//                 height={60}
//                 className="object-contain opacity-60 sm:opacity-70 grayscale hover:grayscale-0 hover:opacity-100 transition duration-300 w-full h-full"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Add animation keyframes to your global CSS or tailwind config */}
//       <style jsx>{`
//         @keyframes scrollCompanies {
//           0% {
//             transform: translateX(0);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//         .animate-scrollCompanies {
//           animation: scrollCompanies 25s linear infinite;
//         }
//         @media (max-width: 640px) {
//           .animate-scrollCompanies {
//             animation-duration: 20s;
//           }
//         }
//       `}</style>
//     </section>
//   );
// }