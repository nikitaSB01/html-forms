import puppeteer from "puppeteer";
import { fork } from "child_process";

jest.setTimeout(60000); // Увеличиваем таймаут для длинных операций

describe("Popover Tests", () => {
  let browser;
  let page;
  let server = null;
  const baseUrl = "http://localhost:9000";

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
        if(server.connected) {
            process.send("ok");
            resolve()
        } else {
            reject();
        }
    });
    // Запускаем браузер Puppeteer
    browser = await puppeteer.launch({
      /* headless: process.env.HEADLESS !== 'false', // Запуск без UI в CI, с UI локально
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO, 10) : 0, // Замедление только если нужно
     */});

    // Создаем новую страницу
    page = await browser.newPage();
  });

  afterAll(async () => {
    if (browser) {
      // Закрываем браузер Puppeteer
      await browser.close();
    }

    // Останавливаем сервер
    if (server) {
      server.kill();
    }
  });

  test("Popover should open on button click", async () => {
    // Переходим на страницу
    await page.goto(baseUrl);

    // Проверяем, что кнопка существует
    const buttonExists = await page.$("#popover-btn");
    expect(buttonExists).not.toBeNull();

    // Кликаем по кнопке
    await page.click("#popover-btn");

    // Ждем, пока popover появится
    await page.waitForSelector(".popover", { visible: true });

    // Проверяем, что popover видим
    const popoverVisible = await page.$eval(".popover", (el) => window.getComputedStyle(el).display !== "none");
    expect(popoverVisible).toBe(true);
  }, 20000);

  test("Popover should close when clicking outside", async () => {
    await page.goto(baseUrl);
    const buttonExists = await page.$("#popover-btn");
    expect(buttonExists).not.toBeNull();

    await page.click("#popover-btn");
    await page.waitForSelector(".popover", { visible: true });

    await page.click("body");
    await page.waitForSelector(".popover", { hidden: true });
    const popoverHidden = await page.$eval(".popover", (el) => window.getComputedStyle(el).display === "none");
    expect(popoverHidden).toBe(true);
  }, 20000);
});
