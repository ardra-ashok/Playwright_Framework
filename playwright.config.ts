import path from 'path';
import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

const result = dotenv.config();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: process.env.UI_URL || 'https://practicesoftwaretesting.com', 
    ignoreHTTPSErrors: true,
    headless: true,
    trace: 'on',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36',
  },
  projects: [
    {name: 'chromium', use: { ...devices['Desktop Chrome'] },},
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] },},
    // { name: 'webkit', use: { ...devices['Desktop Safari'] },}
  ]
});
