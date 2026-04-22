import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage'
import loginData from '../support/users.json';

test.describe('Login - Successful with different users', () => {
for (const user of loginData.validUsers) {
  test(`should login successfully using - ${user.type}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      const dashboardPage = new DashboardPage(page);
      await test.step('Navigate to Login Page and login', async () => {
        await loginPage.navigate();
        await loginPage.login(user.email, user.password);
      });
      await test.step('Verify Dashboard is loaded', async () => {  
        await dashboardPage.verifyIsLoaded(user.display_name, user.type);   
      });
    });
  }
});
