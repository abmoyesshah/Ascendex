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