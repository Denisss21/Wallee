import { test } from '@playwright/test';
import { BasePage } from '../../pageObjects/BasePage';
import { ProductDetailPage } from '../../pageObjects/ProductPage/ProductDetailPage';
import { ATTRIBUTE_IDS } from '../../constant/CONSTANT_FIELDS_ATTRIBUTE_ID';

test.describe('Add product to cart flow', () => {
  let basePage: BasePage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    basePage = new BasePage(page);
    productDetailPage = new ProductDetailPage(page);
  });

  test('User unable to add product to cart without size and color', async () => {
    await basePage.navigateTo("What's New");
    await basePage.selectProductByTitle('Echo Fit Compression Short');

    await productDetailPage.clickAddToCartButton();
    
    await productDetailPage.expectRequiredFieldError(ATTRIBUTE_IDS.COLOR);
    await productDetailPage.expectRequiredFieldError(ATTRIBUTE_IDS.SIZE);
  });
});