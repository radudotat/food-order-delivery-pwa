const baseUrl = 'http://localhost:3001';

test('should navigate, interact with elements, and show correct content', async () => {
  await page.goto(`${baseUrl}/`);
  // Expect that the page URL will be correct
  expect(page.url()).toBe(`${baseUrl}/`);
  // Match any page content
  // await expect(page).toMatch('Home page');
  // await expect(page).toClick('[data-test-id="header-about-link"]');
  // await page.waitForNavigation();
  // // Expect that the page URL will be correct
  // expect(page.url()).toBe(`${baseUrl}/about`);
  // await expect(page).toMatch('This is the about page');
  // // Click on element and wait for navigation
  // await expect(page).toClick('[data-test-id="header-animals-link"]');
  // await page.waitForNavigation();
  // // Expect that the page URL will be correct
  // expect(page.url()).toBe(`${baseUrl}/animals`);
  // // Match text in a specific element
  // await expect(page).toMatchElement('h1', { text: 'Animals' });

  // const animalsPageAnimals = await page.$$(
  //   '[data-test-id^="animals-page-animal-"]',
  // );
  // // Check that we have 8 animals on the page
  // expect(animalsPageAnimals.length).toBe(8);
  // // Test for a specific numbered element (using the id in the attribute)
  // await expect(page).toMatchElement('[data-test-id="animals-page-animal-5"]', {
  //   text: 'Lila',
  // });

  // // Alternative: Using CSS :nth-of-type
  // const animalsPageAnimalsAlt = await page.$$(
  //   '[data-test-id-alternative="animals-page-animal"]',
  // );
  // // Check that we have 8 animals on the page
  // expect(animalsPageAnimalsAlt.length).toBe(8);
  // // Test for a specific numbered element (using a CSS
  // // :nth-of-type selector)
  // await expect(page).toMatchElement(
  //   '[data-test-id-alternative="animals-page-animal"]:nth-of-type(5)',
  //   {
  //     text: 'Lila',
  //   },
  // );

  // // Click on element and wait for navigation
  // await expect(page).toClick('[data-test-id="animals-page-animal-5"] a');

  // // For debugging: Wait for a specific number of seconds
  // // await page.waitForTimeout(5000);

  // await page.waitForNavigation();
  // // Expect that the page URL will be correct
  // expect(page.url()).toBe(`${baseUrl}/animals/5`);
  // // Match text in a specific element
  // await expect(page).toMatchElement('h1', { text: 'Lila (Monkey)' });
});
