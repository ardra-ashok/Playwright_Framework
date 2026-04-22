import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import loginData from '../support/users.json';

type MyFixtures = {
 loginPage: LoginPage;
 dashboardPage: DashboardPage;
 authenticatedPage: LoginPage;
};

export const test = base.extend<MyFixtures>({
  loginPage: async ({ page }, use) => {
      await use(new LoginPage(page));
  },
  dashboardPage: async ({ page }, use) => {
      await use(new DashboardPage(page));
  },
  authenticatedPage: async ({ page, loginPage }, use) => {
      const user = loginData.validUsers[0]; 
      await loginPage.navigate();
      await loginPage.login(user.email, user.password);
      await use(loginPage); 
  },
});

export { expect } from '@playwright/test';