import puppeteer from 'puppeteer';

describe('Popover Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Set to true for CI/CD
      slowMo: 100, // Slow down operations for easier debugging
    });
    page = await browser.newPage();
    await page.goto('http://localhost:9000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Popover should open on button click', async () => {
    const buttonExists = await page.$('#popover-btn');
    expect(buttonExists).not.toBeNull(); // Check if the button exists

    await page.click('#popover-btn'); // Click the button

    const popover = await page.$('.popover'); // Find the popover element
    const isVisible = await popover.evaluate(
      (el) => window.getComputedStyle(el).display !== 'none', // Check if it's visible
    );
    expect(isVisible).toBe(true);
  });

  test('Popover should close when clicking outside', async () => {
    // Open popover
    await page.click('#popover-btn'); // Click the button

    // Wait until the popover is visible
    await page.waitForSelector('.popover', { visible: true });

    // Find the popover element once
    const popover = await page.$('.popover');

    // Check that the popover is visible
    const isVisibleBefore = await popover.evaluate(
      (el) => window.getComputedStyle(el).display !== 'none',
    );
    console.log('Popover visible before click:', isVisibleBefore);
    expect(isVisibleBefore).toBe(true);

    // Click outside the popover
    await page.click('body'); // Click the body to close the popover

    // Wait for the popover to become invisible
    await page.waitForFunction(() => {
      const popoverElement = document.querySelector('.popover');
      return popoverElement && window.getComputedStyle(popoverElement).display === 'none';
    });

    // Check that the popover is hidden
    const isVisibleAfter = await popover.evaluate(
      (el) => window.getComputedStyle(el).display === 'none',
    );

    console.log('Popover visible after click:', isVisibleAfter);
    expect(isVisibleAfter).toBe(true);
  }, 20000); // Increase timeout if necessary
});
