import puppeteer from "puppeteer";
import fs from "fs/promises";

async function openWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });

  const page = await browser.newPage();

  await page.goto("https://google.com");

  await browser.close();
}

// openWebPage();

async function captureScreenshot() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });

  const page = await browser.newPage();

  await page.goto("https://google.com");

  await page.screenshot({ path: "example.png" });

  await browser.close();
}

// captureScreenshot();

async function navigateWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });

  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  await page.click('a[href="/login"]');
  await new Promise((r) => setTimeout(r, 5000));
  await browser.close();
}

// navigateWebPage();

async function getDataFromWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });

  const page = await browser.newPage();

  await page.goto("https://example.com/");

  const result = await page.evaluate(() => {
    const title = document.querySelector("h1").innerText;
    const description = document.querySelector("p").innerText;
    const more = document.querySelector("a").innerText;

    return {
      title,
      description,
      more,
    };
  });

  console.log(result);

  await browser.close();
}

// getDataFromWebPage();

async function handleDynamicsWebPage() {
  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 200,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });

  const page = await browser.newPage();

  await page.goto("https://quotes.toscrape.com/");

  const result = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");

    const data = [...quotes].map((quote) => {
      const quoteText = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      const tags = [...quote.querySelectorAll(".tag")].map(
        (tag) => tag.innerText
      );
      return {
        quoteText,
        author,
        tags,
      };
    });

    return data;
  });

  console.log(result);

  await fs.writeFile("quotes.json", JSON.stringify(result));

  await browser.close();
}

handleDynamicsWebPage();
