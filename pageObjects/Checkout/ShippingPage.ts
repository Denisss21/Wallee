import { th } from '@faker-js/faker';
import { Page, Locator } from '@playwright/test';

export class ShippingPage {
    readonly page: Page;
    readonly addressForm: Locator;
    readonly shippingMethods: Locator;
    readonly continueButton: Locator;
    readonly emailAdress: Locator;
    readonly stateProvinceDropdown: Locator;
    readonly flatRateShipping: Locator;
    readonly tableRateShipping: Locator;

    constructor(page: Page) {
        this.page = page;
        this.addressForm = page.locator('#checkout-step-shipping');
        this.shippingMethods = page.locator('input[name="shipping_method"]');
        this.continueButton = page.locator('button:has-text("Next")');
        this.emailAdress = page.locator('#customer-email');
        this.stateProvinceDropdown = page.locator('select[name="region_id"]');
        this.flatRateShipping = page.locator('[value="flatrate_flatrate"]');
        this.tableRateShipping = page.locator('[value="tablerate_bestway"]');
    }

    async fillEmailAddress(emailAdress: string) {
        this.emailAdress.fill(emailAdress);
    }

    async fillAddress(data: {
        firstName: string;
        lastName: string;
        street: string;
        city: string;
        postcode: string;
        telephone: string;
    }) {
        await this.addressForm.locator('input[name="firstname"]').fill(data.firstName);
        await this.addressForm.locator('input[name="lastname"]').fill(data.lastName);
        await this.addressForm.locator('input[name="street[0]"]').fill(data.street);
        await this.addressForm.locator('input[name="city"]').fill(data.city);
        await this.addressForm.locator('input[name="postcode"]').fill(data.postcode);
        await this.addressForm.locator('input[name="telephone"]').fill(data.telephone);
    }

    async selectStateProvince(state: string) {
        await this.stateProvinceDropdown.selectOption({ label: state });
    }

    async selectShippingMethod(shippingMethod: string) {
        if (shippingMethod === 'Flat Rate') {
            await this.flatRateShipping.check();
        } else {
            await this.tableRateShipping.check();
        }
        // const shippingMethod = this.page.locator('.table-checkout-shipping-method .radio').first();
        // await shippingMethod.click();
    }

    async getFlatRateValue() {
        const priceText = await this.page.locator('.price').textContent();
        const intValue = parseInt(priceText?.replace(/[^\d]/g, '') || '');

        return intValue;
    }

    async continueToPayment() {
        await this.continueButton.click();
        await this.page.waitForURL(/checkout\/#payment/);
    }
}
