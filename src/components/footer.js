"use client";
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-8 sm:mb-10">
          <div className="col-span-2 sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <div className="p-1.5 sm:p-2 bg-blue-600/10 rounded-lg sm:rounded-xl">
                <Search className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
              </div>
              <span className="font-semibold text-gray-900 text-base sm:text-lg">SEO</span>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-xs">The #1 SEO agency for fast-growing companies.</p>
          </div>
          {[
            { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
            { title: 'Company', links: ['About', 'Blog', 'Careers'] },
            { title: 'Resources', links: ['Docs', 'API', 'Support'] },
          ].map((col, i) => (
            <div key={i}>
              <h4 className="font-semibold text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">{col.title}</h4>
              <ul className="space-y-1.5 sm:space-y-2">
                {col.links.map((link, j) => (
                  <li key={j}>
                    <Link href={`/${link.toLowerCase()}`} className="text-gray-600 text-xs sm:text-sm hover:text-blue-600 transition-colors">{link}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-100 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-gray-600 text-xs sm:text-sm">© 2025 SEO Agency. All rights reserved.</p>
          <div className="flex gap-4 sm:gap-6">
            {['Privacy', 'Terms', 'Cookies'].map((item, i) => (
              <Link key={i} href={`/${item.toLowerCase()}`} className="text-gray-600 text-xs sm:text-sm hover:text-blue-600 transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}






// "use client";

// import Link from 'next/link';
// import { Search } from 'lucide-react';

// export default function Footer() {
//   return (
//     <footer className="bg-white border-t border-gray-100">
//       <div className="max-w-7xl mx-auto px-6 py-10">
//         <div className="grid md:grid-cols-4 gap-10 mb-10">
//           <div>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="p-2 bg-blue-600/10 rounded-xl">
//                 <Search className="w-5 h-5 text-blue-600" />
//               </div>
//               <span className="font-semibold text-gray-900 text-lg">SEO</span>
//             </div>
//             <p className="text-gray-600 text-sm leading-relaxed">
//               The #1 SEO agency for fast-growing companies.
//             </p>
//           </div>
//           {[
//             { title: 'Product', links: ['Features', 'Pricing', 'Security'] },
//             { title: 'Company', links: ['About', 'Blog', 'Careers'] },
//             { title: 'Resources', links: ['Docs', 'API', 'Support'] },
//           ].map((col, i) => (
//             <div key={i}>
//               <h4 className="font-semibold text-gray-900 mb-4">{col.title}</h4>
//               <ul className="space-y-2">
//                 {col.links.map((link, j) => (
//                   <li key={j}>
//                     <Link
//                       href={`/${link.toLowerCase()}`}
//                       className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
//                     >
//                       {link}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//         <div className="border-t border-gray-100 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
//           <p className="text-gray-600 text-sm">© 2025 SEO Agency. All rights reserved.</p>
//           <div className="flex gap-6">
//             {['Privacy', 'Terms', 'Cookies'].map((item, i) => (
//               <Link
//                 key={i}
//                 href={`/${item.toLowerCase()}`}
//                 className="text-gray-600 text-sm hover:text-blue-600 transition-colors"
//               >
//                 {item}
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }