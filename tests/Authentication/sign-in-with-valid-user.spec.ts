import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../pageObjects/Authentication/CustomerLoginPage';

test.describe('Validate user can sign in', () => {
    let customerLoginPage: CustomerLoginPage;

    test.beforeEach(async ({ page, baseURL }) => {
        customerLoginPage = new CustomerLoginPage(page);
        await page.goto('/customer/account/login');
    });

    test('Sign in with valid credentials', async () => {
        await customerLoginPage.loginAsUser();
        await customerLoginPage.validateDefaultWelcomeMessage();
    });
});