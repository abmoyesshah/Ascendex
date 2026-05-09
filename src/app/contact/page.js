import { MapPin, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-blue-600 text-xs sm:text-sm uppercase text-center mb-2 sm:mb-3 tracking-wide">Contact us</p>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 text-center">
          Let's work together
        </h2>
        <div className="mt-8 sm:mt-10 lg:mt-12 grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Send us a Message</h2>
            <form className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">First Name *</label>
                  <input type="text" required className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="John" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Last Name *</label>
                  <input type="text" required className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Email Address *</label>
                <input type="email" required className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Company</label>
                <input type="text" className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm" placeholder="Your company name" />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">Project Details *</label>
                <textarea required rows={4} className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none text-sm" placeholder="Tell us about your SEO goals..." />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 sm:py-3.5 rounded-lg hover:bg-blue-700 transition text-sm sm:text-base">
                Send Message
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Our Location</h2>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-40 sm:h-48 lg:h-56 flex items-center justify-center mb-4 sm:mb-6">
              <div className="text-center px-4">
                <MapPin className="w-10 h-10 sm:w-12 sm:h-12 mx-auto text-blue-600 mb-2" />
                <p className="text-base sm:text-lg font-semibold text-gray-900">San Francisco Office</p>
                <p className="text-xs sm:text-sm text-gray-600">123 Business Avenue, Suite 100, CA 94107</p>
              </div>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 text-xs sm:text-sm">Business Hours</p>
                  <p className="text-gray-600 text-xs sm:text-sm">Mon-Fri: 9:00 AM - 6:00 PM PST</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2.5 sm:p-3 bg-gray-50 rounded-lg">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 text-xs sm:text-sm">Office Phone</p>
                  <p className="text-gray-600 text-xs sm:text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}






// import { MapPin, Phone, Clock } from 'lucide-react';

// export default function ContactPage() {
//   return (
//     <section id="contact" className="py-16 bg-white">
//       <div className="max-w-7xl mx-auto px-6">
//         <p className="text-blue-600 text-sm uppercase text-center mb-3">Contact us</p>
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center">Let's work together</h2>
//         <div className="mt-12 grid lg:grid-cols-2 gap-12">
//           {/* Form */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
//             <form className="space-y-6">
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                   <input type="text" required className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="John" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                   <input type="text" required className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//                 <input type="email" required className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="john@company.com" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
//                 <input type="text" className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Your company name" />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
//                 <textarea required rows={4} className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Tell us about your SEO goals..." />
//               </div>
//               <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
//                 Send Message
//               </button>
//             </form>
//           </div>

//           {/* Map & Info */}
//           <div>
//             <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
//             <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center mb-6">
//               <div className="text-center">
//                 <MapPin className="w-12 h-12 mx-auto text-blue-600" />
//                 <p className="text-lg font-semibold">San Francisco Office</p>
//                 <p>123 Business Avenue, Suite 100, CA 94107</p>
//               </div>
//             </div>
//             <div className="space-y-3">
//               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                 <Clock className="w-5 h-5 text-blue-600" />
//                 <div>
//                   <p className="font-medium text-gray-900">Business Hours</p>
//                   <p className="text-gray-600 text-sm">Mon-Fri: 9:00 AM - 6:00 PM PST</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
//                 <Phone className="w-5 h-5 text-blue-600" />
//                 <div>
//                   <p className="font-medium text-gray-900">Office Phone</p>
//                   <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }