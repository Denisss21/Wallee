import { test } from '@playwright/test';
import { CreateNewAccoutPage } from '../../pageObjects/Authentication/CreateNewAccoutPage';
import { generateUserInfo } from '../../utils/GenerateUserInfo';

test.describe('Create new account', () => {
    let createAccountPage: CreateNewAccoutPage;
    let userInfo: any;

    test.beforeEach(async ({ page }) => {
        createAccountPage = new CreateNewAccoutPage(page);
        userInfo = generateUserInfo();
        await page.goto('/customer/account/create/');
    });

    test('Validate the user can create a new account', async () => {
        await createAccountPage.fillPersonalInformation(userInfo.firstName, userInfo.lastName);
        await createAccountPage.fillSignInInformation(userInfo.email, userInfo.password);
        await createAccountPage.clickCreateAnAccountBtn();
        await createAccountPage.validateThankYouForRegistrationMessage();
    });
});