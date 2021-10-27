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
  github: GithubRepository,
  useDefaultShortForm = true,
) => {
  if (useDefaultShortForm && github.branch === DEFAULT_REPOSITORY.branch) {
    return `https://github.com/${github.owner}/${github.repository}`;
  }
  return `https://github.com/${github.owner}/${github.repository}/tree/${github.branch}`;
};
