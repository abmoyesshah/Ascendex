"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRightIcon } from "@heroicons/react/24/solid";

export default function HeroSearch() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleAnalyze = async () => {
    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const fullUrl = url.startsWith("http") ? url : `https://${url}`;
      router.push(`/report?url=${encodeURIComponent(fullUrl)}`);
    } catch (err) {
      setError("Failed to start analysis");
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleAnalyze();
  };

  return (
    <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
      {error && <p className="text-red-500 text-xs sm:text-sm text-center mb-2">{error}</p>}
      <div className="relative flex items-center bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full overflow-hidden transition-colors shadow-sm">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter your website URL (e.g., example.com)"
          className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 py-2.5 sm:py-3 pl-4 sm:pl-5 pr-2 text-base"
          disabled={isLoading}
        />
        {/* Circle button */}
        <button
          onClick={handleAnalyze}
          disabled={isLoading}
          className="group relative shrink-0 w-7 h-7 sm:w-8 sm:h-8 mr-2 flex items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full" />
          <span className="relative flex items-center justify-center">
            {isLoading ? (
              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <ArrowRightIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </span>
        </button>
      </div>
    </div>
  );
}






// "use client";
// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function HeroSearch() {
//   const [url, setUrl] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const router = useRouter();

//   const handleAnalyze = async () => {
//     if (!url.trim()) {
//       setError("Please enter a website URL");
//       return;
//     }
//     setIsLoading(true);
//     setError("");
//     try {
//       const fullUrl = url.startsWith("http") ? url : `https://${url}`;
//       router.push(`/report?url=${encodeURIComponent(fullUrl)}`);
//     } catch (err) {
//       setError("Failed to start analysis");
//       setIsLoading(false);
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") handleAnalyze();
//   };

//   return (
//     <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
//       {error && <p className="text-red-500 text-xs sm:text-sm text-center mb-2">{error}</p>}
//       <div className="relative flex items-center bg-white border-2 border-gray-200 hover:border-gray-300 rounded-full overflow-hidden transition-colors shadow-sm">
//         <input
//           type="text"
//           value={url}
//           onChange={(e) => setUrl(e.target.value)}
//           onKeyPress={handleKeyPress}
//           placeholder="Enter your website URL (e.g., example.com)"
//           className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder:text-gray-400 py-2.5 sm:py-3 pl-4 sm:pl-5 pr-2 text-base"
//           disabled={isLoading}
//         />
//         <button
//           onClick={handleAnalyze}
//           disabled={isLoading}
//           className="group relative shrink-0 mr-1 sm:mr-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-semibold text-white text-sm sm:text-base transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
//         >
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full" />
//           <span className="relative flex items-center gap-1 sm:gap-1.5 whitespace-nowrap">
//             {isLoading ? (
//               <>
//                 <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                 Analyzing...
//               </>
//             ) : (
//               "Analyze SEO"
//             )}
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// }