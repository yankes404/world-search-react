import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { NuqsAdapter } from 'nuqs/adapters/react';

import './index.css';

import { App } from './app';

createRoot(document.getElementById('root')!).render(
  <NuqsAdapter>
    <StrictMode>
      <App />
    </StrictMode>,
  </NuqsAdapter>
)
