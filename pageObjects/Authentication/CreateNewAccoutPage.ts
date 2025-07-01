import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../BasePage';

export class CreateNewAccoutPage extends BasePage{
    readonly page: Page;
    readonly firstNameField: Locator;
    readonly lastNameField: Locator;
    readonly emailField: Locator;
    readonly passwordField: Locator;
    readonly confirmPasswordField: Locator;
    readonly createAnAccoutButton: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.firstNameField = page.locator('#firstname');
        this.lastNameField = page.locator('#lastname');
        this.emailField = page.locator('#email_address');
        this.passwordField = page.locator('#password');
        this.confirmPasswordField = page.locator('#password-confirmation');
        this.createAnAccoutButton = page.getByTitle('Create an Account');
    }

    async fillPersonalInformation(firstName: string, lastName: string) {
        await this.firstNameField.fill(firstName);
        await this.lastNameField.fill(lastName);
    }

    async fillSignInInformation(email: string, password: string) {
        await this.emailField.fill(email);
        await this.passwordField.fill(password);
        await this.confirmPasswordField.fill(password);
    }

    async clickCreateAnAccountBtn() {
        await this.createAnAccoutButton.click();
        await this.page.waitForURL(/customer\/account/);
    }
}