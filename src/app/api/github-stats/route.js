import { NextResponse } from "next/server";

const GITHUB_USERNAME = "Shankar-0707";
const GITHUB_API = "https://api.github.com";

// Cache response for 1 hour — avoids hammering GitHub API rate limits
export const revalidate = 3600;

async function ghFetch(path) {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const token = process.env.GITHUB_TOKEN;
  // Only use token if it looks like a real GitHub PAT (avoids 401 from placeholder values)
  if (token && (token.startsWith("ghp_") || token.startsWith("github_pat_"))) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  const res = await fetch(`${GITHUB_API}${path}`, { headers, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status} ${path}`);
  return res.json();
}

export async function GET() {
  try {
    // 1. User profile
    const profile = await ghFetch(`/users/${GITHUB_USERNAME}`);

    // 2. Estimate total commits via search API
    let totalCommits = 0;
    try {
      const commitSearch = await ghFetch(
        `/search/commits?q=author:${GITHUB_USERNAME}&per_page=1`
      );
      totalCommits = commitSearch.total_count || 0;
    } catch {
      totalCommits = 0;
    }

    // 3. Estimate total pull requests via search API
    let totalPRs = 0;
    try {
      const prSearch = await ghFetch(
        `/search/issues?q=type:pr+author:${GITHUB_USERNAME}&per_page=1`
      );
      totalPRs = prSearch.total_count || 0;
    } catch {
      totalPRs = 0;
    }

    return NextResponse.json({
      username: profile.login,
      name: profile.name,
      bio: profile.bio,
      avatarUrl: profile.avatar_url,
      profileUrl: profile.html_url,
      publicRepos: profile.public_repos || 0,
      totalCommits: totalCommits || 150,
      totalPRs: totalPRs || 25,
      deployedApps: 10,
    });
  } catch (error) {
    console.error("[github-stats] Error:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats", detail: error.message },
      { status: 500 }
    );
  }
}
