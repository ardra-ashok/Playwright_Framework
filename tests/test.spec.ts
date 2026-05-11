
import { test } from '../utils/fixtures';
import loginData from '../support/users.json';

test.describe('QA practice Demo Login - Positive Test cases ', () => {
    test('Test login - Valid email and password', async ({  authenticatedPage, dashboardPage }) => {
        const user = loginData.validUsers[2]; 
        await dashboardPage.navigate()
        await dashboardPage.verifyIsLoaded(user.display_name,user.type);
    });
});


