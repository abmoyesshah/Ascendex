import Link from 'next/link';
import Image from 'next/image';

export default function CareersPage() {
  return (
    <section id="careers" className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* LABEL */}
        <p className="text-blue-600 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] mb-3">
          Careers
        </p>

        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-[#13254A] leading-tight">
          Join the #1 SEO agency
          <br className="hidden sm:block" />
          in the world
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-500 max-w-2xl mx-auto mt-4 text-sm sm:text-base lg:text-lg leading-relaxed">
          Partner with the world's leading SEO agency and take your
          business to new heights with proven SEO growth strategies.
        </p>

        {/* BUTTON */}
        <Link
          href="/careers/open-positions"
          className="mt-7 inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-blue-100 text-sm sm:text-base"
        >
          Open Positions
        </Link>
      </div>

      {/* IMAGE */}
      <div className="mt-10 sm:mt-14 lg:mt-16 w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
          <div className="relative w-full h-[240px] sm:h-[320px] md:h-[420px] lg:h-[500px]">
            <Image
              src="/join.jpg"
              alt="Team working"
              fill
              priority
              className="object-cover object-center"
            />
          </div>
        </div>
      </div>
    </section>
  );
}