"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import { analyzeSEO } from "../lib/seo-api";
import { ChartCard } from "./report/ChartCard";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import LoginRequiredModal from "./report/LoginRequiredModal";

const ACCENT = "#2563eb";
const CARD_CLASS = "bg-white rounded-2xl shadow-md p-3 sm:p-4 md:p-6 transition-transform hover:scale-[1.01]";

function Card({ children, className = "" }) {
  return <div className={`${CARD_CLASS} ${className}`}>{children}</div>;
}

function Sparkline({ series }) {
  return (
    <div style={{ width: 120, height: 46 }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series}>
          <defs>
            <linearGradient id="sparkBlue" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor={ACCENT} stopOpacity={0.5} />
              <stop offset="100%" stopColor={ACCENT} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="y" type="monotone" stroke={ACCENT} fill="url(#sparkBlue)" strokeWidth={2} dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default function ReportContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [previewPage, setPreviewPage] = useState(0);
  const router = useRouter();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dashboardData = useMemo(() => {
    if (!analysis || analysis.status === "error") return {};
    const metrics = [
      { id: "seoScore", label: "SEO Score", value: analysis.overall_score, sub: `${analysis.pages_analyzed} pages analyzed` },
      { id: "strengths", label: "Strengths", value: analysis.strengths.length, sub: "Positive factors" },
      { id: "issues", label: "Issues Found", value: analysis.faults.length, sub: "Need attention" },
      { id: "suggestions", label: "AI Suggestions", value: analysis.suggestions.length, sub: "Actionable tips" },
    ];
    const donut = [
      { name: "Score", value: analysis.overall_score },
      { name: "Needs Work", value: 100 - analysis.overall_score },
    ];
    const areaSeries = [
      { x: "Score", y: analysis.overall_score },
      { x: "Pages", y: analysis.pages_analyzed * 10 },
      { x: "Strengths", y: analysis.strengths.length * 15 },
      { x: "Issues", y: analysis.faults.length * 8 },
      { x: "Suggestions", y: analysis.suggestions.length * 12 },
    ];
    const barSeriesLeft = analysis.strengths.slice(0, 5).map((s) => ({
      name: s.title.split(" ")[0],
      value: Math.min(s.detail.length * 2, 100),
    }));
    return { metrics, donut, areaSeries, barSeriesLeft };
  }, [analysis]);

  const donut = dashboardData.donut || [];
  const areaSeries = dashboardData.areaSeries || [];
  const barLeft = dashboardData.barSeriesLeft || [];

  useEffect(() => {
    async function loadAnalysis() {
      if (!url) { setError("No URL provided."); setLoading(false); return; }
      try {
        setLoading(true);
        const result = await analyzeSEO(url);
        setAnalysis(result);
      } catch (err) {
        setError(err.message || "Failed to load SEO analysis");
      } finally {
        setLoading(false);
      }
    }
    loadAnalysis();
  }, [url]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Analyzing SEO...</div>
          <div className="text-gray-500 text-sm">Please wait while we analyze {url}</div>
        </div>
      </div>
    );
  }

  if (error || analysis?.status === "error") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-red-600 mb-4">Analysis Failed</div>
          <div className="text-gray-600 mb-4 text-sm">{error || analysis?.message}</div>
          <Link href="/" className="bg-blue-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-block text-sm">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const scoreColor = analysis?.overall_score >= 80 ? "#10b981" : analysis?.overall_score >= 60 ? "#f59e0b" : "#ef4444";

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
          <Link href="/" className="inline-flex items-center gap-2 text-blue-600 text-xs sm:text-sm font-medium mb-6 sm:mb-8 hover:gap-3 transition">
            <ArrowLeft size={16} className="sm:w-[18px] sm:h-[18px]" />
            Back to Website
          </Link>

          <div className="mb-6 sm:mb-8">
            <p className="text-blue-600 uppercase text-xs sm:text-sm font-medium tracking-wide mb-2">SEO Report</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">SEO Analysis Report</h1>
            <p className="text-gray-500 mt-2 text-xs sm:text-sm">{analysis?.url} • {analysis?.pages_analyzed} pages analyzed • {new Date().toLocaleString()}</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="lg:col-span-2 h-full">
              <Card className="h-full flex flex-col">
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div>
                    <p className="text-blue-500 uppercase text-[10px] sm:text-xs tracking-wide mb-1">Overall SEO Score</p>
                    <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{analysis?.overall_score ?? "—"}/100</div>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Based on analysis of {analysis?.pages_analyzed} pages</p>
                  </div>
                  <div className="bg-gray-100 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-600 self-start">{analysis?.url}</div>
                </div>

                <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-3 sm:gap-4">
                  <div className="bg-green-50 rounded-xl p-2 sm:p-3 text-center">
                    <p className="text-[10px] sm:text-xs text-gray-500">Strengths</p>
                    <p className="text-lg sm:text-2xl font-bold text-green-700">{analysis?.strengths.length ?? 0}</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-2 sm:p-3 text-center">
                    <p className="text-[10px] sm:text-xs text-gray-500">Issues</p>
                    <p className="text-lg sm:text-2xl font-bold text-red-700">{analysis?.faults.length ?? 0}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-2 sm:p-3 text-center">
                    <p className="text-[10px] sm:text-xs text-gray-500">Suggestions</p>
                    <p className="text-lg sm:text-2xl font-bold text-blue-700">{analysis?.suggestions.length ?? 0}</p>
                  </div>
                </div>

                <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 flex-1">
                  <div className="relative w-[160px] h-[160px] sm:w-[180px] sm:h-[180px] md:w-[200px] md:h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={[{ name: "Score", value: analysis?.overall_score ?? 0 }, { name: "Remaining", value: 100 - (analysis?.overall_score ?? 0) }]} dataKey="value" nameKey="name" innerRadius={60} outerRadius={85} startAngle={90} endAngle={-270} paddingAngle={0}>
                          <Cell fill={scoreColor} />
                          <Cell fill="#e5e7eb" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-center">
                        <span className="text-2xl sm:text-3xl font-bold text-gray-900">{analysis?.overall_score ?? "—"}%</span>
                        <p className="text-[10px] sm:text-xs text-gray-400">Score</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-2">
                    {donut.map((d) => (
                      <div key={d.name} className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full" style={{ background: d.name === "Score" ? scoreColor : "#e5e7eb" }} />
                        <span className="text-xs sm:text-sm text-gray-600">{d.name} <strong>{d.value}%</strong></span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <aside className="flex flex-col gap-4 sm:gap-6 h-full">
              <Card className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase">SEO Strengths</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{analysis?.strengths.length ?? "—"}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="text-[10px] sm:text-xs text-gray-500">Positive factors</p>
                    <div className="mt-1 sm:mt-2"><Sparkline series={areaSeries.slice(-6)} /></div>
                  </div>
                </div>
              </Card>
              <Card className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase">Issues Found</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{analysis?.faults.length ?? "—"}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Need attention</p>
                  </div>
                  <div className="w-20 sm:w-24 h-8 sm:h-10">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={areaSeries.slice(-5)}>
                        <Area dataKey="y" stroke={ACCENT} fill="url(#sparkBlue)" dot={false} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
              <Card className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between">
                  <div>
                    <p className="text-[10px] sm:text-xs text-gray-400 uppercase">AI Suggestions</p>
                    <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1 sm:mt-2">{analysis?.suggestions.length ?? "—"}</p>
                    <p className="text-[10px] sm:text-xs text-gray-500">Actionable tips</p>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-400">•••</p>
                </div>
                <div className="mt-2 sm:mt-3 h-16 sm:h-20">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barLeft} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
                      <XAxis dataKey="name" hide />
                      <Tooltip />
                      <Bar dataKey="value" fill={ACCENT} radius={[4, 4, 0, 0]} barSize={10} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>
            </aside>
          </div>

          <section className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <ChartCard title="SEO Strengths" subtitle="Top Strengths" count={analysis?.strengths?.length || 0} data={analysis?.strengths?.slice(0, 10) || []} type="strength" color="#1447E6" />
            <ChartCard title="SEO Issues" subtitle="Top Issues" count={analysis?.faults?.length || 0} data={analysis?.faults?.slice(0, 10) || []} type="issue" color="#1447E6" />
          </section>

          {analysis?.results_preview && analysis.results_preview.length > 0 && (
            <section className="mt-6 sm:mt-8">
              <Card>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Page Preview ({previewPage + 1} of {analysis.results_preview.length})</h3>
                  <div className="flex gap-2">
                    <button onClick={() => setPreviewPage(Math.max(0, previewPage - 1))} disabled={previewPage === 0} className="px-2 sm:px-3 py-1 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">← Previous</button>
                    <button onClick={() => setPreviewPage(Math.min(analysis.results_preview.length - 1, previewPage + 1))} disabled={previewPage === analysis.results_preview.length - 1} className="px-2 sm:px-3 py-1 rounded-lg border border-gray-300 text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition">Next →</button>
                  </div>
                </div>
                {(() => {
                  const page = analysis.results_preview[previewPage];
                  return (
                    <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-sm sm:text-base text-gray-800 mb-3 break-all">{page.url}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-6 gap-y-1.5 sm:gap-y-2 text-xs sm:text-sm text-gray-600">
                        <p><span className="font-semibold text-gray-800">Score:</span> {page.seo_score}/100</p>
                        <p><span className="font-semibold text-gray-800">Title:</span> {page.title}</p>
                        <p className="sm:col-span-2"><span className="font-semibold text-gray-800">Meta Description:</span> {page.meta_description}</p>
                        <p><span className="font-semibold text-gray-800">Word Count:</span> {page.word_count}</p>
                        <p><span className="font-semibold text-gray-800">H1 Count:</span> {page.h1_count}</p>
                        <p><span className="font-semibold text-gray-800">H2 Count:</span> {page.h2_count}</p>
                        <p><span className="font-semibold text-gray-800">Load Time:</span> {page.load_time} sec</p>
                      </div>
                    </div>
                  );
                })()}
              </Card>
            </section>
          )}

          <section className="mt-6 sm:mt-8 space-y-4 sm:space-y-6">
            {analysis?.strengths && analysis.strengths.length > 0 && (
              <Card>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 inline-block" /> Top Strengths
                </h3>
                <ul className="space-y-2 sm:space-y-3 list-disc pl-5 text-gray-700 text-xs sm:text-sm">
                  {analysis.strengths.map((s, i) => (
                    <li key={i}><strong className="text-green-800">{s.title}:</strong> {s.detail} <span className="text-[10px] sm:text-xs text-green-600 capitalize ml-1 sm:ml-2">(Impact: {s.impact})</span></li>
                  ))}
                </ul>
              </Card>
            )}
            {analysis?.faults && analysis.faults.length > 0 && (
              <Card>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 inline-block" /> Critical Issues
                </h3>
                <ul className="space-y-2 sm:space-y-3 list-disc pl-5 text-gray-700 text-xs sm:text-sm">
                  {analysis.faults.map((f, i) => (
                    <li key={i}><strong className="text-red-800">{f.title}:</strong> {f.detail} <span className="text-[10px] sm:text-xs text-red-600 capitalize ml-1 sm:ml-2">(Severity: {f.severity} • Pages: {f.pages})</span></li>
                  ))}
                </ul>
              </Card>
            )}
            {analysis?.suggestions && analysis.suggestions.length > 0 && (
              <Card>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 inline-block" /> AI Suggestions
                </h3>
                <ul className="space-y-2 sm:space-y-3 list-disc pl-5 text-gray-700 text-xs sm:text-sm">
                  {analysis.suggestions.map((s, i) => (
                    <li key={i}><strong className="text-blue-800">{s.title}:</strong> {s.detail} <span className="text-[10px] sm:text-xs text-blue-600 capitalize ml-1 sm:ml-2">(Priority: {s.priority})</span></li>
                  ))}
                </ul>
              </Card>
            )}
          </section>
        </div>
      </div>
      <LoginRequiredModal isOpen={isLoginRequiredOpen} onClose={() => setIsLoginRequiredOpen(false)} onLogin={() => { setIsLoginRequiredOpen(false); setIsLoginOpen(true); }} />
    </>
  );
}








// "use client";

// import { useEffect, useMemo, useState } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import {
//   AreaChart,
//   Area,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";
// import { analyzeSEO } from "../lib/seo-api";
// import { ChartCard } from "./report/ChartCard";
// import Link from "next/link";
// import { ArrowLeft } from "lucide-react";
// import LoginRequiredModal from "./report/LoginRequiredModal";

// /* ---------- Design tokens matching your landing page ---------- */
// const ACCENT = "#2563eb"; // blue-600
// const CARD_CLASS =
//   "bg-white rounded-2xl shadow-md p-4 md:p-6 transition-transform hover:scale-[1.01]";

// /* ---------- Card wrapper ---------- */
// function Card({ children, className = "" }) {
//   return <div className={`${CARD_CLASS} ${className}`}>{children}</div>;
// }

// /* ---------- Sparkline (using blue-600) ---------- */
// function Sparkline({ series }) {
//   return (
//     <div style={{ width: 120, height: 46 }}>
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart data={series}>
//           <defs>
//             <linearGradient id="sparkBlue" x1="0" x2="0" y1="0" y2="1">
//               <stop offset="0%" stopColor={ACCENT} stopOpacity={0.5} />
//               <stop offset="100%" stopColor={ACCENT} stopOpacity={0.05} />
//             </linearGradient>
//           </defs>
//           <Area
//             dataKey="y"
//             type="monotone"
//             stroke={ACCENT}
//             fill="url(#sparkBlue)"
//             strokeWidth={2}
//             dot={false}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// }

// /* ---------- Main Report Content ---------- */
// export default function ReportContent() {
//   const searchParams = useSearchParams();
//   const url = searchParams.get("url") || "";
//   const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [previewPage, setPreviewPage] = useState(0);
//   const router = useRouter();
//   const [analysis, setAnalysis] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const dashboardData = useMemo(() => {
//     if (!analysis || analysis.status === "error") return {};
//     const metrics = [
//       {
//         id: "seoScore",
//         label: "SEO Score",
//         value: analysis.overall_score,
//         sub: `${analysis.pages_analyzed} pages analyzed`,
//       },
//       {
//         id: "strengths",
//         label: "Strengths",
//         value: analysis.strengths.length,
//         sub: "Positive factors",
//       },
//       {
//         id: "issues",
//         label: "Issues Found",
//         value: analysis.faults.length,
//         sub: "Need attention",
//       },
//       {
//         id: "suggestions",
//         label: "AI Suggestions",
//         value: analysis.suggestions.length,
//         sub: "Actionable tips",
//       },
//     ];
//     const donut = [
//       { name: "Score", value: analysis.overall_score },
//       { name: "Needs Work", value: 100 - analysis.overall_score },
//     ];
//     const areaSeries = [
//       { x: "Score", y: analysis.overall_score },
//       { x: "Pages", y: analysis.pages_analyzed * 10 },
//       { x: "Strengths", y: analysis.strengths.length * 15 },
//       { x: "Issues", y: analysis.faults.length * 8 },
//       { x: "Suggestions", y: analysis.suggestions.length * 12 },
//     ];
//     const barSeriesLeft = analysis.strengths.slice(0, 5).map((s) => ({
//       name: s.title.split(" ")[0],
//       value: Math.min(s.detail.length * 2, 100),
//     }));
//     return { metrics, donut, areaSeries, barSeriesLeft };
//   }, [analysis]);

//   const donut = dashboardData.donut || [];
//   const areaSeries = dashboardData.areaSeries || [];
//   const barLeft = dashboardData.barSeriesLeft || [];

//   useEffect(() => {
//     async function loadAnalysis() {
//       if (!url) {
//         setError("No URL provided. Go back and enter a URL.");
//         setLoading(false);
//         return;
//       }
//       try {
//         setLoading(true);
//         const result = await analyzeSEO(url);
//         setAnalysis(result);
//       } catch (err) {
//         setError(err.message || "Failed to load SEO analysis");
//       } finally {
//         setLoading(false);
//       }
//     }
//     loadAnalysis();
//   }, [url]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div className="text-2xl font-bold text-gray-900 mb-4">
//             Analyzing SEO...
//           </div>
//           <div className="text-gray-500">
//             Please wait while we analyze {url}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (error || analysis?.status === "error") {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-white">
//         <div className="text-center">
//           <div className="text-2xl font-bold text-red-600 mb-4">
//             Analysis Failed
//           </div>
//           <div className="text-gray-600 mb-4">{error || analysis?.message}</div>
//           <Link
//             href="/"
//             className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition inline-block"
//           >
//             Back to Home
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   const scoreColor =
//     analysis?.overall_score >= 80
//       ? "#10b981"
//       : analysis?.overall_score >= 60
//         ? "#f59e0b"
//         : "#ef4444";

//   return (
//     <>
//       <div className="min-h-screen bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 text-blue-600 text-sm font-medium mb-8 hover:gap-3 transition"
//           >
//             <ArrowLeft size={18} />
//             Back to Website
//           </Link>

//           <div className="mb-6">
//             <p className="text-blue-600 uppercase text-sm font-medium tracking-wide mb-2">
//               SEO Report
//             </p>
//             <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold md:text-green-900 sm:text-red-900 lg:text-gray-900">
//               SEO Analysis Report
//             </h1>
//             <p className="text-gray-500 mt-2 text-sm">
//               {analysis?.url} • {analysis?.pages_analyzed} pages analyzed •{" "}
//               {new Date().toLocaleString()}
//             </p>
//           </div>

//           {/* Main grid – both columns stretch equally */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//             {/* LEFT COLUMN – Overall Score (now fills entire cell) */}
//             <div className="lg:col-span-2 h-full">
//               <Card className="h-full flex flex-col">
//                 <div className="flex flex-col sm:flex-row justify-between gap-4">
//                   <div>
//                     <p className="text-blue-500 uppercase text-xs tracking-wide mb-1">
//                       Overall SEO Score
//                     </p>
//                     <div className="text-4xl md:text-5xl font-bold text-gray-900">
//                       {analysis?.overall_score ?? "—"}/100
//                     </div>
//                     <p className="text-gray-500 text-sm mt-1">
//                       Based on analysis of {analysis?.pages_analyzed} pages
//                     </p>
//                   </div>
//                   <div className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-600 self-start">
//                     {analysis?.url}
//                   </div>
//                 </div>

//                 <div className="mt-6 grid grid-cols-3 gap-4">
//                   <div className="bg-green-50 rounded-xl p-3 text-center">
//                     <p className="text-xs text-gray-500">Strengths</p>
//                     <p className="text-2xl font-bold text-green-700">
//                       {analysis?.strengths.length ?? 0}
//                     </p>
//                   </div>
//                   <div className="bg-red-50 rounded-xl p-3 text-center">
//                     <p className="text-xs text-gray-500">Issues</p>
//                     <p className="text-2xl font-bold text-red-700">
//                       {analysis?.faults.length ?? 0}
//                     </p>
//                   </div>
//                   <div className="bg-blue-50 rounded-xl p-3 text-center">
//                     <p className="text-xs text-gray-500">Suggestions</p>
//                     <p className="text-2xl font-bold text-blue-700">
//                       {analysis?.suggestions.length ?? 0}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Donut + legend – flex-1 to fill remaining space */}
//                 <div className="mt-8 flex flex-col md:flex-row items-center gap-6 flex-1">
//                   <div className="relative w-[200px] h-[200px]">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <PieChart>
//                         <Pie
//                           data={[
//                             {
//                               name: "Score",
//                               value: analysis?.overall_score ?? 0,
//                             },
//                             {
//                               name: "Remaining",
//                               value: 100 - (analysis?.overall_score ?? 0),
//                             },
//                           ]}
//                           dataKey="value"
//                           nameKey="name"
//                           innerRadius={65}
//                           outerRadius={90}
//                           startAngle={90}
//                           endAngle={-270}
//                           paddingAngle={0}
//                         >
//                           <Cell fill={scoreColor} />
//                           <Cell fill="#e5e7eb" />
//                         </Pie>
//                       </PieChart>
//                     </ResponsiveContainer>
//                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                       <div className="text-center">
//                         <span className="text-3xl font-bold text-gray-900">
//                           {analysis?.overall_score ?? "—"}%
//                         </span>
//                         <p className="text-xs text-gray-400">Score</p>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="flex-1 grid grid-cols-2 gap-2">
//                     {donut.map((d) => (
//                       <div key={d.name} className="flex items-center gap-2">
//                         <span
//                           className="w-3 h-3 rounded-full"
//                           style={{
//                             background:
//                               d.name === "Score" ? scoreColor : "#e5e7eb",
//                           }}
//                         />
//                         <span className="text-sm text-gray-600">
//                           {d.name} <strong>{d.value}%</strong>
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </Card>
//             </div>

//             {/* RIGHT COLUMN – three cards, total height matches left */}
//             <aside className="flex flex-col gap-6 h-full">
//               <Card className="flex-1 flex flex-col justify-center">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-xs text-gray-400 uppercase">
//                       SEO Strengths
//                     </p>
//                     <p className="text-3xl font-bold text-gray-900 mt-2">
//                       {analysis?.strengths.length ?? "—"}
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-end">
//                     <p className="text-sm text-gray-500">Positive factors</p>
//                     <div className="mt-2">
//                       <Sparkline series={areaSeries.slice(-6)} />
//                     </div>
//                   </div>
//                 </div>
//               </Card>

//               <Card className="flex-1 flex flex-col justify-center">
//                 <div className="flex justify-between items-start">
//                   <div>
//                     <p className="text-xs text-gray-400 uppercase">
//                       Issues Found
//                     </p>
//                     <p className="text-3xl font-bold text-gray-900 mt-2">
//                       {analysis?.faults.length ?? "—"}
//                     </p>
//                     <p className="text-sm text-gray-400 mt-1">Need attention</p>
//                   </div>
//                   <div className="w-24 h-10">
//                     <ResponsiveContainer width="100%" height="100%">
//                       <AreaChart data={areaSeries.slice(-5)}>
//                         <Area
//                           dataKey="y"
//                           stroke={ACCENT}
//                           fill="url(#sparkBlue)"
//                           dot={false}
//                         />
//                       </AreaChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </Card>

//               <Card className="flex-1 flex flex-col justify-center">
//                 <div className="flex justify-between">
//                   <div>
//                     <p className="text-xs text-gray-400 uppercase">
//                       AI Suggestions
//                     </p>
//                     <p className="text-lg font-semibold text-gray-900 mt-2">
//                       {analysis?.suggestions.length ?? "—"}
//                     </p>
//                     <p className="text-sm text-gray-500">Actionable tips</p>
//                   </div>
//                   <p className="text-xs text-gray-400">•••</p>
//                 </div>
//                 <div className="mt-3 h-20">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <BarChart
//                       data={barLeft}
//                       margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
//                     >
//                       <CartesianGrid
//                         strokeDasharray="3 3"
//                         vertical={false}
//                         opacity={0.1}
//                       />
//                       <XAxis dataKey="name" hide />
//                       <Tooltip />
//                       <Bar
//                         dataKey="value"
//                         fill={ACCENT}
//                         radius={[4, 4, 0, 0]}
//                         barSize={12}
//                       />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </Card>
//             </aside>
//           </div>

//           {/* Bottom bar charts */}
//           <section className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <ChartCard
//               title="SEO Strengths"
//               subtitle="Top Strengths"
//               count={analysis?.strengths?.length || 0}
//               data={analysis?.strengths?.slice(0, 10) || []}
//               type="strength"
//               color="#1447E6"
//             />
//             <ChartCard
//               title="SEO Issues"
//               subtitle="Top Issues"
//               count={analysis?.faults?.length || 0}
//               data={analysis?.faults?.slice(0, 10) || []}
//               type="issue"
//               color="#1447E6"
//             />
//           </section>

//           {/* Page Preview – one at a time */}
//           {analysis?.results_preview && analysis.results_preview.length > 0 && (
//             <section className="mt-6">
//               <Card>
//                 <div className="flex justify-between items-center mb-6">
//                   <h3 className="text-xl font-bold text-gray-900">
//                     Page Preview ({previewPage + 1} of{" "}
//                     {analysis.results_preview.length})
//                   </h3>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() =>
//                         setPreviewPage(Math.max(0, previewPage - 1))
//                       }
//                       disabled={previewPage === 0}
//                       className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
//                     >
//                       ← Previous
//                     </button>
//                     <button
//                       onClick={() =>
//                         setPreviewPage(
//                           Math.min(
//                             analysis.results_preview.length - 1,
//                             previewPage + 1,
//                           ),
//                         )
//                       }
//                       disabled={
//                         previewPage === analysis.results_preview.length - 1
//                       }
//                       className="px-3 py-1 rounded-lg border border-gray-300 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
//                     >
//                       Next →
//                     </button>
//                   </div>
//                 </div>

//                 {(() => {
//                   const page = analysis.results_preview[previewPage];
//                   return (
//                     <div className="p-4 bg-gray-50 rounded-lg">
//                       <p className="font-semibold text-base text-gray-800 mb-3 break-all">
//                         {page.url}
//                       </p>
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm text-gray-600">
//                         <p>
//                           <span className="font-semibold text-gray-800">Score:</span>{" "}
//                           {page.seo_score}/100
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Title:</span>{" "}
//                           {page.title}
//                         </p>
//                         <p className="sm:col-span-2">
//                           <span className="font-semibold text-gray-800">Meta Description:</span>{" "}
//                           {page.meta_description}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Word Count:</span>{" "}
//                           {page.word_count}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">H1 Count:</span>{" "}
//                           {page.h1_count}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">H2 Count:</span>{" "}
//                           {page.h2_count}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">H3 Count:</span>{" "}
//                           {page.h3_count}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Missing Alt Tags:</span>{" "}
//                           {page.missing_alt_tags}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Total Images:</span>{" "}
//                           {page.total_images}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Small Images:</span>{" "}
//                           {page.small_images}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Large Images:</span>{" "}
//                           {page.large_images}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Ideal Images:</span>{" "}
//                           {page.ideal_images}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Internal Links:</span>{" "}
//                           {page.internal_links}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">External Links:</span>{" "}
//                           {page.external_links}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Canonical Tag:</span>{" "}
//                           {page.canonical_tag}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">OpenGraph Tags:</span>{" "}
//                           {page.opengraph_tags}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Twitter Tags:</span>{" "}
//                           {page.twitter_tags}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Robots Meta:</span>{" "}
//                           {page.robots_meta}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Viewport:</span>{" "}
//                           {page.viewport_present}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Schema Types:</span>{" "}
//                           {page.schema_types}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">
//                             Readability Score:
//                           </span>{" "}
//                           {page.readability_score}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Grammar Errors:</span>{" "}
//                           {page.grammar_errors}
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Text/HTML Ratio:</span>{" "}
//                           {page.text_html_ratio}%
//                         </p>
//                         <p>
//                           <span className="font-semibold text-gray-800">Load Time:</span>{" "}
//                           {page.load_time} sec
//                         </p>
//                       </div>
//                     </div>
//                   );
//                 })()}
//               </Card>
//             </section>
//           )}

//           {/* Detailed Analysis – paragraph + list style */}
//           {/* Detailed Analysis – separate cards for Strengths, Issues, Suggestions */}
//           <section className="mt-6 space-y-6">
//             {analysis?.strengths && analysis.strengths.length > 0 && (
//               <Card>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
//                   Top Strengths
//                 </h3>
//                 <ul className="space-y-3 list-disc pl-5 text-gray-700">
//                   {analysis.strengths.map((s, i) => (
//                     <li key={i}>
//                       <strong className="text-green-800">{s.title}:</strong>{" "}
//                       {s.detail}{" "}
//                       <span className="text-xs text-green-600 capitalize ml-2">
//                         (Impact: {s.impact})
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </Card>
//             )}

//             {analysis?.faults && analysis.faults.length > 0 && (
//               <Card>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
//                   Critical Issues
//                 </h3>
//                 <ul className="space-y-3 list-disc pl-5 text-gray-700">
//                   {analysis.faults.map((f, i) => (
//                     <li key={i}>
//                       <strong className="text-red-800">{f.title}:</strong>{" "}
//                       {f.detail}{" "}
//                       <span className="text-xs text-red-600 capitalize ml-2">
//                         (Severity: {f.severity} • Pages: {f.pages})
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </Card>
//             )}

//             {analysis?.suggestions && analysis.suggestions.length > 0 && (
//               <Card>
//                 <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
//                   <span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />
//                   AI Suggestions
//                 </h3>
//                 <ul className="space-y-3 list-disc pl-5 text-gray-700">
//                   {analysis.suggestions.map((s, i) => (
//                     <li key={i}>
//                       <strong className="text-blue-800">{s.title}:</strong>{" "}
//                       {s.detail}{" "}
//                       <span className="text-xs text-blue-600 capitalize ml-2">
//                         (Priority: {s.priority})
//                       </span>
//                     </li>
//                   ))}
//                 </ul>
//               </Card>
//             )}
//           </section>
//         </div>
//       </div>

//       <LoginRequiredModal
//         isOpen={isLoginRequiredOpen}
//         onClose={() => setIsLoginRequiredOpen(false)}
//         onLogin={() => {
//           setIsLoginRequiredOpen(false);
//           setIsLoginOpen(true);
//         }}
//       />
//     </>
//   );
// }

// // "use client";

// // import React, { useEffect, useMemo, useState, Suspense } from "react";
// // import { useSearchParams, useRouter } from "next/navigation";
// // import {
// //   AreaChart,
// //   Area,
// //   ResponsiveContainer,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   CartesianGrid,
// //   Legend,
// // } from "recharts";
// // import { ChartCard } from "./report/ChartCard";
// // import Link from "next/link";
// // import axios from "axios";
// // import { ArrowLeft } from "lucide-react";

// // /* ---------- styling constants ---------- */
// // export const ACCENT = [
// //   "#0D3B66", // darkest
// //   "#15558D", // dark-mid
// //   "#2A78B4", // mid
// //   "#70A7D5", // light
// //   "#D8E8F2", // very light
// // ];

// // const CARD_BG = "bg-white/90";
// // const PAGE_BG = "from-[#D8E8F2] to-[#F3F8FC]";

// // /* ---------- helper small components ---------- */
// // function Card({ children, className = "" }) {
// //   return (
// //     <div
// //       className={`${CARD_BG} rounded-2xl p-4 md:p-6 shadow-md transition-transform transform hover:scale-[1.017] ${className}`}
// //     >
// //       {children}
// //     </div>
// //   );
// // }

// // export default function ReportContent() {
// //   const searchParams = useSearchParams();
// //   const url = searchParams.get("url") || "";
// //   // const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
// //   // const [isLoginOpen, setIsLoginOpen] = useState(false);
// //   // const [isSignupOpen, setIsSignupOpen] = useState(false);
// //   const [isLoginRequiredOpen, setIsLoginRequiredOpen] = useState(false);
// //   const [isLoginOpen, setIsLoginOpen] = useState(false);
// //   const [isSignupOpen, setIsSignupOpen] = useState(false);
// //   const [isOtpOpen, setIsOtpOpen] = useState(false);

// //   const [otpUserData, setOtpUserData] = useState(null);
// //   const router = useRouter();
// //   const [analysis, setAnalysis] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Convert SEO analysis to dashboard data
// //   const dashboardData = useMemo(() => {
// //     if (!analysis || analysis.status === "error") return {};

// //     // Create metrics from analysis data
// //     const metrics = [
// //       {
// //         id: "seoScore",
// //         label: "SEO Score",
// //         value: analysis.overall_score,
// //         sub: `${analysis.pages_analyzed} pages analyzed`,
// //       },
// //       {
// //         id: "strengths",
// //         label: "Strengths",
// //         value: analysis.strengths.length,
// //         sub: "Positive factors",
// //       },
// //       {
// //         id: "issues",
// //         label: "Issues Found",
// //         value: analysis.faults.length,
// //         sub: "Need attention",
// //       },
// //       {
// //         id: "suggestions",
// //         label: "AI Suggestions",
// //         value: analysis.suggestions.length,
// //         sub: "Actionable tips",
// //       },
// //     ];

// //     // Create donut data from SEO score
// //     const donut = [
// //       { name: "Score", value: analysis.overall_score },
// //       { name: "Needs Work", value: 100 - analysis.overall_score },
// //     ];

// //     // Create area series from analysis metrics
// //     const areaSeries = [
// //       { x: "Score", y: analysis.overall_score },
// //       { x: "Pages", y: analysis.pages_analyzed * 10 },
// //       { x: "Strengths", y: analysis.strengths.length * 15 },
// //       { x: "Issues", y: analysis.faults.length * 8 },
// //       { x: "Suggestions", y: analysis.suggestions.length * 12 },
// //     ];

// //     // Create bar data from strengths
// //     const barSeriesLeft = analysis.strengths
// //       .slice(0, 5)
// //       .map((strength, index) => ({
// //         name: strength.title.split(" ")[0],
// //         value: Math.min(strength.detail.length * 2, 100),
// //       }));

// //     // Create bar data from faults
// //     const barSeriesRight = analysis.faults.slice(0, 5).map((fault, index) => ({
// //       name: fault.title.split(" ")[0],
// //       value: Math.min(fault.pages * 20, 100),
// //     }));

// //     return {
// //       metrics,
// //       donut,
// //       areaSeries,
// //       barSeriesLeft,
// //       barSeriesRight,
// //     };
// //   }, [analysis]);

// //   const metrics = dashboardData.metrics || [];
// //   const donut = dashboardData.donut || [];
// //   const areaSeries = dashboardData.areaSeries || [];
// //   const barLeft = dashboardData.barSeriesLeft || [];
// //   const barRight = dashboardData.barSeriesRight || [];

// //   const donutTotal = useMemo(
// //     () => donut.reduce((s, d) => s + (d?.value ?? 0), 0),
// //     [donut],
// //   );

// //   /* ---------- sparkline component ---------- */
// //   const Sparkline = ({ series }) => {
// //     return (
// //       <div style={{ width: 120, height: 46 }}>
// //         <ResponsiveContainer width="100%" height="100%">
// //           <AreaChart data={series}>
// //             <defs>
// //               <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
// //                 <stop offset="0%" stopColor="#0D3B66" stopOpacity={0.6} />
// //                 <stop offset="100%" stopColor="#0D3B66" stopOpacity={0.08} />
// //               </linearGradient>
// //             </defs>
// //             <Area
// //               dataKey="y"
// //               type="monotone"
// //               stroke="#0D3B66"
// //               fill="url(#spark)"
// //               strokeWidth={2}
// //               dot={false}
// //             />
// //           </AreaChart>
// //         </ResponsiveContainer>
// //       </div>
// //     );
// //   };

// //   if (loading) {
// //     return (
// //       <div
// //         className={`min-h-screen p-8 bg-linear-to-br ${PAGE_BG} flex items-center justify-center`}
// //       >
// //         <div className="text-center">
// //           <div className="text-2xl font-semibold text-slate-700 mb-4">
// //             🔍 Analyzing SEO...
// //           </div>
// //           <div className="text-slate-500">
// //             Please wait while we analyze {url}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error || analysis?.status === "error") {
// //     return (
// //       <div
// //         className={`min-h-screen p-8 bg-linear-to-br ${PAGE_BG} flex items-center justify-center`}
// //       >
// //         <div className="text-center">
// //           <div className="text-2xl font-semibold text-red-600 mb-4">
// //             Analysis Failed
// //           </div>
// //           <div className="text-slate-600 mb-4">
// //             {error || analysis?.message}
// //           </div>
// //           <Link
// //             href="/"
// //             className="bg-[#0D3B66] text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition inline-block"
// //           >
// //             Back to Home
// //           </Link>
// //         </div>
// //       </div>
// //     );
// //   }

// //   function LoginRequiredModal({ isOpen, onClose, onLogin }) {
// //     if (!isOpen) return null;

// //     return (
// //       <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
// //         <div className="bg-white h-[80%] rounded-2xl w-full max-w-xl shadow-2xl overflow-auto">
// //           {/* Modal Header */}
// //           <div className="p-6 border-b border-gray-100 bg-linear-to-r from-blue-50 to-cyan-50">
// //             <div className="flex items-center justify-between">
// //               <h2 className="text-2xl text-center font-bold bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
// //                 Before Starting AI-Assisted SEO
// //               </h2>
// //               <button
// //                 onClick={onClose}
// //                 className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
// //               >
// //                 <svg
// //                   className="w-5 h-5 text-gray-500 hover:text-gray-700"
// //                   fill="none"
// //                   stroke="currentColor"
// //                   viewBox="0 0 24 24"
// //                 >
// //                   <path
// //                     strokeLinecap="round"
// //                     strokeLinejoin="round"
// //                     strokeWidth={2}
// //                     d="M6 18L18 6M6 6l12 12"
// //                   />
// //                 </svg>
// //               </button>
// //             </div>
// //             <p className="text-gray-600 mt-2">
// //               To proceed with Code Base SEO analysis, please ensure you have
// //               completed the following:
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
// //             {/* Left Column: Requirements */}
// //             <div className="p-6">
// //               <div className="space-y-6">
// //                 {/* GitHub Repo Access */}
// //                 <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
// //                   <div className="flex items-start gap-3">
// //                     <div>
// //                       <ul className="text-sm text-gray-600 space-y-1">
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           <span>
// //                             The repository must be{" "}
// //                             <span className="font-medium">public</span>.
// //                           </span>
// //                         </li>
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           <span>
// //                             If it's private, the repo admin must re-push the
// //                             updated code after SEO changes are applied.
// //                           </span>
// //                         </li>
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           Provide a valid GitHub token with repo scope for us to
// //                           analyze and update your repository.
// //                         </li>
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           <span>GitHub Repository URL</span>
// //                         </li>
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           <span>GitHub Username</span>
// //                         </li>
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           <span>GitHub Account Email</span>
// //                         </li>
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           <span>The live website URL you want to optimize</span>
// //                         </li>
// //                         <li className="flex items-start gap-2">
// //                           <span className="text-blue-500 mt-1">•</span>
// //                           <p className="text-sm text-gray-600">
// //                             <span className="font-medium text-amber-600">
// //                               Important:
// //                             </span>{" "}
// //                             Download the CSV SEO report after checking your
// //                             website SEO score in the earlier step. Upload that
// //                             CSV file here before executing.
// //                           </p>
// //                         </li>
// //                       </ul>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>

// //             {/* Right Column: Login Section */}
// //             <div className="p-6 bg-linear-to-b from-gray-50 to-white lg:border-l border-gray-100">
// //               <div className="h-full flex flex-col justify-center">
// //                 <div className="text-center mb-8">
// //                   <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-linear-to-r from-blue-600 to-cyan-500 mb-4">
// //                     <svg
// //                       className="w-8 h-8 text-white"
// //                       fill="none"
// //                       stroke="currentColor"
// //                       viewBox="0 0 24 24"
// //                     >
// //                       <path
// //                         strokeLinecap="round"
// //                         strokeLinejoin="round"
// //                         strokeWidth={2}
// //                         d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
// //                       />
// //                     </svg>
// //                   </div>
// //                   <h3 className="text-xl font-semibold text-gray-900 mb-2">
// //                     Login Required
// //                   </h3>
// //                   <p className="text-gray-600">
// //                     You need to login first to access AI-Assisted SEO features
// //                     and start the setup process.
// //                   </p>
// //                 </div>

// //                 {/* Login Button */}
// //                 <button
// //                   onClick={onLogin}
// //                   className="w-full cursor-pointer bg-linear-to-r from-blue-600 to-cyan-500 text-white font-semibold py-3.5 rounded-lg hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center gap-3 group relative overflow-hidden"
// //                 >
// //                   <svg
// //                     className="w-5 h-5"
// //                     fill="none"
// //                     stroke="currentColor"
// //                     viewBox="0 0 24 24"
// //                   >
// //                     <path
// //                       strokeLinecap="round"
// //                       strokeLinejoin="round"
// //                       strokeWidth={2}
// //                       d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
// //                     />
// //                   </svg>
// //                   <span>Login to Continue</span>
// //                   <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
// //                 </button>

// //                 {/* Close Button */}
// //                 <button
// //                   onClick={onClose}
// //                   className="w-full py-3 cursor-pointer mt-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200"
// //                 >
// //                   Close
// //                 </button>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <>
// //       <div
// //         className={`min-h-screen p-4 md:p-8 rounded-2xl bg-linear-to-br ${PAGE_BG}`}
// //       >
// //         <div className="max-w-[1400px] mx-auto font-inter text-slate-800">
// //           {/* header */}
// //           <div>
// //             <button
// //               onClick={() => router.push("/")}
// //               className="bg-gray-500 mt-18 md:mt-14 cursor-pointer flex items-center gap-2 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-600 transition"
// //             >
// //               <ArrowLeft size={18} />
// //               Back to Website
// //             </button>
// //           </div>
// //           <header className="mb-6 mt-4 sm:flex items-center justify-between">
// //             <div>
// //               <h1 className="text-xl md:text-2xl font-semibold tracking-tight">
// //                 SEO Analysis Report
// //               </h1>
// //               <div className="text-sm text-slate-500 mt-1">
// //                 {analysis?.url} • {analysis?.pages_analyzed} pages analyzed •{" "}
// //                 {new Date().toLocaleString()}
// //               </div>
// //             </div>
// //             <div className="flex gap-3 mt-4 sm:mt-0">
// //               {/* <Link
// //               href={`/autonomous?url=${encodeURIComponent(
// //                 analysis?.url || url
// //               )}`}
// //               className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition flex items-center gap-2"
// //             >
// //               Autonomous SEO
// //             </Link> */}
// //               <button
// //                 className="bg-green-600 cursor-pointer text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
// //                 onClick={() => {
// //                   setIsLoginOpen(false);
// //                   setIsSignupOpen(false);
// //                   setIsOtpOpen(false);
// //                   setIsLoginRequiredOpen(true);
// //                 }}
// //               >
// //                 AI-Assisted SEO
// //               </button>

// //               {analysis?.csv_download && (
// //                 <a
// //                   href={`https://syedabdulmoizshah-seo-analyzer.hf.space${analysis.csv_download}`}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="bg-[#0D3B66] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition"
// //                 >
// //                   Download Full Report
// //                 </a>
// //               )}
// //             </div>
// //           </header>

// //           {/* main grid */}
// //           <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
// //             {/* LEFT MAIN BIG CARD */}
// //             <section className="lg:col-span-2 space-y-6">
// //               <Card>
// //                 <div className="flex items-start justify-between gap-4">
// //                   <div>
// //                     <div className="text-xs text-slate-400">
// //                       Overall SEO Score
// //                     </div>
// //                     <div className="mt-2 text-4xl md:text-5xl font-extrabold text-slate-900">
// //                       {analysis?.overall_score ?? "—"}/100
// //                     </div>
// //                     <div className="text-sm text-slate-400 mt-1">
// //                       Based on analysis of {analysis?.pages_analyzed} pages
// //                     </div>
// //                   </div>

// //                   <div className="flex items-center gap-2">
// //                     <div className="px-3 py-2 rounded-lg bg-gray-100 text-sm text-slate-600 shadow-sm">
// //                       {analysis?.url}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* three small stat boxes */}
// //                 <div className="mt-6 grid grid-cols-3 gap-4">
// //                   <div className="rounded-lg p-3 bg-green-50">
// //                     <div className="text-xs text-slate-400">Strengths</div>
// //                     <div className="mt-2 font-semibold text-green-700">
// //                       {analysis?.strengths.length ?? 0}
// //                     </div>
// //                   </div>
// //                   <div className="rounded-lg p-3 bg-red-50">
// //                     <div className="text-xs text-slate-400">Issues</div>
// //                     <div className="mt-2 font-semibold text-red-700">
// //                       {analysis?.faults.length ?? 0}
// //                     </div>
// //                   </div>
// //                   <div className="rounded-lg p-3 bg-blue-50">
// //                     <div className="text-xs text-slate-400">Suggestions</div>
// //                     <div className="mt-2 font-semibold text-blue-700">
// //                       {analysis?.suggestions.length ?? 0}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* donut + legend */}
// //                 <div className="mt-6 flex flex-col md:flex-row gap-6 items-center">
// //                   <div className="relative w-[220px] h-[220px] mx-auto md:mx-0">
// //                     <ResponsiveContainer width="100%" height="100%">
// //                       <PieChart>
// //                         <Pie
// //                           data={[
// //                             {
// //                               name: "Score",
// //                               value: analysis?.overall_score ?? 0,
// //                             },
// //                             {
// //                               name: "Remaining",
// //                               value: 100 - (analysis?.overall_score ?? 0),
// //                             },
// //                           ]}
// //                           dataKey="value"
// //                           nameKey="name"
// //                           innerRadius="64%"
// //                           outerRadius="92%"
// //                           startAngle={90}
// //                           endAngle={-270}
// //                           paddingAngle={0}
// //                         >
// //                           {[
// //                             <Cell
// //                               key="score"
// //                               fill={
// //                                 analysis?.overall_score >= 80
// //                                   ? "#008236"
// //                                   : analysis?.overall_score >= 60
// //                                     ? "#05DF72"
// //                                     : analysis?.overall_score >= 50
// //                                       ? "#FDC700"
// //                                       : "#FB2C36"
// //                               }
// //                             />,
// //                             <Cell key="remaining" fill="#E5E7EB" />, // gray-200
// //                           ]}
// //                         </Pie>
// //                       </PieChart>
// //                     </ResponsiveContainer>

// //                     {/* center label */}
// //                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
// //                       <div className="text-center flex items-center gap-2">
// //                         {/* Dot with same color as donut */}
// //                         <span
// //                           className="w-3 h-3 rounded-full"
// //                           style={{
// //                             background:
// //                               analysis?.overall_score >= 80
// //                                 ? "#008236"
// //                                 : analysis?.overall_score >= 60
// //                                   ? "#05DF72"
// //                                   : analysis?.overall_score >= 50
// //                                     ? "#FDC700"
// //                                     : "#FB2C36",
// //                           }}
// //                         />
// //                         <div>
// //                           <div className="text-3xl font-bold text-slate-800">
// //                             {analysis?.overall_score ?? "—"}%
// //                           </div>
// //                           <div className="text-xs text-slate-400">Score</div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* legend */}
// //                   <div className="flex-1">
// //                     {/* Donut legend */}
// //                     <div className="mt-4 grid grid-cols-2 gap-2">
// //                       {donut.map((d, idx) => {
// //                         // Match color with donut slice dynamically
// //                         const color =
// //                           analysis?.overall_score >= 80
// //                             ? "#008236"
// //                             : analysis?.overall_score >= 60
// //                               ? "#05DF72"
// //                               : analysis?.overall_score >= 50
// //                                 ? "#FDC700"
// //                                 : "#FB2C36";

// //                         return (
// //                           <div key={d.name} className="flex items-center gap-3">
// //                             <span
// //                               className="w-3 h-3 rounded-full"
// //                               style={{
// //                                 background:
// //                                   d.name === "Needs Work" ? "#E5E7EB" : color,
// //                               }}
// //                             />
// //                             <div>
// //                               <div className="text-sm font-medium text-slate-700">
// //                                 {d.name}
// //                               </div>
// //                               <div className="text-xs text-slate-400">
// //                                 {d.value}%
// //                               </div>
// //                             </div>
// //                           </div>
// //                         );
// //                       })}
// //                     </div>

// //                     {/* Divider */}
// //                     <div className="my-4 mt-20 h-px bg-slate-200" />

// //                     {/* Score meaning legend */}
// //                     <div className="grid grid-cols-4 gap-2 text-sm">
// //                       <div className="flex items-center gap-2">
// //                         <span className="w-3 h-3 rounded-sm bg-green-700" />
// //                         <span className="text-slate-700">
// //                           Excellent{" "}
// //                           <span className="text-xs text-slate-400">
// //                             (80–100%)
// //                           </span>
// //                         </span>
// //                       </div>

// //                       <div className="flex items-center gap-2">
// //                         <span className="w-3 h-3 rounded-sm bg-green-400" />
// //                         <span className="text-slate-700">
// //                           Good{" "}
// //                           <span className="text-xs text-slate-400">
// //                             (60–79%)
// //                           </span>
// //                         </span>
// //                       </div>

// //                       <div className="flex items-center gap-2">
// //                         <span className="w-3 h-3 rounded-sm bg-yellow-400" />
// //                         <span className="text-slate-700">
// //                           Average{" "}
// //                           <span className="text-xs text-slate-400">
// //                             (50–59%)
// //                           </span>
// //                         </span>
// //                       </div>

// //                       <div className="flex items-center gap-2">
// //                         <span className="w-3 h-3 rounded-sm bg-red-500" />
// //                         <span className="text-slate-700">
// //                           Critical{" "}
// //                           <span className="text-xs text-slate-400">
// //                             (Below 50%)
// //                           </span>
// //                         </span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Card>
// //             </section>

// //             {/* right column with stacked small cards */}
// //             <aside className="space-y-6">
// //               {/* STRENGTHS CARD */}
// //               <Card>
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <div className="text-xs text-slate-400">SEO Strengths</div>
// //                     <div className="mt-2 text-3xl font-extrabold text-slate-900">
// //                       {analysis?.strengths.length ?? "—"}
// //                     </div>
// //                   </div>

// //                   <div className="flex flex-col items-end">
// //                     <div className="text-sm text-slate-500">
// //                       Positive factors
// //                     </div>
// //                     <div className="mt-2">
// //                       <Sparkline series={areaSeries.slice(-6)} />
// //                     </div>
// //                   </div>
// //                 </div>
// //               </Card>

// //               {/* ISSUES CARD */}
// //               <Card>
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <div className="text-xs text-slate-400">Issues Found</div>
// //                     <div className="mt-2 text-3xl font-extrabold text-slate-900">
// //                       {analysis?.faults.length ?? "—"}
// //                     </div>
// //                     <div className="text-sm text-slate-400 mt-1">
// //                       Need attention
// //                     </div>
// //                   </div>

// //                   <div className="w-28 h-12">
// //                     <ResponsiveContainer width="100%" height="100%">
// //                       <AreaChart data={areaSeries.slice(-8)}>
// //                         <Area
// //                           dataKey="y"
// //                           stroke="#0D3B66"
// //                           fillOpacity={1}
// //                           fill="url(#spark)"
// //                           dot={false}
// //                           type="monotone"
// //                           strokeWidth={2}
// //                         />
// //                         <defs>
// //                           <linearGradient
// //                             id="spark"
// //                             x1="0"
// //                             x2="0"
// //                             y1="0"
// //                             y2="1"
// //                           >
// //                             <stop
// //                               offset="0%"
// //                               stopColor="#0D3B66"
// //                               stopOpacity={0.8}
// //                             />
// //                             <stop
// //                               offset="100%"
// //                               stopColor="#0D3B66"
// //                               stopOpacity={0.05}
// //                             />
// //                           </linearGradient>
// //                         </defs>
// //                       </AreaChart>
// //                     </ResponsiveContainer>
// //                   </div>
// //                 </div>
// //               </Card>

// //               {/* SUGGESTIONS CARD */}
// //               <Card className="p-3 rounded-2xl bg-white/90 shadow-lg h-[185px] flex flex-col justify-between">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <div className="text-xs text-slate-400">AI Suggestions</div>
// //                     <div className="text-sm text-slate-600">
// //                       Actionable tips
// //                     </div>
// //                   </div>
// //                   <div className="text-xs text-slate-400">•••</div>
// //                 </div>

// //                 {/* Chart container */}
// //                 <div className="flex-1 mt-2">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <BarChart
// //                       data={barLeft}
// //                       margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
// //                     >
// //                       <CartesianGrid
// //                         strokeDasharray="3 3"
// //                         vertical={false}
// //                         opacity={0.06}
// //                       />
// //                       <XAxis
// //                         dataKey="name"
// //                         axisLine={false}
// //                         tickLine={false}
// //                         fontSize={10}
// //                       />
// //                       <YAxis axisLine={false} tickLine={false} hide />
// //                       <Tooltip />
// //                       <Bar
// //                         dataKey="value"
// //                         fill="#0D3B66"
// //                         radius={[6, 6, 0, 0]}
// //                         barSize={14}
// //                       />
// //                     </BarChart>
// //                   </ResponsiveContainer>
// //                 </div>
// //               </Card>
// //             </aside>
// //           </main>

// //           {/* bottom two bar charts */}
// //           <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
// //             {/* SEO Strengths Bar Chart */}
// //             <ChartCard
// //               title="SEO Strengths"
// //               subtitle="Top Strengths"
// //               count={analysis?.strengths?.length || 0}
// //               data={analysis?.strengths?.slice(0, 10) || []}
// //               type="strength"
// //               color="#008236"
// //             />

// //             {/* SEO Issues Bar Chart */}
// //             <ChartCard
// //               title="SEO Issues"
// //               subtitle="Top Issues"
// //               count={analysis?.faults?.length || 0}
// //               data={analysis?.faults?.slice(0, 10) || []}
// //               type="issue"
// //               color="#E80A15"
// //             />
// //           </section>

// //           {/* Page Preview */}
// //           {analysis?.results_preview && analysis.results_preview.length > 0 && (
// //             <section className="mt-8">
// //               <Card>
// //                 <h3 className="text-lg font-semibold mb-4">Page Preview</h3>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   {analysis.results_preview.map((page, index) => (
// //                     <div key={index} className="p-4 bg-slate-50 rounded-lg">
// //                       <div className="font-medium text-sm text-slate-600 truncate">
// //                         {page.url}
// //                       </div>
// //                       <div className="text-sm text-slate-400 mt-2">
// //                         <div>
// //                           Score:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.seo_score}/100
// //                           </span>
// //                         </div>
// //                         <div>
// //                           Title:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.title}
// //                           </span>
// //                         </div>
// //                         <div>
// //                           Meta Description:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.meta_description}
// //                           </span>
// //                         </div>
// //                         <div>
// //                           Word Count:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.word_count}
// //                           </span>
// //                         </div>

// //                         <div className="flex gap-4 text-sm">
// //                           <span>
// //                             H1 Count:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.h1_count}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             H2 Count:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.h2_count}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             H3 Count:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.h3_count}
// //                             </span>
// //                           </span>
// //                         </div>

// //                         <div>
// //                           Missing Alt Tags:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.missing_alt_tags}
// //                           </span>
// //                         </div>

// //                         <div className="flex flex-wrap gap-4 text-sm">
// //                           <span>
// //                             Total Images:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.total_images}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             Small Images:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.small_images}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             Large Images:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.large_images}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             Ideal Images:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.ideal_images}
// //                             </span>
// //                           </span>
// //                         </div>

// //                         <div className="flex gap-4 text-sm">
// //                           <span>
// //                             Internal Links:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.internal_links}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             External Links:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.external_links}
// //                             </span>
// //                           </span>
// //                         </div>

// //                         <div className="flex gap-4 text-sm">
// //                           <span>
// //                             Canonical Tag:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.canonical_tag}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             OpenGraph Tag:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.opengraph_tags}
// //                             </span>
// //                           </span>
// //                           <span>
// //                             Twitter Tag:{" "}
// //                             <span className="font-semibold text-slate-600">
// //                               {page.twitter_tags}
// //                             </span>
// //                           </span>
// //                         </div>

// //                         <div>
// //                           Robots Meta:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.robots_meta}
// //                           </span>
// //                         </div>
// //                         <div>
// //                           Viewport:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.viewport_present}
// //                           </span>
// //                         </div>
// //                         <div>
// //                           Schema Types:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.schema_types}
// //                           </span>
// //                         </div>

// //                         <div>
// //                           Readability Score:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.readability_score}
// //                           </span>
// //                         </div>
// //                         <div>
// //                           Grammar Errors:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.grammar_errors}
// //                           </span>
// //                         </div>
// //                         <div>
// //                           Text/HTML Ratio:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.text_html_ratio}%
// //                           </span>
// //                         </div>

// //                         <div>
// //                           Load Time:{" "}
// //                           <span className="font-semibold text-slate-600">
// //                             {page.load_time} seconds
// //                           </span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </Card>
// //             </section>
// //           )}

// //           {/* Detailed Analysis Section */}
// //           <section className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
// //             <Card>
// //               <div className="p-1 ">
// //                 <h3 className="text-lg font-semibold mb-4">Top Strengths</h3>
// //                 <div className="space-y-1 max-h-96 overflow-y-auto">
// //                   {analysis?.strengths.map((strength, index) => (
// //                     <div
// //                       key={index}
// //                       className="p-3 mr-1 bg-green-50 rounded-lg"
// //                     >
// //                       <div className="font-medium text-green-800">
// //                         {strength.title}
// //                       </div>
// //                       <div className="text-sm text-green-600 mt-1">
// //                         {strength.detail}
// //                       </div>
// //                       <div className="text-xs text-green-800 mt-2 capitalize">
// //                         Impact: {strength.impact}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </Card>

// //             <Card>
// //               <div className="p-1">
// //                 <h3 className="text-lg font-semibold mb-4">Critical Issues</h3>
// //                 <div className="space-y-1 max-h-96 overflow-y-auto">
// //                   {analysis?.faults.map((fault, index) => (
// //                     <div key={index} className="p-3 mr-1 bg-red-50 rounded-lg">
// //                       <div className="font-medium text-red-800">
// //                         {fault.title}
// //                       </div>
// //                       <div className="text-sm text-red-600 mt-1">
// //                         {fault.detail}
// //                       </div>
// //                       <div className="text-xs text-red-800 mt-2 capitalize">
// //                         Severity: {fault.severity} • Pages: {fault.pages}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </Card>

// //             <Card>
// //               <div className="p-1">
// //                 <h3 className="text-lg font-semibold mb-4">AI Suggestions</h3>
// //                 <div className="space-y-1 max-h-96 overflow-y-auto">
// //                   {analysis?.suggestions.map((suggestion, index) => (
// //                     <div key={index} className="p-3 mr-1 bg-blue-50 rounded-lg">
// //                       <div className="font-medium text-blue-800">
// //                         {suggestion.title}
// //                       </div>
// //                       <div className="text-sm text-blue-600 mt-1">
// //                         {suggestion.detail}
// //                       </div>
// //                       <div className="text-xs text-blue-800 mt-2 capitalize">
// //                         Priority: {suggestion.priority}
// //                       </div>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </Card>
// //           </section>
// //         </div>
// //       </div>

// //       <LoginRequiredModal
// //         isOpen={isLoginRequiredOpen}
// //         onClose={() => setIsLoginRequiredOpen(false)}
// //         onLogin={() => {
// //           setIsLoginRequiredOpen(false);
// //           setIsLoginOpen(true);
// //         }}
// //       />
// //     </>
// //   );
// // }
