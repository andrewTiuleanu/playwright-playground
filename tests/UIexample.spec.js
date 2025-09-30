// @ts-check
import { test, expect } from '@playwright/test';
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