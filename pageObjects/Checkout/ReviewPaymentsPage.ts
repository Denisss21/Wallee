import { Page, Locator, expect } from '@playwright/test';
import { SHIPPING_METHODS } from '../../constant/CONSTANT_SHIPPING_METHODS';

export class ReviewPaymentsPage {
    readonly page: Page;
    readonly placeOrderBtn: Locator;
    readonly pageTitle: Locator;
    readonly createAccountBtn: Locator;
    readonly finalPrice: Locator;


    constructor(page: Page) {
        this.page = page;
        this.placeOrderBtn = page.locator('[title="Place Order"]');
        this.pageTitle = page.locator('.page-title');
        this.finalPrice = page.locator('.grand .price')
    }

    async selectPaymentMethod(paymentMethod: string) {
        await this.page.getByLabel(paymentMethod, { exact: true }).check();
    }

    async clickPlaceOrderButtonByPaymentMethod(paymentMethod: string) {
        const paymentContainer = this.page.locator('.payment-method', {
            has: this.page.getByLabel(paymentMethod, { exact: true })
        });

        await paymentContainer.getByLabel(paymentMethod, { exact: true }).check();
        await paymentContainer.getByRole('button', { name: 'Place Order' }).click();
    }

    async valdiateSuccessPurchaseMessage() {
        await expect(this.pageTitle).toHaveText('Thank you for your purchase!');
    }

    async clickCreateAnAccountBtn() {
        await this.page.waitForTimeout(5000);
        await this.page.getByRole('link', { name: 'Create an Account' }).last().click();
    }

    async validatePriceWithFlatRate() {
        const priceTexts = await this.page.locator('.cart-price').allTextContents();
        const itemPrices = priceTexts.map(text =>
            parseFloat(text.replace(/[^\d.]/g, ''))
        );

        const finalPriceText = await this.finalPrice.textContent();
        const actualPrice = parseFloat(finalPriceText?.replace(/[^\d.]/g, '') || '0');

        const expectedPrice = itemPrices.reduce((sum, val) => sum + val, 0) + SHIPPING_METHODS.FLAT_RATE.Value * itemPrices.length;

        expect(actualPrice).toBe(expectedPrice);
    }


    async validatePriceWithTableRate() {
        const priceTexts = await this.page.locator('.cart-price').allTextContents();
        const itemPrices = priceTexts.map(text =>
            parseFloat(text.replace(/[^\d.]/g, ''))
        );

        const actualPriceText = await this.finalPrice.textContent();
        const actualPrice = parseFloat(actualPriceText?.replace(/[^\d.]/g, '') || '0');

        const expectedPrice = itemPrices.reduce((sum, price) => sum + price, 0) + SHIPPING_METHODS.TABLE_RATE.Value;

        expect(actualPrice).toBe(expectedPrice);
    }
}
