import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'wxt';
import { JOB_SITE_MATCHES } from './lib/job-sites';

// See https://wxt.dev/api/reference/wxt/interfaces/inlineconfig.html
export default defineConfig({
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Job Application Tracker',
    description:
      "Automatically saves jobs you apply to, reminds you to follow up, and shows what's working.",
    // Icons are picked up automatically from public/icon/{16,32,48,96,128}.png.
    permissions: ['storage', 'alarms', 'notifications'],
    host_permissions: JOB_SITE_MATCHES,
    action: {
      default_title: 'Job Application Tracker',
    },
  },
  vite: () => ({
    plugins: [tailwindcss()],
  }),
});
