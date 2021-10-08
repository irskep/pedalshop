const TwitterApi = require("twitter-api-v2");
const puppeteer = require("puppeteer");
const config = require("./config");

(async () => {
  const browser = await puppeteer.launch({
    args: ["--font-render-hinting=medium", "--enable-font-antialiasing"],
  });
  const page = await browser.newPage();
  await page.goto("https://thisguitarpedaldoesnotexist.com/#bot=true", {
    waitUntil: "networkidle2",
  });

  await page.waitForSelector(".Brand");
  const brandEl = await page.$(".Brand");
  const brandValue = await page.evaluate((el) => el.textContent, brandEl);
  const pedalNameEl = await page.$(".PedalName");
  const pedalNameValue = await page.evaluate(
    (el) => el.textContent,
    pedalNameEl
  );
  const tweetText = `${pedalNameValue} by ${brandValue}`;

  console.log("Text:", tweetText);

  const buffer = await page.screenshot({
    clip: { x: 0, y: 50, width: 800, height: 500 },
  });

  try {
    const twitterClient = new TwitterApi.TwitterApi({
      ...config
    }).readWrite;
    console.log("Authenticated with Twitter");

    const mediaID = await twitterClient.v1.uploadMedia(buffer, {
      type: "png",
      target: "tweet",
    });

    await twitterClient.v1.tweet(tweetText, { media_ids: [mediaID] });
    // await twitterClient.v1.tweet("Hi, I'm a bot!");

    console.log("Tweet compleet");
  } catch (e) {
    console.log("Error");
    console.log(e);
  }

  await browser.close();
})();
