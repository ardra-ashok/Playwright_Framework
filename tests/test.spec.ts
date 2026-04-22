
import { test } from '../utils/fixtures';

test.describe('Secure Area Tests', () => {

 test('should access dashboard immediately', async ({ authenticatedPage, dashboardPage }) => {
     await dashboardPage.verifyIsLoaded('John Doe','admin');
 });

});