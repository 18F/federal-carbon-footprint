export type GithubRepository = {
  owner: string;
  repository: string;
  branch: string;
};

export const DEFAULT_REPOSITORY: GithubRepository = {
  owner: '18F',
  repository: 'federal-carbon-footprint',
  branch: 'main',
};

export const getBranchTreeUrl = (
  github: GithubRepository = DEFAULT_REPOSITORY,
  useDefaultShortForm = true,
) => {
  const repo = {
    owner: github.owner || DEFAULT_REPOSITORY.owner,
    repository: github.repository || DEFAULT_REPOSITORY.repository,
    branch: github.branch || DEFAULT_REPOSITORY.branch,
  };
  if (useDefaultShortForm && repo.branch === DEFAULT_REPOSITORY.branch) {
    return `https://github.com/${repo.owner}/${repo.repository}`;
  }
  return `https://github.com/${repo.owner}/${repo.repository}/tree/${repo.branch}`;
};
