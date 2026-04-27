
import { test } from '../utils/fixtures';
import loginData from '../support/users.json';

test.describe('Test basic login through fixture', () => {
    test('should access dashboard immediately', async ({  authenticatedPage, dashboardPage }) => {
        const user = loginData.validUsers[1]; 
        await dashboardPage.navigate()
        await dashboardPage.verifyIsLoaded(user.display_name,user.type);
    });
});