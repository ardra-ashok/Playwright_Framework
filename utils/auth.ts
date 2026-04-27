import { APIRequestContext, Page } from '@playwright/test';
import { ROUTES } from './constants';

export async function loginViaAPI(
  request: APIRequestContext,
  page: Page,
  user: any,
  uiURL: string,
  apiURL: string
) {
  const LOGIN_PATH = ROUTES.USERS_LOGIN; 
  const response = await request.post(`${apiURL}${LOGIN_PATH}`, {
    data: {
      email: user.email,
      password: user.password,
    },
  });
  if (!response.ok()) {
    throw new Error('API login failed');
  }

  const body = await response.json();
  const token = body.access_token;
  await page.goto(uiURL);

  await page.evaluate((token) => {
    localStorage.setItem('auth-token', token);
  }, token);
}