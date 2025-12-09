// @ts-check
import { test, expect } from '@playwright/test';
import { count } from 'console';
import { disconnect } from 'process';

test('Successfull login on second attempt', async ({ browser, page }) => {
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  console.log(await page.title());
  await userName.fill("rahulshetty");
  await password.fill("learning");
  await signIn.click();
  console.log(await page.locator("[style*='block']").textContent());
  expect(await page.locator("[style*='block']")).toContainText("Incorrect");
  
  await userName.fill("rahulshettyacademy")
  await password.fill("learning");
  await signIn.click();
  console.log(await page.locator(".card-body a").first().textContent());
  console.log(await page.locator(".card-body a").nth(1).textContent());
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
}),

test('playground', async ({browser, page}) =>
{
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const password = page.locator("#password");
  const signIn = page.locator("#signInBtn");
  const dropdown = page.locator("select.form-control");
  const documentLink = page.locator("[href*='documents-request']");
  await dropdown.selectOption("Teacher");
  await page.locator("span.radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect (page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").check();
  await expect (page.locator('#terms')).toBeChecked();
  await page.locator("#terms").uncheck();
  expect (await page.locator('#terms').isChecked()).toBeFalsy();
  await expect (documentLink).toHaveAttribute("class","blinkingText");
  
});
test('UI Tabs switch', async ({browser}) =>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  const userName = page.locator("#username");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    documentLink.click()
  ]);
  const text = await newPage.locator('.red').textContent();
  const arrayText = text.split('@');
  const domainName = arrayText[1].split(' ')[0];
  console.log(domainName);

  await page.locator("#username").fill(domainName);
});

let testData = 
    {
      firstName: "Test",
      lastName: "Playground",
      email: "testplayground@yopmail.com",
      phoneNumber: "1234567890",
      occupation: "Student",
      password: "Test@123",
      testProductName: "iphone 13 pro",
      country: "India"
    };

test('Successful register for purchase', async ({ browser}) => 
  {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/auth/login/");
    await page.locator("[routerlink*='register']").click();
    await page.locator("#firstName").fill(testData.firstName);
    await page.locator("#lastName").fill(testData.lastName);
    await page.locator("#userEmail").fill(testData.email);
    await page.locator("#userMobile").fill(testData.phoneNumber);
    await page.locator("[formcontrolname='occupation']").selectOption(testData.occupation);
    await page.locator("[value='Male']").click();
    await page.locator("#userPassword").fill(testData.password);
    await page.locator("#confirmPassword").fill(testData.password);
    await page.locator("[type='checkbox']").check();
    await page.locator("#login").click();
  });
test('Login, complete purchase and check order history', async ({ browser}) =>
{
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client/auth/login/");
  await page.locator("#userEmail").fill(testData.email);
  await page.locator("#userPassword").fill(testData.password);
  await page.locator("#login").click();
  const productForPurchase = page.locator(".card-body", { hasText: testData.testProductName });
  await expect(productForPurchase).toBeVisible();
  productForPurchase.locator('button', { hasText: 'Add To Cart' }).click();
  await expect(page.locator("#toast-container")).toBeVisible();
  await page.locator('[routerlink="/dashboard/cart"]').click();
  await expect(page.locator(".cart h3", { hasText: 'iphone 13 pro' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await expect(page.locator(".item__title")).toHaveText(testData.testProductName);
  await expect(page.locator(".item__quantity")).toContainText("1");
  await page.locator(".payment__cc input").nth(2).fill("Andrei Tester");
  await page.locator(".payment__cc select").nth(0).selectOption("03");
  await page.locator(".payment__cc select").nth(1).selectOption("26");
  await page.locator(".payment__cc input").nth(0).fill("4542 9931 9292 2293");
  await page.locator(".payment__cc input").nth(1).fill("454");
  await page.locator(".payment__cc input").nth(3).fill("rahulshettyacademy");
  await expect(page.locator("[name='coupon']")).toBeVisible();
  expect(await page.locator(".details__user input").nth(0).inputValue()).toBe(testData.email);
  await page.locator(".user__address input").type(testData.country);
  await page.locator("button span").nth(1).click();
  await page.locator(".actions a").click();
  const orderConfirmationPanel = page.locator("table").nth(2);
  await expect(orderConfirmationPanel.locator('h1')).toContainText("Thankyou for the order.");
  const orderConfirmationPanelText = await orderConfirmationPanel.textContent();
  const arrayText = orderConfirmationPanelText.split('|');
  const orderId = arrayText[1].trim();
  await page.locator("button[routerlink*='myorders']").click();
  const rows = await page.locator("tbody tr");
  const orderRow = await rows.filter({ hasText: orderId });
  await orderRow.locator("button").first().click();
  await expect(page.locator(".email-container")).toContainText(testData.email);
  await expect(page.locator(".email-container")).toContainText(testData.country);
  await expect(page.locator(".email-container")).toContainText(orderId);
  await expect(page.locator(".email-container")).toContainText(testData.testProductName);
});
test.only('Client app login', async ({ browser}) =>
{
  const productName = "iphone 13 pro";
  const context = await browser.newContext();
  const page = await context.newPage();
  const productForPurchase = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client/auth/login/");
  await page.locator("#userEmail").fill(testData.email);
  await page.locator("#userPassword").fill(testData.password);
  await page.locator("#login").click();
  await productForPurchase.first().waitFor();
  const productsCount = await productForPurchase.count();
  for (let i = 0; i < productsCount; ++i)
  {
    if(await productForPurchase.nth(i).locator("b").textContent() === productName)
    {
      await productForPurchase.nth(i).locator("text=Add To Cart").click();
    }
  }
  
  await page.locator('[routerlink*="/cart"]').click();
  await page.locator("div li").first().waitFor();
  const bool = page.locator("h3:has-text(\"" + testData.testProductName + "\")").isVisible();
  await expect(bool).toBeTruthy();
  await page.locator("button:has-text('Checkout')").click();
  await page.locator("[placeholder*='Country']").pressSequentially('Ind');
  const countryDropdown = page.locator(".ta-results");
  await countryDropdown.waitFor();
  const countryOptionsCount = await countryDropdown.locator("button").count();
  for (let i = 0; i < countryOptionsCount; ++i)
  {
    if (await countryDropdown.locator("button").nth(i).textContent() === ' India')
    {
      await countryDropdown.locator("button").nth(i).click();
      break;
    }
  }
  expect(await page.locator(".user__name [type='text']").first()).toHaveText(testData.email);

  await page.locator(".form__cc input").nth(2).fill("Andrei Tester");
  await page.locator(".form__cc select").nth(0).selectOption("03");
  await page.locator(".form__cc select").nth(1).selectOption("26");
  await page.locator(".form__cc input").nth(0).fill("4542 9931 9292 2293");
  await page.locator(".form__cc input").nth(1).fill("454");
  await page.locator(".form__cc input").nth(3).fill("rahulshettyacademy");

  await page.locator(".action__submit").click();

  await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
  const formatOrderId = orderId.split("|")[1].trim();

  await page.locator("button[routerlink*='myorders']").click();

  await page.locator("tbody tr").first().waitFor();
  const ordersCount = await page.locator("tbody tr").count();
  
  for (let i = 0; i < ordersCount; ++i)
  {
    if (await page.locator("tbody tr").nth(i).locator("th").textContent() === formatOrderId)
      await page.locator("tbody tr").nth(i).locator("button").first().click();
      break;
  }

  await expect(page.locator(".col-text")).toContainText(formatOrderId);
 await page.pause();
});