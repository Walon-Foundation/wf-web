import { getGitHubRepoStats } from "../lib/github";

type GitHubRepoMetaProps = {
  owner: string;
  repo: string;
};

export async function GitHubRepoMeta({ owner, repo }: GitHubRepoMetaProps) {
  const stats = await getGitHubRepoStats(owner, repo);

  if (!stats) {
    return null;
  }

  return (
    <div className="github-meta-row">
      <span className="github-meta-pill">★ {stats.stars}</span>
      <span className="github-meta-pill">Forks {stats.forks}</span>
      {stats.language ? <span className="github-meta-pill">{stats.language}</span> : null}
    </div>
  );
}
