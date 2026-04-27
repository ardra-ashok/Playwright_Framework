import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import loginData from '../support/users.json';
import { loginViaAPI } from '../utils/auth';

type MyFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  authenticatedPage: void; 
  apiURL: string;
};

export const test = base.extend<MyFixtures>({
    apiURL: async ({}, use) => {
        await use(process.env.BASE_URL!);
    },
   loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
   dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
   authenticatedPage: async ({ page, request, baseURL, apiURL }, use) => {
        const user = loginData.validUsers[1];
        await loginViaAPI(request, page, user, baseURL!, apiURL);
        await use();
    },
});