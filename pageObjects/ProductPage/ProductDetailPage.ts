import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../BasePage';

export class ProductDetailPage extends BasePage {
    readonly addToCartButton: Locator;
    readonly swatchOption: Locator;

    constructor(page: Page) {
        super(page)
        this.addToCartButton = page.locator('#product-addtocart-button');
        this.swatchOption = page.locator('.swatch-option');
    }

    async clickAddToCartButton() {
        await this.addToCartButton.click();
    }

    async selectSizeAndColor(size: string, color: string) {
        await this.swatchOption.getByText(size).click();
        await this.page.getByLabel(color).click();
    }

    async validateAddedToCartMessage() {
        await expect(this.successMessage).toHaveText('You added Echo Fit Compression Short to your shopping cart.');
    }

    async expectRequiredFieldError(attributeId: string | number) {
        const errorLocator = this.page.locator(`#super_attribute\\[${attributeId}\\]-error`);
        
        await expect(errorLocator).toBeVisible();
        await expect(errorLocator).toHaveText('This is a required field.');
    }
}