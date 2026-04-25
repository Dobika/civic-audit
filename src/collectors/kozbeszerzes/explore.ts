import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";

const URL = "https://www.kozbeszerzes.hu/adatbazis/keres/hirdetmeny/?hl=hu";
const OUTPUT_FILE = new URL("kozbeszerzes-filters.json", import.meta.url).pathname;

interface Field {
  type: string;
  name: string;
  label: string;
  placeholder?: string;
  options?: string[];
}

interface ExplorationResult {
  url: string;
  capturedAt: string;
  fields: Field[];
  selectsAfterExpand: Array<{ name: string; options: string[] }>;
  expandableToggles: string[];
}

async function explore() {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  console.log("Navigating to search page...");
  await page.goto(URL, { waitUntil: "networkidle" });

  const fields: Field[] = await page.evaluate(() => {
    const results: Field[] = [];

    document.querySelectorAll<HTMLSelectElement>("select").forEach((el) => {
      results.push({
        type: "select",
        name: el.name || el.id || "(unnamed)",
        label: el.labels?.[0]?.textContent?.trim() ?? "",
        options: Array.from(el.options).map((o) => o.text.trim()).filter(Boolean),
      });
    });

    document.querySelectorAll<HTMLInputElement>("input").forEach((el) => {
      results.push({
        type: `input[${el.type}]`,
        name: el.name || el.id || "(unnamed)",
        label: el.labels?.[0]?.textContent?.trim() ?? "",
        placeholder: el.placeholder ?? "",
      });
    });

    document.querySelectorAll<HTMLElement>("button, [role='button']").forEach((el) => {
      const text = el.textContent?.trim() ?? "";
      if (text) results.push({ type: "button", name: text, label: "" });
    });

    return results;
  });

  // Try to expand collapsible filter panels
  const toggleHandles = await page.$$("[data-toggle], .collapse-toggle, .filter-toggle, details summary");
  const expandableToggles: string[] = [];
  for (const toggle of toggleHandles) {
    const text = (await toggle.textContent())?.trim() ?? "";
    if (text) expandableToggles.push(text);
    await toggle.click().catch(() => {});
    await page.waitForTimeout(500);
  }

  const selectsAfterExpand = await page.evaluate(() =>
    Array.from(document.querySelectorAll<HTMLSelectElement>("select")).map((el) => ({
      name: el.name || el.id || "(unnamed)",
      options: Array.from(el.options).map((o) => o.text.trim()).filter(Boolean),
    }))
  );

  const result: ExplorationResult = {
    url: URL,
    capturedAt: new Date().toISOString(),
    fields,
    selectsAfterExpand,
    expandableToggles,
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2), "utf-8");
  console.log(`\nSaved to: ${OUTPUT_FILE}`);

  console.log("\nBrowser stays open for manual inspection. Close it to exit.");
  await page.waitForTimeout(60_000);
  await browser.close();
}

explore().catch((err) => {
  console.error(err);
  process.exit(1);
});
