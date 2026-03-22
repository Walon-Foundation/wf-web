type GitHubRepoStats = {
  stargazers_count: number;
  forks_count: number;
  language: string | null;
};

export async function getGitHubRepoStats(owner: string, repo: string) {
  try {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
      next: { revalidate: 3600 },
      headers: {
        Accept: "application/vnd.github+json",
      },
    });

    if (!response.ok) {
      return null;
    }

    const data = (await response.json()) as GitHubRepoStats;

    return {
      stars: data.stargazers_count,
      forks: data.forks_count,
      language: data.language,
    };
  } catch {
    return null;
  }
}
