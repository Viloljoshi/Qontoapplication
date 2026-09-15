import { expect, test } from "@playwright/test";

test("the executive brief is the default reading path", async ({ page }) => {
  await page.goto("./");
  await expect(page.getByRole("heading", { name: "Four checks are clear. Ownership is not." })).toBeVisible();
  await expect(page.getByText("At sign-up, Qonto must decide whether this fictional SME can become a customer.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Read the 5-minute brief" })).toHaveAttribute("href", "#brief-start");
  await expect(page.getByRole("heading", { name: "A Trustworthy Decision System for Due Diligence" })).toBeVisible();
  await expect(page.getByText("Page 2 / 2")).toBeVisible();
});

test("the interactive model and case packet work", async ({ page }) => {
  await page.goto("./");
  await page.getByRole("button", { name: "Explore the interactive model" }).click();
  await expect(page).toHaveURL(/view=deep-dive/);
  await expect(page.getByRole("heading", { name: "Reduce unnecessary due-diligence work without weakening control." })).toBeVisible();

  await page.getByRole("tab", { name: "Material Ambiguity" }).click();
  await expect(page).toHaveURL(/case=sanctions/);
  await expect(page.getByText("A potential sanctions match has material ambiguity.")).toBeVisible();

  await page.getByRole("button", { name: "Open Escalation Packet" }).click();
  await expect(page.getByRole("status")).toHaveText("Prototype action prepared. No external action was taken.");
});

test("the layout does not overflow horizontally", async ({ page }) => {
  await page.goto("./?view=deep-dive");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
