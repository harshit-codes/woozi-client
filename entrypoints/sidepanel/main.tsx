import React from 'react';
import ReactDOM from 'react-dom/client';
import '../../src/assets/globals.css';
import { App } from '../../src/components/App';

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}