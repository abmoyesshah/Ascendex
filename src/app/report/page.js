"use client";
import React, { Suspense } from "react";
import ReportContent from "../../components/report-content";

export default function Report() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center"><p className="text-gray-500">Loading report...</p></div>}>
      <ReportContent />
    </Suspense>
  );
}
