/**
 * This application context is to be used for HTML rendering.
 * It should include general application config that is safe to execute both
 * when pre-rendering content (during a build) and dynamically (client-side).
 *
 * It also encapulates Sveltekit-specific exports, to make it easier to mock
 * and potentially retire usage of in favor of a custom build system.
 */

import { base } from '$app/paths';

import * as github from '$lib/domain/github';

// expose SvelteKit exports on the context
export * as env from '$app/env';
export * as stores from '$app/stores';

export const githubBranchTreeUrl = github.getBranchTreeUrl({
  owner: import.meta.env.OWNER?.toString(),
  repository: import.meta.env.REPOSITORY?.toString(),
  branch: import.meta.env.BRANCH?.toString(),
});

export const getUrl = (path: `/${string}`) => {
  return `${base}${path}`;
};
