/* global browser */
import fs from "fs";

describe("Popover Tests", () => {
  let page;

  beforeAll(async () => {
    page = await browser.newPage();
    const appScript = fs.readFileSync("src/js/app.js", "utf8");

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
    await page.close();
  });

  test("Popover should open on button click", async () => {
    await page.click("#popover-btn");
    const popover = await page.$(".popover");
    const isVisible = await popover.evaluate(
      (el) => el.style.display === "block",
    );
    expect(isVisible).toBe(true);
  });

  test("Popover should close when clicking outside", async () => {
    await page.click("#popover-btn"); // открываем поповер
    await page.click("body"); // кликаем вне поповера
    const popover = await page.$(".popover");
    const isVisible = await popover.evaluate(
      (el) => el.style.display === "block",
    );
    expect(isVisible).toBe(false);
  });
});
