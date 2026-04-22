import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('button[type="submit"]');
    }

    async login(user: string, pass: string) {
        await this.typeText(this.usernameInput, user);
        await this.typeText(this.passwordInput, pass);
        await this.clickElement(this.loginButton);
    }
}