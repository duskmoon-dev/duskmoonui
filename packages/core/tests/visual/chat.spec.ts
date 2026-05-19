/**
 * Visual regression tests for Chat component
 * Covers message layout, color variants, LLM blocks, and live states.
 */

import { test, expect } from '@playwright/test';

test.describe('Visual Regression - Chat Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/tests/fixtures/test-fixture.html');
  });

  test('sunshine theme chat transcript renders correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'sunshine');

      const container = document.createElement('div');
      container.id = 'chat-test';
      container.className = 'p-8 bg-base-100 text-on-surface';
      container.style.width = '860px';
      container.innerHTML = `
        <div class="chat chat-start">
          <div class="chat-avatar">
            <div class="avatar avatar-sm avatar-primary">AI</div>
          </div>
          <div class="chat-header">Assistant · 10:24</div>
          <details class="chat-reasoning" open>
            <summary>Reasoning · 3s</summary>
            <div>Checked the input constraints and selected a compact response.</div>
          </details>
          <details class="chat-tool chat-tool-success" open>
            <summary class="chat-tool-header">
              <span>search_docs</span>
              <span class="chat-tool-status">Done</span>
            </summary>
            <div class="chat-tool-call">{ "query": "chat component" }</div>
            <div class="chat-tool-result">2 matching documents found.</div>
          </details>
          <div class="chat-bubble chat-bubble-streaming">
            The chat component supports reasoning, tool calls, and streaming states.
          </div>
          <div class="chat-footer">Delivered</div>
        </div>

        <div class="chat chat-end">
          <div class="chat-avatar">
            <div class="avatar avatar-sm">GA</div>
          </div>
          <div class="chat-header">You · 10:25</div>
          <div class="chat-bubble chat-bubble-primary chat-bubble-filled">
            Show me the variants too.
          </div>
        </div>

        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem; margin-top: 1rem;">
          <div class="chat-bubble chat-bubble-primary">Primary</div>
          <div class="chat-bubble chat-bubble-secondary">Secondary</div>
          <div class="chat-bubble chat-bubble-tertiary">Tertiary</div>
          <div class="chat-bubble chat-bubble-info">Info</div>
          <div class="chat-bubble chat-bubble-success">Success</div>
          <div class="chat-bubble chat-bubble-warning">Warning</div>
          <div class="chat-bubble chat-bubble-error">Error</div>
        </div>

        <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 0.75rem; margin-top: 1rem;">
          <div class="chat-bubble chat-bubble-xs">XS bubble</div>
          <div class="chat-bubble chat-bubble-sm">SM bubble</div>
          <div class="chat-bubble chat-bubble-md">MD bubble</div>
          <div class="chat-bubble chat-bubble-lg">LG bubble</div>
          <div class="chat-bubble" aria-label="Assistant is typing">
            <span class="chat-typing"><span></span></span>
          </div>
        </div>
      `;
      document.body.appendChild(container);
    });

    const chat = page.locator('#chat-test');
    await expect(chat).toHaveScreenshot('sunshine-chat-transcript.png');
  });

  test('moonlight theme tool statuses render correctly', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'moonlight');

      const container = document.createElement('div');
      container.id = 'chat-status-test';
      container.className = 'p-8 bg-base-100 text-on-surface';
      container.style.width = '780px';
      container.innerHTML = `
        <div style="display: grid; gap: 0.75rem;">
          <details class="chat-tool chat-tool-pending" open>
            <summary class="chat-tool-header">
              <span>queued_job</span>
              <span class="chat-tool-status">Pending</span>
            </summary>
            <div class="chat-tool-call">Waiting for an available worker.</div>
          </details>
          <details class="chat-tool chat-tool-running" open>
            <summary class="chat-tool-header">
              <span>fetch_metrics</span>
              <span class="chat-tool-status">Running</span>
            </summary>
            <div class="chat-tool-call">Collecting usage metrics.</div>
          </details>
          <details class="chat-tool chat-tool-success" open>
            <summary class="chat-tool-header">
              <span>write_file</span>
              <span class="chat-tool-status">Done</span>
            </summary>
            <div class="chat-tool-result">File updated successfully.</div>
          </details>
          <details class="chat-tool chat-tool-error" open>
            <summary class="chat-tool-header">
              <span>deploy_preview</span>
              <span class="chat-tool-status">Failed</span>
            </summary>
            <div class="chat-tool-result">Preview deploy failed validation.</div>
          </details>
        </div>
      `;
      document.body.appendChild(container);
    });

    const statuses = page.locator('#chat-status-test');
    await expect(statuses).toHaveScreenshot('moonlight-chat-statuses.png');
  });
});
