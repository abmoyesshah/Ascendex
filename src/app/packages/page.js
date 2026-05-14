import PackageCard from '../../components/package-card';

const packages = [
  { title: 'Standard', price: '999.99 USD', desc: 'Essential SEO services to boost your online visibility.', features: ['Keyword Research', 'Up to 5 keywords', '20–35 Backlinks', 'Normal Support'], slug: 'standard' },
  { title: 'Premium', price: '1,999.99 USD', desc: 'Comprehensive SEO solutions for maximum online growth.', features: ['Website Optimization', 'Up to 10 keywords', '40–50 Backlinks', 'Premium Support'], slug: 'premium' },
  { title: 'Deluxe', price: '4,999.99 USD', desc: 'Full-scale advanced SEO strategies for exceptional growth.', features: ['Advanced Technical SEO', 'Up to 30 keywords', '80–120 Backlinks', 'Instant Response Support'], slug: 'deluxe' },
];

export default function PackagesPage() {
  return (
    <section id="packages" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-blue-600 text-xs sm:text-sm uppercase mb-2 sm:mb-3 tracking-wide">Packages</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
          Advanced SEO packages to help you rank easily
        </h2>
        <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-2xl">
          Our packages now include SEO, AEO, and GEO strategies to cover every search surface.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 mt-8 sm:mt-10 lg:mt-12">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}