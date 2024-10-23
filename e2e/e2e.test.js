import puppeteer from 'puppeteer';

describe('Popover Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: true,
      slowMo: 100,
    });
    page = await browser.newPage();
    await page.goto('http://localhost:9000');
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Popover should open on button click', async () => {
    await page.goto('http://localhost:9000');

    // Проверяем, что кнопка существует
    const buttonExists = await page.$('#popover-btn');
    expect(buttonExists).not.toBeNull();

    // Кликаем по кнопке
    await page.click('#popover-btn');

    // Ждем, пока popover появится
    const popover = await page.$('.popover');
    await page.waitForSelector('.popover', { visible: true }); // ждем, пока поповер станет видимым

    // Проверяем, что popover видим
    const isVisible = await popover.evaluate(
      (el) => window.getComputedStyle(el).display !== 'none',
    );
    expect(isVisible).toBe(true);
  }, 10000);

  test('Popover should close when clicking outside', async () => {
    await page.goto('http://localhost:9000');

    // Проверяем, что кнопка существует
    const buttonExists = await page.$('#popover-btn');
    expect(buttonExists).not.toBeNull();
    // Открываем popover
    await page.click('#popover-btn');
    const popover = await page.$('.popover'); // Находим элемент popover
    await page.waitForSelector('.popover', { visible: true }); // Ждем, пока popover появится

    const isVisibleBefore = await popover.evaluate(
      (el) => window.getComputedStyle(el).display !== 'none',
    );
    console.log('Popover visible before click:', isVisibleBefore); // Отладочный вывод
    expect(isVisibleBefore).toBe(true); // Убеждаемся, что popover виден

    // Клик по области вне popover
    await page.click('body'); // Клик по body для закрытия popover

    // Ждем, пока popover исчезнет
    await page.waitForSelector('.popover', { hidden: true });

    // Проверяем, что popover закрылся
    const isVisibleAfter = await popover.evaluate(
      (el) => window.getComputedStyle(el).display === 'none',
    );
    console.log('Popover visible after click:', isVisibleAfter); // Отладочный вывод
    expect(isVisibleAfter).toBe(true); // Убеждаемся, что popover скрыт
  }, 10000);
});
