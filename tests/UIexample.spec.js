// @ts-check
import { test, expect } from '@playwright/test';

test.only('Successfull login on second attempt', async ({ browser, page }) => {
  const userName = page.locator("#username");
  const password = page.locator("[type='password']");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator("")
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

});