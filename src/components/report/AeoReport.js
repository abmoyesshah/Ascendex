"use client";
import { useMemo } from "react";
import {
  PieChart, Pie, Cell, ResponsiveContainer,
} from "recharts";
import Card from "./Card";
import { ChartCard } from "./ChartCard";

const ACCENT = "#2563eb";

export default function AeoReport({ data }) {
  const analysis = useMemo(() => {
    if (!data || data.error) return null;

    const strengths = [
      { title: "Pages with Schema", detail: `${data.pages_with_schema} / ${data.total_pages}`, impact: "high" },
      { title: "FAQ Schema Present", detail: `${data.pages_with_faq_schema} / ${data.total_pages}`, impact: "high" },
      { title: "FAQ Sections", detail: `${data.pages_with_faq_sections} / ${data.total_pages}`, impact: "medium" },
      { title: "Lists Present", detail: `${data.pages_with_lists} / ${data.total_pages}`, impact: "medium" },
      { title: "Download CSV", detail: "Detailed report available", impact: "low" },
    ];
    const faults = [
      { title: "Missing Schema", detail: `${data.total_pages - data.pages_with_schema} pages`, severity: "medium", pages: data.total_pages - data.pages_with_schema },
      { title: "Missing FAQ Schema", detail: `${data.total_pages - data.pages_with_faq_schema} pages`, severity: "low", pages: data.total_pages - data.pages_with_faq_schema },
    ];
    const suggestions = [
      { title: "Implement JSON‑LD", detail: "Add structured data for all pages", priority: "high" },
      { title: "Add FAQ schemas", detail: "Improve answer engine visibility", priority: "high" },
      { title: "Improve internal linking", detail: "Use schema to connect related pages", priority: "medium" },
    ];

    return {
      overall_score: data.overall_score,
      pages_analyzed: data.total_pages,
      strengths,
      faults,
      suggestions,
      donut: [
        { name: "Score", value: data.overall_score },
        { name: "Remaining", value: 100 - data.overall_score },
      ],
    };
  }, [data]);

  if (!analysis) return <p className="text-red-600">AEO data unavailable.</p>;

  const scoreColor = "#1447E6";
  const donut = analysis.donut;

  return (
    <div className="space-y-6">
      <div className="mb-0">
        <p className="text-blue-600 uppercase text-xs sm:text-sm font-medium tracking-wide mb-1">AEO Report</p>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Answer Engine Optimization Report</h1>
        <p className="text-gray-500 mt-1 text-xs sm:text-sm">{analysis.pages_analyzed} pages analyzed • {new Date().toLocaleString()}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        <div className="lg:col-span-2 h-full">
          <Card className="h-full flex flex-col overflow-visible">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <p className="text-blue-500 uppercase text-[10px] sm:text-xs tracking-wide mb-1">Overall AEO Score</p>
                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{analysis.overall_score}/100</div>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">Based on {analysis.pages_analyzed} pages</p>
              </div>
              <div className="bg-gray-100 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-600 self-start">Answer Engine Visibility</div>
            </div>

            <div className="mt-6 sm:mt-8 flex flex-col md:flex-row items-center gap-4 sm:gap-6 flex-1">
              <div className="relative w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] md:w-[260px] md:h-[260px] flex-shrink-0 mx-auto md:mx-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={donut}
                      dataKey="value"
                      nameKey="name"
                      innerRadius="60%"
                      outerRadius="90%"
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                    >
                      <Cell fill={scoreColor} />
                      <Cell fill="#e5e7eb" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">{analysis.overall_score}%</span>
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
                <p className="text-lg sm:text-2xl font-bold text-green-700">{analysis.strengths.length}</p>
              </div>
              <div className="bg-red-50 rounded-xl p-2 sm:p-3 text-center">
                <p className="text-[10px] sm:text-xs text-gray-500">Issues</p>
                <p className="text-lg sm:text-2xl font-bold text-red-700">{analysis.faults.length}</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-2 sm:p-3 text-center">
                <p className="text-[10px] sm:text-xs text-gray-500">Suggestions</p>
                <p className="text-lg sm:text-2xl font-bold text-blue-700">{analysis.suggestions.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Right column cards */}
        <aside className="flex flex-col gap-4 sm:gap-6 h-full">
          <Card className="flex-1 flex flex-col justify-center">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase">AEO Strengths</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{analysis.strengths.length}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Schema presence</p>
            </div>
          </Card>
          <Card className="flex-1 flex flex-col justify-center">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase">Issues Found</p>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1 sm:mt-2">{analysis.faults.length}</p>
              <p className="text-[10px] sm:text-xs text-gray-400 mt-1">Need attention</p>
            </div>
          </Card>
          <Card className="flex-1 flex flex-col justify-center">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase">AI Suggestions</p>
              <p className="text-base sm:text-lg font-semibold text-gray-900 mt-1 sm:mt-2">{analysis.suggestions.length}</p>
              <p className="text-[10px] sm:text-xs text-gray-500">Actionable tips</p>
            </div>
          </Card>
        </aside>
      </div>

      {/* Bar Charts */}
      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard title="AEO Strengths" subtitle="Top Strengths" count={analysis.strengths.length} data={analysis.strengths.slice(0, 10)} type="strength" color="#1447E6" />
        <ChartCard title="AEO Issues" subtitle="Top Issues" count={analysis.faults.length} data={analysis.faults.slice(0, 10)} type="issue" color="#1447E6" />
      </section>

      {/* Detailed Lists */}
      <Card>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Top Strengths</h3>
        <ul className="space-y-2 list-disc pl-5 text-sm">
          {analysis.strengths.map((s, i) => (
            <li key={i}><strong className="text-green-800">{s.title}:</strong> {s.detail}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">Critical Issues</h3>
        <ul className="space-y-2 list-disc pl-5 text-sm">
          {analysis.faults.map((f, i) => (
            <li key={i}><strong className="text-red-800">{f.title}:</strong> {f.detail}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">AI Suggestions</h3>
        <ul className="space-y-2 list-disc pl-5 text-sm">
          {analysis.suggestions.map((s, i) => (
            <li key={i}><strong className="text-blue-800">{s.title}:</strong> {s.detail}</li>
          ))}
        </ul>
      </Card>
      {data.csv_download_url && (
        <a href={data.csv_download_url} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
          📥 Download Detailed AEO CSV
        </a>
      )}
    </div>
  );
}