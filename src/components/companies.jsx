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
