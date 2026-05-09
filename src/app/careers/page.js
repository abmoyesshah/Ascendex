import Link from 'next/link';
import Image from 'next/image';

export default function CareersPage() {
  return (
    <section id="careers" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-blue-600 text-xs sm:text-sm uppercase mb-2 sm:mb-3 tracking-wide">Careers</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900">
          Join the #1 SEO agency in the world
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-3 sm:mt-4 text-sm sm:text-base">
          Partner with the world's leading SEO agency.
        </p>
        <Link href="/careers/open-positions" className="mt-6 sm:mt-8 inline-block bg-blue-600 text-white px-5 sm:px-6 lg:px-8 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base">
          Open Positions
        </Link>
        <div className="mt-8 sm:mt-10 lg:mt-12 flex justify-center">
          <Image src="/join.jpg" alt="Our team working" width={800} height={400} className="rounded-2xl sm:rounded-3xl shadow-md object-cover w-full max-w-4xl" />
        </div>
      </div>
    </section>
  );
}