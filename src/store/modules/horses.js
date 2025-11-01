import { generateHorses } from "@/models/Horse";

const state = () => ({
  allHorses: [],
  totalHorses: 20,
});

const getters = {
  getAllHorses: (state) => state.allHorses,
  getHorseById: (state) => (id) => {
    return state.allHorses.find((horse) => horse.id === id);
  },
  getTotalHorses: (state) => state.totalHorses,
};

const mutations = {
  SET_HORSES(state, horses) {
    state.allHorses = horses;
  },
  UPDATE_HORSE_CONDITION(state, { horseId, condition }) {
    const horse = state.allHorses.find((h) => h.id === horseId);
    if (horse) {
      horse.condition = condition;
    }
  },
};

const actions = {
  /**
   * Initialize horses for the game
   */
  initializeHorses({ commit, state }) {
    const horses = generateHorses(state.totalHorses);
    commit("SET_HORSES", horses);
  },

  /**
   * Update a horse's condition
   */
  updateHorseCondition({ commit }, payload) {
    commit("UPDATE_HORSE_CONDITION", payload);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
