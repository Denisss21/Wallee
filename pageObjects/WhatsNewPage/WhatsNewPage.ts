import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from '../BasePage';

export class WhatsNewPage extends BasePage {
    readonly addToCartButton: Locator;

    constructor(page: Page) {
        super(page)
         this.addToCartButton = page.locator('#product-addtocart-button');
    }
}