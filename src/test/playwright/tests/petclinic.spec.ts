import { test, expect } from '@playwright/test';

// This sample simulates a larger test suite
const TEST_ITERATIONS = parseInt(process.env.TEST_ITERATIONS || "10");
const TEST_HOST = process.env.TEST_HOST || "https://playwright.dev/";

for (var i = 0; i < TEST_ITERATIONS; i++) {

  test("tests petclinic" + i, async ({ page }) => {
    await page.setViewportSize({
          width: 1024,
          height: 768
        })
    await page.goto(TEST_HOST);
    await page.locator("li:nth-of-type(2) > a").click()
    expect(page.url()).toBe(TEST_HOST + 'owners/find');
    await page.locator("body > div button").click()
    expect(page.url()).toBe(TEST_HOST + 'owners?lastName=');
    await page.locator("tr:nth-of-type(1) a").click()
    expect(page.url()).toBe(TEST_HOST + 'owners/1');
    await page.locator("div > div > a:nth-of-type(1)").click()
    expect(page.url()).toBe(TEST_HOST + 'owners/1/edit');
    await page.locator("body > div button").click()
    expect(page.url()).toBe(TEST_HOST + 'owners/1');
  });

}
