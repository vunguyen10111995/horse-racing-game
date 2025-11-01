import { describe, it, expect } from "vitest";
import { Horse, generateHorses } from "../Horse";

describe("Horse Model", () => {
  describe("Horse Class", () => {
    it("should create a horse with correct properties", () => {
      const horse = new Horse(1, "Thunder", "#FF6B6B", 85);

      expect(horse.id).toBe(1);
      expect(horse.name).toBe("Thunder");
      expect(horse.color).toBe("#FF6B6B");
      expect(horse.condition).toBe(85);
    });

    it("should calculate speed based on condition", () => {
      const horse = new Horse(1, "Thunder", "#FF6B6B", 100);
      const speed = horse.calculateSpeed();

      // Speed should be between 0.8 and 1.2 (100% condition * random factor)
      expect(speed).toBeGreaterThanOrEqual(0.8);
      expect(speed).toBeLessThanOrEqual(1.2);
    });

    it("should calculate lower speed for lower condition", () => {
      const lowConditionHorse = new Horse(1, "Slow", "#FF6B6B", 50);
      const highConditionHorse = new Horse(2, "Fast", "#4ECDC4", 100);

      // Run multiple times to account for randomness
      let lowAvg = 0;
      let highAvg = 0;
      const iterations = 100;

      for (let i = 0; i < iterations; i++) {
        lowAvg += lowConditionHorse.calculateSpeed();
        highAvg += highConditionHorse.calculateSpeed();
      }

      lowAvg /= iterations;
      highAvg /= iterations;

      expect(highAvg).toBeGreaterThan(lowAvg);
    });
  });

  describe("generateHorses", () => {
    it("should generate default 20 horses", () => {
      const horses = generateHorses();

      expect(horses).toHaveLength(20);
    });

    it("should generate specified number of horses", () => {
      const horses = generateHorses(10);

      expect(horses).toHaveLength(10);
    });

    it("should generate horses with unique ids", () => {
      const horses = generateHorses(20);
      const ids = horses.map((h) => h.id);
      const uniqueIds = new Set(ids);

      expect(uniqueIds.size).toBe(20);
    });

    it("should generate horses with valid condition scores", () => {
      const horses = generateHorses(20);

      horses.forEach((horse) => {
        expect(horse.condition).toBeGreaterThanOrEqual(1);
        expect(horse.condition).toBeLessThanOrEqual(100);
      });
    });

    it("should generate horses with unique colors", () => {
      const horses = generateHorses(20);
      const colors = horses.map((h) => h.color);
      const uniqueColors = new Set(colors);

      expect(uniqueColors.size).toBe(20);
    });

    it("should generate horses with names", () => {
      const horses = generateHorses(20);

      horses.forEach((horse) => {
        expect(horse.name).toBeTruthy();
        expect(typeof horse.name).toBe("string");
      });
    });
  });
});
