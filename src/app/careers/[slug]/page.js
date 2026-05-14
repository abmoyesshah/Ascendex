import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Briefcase, MapPin, Check } from 'lucide-react';

const jobData = {
  'open-positions': {
    title: 'SEO Content Writer',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    responsibilities: ['Create high-quality SEO content', 'Conduct keyword research', 'Optimize content for search engines', 'Collaborate with the SEO team'],
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const job = jobData[slug];
  return { title: job?.title, description: job?.description };
}

export default async function CareersSinglePage({ params }) {
  const { slug } = await params;
  const job = jobData[slug];
  if (!job) notFound();

  return (
    <div className="min-h-screen bg-white py-10 sm:py-14 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/careers" className="inline-flex items-center gap-2 text-blue-600 text-xs sm:text-sm font-semibold mb-6 sm:mb-8 lg:mb-10 hover:gap-3 transition">
          ← back to careers
        </Link>

        <div className="grid lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_360px] gap-8 lg:gap-12 xl:gap-16 items-start">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6 sm:mb-8">{job.title}</h1>
            <p className="text-gray-500 leading-7 text-sm sm:text-base md:text-lg max-w-3xl mb-8 sm:mb-10">{job.description}</p>

            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-14">
              <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span>San Francisco, CA</span>
              </div>
              <div className="w-px h-5 bg-gray-300 hidden sm:block" />
              <div className="flex items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm">
                <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <span>Full Time</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mb-10 sm:mb-14" />

            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">About the job posting</h2>
              <p className="text-gray-500 leading-7 text-sm sm:text-base md:text-lg">{job.description}</p>
            </section>

            <section className="mb-10 sm:mb-14">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">Job responsibilities</h2>
              <ul className="space-y-3 sm:space-y-4">
                {job.responsibilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base text-gray-600">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </section>

            <button className="bg-blue-600 hover:bg-blue-700 transition text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg text-sm sm:text-base">
              Apply Now
            </button>
          </div>

          <div className="lg:sticky lg:top-24">
            <div className="bg-white border border-gray-200 rounded-xl sm:rounded-2xl lg:rounded-[28px] p-5 sm:p-6 lg:p-8 shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-blue-50 flex items-center justify-center mb-5 sm:mb-6 lg:mb-8 mx-auto">
                <Image src="/document.png" alt="document" width={44} height={44} className="w-10 h-10 sm:w-11 sm:h-11" />
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 text-center">Apply now</h3>
              <p className="text-gray-500 leading-7 text-xs sm:text-sm text-center mb-5 sm:mb-6 lg:mb-8">
                Lorem ipsum dolor sit amet...
              </p>
              <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 sm:py-4 rounded-xl shadow-lg text-sm sm:text-base">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}