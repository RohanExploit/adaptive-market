// Drives the 3-act demo and records video + screenshots into docs/demo/.
// Usage: cd scripts && npm i playwright-core && node record_demo.mjs  (needs Edge/Chrome, app on :3000)
import { chromium } from "playwright-core";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";
import { join } from "path";

const out = fileURLToPath(new URL("../docs/demo/", import.meta.url)) ;
mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || "msedge" });
const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, recordVideo: { dir: out, size: { width: 1920, height: 1080 } } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000");
await page.getByRole("button", { name: "Reset" }).click();
await page.waitForTimeout(2000);

await page.getByRole("button", { name: /^1 ·/ }).click();
await page.getByText("Stateless (0 memories)").waitFor();
await page.waitForTimeout(3000);
await page.screenshot({ path: join(out, "1-stateless.png") });

await page.getByRole("button", { name: /^2 ·/ }).click();
await page.getByText(/Observations \(/).waitFor({ timeout: 120000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: join(out, "2-ingested.png") });

await page.getByRole("button", { name: /^3 ·/ }).click();
await page.getByText(/Hindsight-adapted/).waitFor({ timeout: 120000 });
await page.waitForTimeout(5000);
await page.screenshot({ path: join(out, "3-adapted.png"), fullPage: true });

await ctx.close();
await browser.close();
console.log("saved to", out);
