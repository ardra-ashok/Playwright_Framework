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
    try {
      if (this.page.isClosed())
        return; 
      await locator.waitFor({ state: 'visible', timeout: 5000 })
      await locator.clear()
      await locator.fill(text)
    } catch (error) {
        console.error(`Failed to type into locator: ${error}`)
        throw error;
    }
   }

   async verifyPageUrl(expectedUrl: string | RegExp) {
     await expect(this.page,'User should be navigated to login').toHaveURL(expectedUrl);
   }

   async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
   }
  
  async waitForPageReady(anchorLocator: Locator) {
   await this.page.waitForLoadState('domcontentloaded');
   await anchorLocator.waitFor({ state: 'visible', timeout: 10000 });
  }
}