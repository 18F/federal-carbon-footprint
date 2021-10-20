import { renderApp } from './views';

renderApp(
  {
    baseUrl: import.meta.env.BASEURL,
    githubRepository: import.meta.env.GITHUB,
    fetch: window.fetch.bind(window),
  },
  document.getElementById('root') as HTMLElement,
);
