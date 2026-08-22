import { expect, test } from '@playwright/test';

test('Create new record test without images WITH DATE', async ({ page }) => {
  await page.goto('http://localhost:8081');
  await page.getByTestId('Add-Record-Button').click();
  await page.getByTestId('Change-Date-Hypertext').click();
  await page.getByText('18', { exact: true }).click();
  await expect(page.getByTestId('Selected-Date-String')).toContainText('-18');
  
  const requestPromise = page.waitForRequest(
    request =>
      request.url().includes('/record') &&
      request.method() === 'POST'
  );
  

  const responsePromise = page.waitForResponse(
    response =>
      response.url().includes('/record') &&
      response.request().method() === 'POST'
  );

  await page.getByTestId('Save-Record-Button').click();


  const request = await requestPromise;
  const postData = request.postData();
  console.log(postData)
  expect(postData).toContain('-18');

  const response = await responsePromise;

  expect(response.status()).toBe(200);

  
});
