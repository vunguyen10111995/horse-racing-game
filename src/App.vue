<template>
  <div
    id="app"
    class="app-container"
  >
    <header class="app-header">
      <h1>🐴 Horse Racing Game</h1>
      <p class="subtitle">
        Experience the thrill of the race!
      </p>
    </header>

    <main class="app-main">
      <ControlPanel />

      <div class="game-content">
        <div class="left-panel">
          <HorseList />
          <RaceSchedule />
        </div>

        <div class="right-panel">
          <RaceTrack />
          <RaceResults />
        </div>
      </div>
    </main>

    <footer class="app-footer">
      <p>Built with Vue.js & Vuex | {{ new Date().getFullYear() }}</p>
    </footer>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import ControlPanel from "./components/ControlPanel.vue";
import HorseList from "./components/HorseList.vue";
import RaceSchedule from "./components/RaceSchedule.vue";
import RaceTrack from "./components/RaceTrack.vue";
import RaceResults from "./components/RaceResults.vue";

export default {
  name: "App",
  components: {
    ControlPanel,
    HorseList,
    RaceSchedule,
    RaceTrack,
    RaceResults,
  },
  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("game/initializeGame");
    });

    return {};
  },
};
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.app-header {
  text-align: center;
  padding: 2rem 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
}

.app-header h1 {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.subtitle {
  margin: 0.5rem 0 0 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.app-main {
  flex: 1;
  padding: 1rem;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
}

.game-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 1rem;
  margin-top: 1rem;
}

.left-panel,
.right-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.app-footer {
  text-align: center;
  padding: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.2);
  font-size: 0.9rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .game-content {
    grid-template-columns: 1fr;
  }

  .left-panel {
    order: 2;
  }

  .right-panel {
    order: 1;
  }
}

@media (max-width: 768px) {
  .app-header h1 {
    font-size: 1.8rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .app-main {
    padding: 0.5rem;
  }
}
</style>
