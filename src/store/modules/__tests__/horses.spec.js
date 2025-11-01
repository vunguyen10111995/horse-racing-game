import { describe, it, expect, beforeEach } from "vitest";
import horses from "../horses";

describe("Horses Store Module", () => {
  let state;

  beforeEach(() => {
    state = horses.state();
  });

  describe("State", () => {
    it("should have initial state", () => {
      expect(state.allHorses).toEqual([]);
      expect(state.totalHorses).toBe(20);
    });
  });

  describe("Getters", () => {
    it("getAllHorses should return all horses", () => {
      const testHorses = [
        { id: 1, name: "Thunder", color: "#FF6B6B", condition: 85 },
        { id: 2, name: "Lightning", color: "#4ECDC4", condition: 90 },
      ];
      state.allHorses = testHorses;

      const result = horses.getters.getAllHorses(state);
      expect(result).toEqual(testHorses);
    });

    it("getHorseById should return correct horse", () => {
      const testHorses = [
        { id: 1, name: "Thunder", color: "#FF6B6B", condition: 85 },
        { id: 2, name: "Lightning", color: "#4ECDC4", condition: 90 },
      ];
      state.allHorses = testHorses;

      const result = horses.getters.getHorseById(state)(2);
      expect(result).toEqual(testHorses[1]);
    });

    it("getHorseById should return undefined for non-existent horse", () => {
      state.allHorses = [];

      const result = horses.getters.getHorseById(state)(999);
      expect(result).toBeUndefined();
    });

    it("getTotalHorses should return total horses count", () => {
      const result = horses.getters.getTotalHorses(state);
      expect(result).toBe(20);
    });
  });

  describe("Mutations", () => {
    it("SET_HORSES should set all horses", () => {
      const testHorses = [
        { id: 1, name: "Thunder", color: "#FF6B6B", condition: 85 },
      ];

      horses.mutations.SET_HORSES(state, testHorses);
      expect(state.allHorses).toEqual(testHorses);
    });

    it("UPDATE_HORSE_CONDITION should update horse condition", () => {
      state.allHorses = [
        { id: 1, name: "Thunder", color: "#FF6B6B", condition: 85 },
        { id: 2, name: "Lightning", color: "#4ECDC4", condition: 90 },
      ];

      horses.mutations.UPDATE_HORSE_CONDITION(state, {
        horseId: 1,
        condition: 95,
      });
      expect(state.allHorses[0].condition).toBe(95);
    });

    it("UPDATE_HORSE_CONDITION should not affect other horses", () => {
      state.allHorses = [
        { id: 1, name: "Thunder", color: "#FF6B6B", condition: 85 },
        { id: 2, name: "Lightning", color: "#4ECDC4", condition: 90 },
      ];

      horses.mutations.UPDATE_HORSE_CONDITION(state, {
        horseId: 1,
        condition: 95,
      });
      expect(state.allHorses[1].condition).toBe(90);
    });
  });

  describe("Actions", () => {
    it("initializeHorses should generate and commit horses", () => {
      const commit = vi.fn();
      const state = { totalHorses: 20 };

      horses.actions.initializeHorses({ commit, state });

      expect(commit).toHaveBeenCalledWith("SET_HORSES", expect.any(Array));
      const horsesArg = commit.mock.calls[0][1];
      expect(horsesArg).toHaveLength(20);
    });

    it("updateHorseCondition should commit update", () => {
      const commit = vi.fn();
      const payload = { horseId: 1, condition: 95 };

      horses.actions.updateHorseCondition({ commit }, payload);

      expect(commit).toHaveBeenCalledWith("UPDATE_HORSE_CONDITION", payload);
    });
  });
});
