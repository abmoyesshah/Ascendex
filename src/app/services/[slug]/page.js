import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const serviceData = {
  'keyword-research': { title: 'Keyword Research', description: 'Find the perfect keywords for your SEO strategy.', image: '/seo-dashboard-preview.jpg' },
  'website-optimization': { title: 'Website Optimization', description: 'Optimize your website for speed, usability, and SEO.', image: '/seo-dashboard-preview.jpg' },
  'link-building': { title: 'Link Building', description: 'Build high-quality backlinks that increase your domain authority.', image: '/seo-dashboard-preview.jpg' },
  'content-marketing': { title: 'Content Marketing', description: 'Create engaging content that ranks and converts.', image: '/seo-dashboard-preview.jpg' },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];
  return { title: service?.title || 'Service', description: service?.description };
}

export default async function SingleServicePage({ params }) {
  const { slug } = await params;
  const service = serviceData[slug];
  if (!service) notFound();

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 xl:py-24 overflow-hidden bg-white">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-0 opacity-40">
          <path fill="none" stroke="#E0E7FF" strokeWidth="2" d="M0,224 C480,320 960,128 1440,224 L1440,320 L0,320 Z" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/services" className="text-blue-600 text-xs sm:text-sm mb-6 sm:mb-8 flex items-center gap-2 hover:gap-3 transition">
          ← Back to Services
        </Link>

        <div className="text-center">
          <p className="text-blue-500 uppercase text-xs sm:text-sm font-medium tracking-wide mb-2 sm:mb-3">{service.title}</p>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {service.title} services
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto mb-6 sm:mb-8 lg:mb-10 text-sm sm:text-base leading-relaxed">{service.description}</p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-10 sm:mb-14 lg:mb-20">
            <button className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition text-sm sm:text-base">Request a Quote</button>
            <button className="border border-gray-300 text-gray-700 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-gray-50 transition text-sm sm:text-base">Learn More</button>
          </div>
        </div>

        <div className="relative flex justify-center items-center mt-8 sm:mt-12 lg:mt-16">
          <div className="relative z-20 w-[260px] sm:w-[340px] md:w-[420px] h-[170px] sm:h-[210px] md:h-[260px] rounded-xl sm:rounded-2xl shadow-xl overflow-hidden bg-gray-100">
            <Image src={service.image} alt="Main Chart" fill className="object-cover" />
          </div>
          <div className="hidden sm:block absolute z-30 -translate-x-[100px] sm:-translate-x-[140px] md:-translate-x-[180px] -translate-y-[50px] sm:-translate-y-[65px] md:-translate-y-[80px] w-[150px] sm:w-[180px] md:w-[220px] h-[100px] sm:h-[120px] md:h-[150px] rounded-lg sm:rounded-xl shadow-lg overflow-hidden bg-gray-100">
            <Image src={service.image} alt="Keyword List" fill className="object-cover" />
          </div>
          <div className="hidden sm:block absolute z-30 translate-x-[120px] sm:translate-x-[160px] md:translate-x-[200px] translate-y-[25px] sm:translate-y-[30px] md:translate-y-[40px] w-[180px] sm:w-[220px] md:w-[280px] h-[120px] sm:h-[150px] md:h-[180px] rounded-lg sm:rounded-xl shadow-lg overflow-hidden bg-gray-100">
            <Image src={service.image} alt="Performance Graph" fill className="object-cover" />
          </div>
        </div>

        <div className="mt-12 sm:mt-16 lg:mt-20 max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-6 text-center">Our Process</h2>
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2">Competitor Analysis</h3>
              <p className="text-gray-600 text-xs sm:text-sm">We analyze your competitors' keyword strategies.</p>
            </div>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2">Search Intent Mapping</h3>
              <p className="text-gray-600 text-xs sm:text-sm">We categorize keywords by user intent.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
