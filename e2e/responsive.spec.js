import { test, expect } from "@playwright/test";

test.describe("Responsive Design Tests", () => {
  test("should display correctly on desktop (1920x1080)", async ({ page }) => {
    await page.setViewportSize({ width: 1920, height: 1080 });
    await page.goto("/");

    await expect(page.locator(".app-header")).toBeVisible();
    await expect(page.locator(".game-content")).toBeVisible();

    // Check grid layout on desktop - should have 2 columns
    const gameContent = page.locator(".game-content");
    const gridColumns = await gameContent.evaluate((el) => {
      return window.getComputedStyle(el).gridTemplateColumns;
    });

    // Should have 2 columns on desktop (grid-template-columns will have 2 values)
    const columnCount = gridColumns.split(" ").length;
    expect(columnCount).toBe(2);
  });

  test("should display correctly on tablet (768x1024)", async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto("/");

    await expect(page.locator(".app-header")).toBeVisible();
    await expect(page.locator(".control-panel")).toBeVisible();
    await expect(page.locator(".horse-list-container")).toBeVisible();
  });

  test("should display correctly on mobile (375x667)", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await expect(page.locator(".app-header h1")).toBeVisible();

    // Check that control panel buttons stack vertically on mobile
    const controlPanel = page.locator(".control-panel");
    const flexDirection = await controlPanel.evaluate((el) => {
      return window.getComputedStyle(el).flexDirection;
    });

    expect(flexDirection).toBe("column");
  });

  test("should have scrollable horse list on small screens", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    await page.waitForSelector(".horse-item", { timeout: 5000 });

    const horseList = page.locator(".horse-list");
    const isScrollable = await horseList.evaluate((el) => {
      return el.scrollHeight > el.clientHeight;
    });

    expect(isScrollable).toBe(true);
  });

  test("should adapt control buttons on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    const generateBtn = page.locator(".btn-generate");
    const btnWidth = await generateBtn.evaluate((el) => {
      return window.getComputedStyle(el).width;
    });

    // Button should take full width on mobile
    const parentWidth = await page.locator(".control-panel").evaluate((el) => {
      return el.clientWidth;
    });

    // Allow for padding
    expect(parseInt(btnWidth)).toBeGreaterThan(parentWidth * 0.9);
  });

  test("should display race track with horizontal scroll on mobile", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");

    // Generate and start race
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });
    await page.locator(".btn-start").click();

    await page.waitForSelector(".track", { timeout: 5000 });

    const track = page.locator(".track");
    const hasOverflow = await track.evaluate((el) => {
      return window.getComputedStyle(el).overflowX === "auto";
    });

    expect(hasOverflow).toBe(true);
  });
});
