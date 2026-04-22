import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, 'utils','.env') });

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL|| 'https://practice.automationtesting.com',
    trace: 'on-first-retry',
  },
  projects: [
    {name: 'chromium', use: { ...devices['Desktop Chrome'] },},
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] },},
    // { name: 'webkit', use: { ...devices['Desktop Safari'] },}
  ]
});
