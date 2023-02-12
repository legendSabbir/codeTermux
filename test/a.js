const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://legendsabbir.github.io/Faq-Accordion-Card/');
  console.log(await page.title());
  await browser.close();
})();
