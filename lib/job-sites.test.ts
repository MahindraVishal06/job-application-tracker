import { describe, expect, it } from 'vitest';
import { MatchPattern } from 'wxt/utils/match-patterns';
import { JOB_SITE_MATCHES, JOB_SITES, type JobSite } from './job-sites';

function matchesAny(patterns: readonly string[], url: string): boolean {
  return patterns.some((pattern) => new MatchPattern(pattern).includes(url));
}

const jobUrls: Record<JobSite, string[]> = {
  linkedin: ['https://www.linkedin.com/jobs/view/4012345678/'],
  indeed: [
    'https://www.indeed.com/viewjob?jk=abc123',
    'https://uk.indeed.com/viewjob?jk=abc123',
    'https://smartapply.indeed.com/beta/indeedapply/form/review',
  ],
  greenhouse: [
    'https://boards.greenhouse.io/acme/jobs/1234567',
    'https://job-boards.greenhouse.io/acme/jobs/1234567',
  ],
  lever: [
    'https://jobs.lever.co/acme/0a1b2c3d-4e5f-6789-abcd-ef0123456789/apply',
    'https://jobs.eu.lever.co/acme/0a1b2c3d-4e5f-6789-abcd-ef0123456789',
  ],
  workday: [
    'https://acme.wd5.myworkdayjobs.com/en-US/External/job/Remote/Engineer_R123',
    'https://wd3.myworkdaysite.com/recruiting/acme/External/job/Engineer_R123',
  ],
};

describe('JOB_SITES', () => {
  it.each(Object.entries(jobUrls))(
    '%s patterns match its job URLs',
    (site, urls) => {
      for (const url of urls) {
        expect(matchesAny(JOB_SITES[site as JobSite], url), url).toBe(true);
      }
    },
  );

  it('does not match unrelated sites or plain http', () => {
    for (const url of [
      'https://www.google.com/search?q=jobs',
      'https://example.com/careers',
      'http://www.linkedin.com/jobs/view/1/',
      'https://linkedin.com.evil.example/jobs',
    ]) {
      expect(matchesAny(JOB_SITE_MATCHES, url), url).toBe(false);
    }
  });

  it('only uses https patterns', () => {
    for (const pattern of JOB_SITE_MATCHES) {
      expect(pattern.startsWith('https://')).toBe(true);
    }
  });
});
