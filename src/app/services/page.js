import ServiceCard from '@/components/service-card';

const services = [
  {
    icon: 'Search',
    title: 'Keyword Research',
    desc: 'In-depth keyword research to find the terms your audience searches for.',
    color: 'blue',
    slug: 'keyword-research',
  },
  {
    icon: 'Globe2',
    title: 'Website Optimization',
    desc: 'We optimize your site for speed, usability, and search performance.',
    color: 'green',
    slug: 'website-optimization',
  },
  {
    icon: 'Link',
    title: 'Link Building',
    desc: 'High-quality backlinks that boost credibility and rankings.',
    color: 'yellow',
    slug: 'link-building',
  },
  {
    icon: 'FileText',
    title: 'Content Marketing',
    desc: 'SEO-friendly content creation and promotion.',
    color: 'purple',
    slug: 'content-marketing',
  },
];

export default function ServicesPage() {
  return (
    <section id="services" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-blue-600 text-sm uppercase mb-3">Services</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
          Advanced SEO services to help your business grow
        </h2>
        <p className="text-gray-500 max-w-2xl mt-4 text-base">
          We offer advanced SEO services designed to increase your online visibility.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}