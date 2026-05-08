import { MapPin, Phone, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-blue-600 text-sm uppercase text-center mb-3">Contact us</p>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center">Let's work together</h2>
        <div className="mt-12 grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="John" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                  <input type="text" required className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Doe" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input type="email" required className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="john@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company</label>
                <input type="text" className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Your company name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Details *</label>
                <textarea required rows={4} className="w-full px-4 py-2 border border-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Tell us about your SEO goals..." />
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2">
                Send Message
              </button>
            </form>
          </div>

          {/* Map & Info */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Location</h2>
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl h-64 flex items-center justify-center mb-6">
              <div className="text-center">
                <MapPin className="w-12 h-12 mx-auto text-blue-600" />
                <p className="text-lg font-semibold">San Francisco Office</p>
                <p>123 Business Avenue, Suite 100, CA 94107</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Business Hours</p>
                  <p className="text-gray-600 text-sm">Mon-Fri: 9:00 AM - 6:00 PM PST</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Office Phone</p>
                  <p className="text-gray-600 text-sm">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}