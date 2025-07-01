import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../pageObject/Authentication/CustomerLoginPage';

test.describe('Create new account', () => {
    let customerLoginPage: CustomerLoginPage;

    test.beforeEach(async ({ page, baseURL }) => {
        customerLoginPage = new CustomerLoginPage(page);
        await page.goto('/customer/account/login');
    });

    test('Validate the user can create a new account', async () => {
        await customerLoginPage.loginAsUser();
        await customerLoginPage.validateWelcomeMessage('Admin', 'Admin');
    });
});