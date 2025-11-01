const state = () => ({
  gameStatus: "idle", // idle, ready, racing, paused, completed
  isGenerating: false,
  isRacing: false,
  isPaused: false,
});

const getters = {
  getGameStatus: (state) => state.gameStatus,
  isGenerating: (state) => state.isGenerating,
  isRacing: (state) => state.isRacing,
  isPaused: (state) => state.isPaused,
  canGenerate: (state) =>
    state.gameStatus === "idle" || state.gameStatus === "completed",
  canStart: (state, getters, rootState, rootGetters) => {
    return (
      state.gameStatus === "ready" &&
      !state.isRacing &&
      rootGetters["races/hasSchedule"]
    );
  },
  canPause: (state) => state.isRacing && !state.isPaused,
  canResume: (state) => state.isRacing && state.isPaused,
};

const mutations = {
  SET_GAME_STATUS(state, status) {
    state.gameStatus = status;
  },
  SET_GENERATING(state, isGenerating) {
    state.isGenerating = isGenerating;
  },
  SET_RACING(state, isRacing) {
    state.isRacing = isRacing;
  },
  SET_PAUSED(state, isPaused) {
    state.isPaused = isPaused;
  },
};

const actions = {
  /**
   * Initialize the game
   */
  async initializeGame({ dispatch, commit }) {
    commit("SET_GAME_STATUS", "idle");
    await dispatch("horses/initializeHorses", null, { root: true });
  },

  /**
   * Generate race schedule
   */
  async generateRaceSchedule({ dispatch, commit }) {
    commit("SET_GENERATING", true);

    try {
      // Reset previous races if any
      await dispatch("races/resetRaces", null, { root: true });

      // Generate new schedule
      await dispatch("races/generateSchedule", null, { root: true });

      commit("SET_GAME_STATUS", "ready");
    } finally {
      commit("SET_GENERATING", false);
    }
  },

  /**
   * Start racing
   */
  async startRacing({ dispatch, commit, rootGetters, state }) {
    commit("SET_RACING", true);
    commit("SET_PAUSED", false);
    commit("SET_GAME_STATUS", "racing");

    const totalRounds = rootGetters["races/getSchedule"].length;

    // Run races sequentially
    for (let i = 0; i < totalRounds; i++) {
      // Check if paused before starting next race
      while (state.isPaused) {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }

      await dispatch("races/startNextRace", null, { root: true });

      // Wait for current race to complete
      await new Promise((resolve) => {
        const checkInterval = setInterval(() => {
          const currentRace = rootGetters["races/getCurrentRace"];
          if (currentRace && currentRace.isCompleted()) {
            clearInterval(checkInterval);
            resolve();
          }
        }, 100);
      });

      // Add a small delay before starting the next race (except after the last race)
      if (i < totalRounds - 1) {
        await new Promise((resolve) => setTimeout(resolve, 500));
      }
    }

    commit("SET_RACING", false);
    commit("SET_PAUSED", false);
    commit("SET_GAME_STATUS", "completed");
  },

  /**
   * Pause racing
   */
  pauseRacing({ commit }) {
    commit("SET_PAUSED", true);
    commit("SET_GAME_STATUS", "paused");
  },

  /**
   * Resume racing
   */
  resumeRacing({ commit }) {
    commit("SET_PAUSED", false);
    commit("SET_GAME_STATUS", "racing");
  },

  /**
   * Reset the game
   */
  async resetGame({ dispatch, commit }) {
    commit("SET_RACING", false);
    commit("SET_PAUSED", false);
    await dispatch("races/resetRaces", null, { root: true });
    commit("SET_GAME_STATUS", "idle");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
