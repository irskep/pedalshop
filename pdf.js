const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:1238/\#seed\=1574054517389\&pages=10', {waitUntil: 'networkidle2'});
  await page.pdf({path: 'test2.pdf', format: 'A4'});

  await browser.close();
})();