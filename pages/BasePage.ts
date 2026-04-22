import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
   readonly page: Page;

   constructor(page: Page) {
    this.page = page;
   }
 
   async navigate(path: string) {
     await this.page.goto(path);
   }

   async clickElement(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
    await locator.click();
   }

   async typeText(locator: Locator, text: string) {
    await locator.waitFor({ state: 'visible' });
    await locator.fill('');
    await locator.fill(text);
   }

   async verifyPageUrl(expectedUrl: string | RegExp) {
     await expect(this.page).toHaveURL(expectedUrl);
   }

   async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
   }
}