import { renderApp } from './views';

renderApp(
  {
    baseUrl: import.meta.env.BASEURL,
    githubRepository: import.meta.env.GITHUB,
  },
  document.getElementById('root') as HTMLElement,
);
