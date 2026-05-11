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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!url) {
      setError("No URL provided.");
      setLoading(false);
      return;
    }

    async function fetchAll() {
      try {
        setLoading(true);
        // Start SEO and GEO in parallel
        const [seoResult, geoResult] = await Promise.all([
          analyzeSEO(url),
          analyzeGEO(url, { maxPages: 20 }),
        ]);

        setSeoData(seoResult);
        setGeoData(geoResult);

        // Start AEO (polling)
        const aeoResult = await analyzeAEO(url, {
          maxPages: 20,
          onProgress: (msg) => console.log("AEO:", msg),
        });
        setAeoData(aeoResult);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAll();
  }, [url]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-4">
            Running SEO, AEO & GEO analysis...
          </div>
          <div className="text-gray-500">
            This may take a minute.
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">Analysis Failed</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  return <ReportTabs seoData={seoData} geoData={geoData} aeoData={aeoData} url={url} />;
}

export default function ReportPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white flex items-center justify-center">
          <p className="text-gray-500">Loading report...</p>
        </div>
      }
    >
      <ReportContent />
    </Suspense>
  );
}