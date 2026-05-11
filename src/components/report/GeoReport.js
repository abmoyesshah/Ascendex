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

export default function GeoReport({ data }) {
    const [previewPage, setPreviewPage] = useState(0);

    // Normalise GEO data to the UI structure
    const analysis = useMemo(() => {
        if (!data || data.status === "error") return null;

        const strengths = (data.strengths || []).map((s) => ({
            title: s,
            detail: s,
            impact: "medium",
        }));
        const faults = (data.faults || []).map((f) => ({
            title: f,
            detail: f,
            severity: "medium",
            pages: 0,
        }));
        const suggestions = (data.suggestions || []).map((s) => ({
            title: s,
            detail: s,
            priority: "medium",
        }));

        // Map pages to a structure similar to the SEO page preview
        const results_preview = (data.pages || []).map((p) => ({
            url: p.url,
            seo_score: p.overall_geo_score,
            title: p.url,
            meta_description: "",
            word_count: 0,
            h1_count: 0,
            h2_count: 0,
            h3_count: 0,
            missing_alt_tags: 0,
            total_images: 0,
            small_images: 0,
            large_images: 0,
            ideal_images: 0,
            internal_links: 0,
            external_links: 0,
            canonical_tag: "",
            opengraph_tag: "",
            twitter_tag: "",
            viewport: "",
            robots_meta: "",
            schema_types: "",
            readability_score: 0,
            grammar_errors: 0,
            text_html_ratio: 0,
            load_time: 0,
            // extra GEO-specific fields we can show in the grid
            entity_density: p.entity_density,
            community_trust: p.community_trust,
            chatgpt_score: p.chatgpt_score,
            perplexity_score: p.perplexity_score,
            gemini_score: p.gemini_score,
            domain_type: p.domain_type,
        }));

        const areaSeries = [
            { x: "Score", y: data.overall_score },
            { x: "Pages", y: (data.pages || []).length * 10 },
            { x: "ChatGPT", y: data.chatgpt_score },
            { x: "Perplexity", y: data.perplexity_score },
            { x: "Gemini", y: data.gemini_score },
        ];

        const barLeft = strengths.slice(0, 5).map((s) => ({
            name: s.title.split(" ")[0],
            value: Math.min(s.detail.length * 2, 100),
        }));

        return {
            overall_score: data.overall_score,
            pages_analyzed: (data.pages || []).length,
            url: data.url,
            strengths,
            faults,
            suggestions,
            results_preview: results_preview.length > 0 ? results_preview : null,
            areaSeries,
            donut: [
                { name: "Score", value: data.overall_score },
                { name: "Remaining", value: 100 - data.overall_score },
            ],
            barLeft,
            // additional GEO scores for right column cards
            chatgpt_score: data.chatgpt_score,
            perplexity_score: data.perplexity_score,
            gemini_score: data.gemini_score,
        };
    }, [data]);

    if (!analysis) return <p className="text-red-600">GEO data unavailable.</p>;

    const scoreColor = "#1447E6";
    const donut = analysis.donut;
    const areaSeries = analysis.areaSeries;
    const barLeft = analysis.barLeft;

    return (
        <div className="space-y-6">
            <div className="mb-0">
                <p className="text-blue-600 uppercase text-xs sm:text-sm font-medium tracking-wide mb-1">GEO Report</p>
                {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Generative Engine Optimization Report</h1> */}
                <p className="text-gray-500 mt-1 text-xs sm:text-sm">{analysis.url} • {analysis.pages_analyzed} pages analyzed • {new Date().toLocaleString()}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                <div className="lg:col-span-2 h-full">
                    <Card className="h-full flex flex-col overflow-visible">
                        <div className="flex flex-col sm:flex-row justify-between gap-4">
                            <div>
                                <p className="text-blue-500 uppercase text-[10px] sm:text-xs tracking-wide mb-1">Overall GEO Score</p>
                                <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{analysis.overall_score}/100</div>
                                <p className="text-gray-500 text-xs sm:text-sm mt-1">Based on {analysis.pages_analyzed} pages</p>
                            </div>
                            <div className="bg-gray-100 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-600 self-start">{analysis.url}</div>
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

                {/* Right column with GEO-specific cards */}
                {/* Right column with three donut score cards */}
                <aside className="flex flex-col gap-4 sm:gap-6 h-full">
                    {/* ChatGPT Donut */}
                    <Card className="flex-1 flex flex-col items-center justify-center">
                        <p className="text-[10px] sm:text-xs text-gray-400 uppercase mb-2">ChatGPT Score</p>
                        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "ChatGPT", value: analysis.chatgpt_score },
                                            { name: "Remaining", value: 100 - analysis.chatgpt_score },
                                        ]}
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
                                <span className="text-sm sm:text-lg font-bold text-gray-900">
                                    {analysis.chatgpt_score}%
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Perplexity Donut */}
                    <Card className="flex-1 flex flex-col items-center justify-center">
                        <p className="text-[10px] sm:text-xs text-gray-400 uppercase mb-2">Perplexity Score</p>
                        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Perplexity", value: analysis.perplexity_score },
                                            { name: "Remaining", value: 100 - analysis.perplexity_score },
                                        ]}
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
                                <span className="text-sm sm:text-lg font-bold text-gray-900">
                                    {analysis.perplexity_score}%
                                </span>
                            </div>
                        </div>
                    </Card>

                    {/* Gemini Donut */}
                    <Card className="flex-1 flex flex-col items-center justify-center">
                        <p className="text-[10px] sm:text-xs text-gray-400 uppercase mb-2">Gemini Score</p>
                        <div className="relative w-[100px] h-[100px] sm:w-[120px] sm:h-[120px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: "Gemini", value: analysis.gemini_score },
                                            { name: "Remaining", value: 100 - analysis.gemini_score },
                                        ]}
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
                                <span className="text-sm sm:text-lg font-bold text-gray-900">
                                    {analysis.gemini_score}%
                                </span>
                            </div>
                        </div>
                    </Card>
                </aside>
            </div>

            {/* Bar Charts */}
            <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <ChartCard title="GEO Strengths" subtitle="Top Strengths" count={analysis.strengths.length} data={analysis.strengths.slice(0, 10)} type="strength" color="#1447E6" />
                <ChartCard title="GEO Issues" subtitle="Top Issues" count={analysis.faults.length} data={analysis.faults.slice(0, 10)} type="issue" color="#1447E6" />
            </section>

            {/* Page Preview – with GEO-specific details */}
            {analysis.results_preview && analysis.results_preview.length > 0 && (
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
                                        <p><span className="font-semibold text-gray-500">GEO Score:</span>{" "}<span className="font-semibold text-gray-800">{page.seo_score}/100</span></p>
                                        <p><span className="font-semibold text-gray-500">ChatGPT:</span> {page.chatgpt_score}</p>
                                        <p><span className="font-semibold text-gray-500">Perplexity:</span> {page.perplexity_score}</p>
                                        <p><span className="font-semibold text-gray-500">Gemini:</span> {page.gemini_score}</p>
                                        <p><span className="font-semibold text-gray-500">Entity Density:</span> {page.entity_density?.toFixed(1)}/1k</p>
                                        <p><span className="font-semibold text-gray-500">Community Trust:</span> {page.community_trust}/20</p>
                                        <p><span className="font-semibold text-gray-500">Domain Type:</span> {page.domain_type}</p>
                                    </div>
                                </div>
                            );
                        })()}
                    </Card>
                </section>
            )}

            {/* Detailed Lists */}
            {analysis.strengths.length > 0 && (
                <Card>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 inline-block" /> Top GEO Strengths
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 list-disc pl-5 text-gray-700 text-xs sm:text-sm">
                        {analysis.strengths.map((s, i) => (
                            <li key={i}><strong className="text-green-800">{s.title}</strong></li>
                        ))}
                    </ul>
                </Card>
            )}
            {analysis.faults.length > 0 && (
                <Card>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 inline-block" /> Critical GEO Issues
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 list-disc pl-5 text-gray-700 text-xs sm:text-sm">
                        {analysis.faults.map((f, i) => (
                            <li key={i}><strong className="text-red-800">{f.title}</strong></li>
                        ))}
                    </ul>
                </Card>
            )}
            {analysis.suggestions.length > 0 && (
                <Card>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-blue-500 inline-block" /> AI Suggestions
                    </h3>
                    <ul className="space-y-2 sm:space-y-3 list-disc pl-5 text-gray-700 text-xs sm:text-sm">
                        {analysis.suggestions.map((s, i) => (
                            <li key={i}><strong className="text-blue-800">{s.title}</strong></li>
                        ))}
                    </ul>
                </Card>
            )}
            {data.csv_download && (
                <a href={`https://your-geo-backend.hf.space${data.csv_download}`} className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg text-sm">
                    📥 Download Full GEO Report
                </a>
            )}
        </div>
    );
}