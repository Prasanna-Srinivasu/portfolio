import fs from "fs";
import { chromium } from "playwright";

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(`
    <html>
      <body style="margin: 0; background: white;">
        <canvas id="c" width="1280" height="720"></canvas>
        <img id="img" src="http://localhost:3000/screenshots/test_curves.png" />
      </body>
    </html>
  `);
  await page.waitForTimeout(500);
  const result = await page.evaluate(async () => {
    const img = document.getElementById("img");
    await new Promise((r) => { if (img.complete) r(); else img.onload = r; });
    const c = document.getElementById("c");
    const ctx = c.getContext("2d");
    ctx.drawImage(img, 0, 0);

    const corners = [
      { name: "top-left (10, 10)", data: ctx.getImageData(10, 10, 1, 1).data },
      { name: "top-right (1270, 10)", data: ctx.getImageData(1270, 10, 1, 1).data },
      { name: "bottom-left (10, 710)", data: ctx.getImageData(10, 710, 1, 1).data },
      { name: "bottom-right (1270, 710)", data: ctx.getImageData(1270, 710, 1, 1).data },
      { name: "top-center (640, 10)", data: ctx.getImageData(640, 10, 1, 1).data },
      { name: "mid-left (10, 360)", data: ctx.getImageData(10, 360, 1, 1).data },
      { name: "mid-right (1270, 360)", data: ctx.getImageData(1270, 360, 1, 1).data },
    ];
    return corners.map(c => ({ name: c.name, rgb: `${c.data[0]},${c.data[1]},${c.data[2]}` }));
  });
  console.log("Edge pixels:", result);
  await browser.close();
}
main().catch(console.error);
