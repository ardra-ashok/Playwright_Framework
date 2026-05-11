import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { ROUTES } from '../utils/constants';


export class LoginPage extends BasePage {
 readonly usernameInput: Locator;
 readonly passwordInput: Locator;
 readonly loginButton: Locator;
 readonly errorMsg: Locator;
 private readonly LOGIN_PATH = ROUTES.LOGIN;

  constructor(page: Page) {
    super(page);
    this.usernameInput = page.getByRole('textbox', { name: /email address/i });
    this.passwordInput = page.getByRole('textbox', { name: /password/i });
    this.loginButton = page.locator('input[type="submit"]');
    this.errorMsg = page.locator('.alert.alert-danger')
  }

  async navigate() {
    await this.page.goto(this.LOGIN_PATH);
    await this.waitForPageReady(this.loginButton);
  }

  async login(user: string, pass: string) {
    await this.typeText(this.usernameInput, user);
    await this.typeText(this.passwordInput, pass);
    await this.clickElement(this.loginButton);
  }
  
  async clickOnLogin() {
    await this.clickElement(this.loginButton);
  }

  async verifyValidLoginError(...errors: string[]) {
  for (const err of errors) {
      if (!err) continue;
        const locator = this.page.locator('.alert.alert-danger', { hasText: err });

      await expect(locator).toBeVisible();
    }
  }

}