<template>
  <div class="control-panel">
    <button
      class="btn btn-generate"
      @click="handleGenerate"
      :disabled="!canGenerate || isGenerating"
    >
      <span v-if="isGenerating">Generating...</span>
      <span v-else>🎲 Generate Schedule</span>
    </button>

    <button
      class="btn btn-start"
      @click="handleStart"
      :disabled="!canStart || isRacing"
    >
      <span v-if="isRacing">Racing...</span>
      <span v-else>🏁 Start Race</span>
    </button>

    <button
      class="btn btn-pause"
      @click="handlePause"
      :disabled="!canPause"
      v-if="canPause"
    >
      <span>⏸️ Pause</span>
    </button>

    <button
      class="btn btn-resume"
      @click="handleResume"
      :disabled="!canResume"
      v-if="canResume"
    >
      <span>▶️ Resume</span>
    </button>

    <div class="status-indicator">
      <span class="status-label">Status:</span>
      <span class="status-value" :class="`status-${gameStatus}`">
        {{ getStatusText() }}
      </span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "ControlPanel",
  setup() {
    const store = useStore();

    const canGenerate = computed(() => store.getters["game/canGenerate"]);
    const canStart = computed(() => store.getters["game/canStart"]);
    const canPause = computed(() => store.getters["game/canPause"]);
    const canResume = computed(() => store.getters["game/canResume"]);
    const isGenerating = computed(() => store.getters["game/isGenerating"]);
    const isRacing = computed(() => store.getters["game/isRacing"]);
    const isPaused = computed(() => store.getters["game/isPaused"]);
    const gameStatus = computed(() => store.getters["game/getGameStatus"]);

    const handleGenerate = () => {
      store.dispatch("game/generateRaceSchedule");
    };

    const handleStart = () => {
      store.dispatch("game/startRacing");
    };

    const handlePause = () => {
      store.dispatch("game/pauseRacing");
    };

    const handleResume = () => {
      store.dispatch("game/resumeRacing");
    };

    const getStatusText = () => {
      const status = gameStatus.value;
      const statusMap = {
        idle: "Ready to Generate",
        ready: "Ready to Start",
        racing: "Racing in Progress",
        paused: "Race Paused",
        completed: "All Races Completed",
      };
      return statusMap[status] || status;
    };

    return {
      canGenerate,
      canStart,
      canPause,
      canResume,
      isGenerating,
      isRacing,
      isPaused,
      gameStatus,
      handleGenerate,
      handleStart,
      handlePause,
      handleResume,
      getStatusText,
    };
  },
};
</script>

<style scoped>
.control-panel {
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1.5rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-generate {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-generate:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-start {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.btn-start:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(245, 87, 108, 0.4);
}

.status-indicator {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.status-label {
  font-weight: 600;
  color: #666;
}

.status-value {
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
}

.status-idle {
  background: #e3f2fd;
  color: #1976d2;
}

.status-ready {
  background: #fff3e0;
  color: #f57c00;
}

.status-racing {
  background: #fce4ec;
  color: #c2185b;
  animation: pulse 1.5s ease-in-out infinite;
}

.status-paused {
  background: #fff9c4;
  color: #f57f17;
}

.status-completed {
  background: #e8f5e9;
  color: #388e3c;
}

.btn-pause {
  background: linear-gradient(135deg, #ffd89b 0%, #19547b 100%);
  color: white;
}

.btn-pause:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 216, 155, 0.4);
}

.btn-resume {
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  color: white;
}

.btn-resume:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(56, 239, 125, 0.4);
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .control-panel {
    flex-direction: column;
    padding: 1rem;
  }

  .btn {
    width: 100%;
  }

  .status-indicator {
    margin-left: 0;
    width: 100%;
    justify-content: center;
  }
}
</style>
