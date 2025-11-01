import { createStore } from "vuex";
import horses from "./modules/horses";
import races from "./modules/races";
import game from "./modules/game";

export default createStore({
  modules: {
    horses,
    races,
    game,
  },
  strict: process.env.NODE_ENV !== "production",
});
