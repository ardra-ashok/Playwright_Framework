
import { test } from '../utils/fixtures';
import { expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';

test.describe('Login - Field Level Negative Cases', () => {

 test('Empty email and password - TC01', async ({ page }) => {
   const loginPage = new LoginPage(page);
   await test.step('Navigate to Login Page and try to login', async () => {
    await loginPage.navigate();
    await loginPage.login(" ", "");
   });
   await test.step('Verify login Error message', async () => {
     await loginPage.verifyValidLoginError('Email is required','Password is required')
   })
 });

 test('Empty email and password - TC02', async ({ page }) => {
   const loginPage = new LoginPage(page);
   await test.step('Navigate to Login Page and try to login', async () => {
    await loginPage.navigate();
    await loginPage.clickOnLogin()
   });
   await test.step('Verify login Error message', async () => {
    await loginPage.verifyValidLoginError('Email is required','Password is required')
   })
 });

 test('Empty email only', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step('Navigate to Login Page and login', async () => {
   await loginPage.navigate();
   await loginPage.login("", "welcome01");
  });
  await test.step('Verify login Error message', async () => {
    await loginPage.verifyValidLoginError('Email is required')
  })
 });
 
 test('Empty password only', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step('Navigate to Login Page and try login', async () => {
   await loginPage.navigate();
   await loginPage.login("admin@practicesoftwaretesting.com","");
  });
  await test.step('Verify login Error message', async () => {
   await loginPage.verifyValidLoginError('Password is required')
  })
 });

 test('Invalid email format', async ({ page }) => {
   const loginPage = new LoginPage(page);
   await test.step('Navigate to Login Page and try login', async () => {
    await loginPage.navigate();
    await loginPage.login("invalid-email", "welcome01");
   });
  await test.step('Verify login Error message', async () => {
    await loginPage.verifyValidLoginError('Email format is invalid')
  })
 });

 test('Password too short', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await test.step('Navigate to Login Page and try login', async () => {
   await loginPage.navigate();
   await loginPage.login("admin@practicesoftwaretesting.com", "we");
  });
  await test.step('Verify login Error message', async () => {
   await loginPage.verifyValidLoginError('Password length is invalid')
  })
 });
});
