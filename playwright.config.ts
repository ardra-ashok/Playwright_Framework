import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(process.cwd(), 'utils/.env')
});

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.BASE_URL || 'https://practicesoftwaretesting.com',
    ignoreHTTPSErrors: true,
    headless: true,
    trace: 'on-first-retry',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  },
  projects: [
    {name: 'chromium', use: { ...devices['Desktop Chrome'] },},
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] },},
    // { name: 'webkit', use: { ...devices['Desktop Safari'] },}
  ]
});
