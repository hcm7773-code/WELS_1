import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import {validateVELSData} from './data/dataValidation';

// Run data structure and consistency check in development mode
if (import.meta.env.DEV) {
  const report = validateVELSData();
  if (report.isValid) {
    console.log(
      `%c${report.outputFormattedText.trim()}`,
      'color: #059669; font-weight: bold; font-family: monospace; font-size: 13px; line-height: 1.6;'
    );
  } else {
    console.error(
      `%c${report.outputFormattedText.trim()}`,
      'color: #dc2626; font-weight: bold; font-family: monospace; font-size: 13px; line-height: 1.6;'
    );
  }
  (window as any).__VELS_VALIDATION__ = report;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
