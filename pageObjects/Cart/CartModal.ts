import { th } from '@faker-js/faker';
import { expect, Locator, Page } from '@playwright/test';
export class CartModal {
    readonly page: Page;
    readonly proccedToCheckoutBtn: Locator;
    readonly noItemsInCartMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.proccedToCheckoutBtn = page.locator('#top-cart-btn-checkout');
        this.noItemsInCartMessage = page.locator('.subtitle')
    }

    async clickProceedToCheckoutBtn() {
        await this.proccedToCheckoutBtn.click();
        await this.page.waitForURL('/checkout/#shipping');
    }

    async deleteProductFromCartByName(productName: string) {
        const productItem = this.page.locator(`#mini-cart .product-item-details .product-item-name`, { hasText: productName });
        console.log(productItem)

        await productItem.locator('xpath=..').locator('[title="Remove item"]').click();
        await this.page.locator('button:has-text("Ok")').click();
    }

    async validateNoItemsInCartMessageIsVisible() {
        await expect(this.page.locator('text=You have no items in your shopping cart.')).toBeVisible();
    }   
}