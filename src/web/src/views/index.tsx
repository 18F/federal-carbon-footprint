import 'uswds';

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './components/App';
import { AppContext, AppContextProps } from './hooks/app-context';

import './index.scss';

export const renderApp = (
  appContextProps: AppContextProps,
  rootElement: HTMLElement,
) => {
  ReactDOM.render(
    <React.StrictMode>
      <AppContext.Provider value={appContextProps}>
        <App />
      </AppContext.Provider>
    </React.StrictMode>,
    rootElement,
  );
};
