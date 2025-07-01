import { test } from '@playwright/test';
import { BasePage } from '../../pageObjects/BasePage';
import { ProductDetailPage } from '../../pageObjects/ProductPage/ProductDetailPage';
import { CartModal } from '../../pageObjects/Cart/CartModal';
import { productInfo } from '../../fixtures/productInfo';

test.describe('Delete product from cart', () => {
    let basePage: BasePage;
    let productDetailPage: ProductDetailPage;
    let cartModal: CartModal;

    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL!);
        basePage = new BasePage(page);
        productDetailPage = new ProductDetailPage(page);
        cartModal = new CartModal(page);

        await basePage.navigateTo("What's New");
    });

    test('User can delete product from cart', async () => {
        await basePage.selectProductByTitle(productInfo.name);

        await productDetailPage.selectSizeAndColor(productInfo.size, productInfo.color);
        await productDetailPage.clickAddToCartButton();
        await productDetailPage.validateAddedToCartMessage();

        await basePage.validateItemsAmountInCart('1');
        await basePage.goToCart();

        await cartModal.deleteProductFromCartByName(productInfo.name);
        await cartModal.validateNoItemsInCartMessageIsVisible();
    });
});