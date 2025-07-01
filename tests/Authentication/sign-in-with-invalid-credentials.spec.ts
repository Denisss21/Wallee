import { test } from '@playwright/test';
import { CustomerLoginPage } from '../../pageObjects/Authentication/CustomerLoginPage';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';
dotenv.config();

test.describe('Login form validation errors', () => {
    let customerLoginPage: CustomerLoginPage;

    test.beforeEach(async ({ page, baseURL }) => {
        customerLoginPage = new CustomerLoginPage(page);
        await page.goto('/customer/account/login');
    });

    test('Login with wrong email', async () => {
        const randomEmail = faker.internet.email();

        await customerLoginPage.loginByCredentials(randomEmail, process.env.ADMIN_PASSWORD!);
        await customerLoginPage.validateInccorectCredentialsMessage();
    });

     test('Login with wrong password', async () => {
        const randomEmail = faker.internet.password();

        await customerLoginPage.loginByCredentials(process.env.ADMIN_EMAIL!, randomEmail);
        await customerLoginPage.validateInccorectCredentialsMessage();
    });

    test('Validate required fields', async () => {
        await customerLoginPage.clickSignInButton();
        await customerLoginPage.validateRequiredFieldsMessage();
    });
});