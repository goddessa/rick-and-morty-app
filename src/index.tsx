import React, { Suspense } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './router/App';
import './index.css';


const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);

  if (rootElement.hasChildNodes()) {
    hydrateRoot(
      rootElement,
      <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </React.StrictMode>
    );
  } else {
    root.render(
      <React.StrictMode>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </React.StrictMode>
    );
  }
} else {
  throw new Error("Root element not found");
}
