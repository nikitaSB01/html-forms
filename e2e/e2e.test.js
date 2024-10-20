import puppeteer from 'puppeteer';
import fs from 'fs';

describe('Popover Tests', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false, // Включите headless режим для быстроты тестов
      slowMo: 100, // Замедление для лучшей визуализации при отладке
      devtools: true, // Для отладки
    });
    page = await browser.newPage();
    const appScript = fs.readFileSync('src/js/app.js', 'utf8');

    // Устанавливаем HTML-контент для страницы
    await page.setContent(`
      <html>
        <head>
          <link rel="stylesheet" href="css/style.css">
        </head>
        <body>
          <button id="popover-btn" class="btn">Показать Popover</button>
          <script>
            ${appScript}
          </script>
        </body>
      </html>
    `);
  });

  afterAll(async () => {
    await browser.close();
  });

  test('Popover should open on button click', async () => {
    await page.click('#popover-btn'); // Клик по кнопке, чтобы открыть Popover
    const popover = await page.$('.popover'); // Найдем элемент popover
    const isVisible = await popover.evaluate(
      (el) => el.style.display === 'block', // Проверяем, что он видим
    );
    expect(isVisible).toBe(true);
  });

  test('Popover should close when clicking outside', async () => {
    await page.click('#popover-btn'); // Открываем popover
    await page.click('body'); // Кликаем вне popover
    const popover = await page.$('.popover');
    const isVisible = await popover.evaluate(
      (el) => el.style.display === 'block', // Проверяем, что он должен быть скрыт
    );
    expect(isVisible).toBe(false);
  });
});
