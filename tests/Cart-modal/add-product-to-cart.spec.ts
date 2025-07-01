import { test, expect } from '@playwright/test';
import { BasePage } from '../../pageObjects/BasePage';
import { ProductDetailPage } from '../../pageObjects/ProductPage/ProductDetailPage';

test.describe('Add product to cart flow', () => {
  let basePage: BasePage;
  let productDetailPage: ProductDetailPage;

  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL!);
    basePage = new BasePage(page);
    productDetailPage = new ProductDetailPage(page);

    await basePage.navigateTo("What's New");
  });

  test('User can add product to cart and see updated items in cart count', async () => {
    await basePage.selectProductByTitle('Echo Fit Compression Short');

    await productDetailPage.selectSizeAndColor('29', 'Blue');
    await productDetailPage.clickAddToCartButton();
    await productDetailPage.validateAddedToCartMessage();

    await basePage.validateItemsAmountInCart('1');
  });
});