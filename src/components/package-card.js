import Link from 'next/link';
import { Check, BarChart3 } from 'lucide-react';

export default function PackageCard({ pkg }) {
  return (
    <Link href={`/packages/${pkg.slug}`} className="block group h-full">
      <div className="w-full bg-white rounded-2xl sm:rounded-[1.75rem] shadow-lg sm:shadow-xl p-5 sm:p-6 lg:p-8 hover:shadow-xl sm:hover:shadow-2xl transition cursor-pointer h-full flex flex-col border border-gray-100">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4 sm:mb-6">
          <BarChart3 className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-1">{pkg.title}</h3>
        <p className="text-gray-900 text-lg sm:text-xl font-semibold mb-3 sm:mb-4">{pkg.price}</p>
        <p className="text-gray-500 text-xs sm:text-sm mb-4 sm:mb-6 leading-relaxed">{pkg.desc}</p>
        <h4 className="font-semibold text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">What's included?</h4>
        <ul className="space-y-1.5 sm:space-y-2 text-gray-700 text-xs sm:text-sm mb-6 sm:mb-8">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
        <button className="mt-auto w-full py-2.5 sm:py-3 bg-blue-600 text-white text-xs sm:text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
          Add to Cart
        </button>
      </div>
    </Link>
  );
}





// import Link from 'next/link';
// import { Check, BarChart3 } from 'lucide-react';

// export default function PackageCard({ pkg }) {
//   return (
//     <Link href={`/packages/${pkg.slug}`} className="block group">
//       <div className="w-full bg-white rounded-[1.75rem] shadow-xl p-8 hover:shadow-2xl transition cursor-pointer h-full flex flex-col">
//         <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-6">
//           <BarChart3 className="text-blue-600 w-6 h-6" />
//         </div>
//         <h3 className="text-2xl font-semibold text-gray-900 mb-1">{pkg.title}</h3>
//         <p className="text-gray-900 text-xl font-semibold mb-4">{pkg.price}</p>
//         <p className="text-gray-500 text-sm mb-6">{pkg.desc}</p>
//         <h4 className="font-semibold text-gray-900 mb-3">What's included?</h4>
//         <ul className="space-y-2 text-gray-700 text-sm mb-8">
//           {pkg.features.map((f, i) => (
//             <li key={i} className="flex items-center gap-2">
//               <Check className="w-4 h-4 text-blue-600" />
//               {f}
//             </li>
//           ))}
//         </ul>
//         <button className="mt-auto w-full py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition">
//           Add to Cart
//         </button>
//       </div>
//     </Link>
//   );
// }