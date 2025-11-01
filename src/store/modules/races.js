import { generateRaceSchedule } from "@/models/Race";

const state = () => ({
  schedule: [],
  currentRaceIndex: -1,
  allResults: [],
});

const getters = {
  getSchedule: (state) => state.schedule,
  getCurrentRace: (state) => {
    if (
      state.currentRaceIndex >= 0 &&
      state.currentRaceIndex < state.schedule.length
    ) {
      return state.schedule[state.currentRaceIndex];
    }
    return null;
  },
  getCurrentRaceIndex: (state) => state.currentRaceIndex,
  getAllResults: (state) => state.allResults,
  hasSchedule: (state) => state.schedule.length > 0,
  isAllRacesCompleted: (state) => {
    return (
      state.schedule.length > 0 &&
      state.schedule.every((race) => race.status === "completed")
    );
  },
  getCompletedRacesCount: (state) => {
    return state.schedule.filter((race) => race.status === "completed").length;
  },
};

const mutations = {
  SET_SCHEDULE(state, schedule) {
    state.schedule = schedule;
    state.currentRaceIndex = -1;
    state.allResults = [];
  },
  SET_CURRENT_RACE_INDEX(state, index) {
    state.currentRaceIndex = index;
  },
  START_RACE(state, raceIndex) {
    if (state.schedule[raceIndex]) {
      state.schedule[raceIndex].start();
      // Force Vue reactivity by creating a new array reference
      state.schedule = [...state.schedule];
    }
  },
  COMPLETE_RACE(state, { raceIndex, results }) {
    if (state.schedule[raceIndex]) {
      state.schedule[raceIndex].complete(results);
      state.allResults.push({
        roundNumber: state.schedule[raceIndex].roundNumber,
        distance: state.schedule[raceIndex].distance,
        results: results,
      });
    }
  },
  RESET_RACES(state) {
    state.schedule = [];
    state.currentRaceIndex = -1;
    state.allResults = [];
  },
};

const actions = {
  /**
   * Generate race schedule
   */
  generateSchedule({ commit, rootGetters }) {
    const allHorses = rootGetters["horses/getAllHorses"];
    const schedule = generateRaceSchedule(allHorses);
    commit("SET_SCHEDULE", schedule);
  },

  /**
   * Start the next race in the schedule
   */
  startNextRace({ state, commit, dispatch }) {
    const nextIndex = state.currentRaceIndex + 1;

    if (nextIndex < state.schedule.length) {
      commit("SET_CURRENT_RACE_INDEX", nextIndex);
      commit("START_RACE", nextIndex);

      // Simulate the race
      dispatch("simulateRace", nextIndex);
    }
  },

  /**
   * Simulate a race and generate results
   */
  async simulateRace({ state, commit, rootGetters }, raceIndex) {
    const race = state.schedule[raceIndex];
    if (!race) return;

    return new Promise((resolve) => {
      // Simulate race results
      const results = race.horses.map((horse) => {
        const horseData = rootGetters["horses/getHorseById"](horse.id);
        const speed = horseData.calculateSpeed();
        const time = (race.distance / speed) * (1 + Math.random() * 0.2);

        return {
          horseId: horse.id,
          horseName: horse.name,
          horseColor: horse.color,
          time: time,
          position: 0,
          speed: speed,
        };
      });

      // Sort by time and assign positions
      results.sort((a, b) => a.time - b.time);
      results.forEach((result, index) => {
        result.position = index + 1;
      });

      // Calculate duration based on the SLOWEST horse (not fastest)
      // This ensures all horses complete the race before moving to next round
      const slowestTime = Math.max(...results.map((r) => r.time));
      const fastestTime = Math.min(...results.map((r) => r.time));

      // Base duration for fastest horse - faster animation (10-15 seconds)
      const baseDuration = 10000 + (race.distance - 1200) * 5; // milliseconds

      // Calculate actual duration to wait for slowest horse
      // Cap the multiplier to prevent extremely long waits (max 1.5x difference)
      // This prevents races from taking too long when condition differences are huge
      const durationMultiplier = Math.min(slowestTime / fastestTime, 1.5);
      const actualDuration = baseDuration * durationMultiplier;

      console.log("Race duration calculation:", {
        distance: race.distance,
        baseDuration,
        fastestTime,
        slowestTime,
        rawMultiplier: slowestTime / fastestTime,
        cappedMultiplier: durationMultiplier,
        actualDuration,
      });

      // Wait for all horses to complete (slowest horse)
      setTimeout(() => {
        commit("COMPLETE_RACE", { raceIndex, results });
        resolve(results);
      }, actualDuration);
    });
  },

  /**
   * Reset all races
   */
  resetRaces({ commit }) {
    commit("RESET_RACES");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
