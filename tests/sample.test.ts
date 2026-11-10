import { beforeEach, describe, expect, it } from 'vitest';
import { fakeBrowser } from 'wxt/testing/fake-browser';

describe('test setup', () => {
  beforeEach(() => {
    fakeBrowser.reset();
  });

  it('runs with the WXT fake browser APIs', async () => {
    await browser.storage.local.set({ reminderDays: 7 });

    const { reminderDays } = await browser.storage.local.get('reminderDays');

    expect(reminderDays).toBe(7);
  });
});
