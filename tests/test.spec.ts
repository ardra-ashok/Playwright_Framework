
import { test } from '../utils/fixtures';
import loginData from '../support/users.json';

test.describe('Secure Area Tests', () => {
    test('should access dashboard immediately', async ({ authenticatedPage, dashboardPage }) => {
     const user = loginData.validUsers[0]; 
     await dashboardPage.verifyIsLoaded(user.display_name,user.type);
    });
});