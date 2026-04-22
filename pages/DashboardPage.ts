import { Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';
import { expect } from '@playwright/test';
import { ROUTES } from '../utils/constants';

export class DashboardPage extends BasePage {
 private readonly DASHBOARD_USER = ROUTES.USER_DASHBOARD;
 private readonly DASHBOARD_ADMIN = ROUTES.ADMIN_DASHBOARD;
 private readonly accountName;
 private readonly dashboardMessage;

 constructor(page: Page) {
  super(page);
  this.accountName = page.locator('#menu')
  this.dashboardMessage = page.locator('h1[data-test="page-title"]')
 }
 
 async verifyIsLoaded(name: string, type: string) {
  await expect(this.accountName).toHaveText(name)
  
  switch (true) {
   case type.includes('admin'):
    await expect(this.page).toHaveURL(this.DASHBOARD_ADMIN);
    await expect(this.dashboardMessage).toHaveText(/sales over the years/i)
    break;
   case type.includes('user'):
    await expect(this.page).toHaveURL(this.DASHBOARD_USER);
    await expect(this.dashboardMessage).toHaveText(/my account/i)
    break;
   
  }
  
 }

 
}