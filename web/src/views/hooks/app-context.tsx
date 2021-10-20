import { createContext, useContext } from 'react';

import { GithubRepository, DEFAULT_REPOSITORY } from '../../github';

export type AppContextProps = {
  baseUrl: string;
  githubRepository: GithubRepository;
};

export const AppContext = createContext<AppContextProps>({
  baseUrl: '/',
  githubRepository: DEFAULT_REPOSITORY,
});

export const useAppContext = () => useContext(AppContext);
