export default function LoginRequiredModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white max-h-[85vh] sm:max-h-[80%] rounded-2xl w-full max-w-lg sm:max-w-xl shadow-2xl overflow-auto">
        <div className="p-4 sm:p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-cyan-50">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Before Starting AI-Assisted SEO
            </h2>
            <button onClick={onClose} className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition flex-shrink-0">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <p className="text-gray-600 text-xs sm:text-sm mt-2">To proceed with Code Base SEO analysis, please ensure you have completed the following:</p>
        </div>

        <div className="p-4 sm:p-6">
          <div className="bg-blue-50/50 p-3 sm:p-4 rounded-lg border border-blue-100">
            <ul className="text-xs sm:text-sm text-gray-600 space-y-1.5 sm:space-y-2">
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> The repository must be <span className="font-medium">public</span>.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> If it's private, the repo admin must re-push the updated code after SEO changes are applied.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> Provide a valid GitHub token with repo scope for us to analyze and update your repository.</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> GitHub Repository URL</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> GitHub Username</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> GitHub Account Email</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> The live website URL you want to optimize</li>
              <li className="flex items-start gap-2"><span className="text-blue-500 mt-0.5">•</span> <span className="font-medium text-amber-600">Important:</span> Download the CSV SEO report after checking your website SEO score in the earlier step. Upload that CSV file here before executing.</li>
            </ul>
          </div>
        </div>

        <div className="p-4 sm:p-6 bg-gradient-to-b from-gray-50 to-white border-t border-gray-100">
          <div className="text-center mb-6 sm:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 mb-3 sm:mb-4">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 sm:mb-2">Login Required</h3>
            <p className="text-gray-600 text-xs sm:text-sm">You need to login first to access AI-Assisted SEO features and start the setup process.</p>
          </div>
          <button onClick={onLogin} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3 sm:py-3.5 rounded-lg hover:shadow-lg transition text-sm sm:text-base">
            Login to Continue
          </button>
          <button onClick={onClose} className="w-full py-2.5 sm:py-3 mt-2 sm:mt-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm sm:text-base">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}