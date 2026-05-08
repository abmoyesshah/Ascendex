import PackageCard from '../../components/package-card';

const packages = [
  {
    title: 'Standard',
    price: '999.99 USD',
    desc: 'Essential SEO services to boost your online visibility.',
    features: ['Keyword Research', 'Up to 5 keywords', '20–35 Backlinks', 'Normal Support'],
    slug: 'standard',
  },
  {
    title: 'Premium',
    price: '1,999.99 USD',
    desc: 'Comprehensive SEO solutions for maximum online growth.',
    features: ['Website Optimization', 'Up to 10 keywords', '40–50 Backlinks', 'Premium Support'],
    slug: 'premium',
  },
  {
    title: 'Deluxe',
    price: '4,999.99 USD',
    desc: 'Full-scale advanced SEO strategies for exceptional growth.',
    features: ['Advanced Technical SEO', 'Up to 30 keywords', '80–120 Backlinks', 'Instant Response Support'],
    slug: 'deluxe',
  },
];

export default function PackagesPage() {
  return (
    <section id="packages" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-blue-600 text-sm uppercase mb-3">Packages</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Advanced SEO packages to help you rank easily
        </h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {packages.map((pkg) => (
            <PackageCard key={pkg.slug} pkg={pkg} />
          ))}
        </div>
      </div>
    </section>
  );
}