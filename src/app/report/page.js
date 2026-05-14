"use client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ReportTabs from "../../components/ReportTabs";
import { analyzeSEO, analyzeGEO, analyzeAEO } from "../../lib/seo-api";

function ReportContent() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";
  const [seoData, setSeoData] = useState(null);
  const [geoData, setGeoData] = useState(null);
  const [aeoData, setAeoData] = useState(null);
  const [loading, setLoading] = useState(true);        // only for the very first SEO response
  const [loadingGeo, setLoadingGeo] = useState(true);
  const [loadingAeo, setLoadingAeo] = useState(true);

  useEffect(() => {
    if (!url) {
      setLoading(false);
      return;
    }

    // 1. SEO – fetch and show immediately
    console.time("⏱ SEO API");
    analyzeSEO(url)
      .then((data) => {
        console.timeEnd("⏱ SEO API");
        setSeoData(data);
      })
      .catch((e) => {
        console.timeEnd("⏱ SEO API");
        setSeoData({ status: "error", message: e.message });
      })
      .finally(() => setLoading(false));

    // 2. GEO – start in parallel
    console.time("⏱ GEO API");
    analyzeGEO(url, { maxPages: 20 })
      .then((data) => {
        console.timeEnd("⏱ GEO API");
        setGeoData(data);
      })
      .catch((e) => {
        console.timeEnd("⏱ GEO API");
        setGeoData({ status: "error", message: e.message });
      })
      .finally(() => setLoadingGeo(false));

    // 3. AEO – start in parallel (uses the new direct endpoint)
    console.time("⏱ AEO API");
    analyzeAEO(url, { maxPages: 20 })
      .then((data) => {
        console.timeEnd("⏱ AEO API");
        setAeoData(data);
      })
      .catch((e) => {
        console.timeEnd("⏱ AEO API");
        setAeoData({ status: "error", message: e.message });
      })
      .finally(() => setLoadingAeo(false));
  }, [url]);

  // Show a simple loading indicator only while waiting for the first (SEO) data
  if (loading && !seoData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading SEO report…</p>
      </div>
    );
  }

  return (
    <ReportTabs
      seoData={seoData}
      geoData={geoData}
      aeoData={aeoData}
      url={url}
      loadingGeo={loadingGeo}
      loadingAeo={loadingAeo}
    />
  );
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-600 text-lg">Loading report…</p>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}