import { chromium } from "playwright";
import path from "path";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const sections = ["about", "skills", "work", "achievements"];
  for (const id of sections) {
    const el = await page.$(`#${id}`);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await el.screenshot({ path: path.resolve(`public/screenshots/section_${id}.png`) });
      console.log(`Captured #${id}`);
    }
  }
  await browser.close();
}

main().catch(console.error);
