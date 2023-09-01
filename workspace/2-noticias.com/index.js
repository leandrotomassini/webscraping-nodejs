import puppeteer from "puppeteer";
import fs from "fs/promises";

// NEWS UPLOAD LINKS
const uploadNewsLinks = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });

  const page = await browser.newPage();

  await page.goto("https://infobae.com/");

  const newsLinks = await page.evaluate(() => {

    const titles = document.querySelectorAll(".headline-link");

    const newNewsLinks = [...titles].map((titleH) => {
      const href = titleH.href;

      return {
        href
      };
    });

    return newNewsLinks;
  });

  await fs.writeFile("data/newsLinks.json", JSON.stringify(newsLinks));

  await browser.close();
}


// READ NEWS AND SAVE DATA
const readNew = async (url) => {

  const browser = await puppeteer.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
  });

  const page = await browser.newPage();

  await page.goto(url);

  const newData = await page.evaluate(() => {

    title = document.querySelector('h1').innerText;

    paragraphs = document.querySelectorAll('.paragraph');

    const textParagraphs = [...paragraphs].map((paragraph) => {
      const text = paragraph.innerText;
      return {
        text
      };
    });

    return textParagraphs;
  });

  await fs.writeFile("data/dataNew.json", JSON.stringify(newData));
  await browser.close();
}



// uploadNewsLinks();

readNew('https://www.infobae.com/sociedad/policiales/2023/09/01/condenaron-a-4-anos-y-6-meses-de-prision-efectiva-al-joven-que-golpeo-al-playero-arturo-lopez/');