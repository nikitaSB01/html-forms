import puppeteer from 'puppeteer';
import { fork } from 'child_process';

jest.setTimeout(30000); // Увеличиваем таймаут для Puppeteer

describe('Popover Tests', () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    // Запускаем сервер
    server = fork(`${__dirname}/e2e.server.js`);

    // Ожидаем, пока сервер начнет работу
    await new Promise((resolve, reject) => {
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
      server.on('error', reject);
    });

  /*   // Запускаем браузер Puppeteer
    browser = await puppeteer.launch({
      headless: true, // Режим без интерфейса
      slowMo: 100, // Замедление для наглядности
    }); */

    // Создаем новую страницу
    page = await browser.newPage();
  });

  afterAll(async () => {
    // Закрываем браузер Puppeteer
    await browser.close();

    // Останавливаем сервер
    server.kill();
  });

  test('Popover should open on button click', async () => {
    // Переходим на страницу
    await page.goto(baseUrl);

    // Проверяем, что кнопка существует
    const buttonExists = await page.$('#popover-btn');
    expect(buttonExists).not.toBeNull();

    // Кликаем по кнопке
    await page.click('#popover-btn');

    // Ждем, пока popover появится
    await page.waitForSelector('.popover', { visible: true });

    // Проверяем, что popover видим
    const popoverVisible = await page.$eval('.popover', (el) => window.getComputedStyle(el).display !== 'none');
    expect(popoverVisible).toBe(true);
  }, 10000);

  test('Popover should close when clicking outside', async () => {
    // Переходим на страницу
    await page.goto(baseUrl);

    // Проверяем, что кнопка существует
    const buttonExists = await page.$('#popover-btn');
    expect(buttonExists).not.toBeNull();

    // Открываем popover
    await page.click('#popover-btn');
    await page.waitForSelector('.popover', { visible: true });

    // Кликаем по области вне popover
    await page.click('body');

    // Ждем, пока popover исчезнет
    await page.waitForSelector('.popover', { hidden: true });

    // Проверяем, что popover закрылся
    const popoverHidden = await page.$eval('.popover', (el) => window.getComputedStyle(el).display === 'none');
    expect(popoverHidden).toBe(true);
  }, 10000);
});
