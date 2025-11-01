import { describe, it, expect, beforeEach } from "vitest";
import {
  Race,
  generateRaceSchedule,
  RACE_DISTANCES,
  HORSES_PER_RACE,
  TOTAL_ROUNDS,
} from "../Race";
import { generateHorses } from "../Horse";

describe("Race Model", () => {
  describe("Race Class", () => {
    let testHorses;

    beforeEach(() => {
      testHorses = generateHorses(10);
    });

    it("should create a race with correct properties", () => {
      const race = new Race(1, 1200, testHorses);

      expect(race.roundNumber).toBe(1);
      expect(race.distance).toBe(1200);
      expect(race.horses).toEqual(testHorses);
      expect(race.results).toEqual([]);
      expect(race.status).toBe("pending");
      expect(race.startTime).toBeNull();
      expect(race.endTime).toBeNull();
    });

    it("should start a race", () => {
      const race = new Race(1, 1200, testHorses);
      race.start();

      expect(race.status).toBe("running");
      expect(race.startTime).toBeTruthy();
      expect(typeof race.startTime).toBe("number");
    });

    it("should complete a race with results", () => {
      const race = new Race(1, 1200, testHorses);
      const results = [
        { horseId: 1, position: 1, time: 100 },
        { horseId: 2, position: 2, time: 105 },
      ];

      race.complete(results);

      expect(race.status).toBe("completed");
      expect(race.endTime).toBeTruthy();
      expect(race.results).toEqual(results);
    });

    it("should check if race is completed", () => {
      const race = new Race(1, 1200, testHorses);

      expect(race.isCompleted()).toBe(false);

      race.complete([]);

      expect(race.isCompleted()).toBe(true);
    });

    it("should check if race is running", () => {
      const race = new Race(1, 1200, testHorses);

      expect(race.isRunning()).toBe(false);

      race.start();

      expect(race.isRunning()).toBe(true);
    });
  });

  describe("generateRaceSchedule", () => {
    let allHorses;

    beforeEach(() => {
      allHorses = generateHorses(20);
    });

    it("should generate correct number of races", () => {
      const schedule = generateRaceSchedule(allHorses);

      expect(schedule).toHaveLength(TOTAL_ROUNDS);
    });

    it("should generate races with correct distances", () => {
      const schedule = generateRaceSchedule(allHorses);

      schedule.forEach((race, index) => {
        expect(race.distance).toBe(RACE_DISTANCES[index]);
      });
    });

    it("should generate races with correct round numbers", () => {
      const schedule = generateRaceSchedule(allHorses);

      schedule.forEach((race, index) => {
        expect(race.roundNumber).toBe(index + 1);
      });
    });

    it("should generate races with correct number of horses", () => {
      const schedule = generateRaceSchedule(allHorses);

      schedule.forEach((race) => {
        expect(race.horses).toHaveLength(HORSES_PER_RACE);
      });
    });

    it("should generate races with horses from the pool", () => {
      const schedule = generateRaceSchedule(allHorses);
      const allHorseIds = allHorses.map((h) => h.id);

      schedule.forEach((race) => {
        race.horses.forEach((horse) => {
          expect(allHorseIds).toContain(horse.id);
        });
      });
    });

    it("should generate races with pending status", () => {
      const schedule = generateRaceSchedule(allHorses);

      schedule.forEach((race) => {
        expect(race.status).toBe("pending");
      });
    });

    it("should generate different horse selections for different races", () => {
      const schedule = generateRaceSchedule(allHorses);

      // Check that not all races have the same horses
      const firstRaceHorseIds = schedule[0].horses.map((h) => h.id).sort();
      let hasDifferentSelection = false;

      for (let i = 1; i < schedule.length; i++) {
        const currentRaceHorseIds = schedule[i].horses.map((h) => h.id).sort();
        if (
          JSON.stringify(firstRaceHorseIds) !==
          JSON.stringify(currentRaceHorseIds)
        ) {
          hasDifferentSelection = true;
          break;
        }
      }

      expect(hasDifferentSelection).toBe(true);
    });
  });

  describe("Constants", () => {
    it("should have correct race distances", () => {
      expect(RACE_DISTANCES).toEqual([1200, 1400, 1600, 1800, 2000, 2200]);
    });

    it("should have correct horses per race", () => {
      expect(HORSES_PER_RACE).toBe(10);
    });

    it("should have correct total rounds", () => {
      expect(TOTAL_ROUNDS).toBe(6);
    });
  });
});
