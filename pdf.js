const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--font-render-hinting=medium', '--enable-font-antialiasing'],
  });
  const page = await browser.newPage();
  await page.goto('http://localhost:1238/\#seed\=1574054517389\&numBrandRepetitions=5', {waitUntil: 'networkidle2'});
  // await page.goto('http://localhost:1238/\#seed\=1574054517389\&numBrandRepetitions=1', {waitUntil: 'networkidle2'});
  await page.pdf({path: "Steve's Pedal Shop.pdf", format: 'A4'});

  await browser.close();
})();