/**
 * This application context is to be used for HTML rendering.
 * It should include general application config that is safe to execute both
 * when pre-rendering content (during a build) and dynamically (client-side).
 */

import * as github from '$lib/github';

export default {
  githubBranchTreeUrl: github.getBranchTreeUrl({
    owner: import.meta.env.OWNER?.toString(),
    repository: import.meta.env.REPOSITORY?.toString(),
    branch: import.meta.env.BRANCH?.toString(),
  }),
};
