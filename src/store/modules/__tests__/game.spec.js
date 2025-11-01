import { describe, it, expect, beforeEach } from "vitest";
import game from "../game";

describe("Game Store Module", () => {
  let state;

  beforeEach(() => {
    state = game.state();
  });

  describe("State", () => {
    it("should have initial state", () => {
      expect(state.gameStatus).toBe("idle");
      expect(state.isGenerating).toBe(false);
      expect(state.isRacing).toBe(false);
    });
  });

  describe("Getters", () => {
    it("getGameStatus should return game status", () => {
      state.gameStatus = "racing";
      const result = game.getters.getGameStatus(state);
      expect(result).toBe("racing");
    });

    it("isGenerating should return generating state", () => {
      state.isGenerating = true;
      const result = game.getters.isGenerating(state);
      expect(result).toBe(true);
    });

    it("isRacing should return racing state", () => {
      state.isRacing = true;
      const result = game.getters.isRacing(state);
      expect(result).toBe(true);
    });

    it("canGenerate should return true when idle", () => {
      state.gameStatus = "idle";
      const result = game.getters.canGenerate(state);
      expect(result).toBe(true);
    });

    it("canGenerate should return true when completed", () => {
      state.gameStatus = "completed";
      const result = game.getters.canGenerate(state);
      expect(result).toBe(true);
    });

    it("canGenerate should return false when racing", () => {
      state.gameStatus = "racing";
      const result = game.getters.canGenerate(state);
      expect(result).toBe(false);
    });

    it("canStart should return true when ready and has schedule", () => {
      state.gameStatus = "ready";
      state.isRacing = false;
      const rootGetters = {
        "races/hasSchedule": true,
      };
      const result = game.getters.canStart(state, {}, {}, rootGetters);
      expect(result).toBe(true);
    });

    it("canStart should return false when racing", () => {
      state.gameStatus = "ready";
      state.isRacing = true;
      const rootGetters = {
        "races/hasSchedule": true,
      };
      const result = game.getters.canStart(state, {}, {}, rootGetters);
      expect(result).toBe(false);
    });
  });

  describe("Mutations", () => {
    it("SET_GAME_STATUS should set game status", () => {
      game.mutations.SET_GAME_STATUS(state, "racing");
      expect(state.gameStatus).toBe("racing");
    });

    it("SET_GENERATING should set generating state", () => {
      game.mutations.SET_GENERATING(state, true);
      expect(state.isGenerating).toBe(true);
    });

    it("SET_RACING should set racing state", () => {
      game.mutations.SET_RACING(state, true);
      expect(state.isRacing).toBe(true);
    });
  });

  describe("Actions", () => {
    it("initializeGame should dispatch horses initialization", async () => {
      const dispatch = vi.fn();
      const commit = vi.fn();

      await game.actions.initializeGame({ dispatch, commit });

      expect(commit).toHaveBeenCalledWith("SET_GAME_STATUS", "idle");
      expect(dispatch).toHaveBeenCalledWith("horses/initializeHorses", null, {
        root: true,
      });
    });

    it("generateRaceSchedule should set generating state", async () => {
      const dispatch = vi.fn();
      const commit = vi.fn();

      await game.actions.generateRaceSchedule({ dispatch, commit });

      expect(commit).toHaveBeenCalledWith("SET_GENERATING", true);
      expect(commit).toHaveBeenCalledWith("SET_GENERATING", false);
      expect(commit).toHaveBeenCalledWith("SET_GAME_STATUS", "ready");
    });

    it("resetGame should reset state", async () => {
      const dispatch = vi.fn();
      const commit = vi.fn();

      await game.actions.resetGame({ dispatch, commit });

      expect(commit).toHaveBeenCalledWith("SET_RACING", false);
      expect(dispatch).toHaveBeenCalledWith("races/resetRaces", null, {
        root: true,
      });
      expect(commit).toHaveBeenCalledWith("SET_GAME_STATUS", "idle");
    });
  });
});
