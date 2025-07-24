import { defineConfig } from 'wxt';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  vite: () => ({
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }),
  manifest: {
    name: 'Woozi - Lead Management & Campaigns',
    short_name: 'Woozi',
    description: 'Streamline lead management and campaign automation. Track prospects, manage marketing campaigns, and boost sales productivity with an intuitive Chrome extension.',
    version: '1.0.0',
    author: 'Woozi Team',
    key: 'hCJepXeHOZmP3tS9gYGWqWoBKSQ0o9gp2JLv0jYjDi8=',
    permissions: [
      'storage', 
      'sidePanel', 
      'cookies', 
      'tabs',
      'webNavigation',
      'activeTab',
      'scripting'
    ],
    action: {},
    icons: {
      16: '/icons/icon-16.png',
      32: '/icons/icon-32.png',
      48: '/icons/icon-48.png',
      128: '/icons/icon-128.png',
    },
    host_permissions: [
      'https://*.supabase.co/*',
      'https://buxmjznpyefwplnrejmn.supabase.co/*'
    ],
    content_security_policy: {
      extension_pages: "script-src 'self' 'wasm-unsafe-eval'; object-src 'self'; connect-src 'self' https://*.supabase.co;"
    },
  },
});