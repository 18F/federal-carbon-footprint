import type { GithubRepository } from './github';
import { DEFAULT_REPOSITORY } from './github';

// Export the Github repository details, using Federalist environment variables.
export const GITHUB_REPO: GithubRepository = {
  owner: import.meta.env.OWNER?.toString() || DEFAULT_REPOSITORY.owner,
  repository:
    import.meta.env.REPOSITORY?.toString() || DEFAULT_REPOSITORY.repository,
  branch: import.meta.env.BRANCH?.toString() || DEFAULT_REPOSITORY.branch,
};
