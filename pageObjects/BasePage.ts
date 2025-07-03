import { expect, Locator, Page } from '@playwright/test';

export class BasePage {
    readonly page: Page;
    readonly productTitle: Locator;
    readonly pageTitle: Locator;
    readonly itemsInCart: Locator;
    readonly cartIcon: Locator;
    readonly successMessage: Locator;
    readonly loggedInMessage: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productTitle = page.locator('.product-item-name');
        this.pageTitle = page.locator('.page-title');
        this.itemsInCart = page.locator('.counter-number');
        this.cartIcon = page.locator('.action.showcart')
        this.successMessage = page.locator('div.message-success');
        this.loggedInMessage = page.locator('.panel .welcome');
        this.errorMessage = page.locator('.message-error');
    }

    async navigateTo(tabName: string) {
        const tabLocator = this.page.locator('nav a', { hasText: tabName });

        await tabLocator.click();
        await this.page.waitForLoadState('networkidle');
    }

    async selectProductByTitle(title: string) {
        await this.productTitle.getByText(title).click();
        await expect(this.pageTitle).toHaveText(title);
    }

    async validateItemsAmountInCart(expectedAmount: string) {
        await expect(this.itemsInCart).toHaveText(expectedAmount);
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async validateWelcomeMessage(firstName: string, lastName: string) {
        await expect(this.loggedInMessage).toContainText(`Welcome, ${firstName} ${lastName}!`);
    }

    async validateThankYouForRegistrationMessage() {
        await expect(this.successMessage).toHaveText('Thank you for registering with Main Website Store.')
    }
}