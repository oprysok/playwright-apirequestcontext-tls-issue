import { defineConfig } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'main',
    },
  ],
  webServer: {
    command: 'pnpm run start',
    url: 'http://localhost:3002/api/sample',
    stdout: 'pipe',
    stderr: 'pipe',
    reuseExistingServer: false,
  },
});
