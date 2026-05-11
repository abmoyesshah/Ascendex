"use client";
import { useState, useMemo } from "react";
import {
  AreaChart, Area, ResponsiveContainer, PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
} from "recharts";
import Card from "./Card";
import Sparkline from "./Sparkline";
import { ChartCard } from "./ChartCard";

const ACCENT = "#2563eb";

export default function SeoReport({ data }) {
  const [previewPage, setPreviewPage] = useState(0);
  const analysis = data;

  const dashboardData = useMemo(() => {
    if (!analysis || analysis.status === "error") return {};
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
    return { donut, areaSeries, barSeriesLeft };
  }, [analysis]);

  const donut = dashboardData.donut || [];
  const areaSeries = dashboardData.areaSeries || [];
  const barLeft = dashboardData.barSeriesLeft || [];

  if (!analysis || analysis.status === "error")
    return <p className="text-red-600">SEO data unavailable.</p>;

  const scoreColor = "#1447E6";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-0">
        <p className="text-blue-600 uppercase text-xs sm:text-sm font-medium tracking-wide mb-1">SEO Report</p>
        {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">SEO Analysis Report</h1> */}
        <p className="text-gray-500 mt-1 text-xs sm:text-sm">{analysis?.url} • {analysis?.pages_analyzed} pages analyzed • {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2 h-full">
          <Card className="h-full flex flex-col overflow-visible">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="text-blue-500 uppercase text-[10px] sm:text-xs tracking-wide mb-1">Overall SEO Score</p>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{analysis?.overall_score ?? "—"}/100</div>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Based on analysis of {analysis?.pages_analyzed} pages</p>
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-600 self-start">{analysis?.url}</div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 flex-1">
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] flex-shrink-0 mx-auto md:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: "Score", value: analysis?.overall_score ?? 0 },
                        { name: "Remaining", value: 100 - (analysis?.overall_score ?? 0) },
                      ]}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="60%"
                      outerRadius="90%"
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={0}
                      stroke="none"
                    >
                      <Cell fill={scoreColor} />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{analysis?.overall_score ?? "—"}%</span>
                    <p className="text-[10px] sm:text-xs md:text-sm text-gray-400">Score</p>
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
          </Card>
        </div>

        {/* Right column cards (Strengths, Issues, Suggestions) */}
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

      {/* Bar Charts */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard title="SEO Strengths" subtitle="Top Strengths" count={analysis?.strengths?.length || 0} data={analysis?.strengths?.slice(0, 10) || []} type="strength" color="#1447E6" />
        <ChartCard title="SEO Issues" subtitle="Top Issues" count={analysis?.faults?.length || 0} data={analysis?.faults?.slice(0, 10) || []} type="issue" color="#1447E6" />
      </section>

      {/* Page Preview */}
      {analysis?.results_preview && analysis.results_preview.length > 0 && (
        <section className="mt-6">
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
                    <p><span className="font-semibold text-gray-500">Score:</span>{" "}<span className="font-semibold text-gray-800">{page.seo_score}/100</span></p>
                    <p><span className="font-semibold text-gray-500">Title:</span>{" "}<span className="font-semibold text-gray-800">{page.title}</span></p>
                    <p className="sm:col-span-2"><span className="font-semibold text-gray-500">Meta Description:</span>{" "}<span className="font-semibold text-gray-800">{page.meta_description}</span></p>
                    <p><span className="font-semibold text-gray-500">Word Count:</span>{" "}<span className="font-semibold text-gray-800">{page.word_count}</span></p>
                    <p><span className="font-semibold text-gray-500">H1:</span> {page.h1_count}</p>
                    <p><span className="font-semibold text-gray-500">H2:</span> {page.h2_count}</p>
                    <p><span className="font-semibold text-gray-500">H3:</span> {page.h3_count}</p>
                    <p><span className="font-semibold text-gray-500">Missing Alt Tags:</span> {page.missing_alt_tags}</p>
                    <p><span className="font-semibold text-gray-500">Total Images:</span> {page.total_images}</p>
                    <p><span className="font-semibold text-gray-500">Small Img:</span> {page.small_images}</p>
                    <p><span className="font-semibold text-gray-500">Large Img:</span> {page.large_images}</p>
                    <p><span className="font-semibold text-gray-500">Ideal Img:</span> {page.ideal_images}</p>
                    <p><span className="font-semibold text-gray-500">Internal Links:</span> {page.internal_links}</p>
                    <p><span className="font-semibold text-gray-500">External Links:</span> {page.external_links}</p>
                    <p><span className="font-semibold text-gray-500">Canonical:</span> {page.canonical_tag}</p>
                    <p><span className="font-semibold text-gray-500">OpenGraph:</span> {page.opengraph_tag}</p>
                    <p><span className="font-semibold text-gray-500">Twitter:</span> {page.twitter_tag}</p>
                    <p><span className="font-semibold text-gray-500">Viewport:</span> {page.viewport}</p>
                    <p><span className="font-semibold text-gray-500">Robots:</span> {page.robots_meta}</p>
                    <p><span className="font-semibold text-gray-500">Schema:</span> {page.schema_types}</p>
                    <p><span className="font-semibold text-gray-500">Readability:</span> {page.readability_score}</p>
                    <p><span className="font-semibold text-gray-500">Grammar Errors:</span> {page.grammar_errors}</p>
                    <p><span className="font-semibold text-gray-500">Text/HTML:</span> {page.text_html_ratio}%</p>
                    <p><span className="font-semibold text-gray-500">Load Time:</span> {page.load_time} sec</p>
                  </div>
                </div>
              );
            })()}
          </Card>
        </section>
      )}

      {/* Detailed Lists */}
      {analysis?.strengths?.length > 0 && (
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
      {analysis?.faults?.length > 0 && (
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
      {analysis?.suggestions?.length > 0 && (
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
    </div>
  );
}