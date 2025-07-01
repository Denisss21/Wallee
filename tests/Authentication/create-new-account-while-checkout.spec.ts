import { test } from '@playwright/test';
import { BasePage } from '../../pageObjects/BasePage';
import { CartModal } from '../../pageObjects/Cart/CartModal';
import { ShippingPage } from '../../pageObjects/Checkout/ShippingPage';
import { ProductDetailPage } from '../../pageObjects/ProductPage/ProductDetailPage';
import { generateUserInfo } from '../../utils/GenerateUserInfo';
import { CreateNewAccoutPage } from '../../pageObjects/Authentication/CreateNewAccoutPage';
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
    let createAccountPage: CreateNewAccoutPage;
    let reviewPaymentPage: ReviewPaymentsPage;

    test.beforeEach(async ({ page, baseURL }) => {
        await page.goto(baseURL!);

        basePage = new BasePage(page);
        productDetailPage = new ProductDetailPage(page);
        cartModal = new CartModal(page);
        shippingPage = new ShippingPage(page);
        createAccountPage = new CreateNewAccoutPage(page);
        reviewPaymentPage = new ReviewPaymentsPage(page);
        userInfo = generateUserInfo();
    });

    test('User can create account after checkout', async () => {
        await basePage.navigateTo("What's New");
        await basePage.selectProductByTitle(productInfo.name);

        await productDetailPage.selectSizeAndColor(productInfo.size, productInfo.color);
        await productDetailPage.clickAddToCartButton();
        await productDetailPage.validateAddedToCartMessage();

        await basePage.validateItemsAmountInCart('1');
        await basePage.goToCart();

        await cartModal.clickProceedToCheckoutBtn();

        await shippingPage.fillEmailAddress(userInfo.email);
        await shippingPage.selectStateProvince(userInfo.state);
        await shippingPage.fillAddress(userInfo);
        await shippingPage.selectShippingMethod(SHIPPING_METHODS.FLAT_RATE.Name);
        await shippingPage.continueToPayment();

        await reviewPaymentPage.validatePriceWithFlatRate();
        await reviewPaymentPage.selectPaymentMethod(PAYMENT_METHODS.CHECK_MONEY_ORDER);
        await reviewPaymentPage.clickPlaceOrderButtonByPaymentMethod(PAYMENT_METHODS.CHECK_MONEY_ORDER);
        await reviewPaymentPage.valdiateSuccessPurchaseMessage();

        await reviewPaymentPage.clickCreateAnAccountBtn();

        await createAccountPage.fillSignInInformation(userInfo.email ,userInfo.password);
        await createAccountPage.clickCreateAnAccountBtn();
        await createAccountPage.validateWelcomeMessage(userInfo.firstName, userInfo.lastName);
        await createAccountPage.validateThankYouForRegistrationMessage();
    });
});