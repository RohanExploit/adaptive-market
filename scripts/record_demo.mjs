import { chromium } from "playwright-core";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { join } from "path";

const out = fileURLToPath(new URL("../docs/demo/", import.meta.url));
mkdirSync(out, { recursive: true });

console.log("Launching browser for comprehensive 1080p demo capture...");
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || "chrome" });
const ctx = await browser.newContext({ 
  viewport: { width: 1920, height: 1080 }, 
  recordVideo: { dir: out, size: { width: 1920, height: 1080 } } 
});
const page = await ctx.newPage();

console.log("1. Navigating to http://localhost:3000...");
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(2000);

console.log("2. Resetting demo state...");
await page.getByRole("button", { name: "Reset" }).click();
await page.waitForTimeout(2500);

console.log("3. Triggering Act 1: Stateless Baseline...");
await page.getByRole("button", { name: /Act 1: Stateless/ }).click();
await page.waitForTimeout(3500);
await page.screenshot({ path: join(out, "1-stateless.png"), fullPage: true });

console.log("4. Triggering Act 2: Ingest 3-Month Memory into Hindsight...");
await page.getByRole("button", { name: /Act 2: Ingest/ }).click();
// Wait until ingestion & consolidation completes
await page.waitForSelector("button:not([disabled]):has-text('Act 3')", { timeout: 60000 });
await page.waitForTimeout(2000);
await page.screenshot({ path: join(out, "2-ingested.png"), fullPage: true });

console.log("5. Triggering Act 3: Self-Evolving Morph...");
await page.getByRole("button", { name: /Act 3: Self-Evolving Morph/ }).click();
// Wait until strategy mutation finishes
await page.waitForSelector("button:not([disabled]):has-text('Act 3')", { timeout: 60000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: join(out, "3-adapted.png"), fullPage: true });
await page.screenshot({ path: join(out, "3-adapted-overview.png"), fullPage: true });

console.log("6. Inspecting Sales Battlecards Tab...");
await page.getByRole("button", { name: /Sales Battlecards/ }).click();
await page.waitForTimeout(2500);
await page.screenshot({ path: join(out, "4-battlecards.png"), fullPage: true });

console.log("7. Inspecting Pricing & Packaging Tab...");
await page.getByRole("button", { name: /Pricing & Packaging/ }).click();
await page.waitForTimeout(2500);
await page.screenshot({ path: join(out, "5-pricing-matrix.png"), fullPage: true });

console.log("8. Inspecting Roadmap Prioritizer Tab...");
await page.getByRole("button", { name: /Roadmap Prioritizer/ }).click();
await page.waitForTimeout(2500);
await page.screenshot({ path: join(out, "6-roadmap.png"), fullPage: true });

console.log("9. Inspecting Hindsight Memory Bank Tab...");
await page.getByRole("button", { name: /Hindsight Memory Bank/ }).click();
await page.waitForTimeout(2500);
await page.screenshot({ path: join(out, "7-memory-bank.png"), fullPage: true });

console.log("10. Inspecting Market Signals Feed Tab...");
await page.getByRole("button", { name: /Market Signals Feed/ }).click();
await page.waitForTimeout(2500);
await page.screenshot({ path: join(out, "8-signals-feed.png"), fullPage: true });

console.log("11. Returning to Overview Tab...");
await page.getByRole("button", { name: /Executive Overview/ }).click();
await page.waitForTimeout(2500);

await ctx.close();
await browser.close();
console.log("Successfully recorded all tabs and screenshots to:", out);
