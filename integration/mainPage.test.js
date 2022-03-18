const baseUrl = 'https://geofood-delivery.herokuapp.com/';

test('should show the home page message', async () => {
  await page.goto(`${baseUrl}/`);

  await page.waitForNetworkIdle();

  await page.waitForXPath(
    '//*[@id="__next"]/main/div/div/h1[contains(text(), "Easy food Order & Delivery near you!")]',
  );

  // Better (simpler) option to fill an element
  // (if you have a data-test-id)
  //
  // await expect(page).toFill('[data-test-id="first-name-input"]', 'Karl');

  // Alternative: Use normal Puppeteer commands to fill the input
  //
  // Get an element containing some text using XPath
  // const [firstNameInput] = await page.$x(
  //   '//label[contains(text(), "First name")]//input',
  // );

  // await firstNameInput.type('Karl');

  // await page.waitForTimeout(5000);

  // TODO: This is where you would add the following:
  // 1. Add the last name text (like above)
  // 2. Click on the "Add Guest" button (like in the other test file)
  // 3. Check the page for the guest text (like in the other file)
}, 30000); // 30 seconds timeout to allow for Heroku to wake up
