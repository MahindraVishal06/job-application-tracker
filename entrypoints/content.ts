import { JOB_SITE_MATCHES } from '@/lib/job-sites';

export default defineContentScript({
  matches: JOB_SITE_MATCHES,
  main() {
    console.log('Job Application Tracker content script loaded.');
  },
});
