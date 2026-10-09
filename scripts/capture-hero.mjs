import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);
  await page.screenshot({ path: "public/screenshots/new_hero_1440.png" });

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobile.waitForTimeout(1000);
  await mobile.screenshot({ path: "public/screenshots/new_hero_mobile.png" });

  await browser.close();
  console.log("Captured new hero successfully!");
}

main().catch(console.error);
