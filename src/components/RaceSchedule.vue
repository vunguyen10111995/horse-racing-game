<template>
  <div class="race-schedule-container">
    <h2 class="section-title">
      📅 Race Schedule
    </h2>

    <div
      v-if="!hasSchedule"
      class="empty-state"
    >
      <p>No schedule generated yet.</p>
      <p class="hint">
        Click "Generate Schedule" to begin!
      </p>
    </div>

    <div
      v-else
      class="schedule-list"
    >
      <div
        v-for="race in schedule"
        :key="race.roundNumber"
        class="race-card"
        :class="{
          'race-pending': race.status === 'pending',
          'race-running': race.status === 'running',
          'race-completed': race.status === 'completed',
        }"
      >
        <div class="race-header">
          <div class="race-round">
            Round {{ race.roundNumber }}
          </div>
          <div class="race-distance">
            {{ race.distance }}m
          </div>
          <div class="race-status">
            <span v-if="race.status === 'pending'">⏳</span>
            <span v-else-if="race.status === 'running'">🏃</span>
            <span v-else>✅</span>
          </div>
        </div>

        <div class="race-horses">
          <div class="horses-label">
            Horses:
          </div>
          <div class="horses-colors">
            <div
              v-for="horse in race.horses"
              :key="horse.id"
              class="horse-color-dot"
              :style="{ backgroundColor: horse.color }"
              :title="horse.name"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "RaceSchedule",
  setup() {
    const store = useStore();

    const schedule = computed(() => store.getters["races/getSchedule"]);
    const hasSchedule = computed(() => store.getters["races/hasSchedule"]);

    return {
      schedule,
      hasSchedule,
    };
  },
};
</script>

<style scoped>
.race-schedule-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.section-title {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 2rem;
  color: #666;
}

.empty-state p {
  margin: 0.5rem 0;
}

.hint {
  font-size: 0.9rem;
  color: #999;
}

.schedule-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 400px;
  overflow-y: auto;
}

.race-card {
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.race-pending {
  background: #f8f9fa;
  border-color: #dee2e6;
}

.race-running {
  background: #fff3cd;
  border-color: #ffc107;
  animation: pulse-border 1.5s ease-in-out infinite;
}

.race-completed {
  background: #d4edda;
  border-color: #28a745;
}

.race-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.75rem;
}

.race-round {
  font-weight: 700;
  font-size: 1.1rem;
  color: #333;
}

.race-distance {
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.race-status {
  margin-left: auto;
  font-size: 1.5rem;
}

.race-horses {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.horses-label {
  font-size: 0.85rem;
  color: #666;
  font-weight: 600;
}

.horses-colors {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
}

.horse-color-dot {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease;
}

.horse-color-dot:hover {
  transform: scale(1.2);
}

@keyframes pulse-border {
  0%,
  100% {
    border-color: #ffc107;
  }
  50% {
    border-color: #ff9800;
  }
}

/* Scrollbar Styling */
.schedule-list::-webkit-scrollbar {
  width: 8px;
}

.schedule-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.schedule-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.schedule-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .race-schedule-container {
    padding: 1rem;
  }

  .race-header {
    flex-wrap: wrap;
  }
}
</style>
