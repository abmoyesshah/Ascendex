import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const serviceData = {
  'keyword-research': {
    title: 'Keyword Research',
    description: 'Find the perfect keywords for your SEO strategy.',
    image: '/seo-dashboard-preview.jpg',
  },
  'website-optimization': {
    title: 'Website Optimization',
    description: 'Optimize your website for speed, usability, and SEO.',
    image: '/seo-dashboard-preview.jpg',
  },
  'link-building': {
    title: 'Link Building',
    description: 'Build high-quality backlinks that increase your domain authority.',
    image: '/seo-dashboard-preview.jpg',
  },
  'content-marketing': {
    title: 'Content Marketing',
    description: 'Create engaging content that ranks and converts.',
    image: '/seo-dashboard-preview.jpg',
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];
  return {
    title: service?.title || 'Service',
    description: service?.description,
  };
}

export default async function SingleServicePage({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) notFound();

  return (
    <section className="relative py-24 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 opacity-40">
          <path fill="none" stroke="#E0E7FF" strokeWidth="2" d="M0,224 C480,320 960,128 1440,224 L1440,320 L0,320 Z" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        <Link href="/services" className="text-blue-600 text-sm mb-8 flex items-center gap-2 hover:gap-3 transition">
          ← Back to Services
        </Link>

        <div className="text-center">
          <p className="text-blue-500 uppercase text-sm font-medium tracking-wide mb-3">{service.title}</p>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            {service.title} to find the <br className="hidden sm:block" />
            perfect <span className="text-blue-600">SEO keywords</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-10 text-base leading-relaxed">{service.description}</p>

          <div className="flex justify-center gap-4 mb-24">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">Request a Quote</button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition">Learn More</button>
          </div>
        </div>

        {/* Overlapping cards */}
        <div className="relative flex justify-center items-center mt-20">
          <div className="relative z-20 w-[420px] h-[260px] rounded-2xl shadow-2xl overflow-hidden bg-gray-100">
            <Image src={service.image} alt="Main SEO Chart" fill className="object-cover" />
          </div>
          <div className="absolute z-30 -translate-x-[180px] -translate-y-[80px] w-[220px] h-[150px] rounded-xl shadow-xl overflow-hidden bg-gray-100">
            <Image src={service.image} alt="Keyword List" fill className="object-cover" />
          </div>
          <div className="absolute z-30 translate-x-[200px] translate-y-[40px] w-[280px] h-[180px] rounded-xl shadow-xl overflow-hidden bg-gray-100">
            <Image src={service.image} alt="Performance Graph" fill className="object-cover" />
          </div>
        </div>

        <div className="mt-24 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Process</h2>
          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitor Analysis</h3>
              <p className="text-gray-600">We analyze your competitors' keyword strategies.</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Search Intent Mapping</h3>
              <p className="text-gray-600">We categorize keywords by user intent.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}