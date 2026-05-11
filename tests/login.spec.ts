import { test, expect, request } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage'
import loginData from '../support/users.json';

const loginPayload = {
  "email": "customer2@practicesoftwaretesting.com",
  "password": "pass123"
};

test.describe.skip('Login - Successful with different users', () => {
for (const user of loginData.validUsers) {
  test.skip(`should login successfully using - ${user.type}`, async ({ page }) => {
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

  })
test.only('logging in', async ({ page, request }) => {
    
  const loginResponse = await request.post(
    'https://api.practicesoftwaretesting.com/users/login',
    { data: loginPayload }
  );
  expect(loginResponse.ok()).toBeTruthy();
  const loginResponseJson = await loginResponse.json();
  const token = loginResponseJson.access_token;
  console.log('TOKEN:', token);
  await page.goto('https://practicesoftwaretesting.com');
  await page.evaluate((token) => {
    localStorage.setItem('auth-token', token);
    
  }, token);
  await page.goto('https://practicesoftwaretesting.com/account');
  const message = page.locator('h1[data-test="page-title"]')
  await expect(message,'User should see the dashboard message').toHaveText(/my account/i)

});
  

