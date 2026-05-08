import Link from 'next/link';
import { Search, Globe2, Link as LinkIcon, FileText } from 'lucide-react';

const iconMap = {
  Search,
  Globe2,
  Link: LinkIcon,
  FileText,
};

export default function ServiceCard({ service }) {
  const IconComponent = iconMap[service.icon];
  return (
    <Link href={`/services/${service.slug}`} className="block group">
      <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 hover:shadow-xl transition cursor-pointer">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-${service.color}-100`}>
          {IconComponent && <IconComponent className={`w-6 h-6 text-${service.color}-600`} />}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{service.desc}</p>
      </div>
    </Link>
  );
}