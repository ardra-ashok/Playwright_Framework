import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
// Importing test data from your folder structure
import loginData from '../support/users.json';

test.describe('Login - Positive Scenarios', () => {
 let loginPage: LoginPage;

 test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.navigate('/login');
 });

 for (const user of loginData.validUsers) {
  test(`should login successfully using ${user.type}`, async ({ page }) => {
   await loginPage.login(user.username, user.password);
   await expect(page).toHaveURL(/.*dashboard/);

   const welcomeMessage = page.locator('#welcome-text');
   await expect(welcomeMessage).toBeVisible();
   await expect(welcomeMessage).toContainText(user.displayName);
   
   const cookies = await page.context().cookies();
   const sessionCookie = cookies.find(c => c.name === 'session_id');
   expect(sessionCookie).toBeDefined();
  });
 }

 test('should allow login with "Remember Me" checked', async ({ page }) => {
  const user = loginData.validUsers[0];
  
  await page.locator('#remember-me').check();
  await loginPage.login(user.username, user.password);
  
  await expect(page).toHaveURL(/.*dashboard/);
  await page.reload();
  await expect(page.locator('#welcome-text')).toBeVisible();
 });
});