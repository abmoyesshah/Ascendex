import Link from 'next/link';
import Image from 'next/image';

export default function CareersPage() {
  return (
    <section id="careers" className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <p className="text-blue-600 text-sm uppercase mb-3">Careers</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
          Join the #1 SEO agency in the world
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-4">
          Partner with the world's leading SEO agency.
        </p>
        <Link href="/careers/open-positions" className="mt-8 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
          Open Positions
        </Link>
        <div className="mt-12 flex justify-center">
          <Image src="/join.jpg" alt="Our team working" width={800} height={400} className="rounded-3xl shadow-md object-cover" style={{ width: '100%', height: 'auto' }} />
        </div>
      </div>
    </section>
  );
}