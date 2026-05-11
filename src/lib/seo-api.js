/**
 * Analyze SEO for a given URL
 */
export async function analyzeSEO(url) {
  const API_URL = "https://emadalikhan-seo-analyzer2.hf.space";
  // const API_URL = "http://127.0.0.1:8000";

  const fullUrl = url.startsWith("http")
    ? url
    : `https://${url}`;

  const response = await fetch(
    `${API_URL}/analyze?url=${encodeURIComponent(
      fullUrl
    )}&max_pages=20&use_ai=true&max_concurrent=1`
  );

  console.log("API Response:", response);

  if (!response.ok) {
    throw new Error("Failed to analyze website");
  }

  return await response.json();
}


/**
 * Run autonomous SEO optimization
 */
export async function runAutonomousSEO(data) {
  const API_URL = "https://syedabdulmoizshah-seo-updater.hf.space";

  const formData = new FormData();

  formData.append("github_token", data.github_token);
  formData.append("repo_url", data.repo_url);
  formData.append("site_base", data.site_base);
  formData.append("branch", data.branch || "main");
  formData.append(
    "git_username",
    data.git_username || "SEO-Auto-Fix-Bot"
  );
  formData.append(
    "git_email",
    data.git_email || "seo-bot@example.com"
  );

  if (data.csv_file) {
    formData.append("csv_file", data.csv_file);
  }

  const response = await fetch(`${API_URL}/run-seo-fix`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to run autonomous SEO");
  }

  return await response.json();
}


export async function analyzeGEO(url, options = {}) {
  const API_URL = import.meta.env?.VITE_GEO_API_URL || "https://syedabdulmoizshah-geo-analyzer.hf.space";
  const { maxPages = 20, signal } = options;

  // Normalize URL
  const fullUrl = url.startsWith("http") ? url : `https://${url}`;

  // Build query parameters
  const params = new URLSearchParams({
    url: fullUrl,
    max_pages: String(maxPages),
  });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s timeout
  const finalSignal = signal || controller.signal;

  try {
    const response = await fetch(`${API_URL}/analyze?${params.toString()}`, {
      signal: finalSignal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GEO analysis failed (${response.status}): ${errorText.slice(0, 200)}`);
    }

    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.message);
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("GEO analysis request was cancelled or timed out");
    }
    throw err;
  }
}


export async function downloadGEOCsv(downloadUrl, apiUrl = null) {
  const baseApiUrl = apiUrl || import.meta.env?.VITE_GEO_API_URL || "https://syedabdulmoizshah-geo-analyzer.hf.space";
  const fullUrl = downloadUrl.startsWith("http") ? downloadUrl : `${baseApiUrl}${downloadUrl}`;

  const response = await fetch(fullUrl);

  if (!response.ok) {
    throw new Error(`Failed to download CSV: ${response.status}`);
  }

  return await response.blob();
}


export async function saveGEOCsvToFile(analysisResult, filename = "geo_report.csv") {
  if (!analysisResult.csv_download) {
    throw new Error("No CSV download link available in the analysis result");
  }
  const blob = await downloadGEOCsv(analysisResult.csv_download);
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


export async function analyzeAEO(url, options = {}) {
  const API_URL = import.meta.env?.VITE_AEO_API_URL || "https://syedabdulmoizshah-aeocrawlerrr.hf.space";
  const {
    maxPages = 20,
    pollInterval = 2000,
    timeout = 120000,
    signal,
    onProgress,
  } = options;

  // Normalize URL
  const fullUrl = url.startsWith("http") ? url : `https://${url}`;

  // Create abort controller for the overall operation
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => abortController.abort(), timeout);

  // Combine external signal if provided
  if (signal) {
    signal.addEventListener("abort", () => abortController.abort());
  }

  try {
    // 1. Start the audit
    onProgress?.("Starting AEO audit...");
    const startResponse = await fetch(`${API_URL}/start-audit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: fullUrl, max_pages: maxPages }),
      signal: abortController.signal,
    });

    if (!startResponse.ok) {
      const errorText = await startResponse.text();
      throw new Error(`Failed to start audit (${startResponse.status}): ${errorText.slice(0, 200)}`);
    }

    const { audit_id } = await startResponse.json();
    onProgress?.(`Audit started (ID: ${audit_id}). Crawling website...`);

    // 2. Poll for completion
    let completed = false;
    let lastStatus = null;
    const startTime = Date.now();

    while (!completed && (Date.now() - startTime) < timeout) {
      // Check for abort
      if (abortController.signal.aborted) {
        throw new Error("AEO analysis was cancelled");
      }

      const statusResponse = await fetch(`${API_URL}/audit-status/${audit_id}`, {
        signal: abortController.signal,
      });

      if (!statusResponse.ok) {
        throw new Error(`Failed to get audit status (${statusResponse.status})`);
      }

      const statusData = await statusResponse.json();
      lastStatus = statusData;

      onProgress?.(statusData.message || `Processing... (${statusData.status})`);

      if (statusData.status === "completed") {
        completed = true;
        break;
      } else if (statusData.status === "error") {
        throw new Error(`Audit failed: ${statusData.message}`);
      }

      // Wait before polling again
      await new Promise((resolve) => setTimeout(resolve, pollInterval));
    }

    if (!completed) {
      throw new Error("AEO audit timed out");
    }

    // Return the final results
    return {
      audit_id,
      overall_score: lastStatus.results?.overall_score,
      total_pages: lastStatus.results?.total_pages,
      pages_with_schema: lastStatus.results?.pages_with_schema,
      pages_with_faq_schema: lastStatus.results?.pages_with_faq_schema,
      pages_with_faq_sections: lastStatus.results?.pages_with_faq_sections,
      pages_with_lists: lastStatus.results?.pages_with_lists,
      csv_download_url: lastStatus.download_url,
      raw: lastStatus.results, // full raw results
    };
  } finally {
    clearTimeout(timeoutId);
  }
}


export async function downloadAEOCsv(downloadUrl, apiUrl = null) {
  const baseApiUrl = apiUrl || import.meta.env?.VITE_AEO_API_URL || "https://syedabdulmoizshah-aeocrawlerrr.hf.space";
  const fullUrl = downloadUrl.startsWith("http") ? downloadUrl : `${baseApiUrl}${downloadUrl}`;

  const response = await fetch(fullUrl);
  if (!response.ok) {
    throw new Error(`Failed to download CSV: ${response.status}`);
  }
  return await response.blob();
}


export async function saveAEOCsvToFile(analysisResult, filename = "aeo_report.csv") {
  if (!analysisResult.csv_download_url) {
    throw new Error("No CSV download link available in the analysis result");
  }
  const blob = await downloadAEOCsv(analysisResult.csv_download_url);
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}


export async function checkAeoApiStatus(apiUrl = null) {
  const baseApiUrl = apiUrl || import.meta.env?.VITE_AEO_API_URL || "https://your-aeo-backend.hf.space";
  const response = await fetch(`${baseApiUrl}/api-status`);
  if (!response.ok) {
    throw new Error(`Failed to fetch API status: ${response.status}`);
  }
  return await response.json();
}