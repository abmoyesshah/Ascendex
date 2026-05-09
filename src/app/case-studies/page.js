import Link from 'next/link';
import Image from 'next/image';

const caseStudies = [
  { slug: 'webflow-seo', title: 'How we helped improve Company users retention', category: 'SEO', image: '/case_study_2.jpeg', author: 'Clark Howell', date: 'October 15, 2024' },
  { slug: 'brand-presence', title: '5 Proven Strategies to Boost Your Online Brand', category: 'Marketing', image: '/case_study_1.jpeg', author: 'Emma Johnson', date: 'November 2, 2024' },
];

export default function CaseStudyPage() {
  return (
    <section id="case-studies" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-blue-600 text-xs sm:text-sm uppercase mb-2 sm:mb-3 tracking-wide">Case Study</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
          Great past results obtained by our agency
        </h2>
        <p className="text-gray-500 text-sm sm:text-base max-w-2xl mb-8 sm:mb-10 lg:mb-12">
          Our agency has a proven track record of delivering exceptional SEO results.
        </p>

        <div className="space-y-8 sm:space-y-0">
          {caseStudies.map((cs) => (
            <div key={cs.slug} className="relative flex justify-center items-center rounded-2xl sm:rounded-[2.5rem] pb-4 sm:pb-5 overflow-hidden">
              <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-4 sm:gap-6 lg:gap-8">
                <div className="w-full lg:w-[55%] xl:w-[60%] h-[200px] sm:h-[280px] lg:h-[350px] xl:h-[400px] bg-white rounded-xl sm:rounded-2xl lg:rounded-[2rem] shadow-md sm:shadow-lg overflow-hidden z-0">
                  <Image src={cs.image} alt={cs.title} fill className="object-cover rounded-xl sm:rounded-2xl lg:rounded-[2rem]" />
                </div>
                <Link href={`/case-studies/${cs.slug}`} className="w-full lg:w-[45%] xl:w-[40%] h-auto bg-white rounded-xl sm:rounded-[1.75rem] shadow-md sm:shadow-lg lg:shadow-xl z-10 flex flex-col justify-center px-4 sm:px-6 py-5 sm:py-6 lg:py-8 lg:absolute lg:top-6 xl:top-10 lg:left-4 xl:left-8 lg:-translate-x-4 xl:-translate-x-6 cursor-pointer hover:shadow-xl transition">
                  <span className="inline-block self-start bg-blue-100 text-blue-600 text-[10px] sm:text-xs px-2.5 sm:px-3 py-1 rounded-full mb-2 sm:mb-3">{cs.category}</span>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3">{cs.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Learn how we achieved incredible growth for our clients.</p>
                  <div className="flex items-center text-xs sm:text-sm text-gray-500">
                    <Image src="/avatar.jpg" alt={cs.author} width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8 rounded-full mr-2 sm:mr-3 object-cover" />
                    <div>
                      <p className="font-medium text-gray-900">{cs.author}</p>
                      <p className="text-gray-500 text-[10px] sm:text-xs">{cs.date}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}






// import Link from 'next/link';
// import Image from 'next/image';

// const caseStudies = [
//   {
//     slug: 'webflow-seo',
//     title: 'How to do Keyword Research for SEO: A Simple Step-by-Step Guide',
//     category: 'SEO',
//     image: '/case_study_2.jpeg',
//     author: 'Clark Howell',
//     date: 'October 15, 2024',
//   },
//   {
//     slug: 'brand-presence',
//     title: '5 Proven Strategies to Boost Your Online Brand Presence',
//     category: 'Marketing',
//     image: '/case_study_1.jpeg',
//     author: 'Emma Johnson',
//     date: 'November 2, 2024',
//   },
// ];

// export default function CaseStudyPage() {
//   return (
//     <section id="case-studies" className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
//           <div className="max-w-2xl">
//             <p className="text-blue-600 text-sm uppercase mb-3">case study</p>
//             <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
//               Great past results obtained by our agency
//             </h2>
//             <p className="text-gray-500 text-sm sm:text-base mt-4">
//               Our agency has a proven track record of delivering exceptional SEO results.
//             </p>
//           </div>
//           <Link href="/contact" className="mt-6 lg:mt-0 bg-blue-600 text-white text-sm font-medium px-8 py-3 rounded-xl hover:bg-blue-700 transition text-center">
//             Contact us
//           </Link>
//         </div>

//         <div className="space-y-8 sm:space-y-0">
//           {caseStudies.map((cs) => (
//             <div key={cs.slug} className="relative flex justify-center items-center rounded-2xl sm:rounded-[2.5rem] pb-6 sm:pb-5 overflow-hidden">
//               <div className="relative flex flex-col lg:flex-row items-center justify-center w-full max-w-7xl gap-6 sm:gap-8">
//                 <div className="lg:ml-auto w-full lg:w-[620px] xl:w-[760px] h-[280px] sm:h-[350px] lg:h-[400px] xl:h-[440px] bg-white rounded-2xl sm:rounded-[2rem] shadow-lg overflow-hidden z-0">
//                   <Image src={cs.image} alt={cs.title} fill className="object-cover rounded-2xl sm:rounded-[2rem]" />
//                 </div>
//                 <Link
//                   href={`/case-studies/${cs.slug}`}
//                   className="w-full lg:w-[480px] xl:w-[540px] h-auto lg:h-[320px] xl:h-[360px] bg-white rounded-xl sm:rounded-[1.75rem] shadow-lg sm:shadow-xl z-10 flex flex-col justify-center px-4 sm:px-6 py-6 sm:py-8 lg:absolute lg:top-8 xl:top-14 lg:left-4 xl:left-8 lg:-translate-x-4 xl:-translate-x-6 cursor-pointer hover:shadow-xl sm:hover:shadow-2xl transition"
//                 >
//                   <span className="inline-block self-start bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full mb-3 sm:mb-4">
//                     {cs.category}
//                   </span>
//                   <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{cs.title}</h3>
//                   <p className="text-gray-600 text-sm mb-4 sm:mb-6">Learn how we achieved incredible growth for our clients.</p>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <Image src="/avatar.jpg" alt={cs.author} width={32} height={32} className="rounded-full mr-3 object-cover" />
//                     <div>
//                       <p className="font-medium text-gray-900">{cs.author}</p>
//                       <p className="text-gray-500 text-xs">{cs.date}</p>
//                     </div>
//                   </div>
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }