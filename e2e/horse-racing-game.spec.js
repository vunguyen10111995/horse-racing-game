import { test, expect } from "@playwright/test";

test.describe("Horse Racing Game", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("should display the main page with title", async ({ page }) => {
    await expect(page.locator("h1")).toContainText("Horse Racing Game");
  });

  test("should display control panel with buttons", async ({ page }) => {
    await expect(page.locator(".btn-generate")).toBeVisible();
    await expect(page.locator(".btn-start")).toBeVisible();
  });

  test("should display 20 horses on initialization", async ({ page }) => {
    // Wait for horses to be initialized
    await page.waitForSelector(".horse-item", { timeout: 5000 });

    const horseItems = await page.locator(".horse-item").count();
    expect(horseItems).toBe(20);
  });

  test("should show horses with names and conditions", async ({ page }) => {
    await page.waitForSelector(".horse-item", { timeout: 5000 });

    const firstHorse = page.locator(".horse-item").first();
    await expect(firstHorse.locator(".horse-name")).toBeVisible();
    await expect(firstHorse.locator(".condition-value")).toBeVisible();
  });

  test("should generate race schedule when clicking generate button", async ({
    page,
  }) => {
    const generateBtn = page.locator(".btn-generate");
    await generateBtn.click();

    // Wait for schedule to be generated
    await page.waitForSelector(".race-card", { timeout: 5000 });

    const raceCards = await page.locator(".race-card").count();
    expect(raceCards).toBe(6);
  });

  test("should display correct race distances in schedule", async ({
    page,
  }) => {
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });

    const distances = ["1200m", "1400m", "1600m", "1800m", "2000m", "2200m"];

    for (let i = 0; i < distances.length; i++) {
      const raceCard = page.locator(".race-card").nth(i);
      await expect(raceCard.locator(".race-distance")).toContainText(
        distances[i]
      );
    }
  });

  test("should enable start button after generating schedule", async ({
    page,
  }) => {
    const startBtn = page.locator(".btn-start");

    // Start button should be disabled initially
    await expect(startBtn).toBeDisabled();

    // Generate schedule
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });

    // Start button should be enabled
    await expect(startBtn).toBeEnabled();
  });

  test("should start races when clicking start button", async ({ page }) => {
    // Generate schedule
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });

    // Start racing
    await page.locator(".btn-start").click();

    // Wait for race track to show
    await page.waitForSelector(".race-track", { timeout: 5000 });

    // Check that race is running
    const raceInfo = page.locator(".race-info");
    await expect(raceInfo).toBeVisible();
  });

  test("should display race results after races complete", async ({ page }) => {
    // Generate schedule
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });

    // Start racing
    await page.locator(".btn-start").click();

    // Wait for at least one result to appear (with longer timeout for race completion)
    await page.waitForSelector(".result-card", { timeout: 30000 });

    const resultCards = await page.locator(".result-card").count();
    expect(resultCards).toBeGreaterThan(0);
  });

  test("should show podium with top 3 horses in results", async ({ page }) => {
    // Generate schedule
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });

    // Start racing
    await page.locator(".btn-start").click();

    // Wait for first result
    await page.waitForSelector(".result-card", { timeout: 30000 });

    const firstResult = page.locator(".result-card").first();
    const podiumItems = await firstResult.locator(".podium-item").count();
    expect(podiumItems).toBe(3);
  });

  test("should update game status during gameplay", async ({ page }) => {
    const statusValue = page.locator(".status-value");

    // Initial status
    await expect(statusValue).toContainText("Ready to Generate");

    // After generating
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });
    await expect(statusValue).toContainText("Ready to Start");

    // After starting
    await page.locator(".btn-start").click();
    await expect(statusValue).toContainText("Racing in Progress");
  });

  test("should show horse animations on race track", async ({ page }) => {
    // Generate and start race
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });
    await page.locator(".btn-start").click();

    // Wait for race track
    await page.waitForSelector(".horse-runner", { timeout: 5000 });

    const horseRunners = await page.locator(".horse-runner").count();
    expect(horseRunners).toBe(10); // 10 horses per race
  });

  test("should be responsive on mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await expect(page.locator(".app-header h1")).toBeVisible();
    await expect(page.locator(".control-panel")).toBeVisible();
    await expect(page.locator(".horse-list-container")).toBeVisible();
  });

  test("should display all race schedule information", async ({ page }) => {
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });

    const firstRace = page.locator(".race-card").first();

    // Check round number
    await expect(firstRace.locator(".race-round")).toContainText("Round 1");

    // Check distance
    await expect(firstRace.locator(".race-distance")).toContainText("1200m");

    // Check horses colors are displayed
    const horseColorDots = await firstRace.locator(".horse-color-dot").count();
    expect(horseColorDots).toBe(10);
  });

  test("should show full results when expanding details", async ({ page }) => {
    // Generate and start race
    await page.locator(".btn-generate").click();
    await page.waitForSelector(".race-card", { timeout: 5000 });
    await page.locator(".btn-start").click();

    // Wait for first result
    await page.waitForSelector(".result-card", { timeout: 30000 });

    const firstResult = page.locator(".result-card").first();
    const detailsSummary = firstResult.locator("summary");

    // Click to expand
    await detailsSummary.click();

    // Check that table is visible
    await expect(firstResult.locator(".results-table")).toBeVisible();

    // Check that all 10 horses are shown
    const tableRows = await firstResult.locator(".table-row").count();
    expect(tableRows).toBe(10);
  });
});
