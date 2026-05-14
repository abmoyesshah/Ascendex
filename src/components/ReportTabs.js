"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import SeoReport from "./report/SeoReport";
import GeoReport from "./report/GeoReport";
import AeoReport from "./report/AeoReport";

export default function ReportTabs({ seoData, geoData, aeoData, url }) {
  const [activeTab, setActiveTab] = useState("seo");

  const title = {
    seo: "SEO Analysis Report",
    aeo: "Answer Engine Optimization Report",
    geo: "Generative Engine Optimization Report",
  }[activeTab];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-blue-600 text-sm mb-6">
          <ArrowLeft size={16} /> Back to Website
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">{title}</h1>
          <div className="flex gap-2">
            {["seo","aeo","geo"].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`px-5 py-2 rounded-full font-semibold text-sm ${activeTab===tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
        <p className="text-gray-500 text-sm mb-6">{url}</p>
        {activeTab==="seo" && <SeoReport data={seoData} />}
        {activeTab==="geo" && <GeoReport data={geoData} />}
        {activeTab==="aeo" && <AeoReport data={aeoData} />}
      </div>
    </div>
  );
}