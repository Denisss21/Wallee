import { Page, Locator, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { BasePage } from '../BasePage';
dotenv.config();

export class CustomerLoginPage extends BasePage {
    readonly page: Page;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly signInButton: Locator;
    readonly requiredFieldError: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.emailField = page.locator('#email');
        this.passwordField = page.locator('#password');
        this.signInButton = page.locator('.login[name="send"]');
        this.requiredFieldError = page.locator(`${this.emailField}.mage-error`)
    }

    async clickSignInButton() {
        await this.signInButton.click();
    }

    async loginAsUser() {
        await this.emailField.fill(process.env.ADMIN_EMAIL!)
        await this.passwordField.fill(process.env.ADMIN_PASSWORD!)
        await this.signInButton.click();
    }

    async loginByCredentials(email: string, password: string) {
        await this.emailField.fill(email)
        await this.passwordField.fill(password)
        await this.signInButton.click();
    }

    async validateInccorectCredentialsMessage() {
        await expect(this.errorMessage).toHaveText('The account sign-in was incorrect or your account is disabled temporarily. Please wait and try again later.')
    }

    async validateRequiredFieldsMessage() {
        await expect(this.errorMessage).toHaveText('A login and a password are required.');
    }

    // async expectFieldToBeRequired(fieldId: string) {
    //     const input = this.page.locator(`#${fieldId}`);
    //     const errorMessage = this.page.locator(`#${fieldId}-error`);

    //     await expect(input).toHaveAttribute('aria-required', 'true');
    //     await expect(input).toHaveAttribute('aria-invalid', 'true');
    //     await expect(errorMessage).toBeVisible();
    //     await expect(errorMessage).toHaveText('This is a required field.');
    // }
}