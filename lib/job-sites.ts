/**
 * Job sites the extension auto-captures from. Used for the manifest's
 * host_permissions and the content script's matches, so both stay in sync.
 *
 * Keep this list tight: every pattern has to be justified in the Chrome Web
 * Store listing. Other sites are covered later by the "Save this job" button.
 */
export const JOB_SITES = {
  // LinkedIn is a single-page app, so match the whole site and let the
  // content script react when the user navigates to a job.
  linkedin: ['https://www.linkedin.com/*'],
  // Country sites are subdomains (uk.indeed.com, in.indeed.com), as is the
  // apply flow (smartapply.indeed.com).
  indeed: ['https://*.indeed.com/*'],
  // boards.greenhouse.io, job-boards.greenhouse.io, job-boards.eu.greenhouse.io
  greenhouse: ['https://*.greenhouse.io/*'],
  lever: ['https://jobs.lever.co/*', 'https://jobs.eu.lever.co/*'],
  workday: ['https://*.myworkdayjobs.com/*', 'https://*.myworkdaysite.com/*'],
} as const satisfies Record<string, readonly string[]>;

export type JobSite = keyof typeof JOB_SITES;

export const JOB_SITE_MATCHES: string[] = Object.values(JOB_SITES).flat();
