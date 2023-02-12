const playwright = require('playwright');

(async () => {
  const browser = await playwright.chromium.launch();
  const context = await browser.newContext({cacheEnabled: true, blockImages: true});;
  const page = await context.newPage({blockImages: true});


  await page.goto('https://waltonbd.com/refrigerator-freezer/direct-cool-refrigerator', {
    timeout: 60000,
    waitUntil: 'networkidle0'
  });

  const elements = await page.$$('.grid-style h6 a');

  const arr = [];

  for (let i = 0; i < 2; i++) {
    const element = elements[i];
    const href = await element.getAttribute('href');
    arr.push({ href });
  }
  
  async function product_site(href) {
    await page.goto(href, {
      timeout: 60000,
      waitUntil: 'networkidle0'
    });
    const mini_map = await page.$$('.mcs-item');
    
    return mini_map.length
  }
  
  const productArr = []
  
  for (let i = 0; i < arr.length; i++) {
    const product = arr[i]
    
    const url = product.href.split("/").pop()
    const mini_map = await product_site(product.href)
    
    productArr.push({
      url,
      mini_map
    })
  }

  console.log(productArr)

  await browser.close();
})();


  // await page.screenshot({ path: 'example.png', fullPage: true });