import Image from "next/image";

export default function AboutPage() {
  const stats = [
    { number: "100+", label: "Clients Worldwide" },
    { number: "575+", label: "Projects Completed" },
    { number: "50+", label: "Team Members" },
    { number: "90m+", label: "Traffic Generated" },
  ];

  return (
    <section
      id="about"
      className="relative py-12 sm:py-16 lg:py-20 bg-white overflow-hidden"
    >
      {/* SVG BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1440 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient
              id="aboutGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor="#007BFF" />
              <stop offset="100%" stopColor="#56CCF2" />
            </linearGradient>
          </defs>

          <path
            d="M0 420C220 500 420 340 640 420C860 500 1080 240 1440 320"
            stroke="url(#aboutGradient)"
            strokeWidth="4"
            fill="none"
            opacity="0.18"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-blue-600 uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-3">
            About The Team
          </p>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#13254A] leading-tight">
            A team of technical SEO experts ready to help you
          </h2>

          <p className="text-gray-500 mt-5 text-sm sm:text-base leading-7">
            Our team of technical SEO experts ensures your website is optimized
            for performance, crawlability, and rankings.
          </p>
        </div>

        {/* IMAGE */}
        <div className="relative mt-10 sm:mt-14">
          <div className="overflow-hidden rounded-[28px] shadow-xl">
            <Image
              src="/about.jpeg"
              alt="Our SEO team"
              width={1400}
              height={800}
              className="w-full h-[240px] sm:h-[360px] lg:h-[500px] object-cover"
            />
          </div>

          {/* STATS CARD */}
          <div className="relative z-20 max-w-5xl mx-auto bg-white rounded-[24px] shadow-[0_10px_50px_rgba(0,0,0,0.08)] grid grid-cols-2 lg:grid-cols-4 gap-6 px-6 sm:px-10 py-8 sm:py-10 mt-6 lg:-mt-20">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#13254A]">
                  {stat.number}
                </h3>

                <p className="text-gray-500 text-xs sm:text-sm mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}