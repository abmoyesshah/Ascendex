import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Check, ChevronDown, BarChart3 } from 'lucide-react';

const packageData = {
  standard: { title: 'Standard', price: '$999.99 USD', description: 'Our Standard package offers essential SEO services.', features: ['Keyword Research', 'Ranking for 5 Keywords', '20–35 Backlinks', 'Normal Support'] },
  premium: { title: 'Premium', price: '$1,999.99 USD', description: 'Our Premium package provides comprehensive SEO solutions.', features: ['Website Optimization', 'Ranking for 10 Keywords', '40–50 Backlinks', 'Premium Support'] },
  deluxe: { title: 'Deluxe', price: '$4,999.99 USD', description: 'Our Deluxe package delivers advanced enterprise-level SEO.', features: ['Advanced Technical SEO', 'Ranking for 30 Keywords', '80–120 Backlinks', 'Instant Response Support'] },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const pkg = packageData[slug];
  return { title: pkg?.title, description: pkg?.description };
}

export default async function PackageSinglePage({ params }) {
  const { slug } = await params;
  const pkg = packageData[slug];
  if (!pkg) notFound();

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        <Link href="/packages" className="text-blue-600 text-xs sm:text-sm font-semibold mb-8 sm:mb-10 inline-flex items-center gap-2">
          ← Back to Packages
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 items-start">
          <div>
            <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-2xl bg-white shadow-sm border border-gray-100 flex items-center justify-center mb-6 sm:mb-8">
              <BarChart3 className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-blue-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 sm:mb-5">{pkg.title}</h1>
            <p className="text-gray-500 leading-7 text-sm sm:text-base lg:text-lg max-w-md mb-8 sm:mb-10">{pkg.description}</p>
            <h3 className="text-gray-900 font-semibold mb-4 sm:mb-5 text-sm sm:text-base">What's Included?</h3>
            <div className="space-y-3 sm:space-y-4">
              {pkg.features.map((item, i) => (
                <div key={i} className="flex items-center gap-3 sm:gap-4">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#F8FAFF] border border-[#D9E5FF] rounded-2xl md:rounded-[24px] p-5 sm:p-6 lg:p-8 shadow-sm max-w-md lg:ml-auto">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">Order your package today!</h2>
            <p className="text-gray-500 text-xs sm:text-sm lg:text-base leading-7 mb-6 sm:mb-8">Lorem ipsum dolor sit amet...</p>
            <div className="mb-5 sm:mb-7">
              <label className="text-xs sm:text-sm font-semibold text-gray-900 block mb-2 sm:mb-3">Subscription</label>
              <div className="h-12 sm:h-14 lg:h-[56px] border border-gray-300 rounded-xl px-4 flex items-center justify-between bg-white">
                <span className="text-gray-500 text-xs sm:text-sm">Select Subscription</span>
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </div>
            </div>
            <div className="mb-5 sm:mb-7">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">{pkg.price}</h3>
            </div>
            <button className="w-full h-12 sm:h-14 lg:h-[56px] rounded-xl bg-blue-600 hover:bg-blue-700 transition-all text-white font-semibold text-sm sm:text-base">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
