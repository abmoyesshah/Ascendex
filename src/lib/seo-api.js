export async function analyzeSEO(url) {
  const API_URL = "https://syedabdulmoizshah-my-second-ai-agent.hf.space";
  const fullUrl = url.startsWith("http") ? url : `https://${url}`;
  const res = await fetch(`${API_URL}/analyze?url=${encodeURIComponent(fullUrl)}&max_pages=20&use_ai=true&max_concurrent=1`);
  if (!res.ok) throw new Error("SEO analysis failed");
  return await res.json();
}

export async function analyzeGEO(url, options = {}) {
  const API_URL = "https://syedabdulmoizshah-geo-analyzer.hf.space";
  const { maxPages = 20 } = options;
  const fullUrl = url.startsWith("http") ? url : `https://${url}`;
  const params = new URLSearchParams({ url: fullUrl, max_pages: String(maxPages) });
  const res = await fetch(`${API_URL}/analyze?${params.toString()}`);
  if (!res.ok) throw new Error("GEO analysis failed");
  const data = await res.json();
  if (data.status === "error") throw new Error(data.message);
  return data;
}

export async function analyzeAEO(url, options = {}) {
  const API_URL = "https://syedabdulmoizshah-aeo-agent.hf.space";
  const { maxPages = 20 } = options;

  const fullUrl = url.startsWith("http") ? url : `https://${url}`;
  const params = new URLSearchParams({
    url: fullUrl,
    max_pages: String(maxPages),
  });

  // Hard timeout of 90 seconds for the whole request
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 90000);

  try {
    const res = await fetch(`${API_URL}/analyze?${params.toString()}`, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`AEO analysis failed (${res.status}): ${errorText.slice(0, 200)}`);
    }

    const data = await res.json();

    if (data.status === "error") {
      throw new Error(data.message);
    }

    // The new agent returns:
    // {
    //   overall_score, strengths: string[], faults: string[], suggestions: string[],
    //   pages: [{url, score, grade, word_count, lists_count, tables_count,
    //            question_headings, faq_schema, strengths: string[], issues: string[]}],
    //   csv_download: "/download/..."
    // }

    // Normalise fault names to "faults" if needed (the API uses "faults")
    return {
      overall_score: data.overall_score,
      pages_analyzed: data.pages_analyzed ?? data.pages?.length ?? 0,
      url: data.url,
      strengths: data.strengths || [],
      faults: data.faults || data.faults || [],   // API may use faults
      suggestions: data.suggestions || [],
      pages: data.pages || [],
      csv_download: data.csv_download,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === "AbortError") {
      throw new Error("AEO analysis timed out (90s)");
    }
    throw err;
  }
}