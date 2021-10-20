import { createContext, useContext } from 'react';

import type { GithubRepository } from '../../github';

export type AppContextProps = {
  baseUrl: string;
  githubRepository: GithubRepository;
  fetch: typeof fetch;
};

export const AppContext = createContext<AppContextProps>(
  undefined as unknown as AppContextProps,
);

export const useAppContext = () => useContext(AppContext);
