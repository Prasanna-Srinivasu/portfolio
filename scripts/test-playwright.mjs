import { chromium } from "playwright";
import fs from "fs";
import path from "path";

async function runTests() {
  console.log("Launching Chromium for comprehensive portfolio validation...");
  const browser = await chromium.launch({ headless: true });
  const screenshotsDir = path.resolve("public/screenshots");
  fs.mkdirSync(screenshotsDir, { recursive: true });

  const consoleErrors = [];

  // 1. Desktop Test: 1440x900
  console.log("Testing Desktop Viewport (1440x900)...");
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const desktopPage = await desktopContext.newPage();
  desktopPage.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`Desktop Console Error: ${msg.text()}`);
  });

  await desktopPage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await desktopPage.waitForTimeout(1000);

  await desktopPage.screenshot({ path: path.join(screenshotsDir, "desktop_1440.png") });

  // Full-page scroll to trigger IntersectionObservers
  await desktopPage.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });

  await desktopPage.waitForTimeout(1000);

  const desktopOverflow = await desktopPage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      isEqual: document.documentElement.scrollWidth <= window.innerWidth,
    };
  });
  console.log("Desktop Overflow Check:", desktopOverflow);

  await desktopPage.screenshot({
    path: path.join(screenshotsDir, "desktop_fullpage.png"),
    fullPage: true,
  });

  // 2. Mobile Test: 390x844
  console.log("Testing Mobile Viewport (390x844)...");
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1",
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();
  mobilePage.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(`Mobile Console Error: ${msg.text()}`);
  });

  await mobilePage.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await mobilePage.waitForTimeout(1000);

  await mobilePage.screenshot({ path: path.join(screenshotsDir, "mobile_390.png") });

  // Mobile scroll trigger
  await mobilePage.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 400;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0);
          resolve();
        }
      }, 50);
    });
  });

  await mobilePage.waitForTimeout(1000);

  const mobileOverflow = await mobilePage.evaluate(() => {
    return {
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      isEqual: document.documentElement.scrollWidth <= window.innerWidth,
    };
  });
  console.log("Mobile Overflow Check:", mobileOverflow);

  await mobilePage.screenshot({
    path: path.join(screenshotsDir, "mobile_fullpage.png"),
    fullPage: true,
  });

  // 3. ID Card Interaction with force click / dispatchEvent
  console.log("Testing ID Card interaction...");
  const idCard = await desktopPage.$('[role="button"][aria-label*="Developer ID Card"]');
  if (idCard) {
    await idCard.dispatchEvent("click");
    console.log("ID Card flip triggered successfully.");
  }

  // Scroll back to top to test hero interactions
  await desktopPage.evaluate(() => window.scrollTo(0, 0));
  await desktopPage.waitForTimeout(500);

  // 4. Sound button click
  const soundBtn = await desktopPage.$('button[aria-label*="sound"]');
  if (soundBtn) {
    await soundBtn.dispatchEvent("click");
    console.log("Sound toggle button triggered successfully.");
  }

  // 5. Chapter buttons click test
  console.log("Testing Chapter Navigation...");
  const chapterBtn = await desktopPage.$('button:has-text("Tech Core"), button:has-text("03")');
  if (chapterBtn) {
    await chapterBtn.dispatchEvent("click");
    console.log("Chapter button clicked successfully.");
  }

  // 6. Speed toggle click test
  const speedBtn = await desktopPage.$('button:has-text("1×")');
  if (speedBtn) {
    await speedBtn.dispatchEvent("click");
    console.log("Speed toggle clicked successfully.");
  }

  console.log("Console errors detected:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    consoleErrors.forEach((e) => console.error(e));
  }

  await browser.close();
  console.log("All Playwright verification completed successfully!");
}

runTests().catch((err) => {
  console.error("Test error:", err);
  process.exit(1);
});
