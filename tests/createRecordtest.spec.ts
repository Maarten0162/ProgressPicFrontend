import { test, expect } from '@playwright/test';

test('Create new record test without images', async ({ page }) => {
  await page.goto('http://localhost:8081');
  await page.getByTestId('Add-Record-Button').click();

  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/record') &&
      response.request().method() === 'POST'
  );

  await page.getByTestId('Save-Record-Button').click();

  const response = await responsePromise;

  expect(response.status()).toBe(200);
  
});
