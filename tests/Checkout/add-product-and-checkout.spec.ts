import { test } from '@playwright/test';
import { BasePage } from '../../pageObjects/BasePage';
import { CartModal } from '../../pageObjects/Cart/CartModal';
import { ShippingPage } from '../../pageObjects/Checkout/ShippingPage';
import { ProductDetailPage } from '../../pageObjects/ProductPage/ProductDetailPage';
import { generateUserInfo } from '../../utils/GenerateUserInfo';
import { mailslurp } from '../../utils/mailsurp';
import { ReviewPaymentsPage } from '../../pageObjects/Checkout/ReviewPaymentsPage';
import { PAYMENT_METHODS } from '../../constant/CONSTANT_PAYMENT_METHODS';
import { SHIPPING_METHODS } from '../../constant/CONSTANT_SHIPPING_METHODS';
import { productInfo } from '../../fixtures/productInfo';

test.describe('Checkout flow', () => {
    let basePage: BasePage;
    let productDetailPage: ProductDetailPage;
    let cartModal: CartModal;
    let shippingPage: ShippingPage;
    let userInfo: any;
    let reviewPaymentPage: ReviewPaymentsPage;

    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL!);

        basePage = new BasePage(page);
        productDetailPage = new ProductDetailPage(page);
        cartModal = new CartModal(page);
        shippingPage = new ShippingPage(page);
        reviewPaymentPage = new ReviewPaymentsPage(page);
        userInfo = generateUserInfo();
    });

    test('User can checkout the product without any errors', async () => {
        const inbox = await mailslurp.createInbox();

        await basePage.navigateTo("What's New");
        await basePage.selectProductByTitle(productInfo.name);

        await productDetailPage.selectSizeAndColor(productInfo.size, productInfo.color);
        await productDetailPage.clickAddToCartButton();
        await productDetailPage.validateAddedToCartMessage();

        await basePage.validateItemsAmountInCart('1');
        await basePage.goToCart();

        await cartModal.clickProceedToCheckoutBtn();

        await shippingPage.fillEmailAddress(inbox.emailAddress);
        await shippingPage.selectStateProvince(userInfo.state);
        await shippingPage.fillAddress(userInfo);
        await shippingPage.selectShippingMethod(SHIPPING_METHODS.TABLE_RATE.Name);
        await shippingPage.continueToPayment();

        await reviewPaymentPage.validatePriceWithTableRate();
        await reviewPaymentPage.selectPaymentMethod(PAYMENT_METHODS.CHECK_MONEY_ORDER);
        await reviewPaymentPage.clickPlaceOrderButtonByPaymentMethod(PAYMENT_METHODS.CHECK_MONEY_ORDER);
        await reviewPaymentPage.valdiateSuccessPurchaseMessage();

        // const email = await mailslurp.waitForLatestEmail(inbox.id!, 30000);
        // expect(email.subject).toContain('Order Confirmation');
    });
});