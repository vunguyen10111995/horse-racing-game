<template>
  <div class="race-results-container">
    <h2 class="section-title">🏆 Race Results</h2>

    <div v-if="allResults.length === 0" class="empty-state">
      <p>No results yet</p>
      <p class="hint">Results will appear as races complete!</p>
    </div>

    <div v-else class="results-list">
      <div
        v-for="result in allResults"
        :key="result.roundNumber"
        class="result-card"
      >
        <div class="result-header">
          <h3>Round {{ result.roundNumber }}</h3>
          <span class="result-distance">{{ result.distance }}m</span>
        </div>

        <div class="result-podium">
          <div
            v-for="(position, index) in result.results.slice(0, 3)"
            :key="position.horseId"
            class="podium-item"
            :class="`position-${index + 1}`"
          >
            <div class="medal">
              <span v-if="index === 0">🥇</span>
              <span v-else-if="index === 1">🥈</span>
              <span v-else>🥉</span>
            </div>
            <div
              class="podium-horse-color"
              :style="{ backgroundColor: position.horseColor }"
            ></div>
            <div class="podium-info">
              <div class="podium-name">{{ position.horseName }}</div>
              <div class="podium-time">{{ formatTime(position.time) }}s</div>
            </div>
          </div>
        </div>

        <details class="full-results">
          <summary>View All Results</summary>
          <div class="results-table">
            <div class="table-header">
              <div class="col-pos">Pos</div>
              <div class="col-horse">Horse</div>
              <div class="col-time">Time</div>
            </div>
            <div
              v-for="position in result.results"
              :key="position.horseId"
              class="table-row"
            >
              <div class="col-pos">{{ position.position }}</div>
              <div class="col-horse">
                <div
                  class="horse-color-small"
                  :style="{ backgroundColor: position.horseColor }"
                ></div>
                {{ position.horseName }}
              </div>
              <div class="col-time">{{ formatTime(position.time) }}s</div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "RaceResults",
  setup() {
    const store = useStore();

    const allResults = computed(() => store.getters["races/getAllResults"]);

    const formatTime = (time) => {
      return time.toFixed(2);
    };

    return {
      allResults,
      formatTime,
    };
  },
};
</script>

<style scoped>
.race-results-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 300px;
}

.section-title {
  margin: 0 0 1rem 0;
  font-size: 1.3rem;
  color: #333;
}

.empty-state {
  text-align: center;
  padding: 3rem 2rem;
  color: #666;
}

.empty-state p {
  margin: 0.5rem 0;
}

.hint {
  font-size: 0.9rem;
  color: #999;
}

.results-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 600px;
  overflow-y: auto;
}

.result-card {
  padding: 1.5rem;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
}

.result-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.result-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.2rem;
}

.result-distance {
  padding: 0.25rem 0.75rem;
  background: #667eea;
  color: white;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.result-podium {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.podium-item {
  flex: 1;
  min-width: 150px;
  padding: 1rem;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.position-1 {
  border-top: 3px solid #ffd700;
}

.position-2 {
  border-top: 3px solid #c0c0c0;
}

.position-3 {
  border-top: 3px solid #cd7f32;
}

.medal {
  font-size: 2rem;
}

.podium-horse-color {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.podium-info {
  text-align: center;
}

.podium-name {
  font-weight: 700;
  color: #333;
  margin-bottom: 0.25rem;
}

.podium-time {
  font-size: 0.9rem;
  color: #666;
}

.full-results {
  margin-top: 1rem;
}

.full-results summary {
  cursor: pointer;
  font-weight: 600;
  color: #667eea;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background 0.2s ease;
}

.full-results summary:hover {
  background: rgba(102, 126, 234, 0.1);
}

.results-table {
  margin-top: 1rem;
  background: white;
  border-radius: 4px;
  overflow: hidden;
}

.table-header,
.table-row {
  display: grid;
  grid-template-columns: 60px 1fr 100px;
  padding: 0.75rem;
  gap: 1rem;
  align-items: center;
}

.table-header {
  background: #667eea;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
}

.table-row {
  border-bottom: 1px solid #e9ecef;
}

.table-row:last-child {
  border-bottom: none;
}

.table-row:hover {
  background: #f8f9fa;
}

.col-horse {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.horse-color-small {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.col-pos {
  font-weight: 700;
  text-align: center;
}

.col-time {
  text-align: right;
  font-weight: 600;
}

/* Scrollbar Styling */
.results-list::-webkit-scrollbar {
  width: 8px;
}

.results-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.results-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.results-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .race-results-container {
    padding: 1rem;
  }

  .result-podium {
    flex-direction: column;
  }

  .podium-item {
    min-width: 100%;
  }

  .table-header,
  .table-row {
    grid-template-columns: 50px 1fr 80px;
    gap: 0.5rem;
    padding: 0.5rem;
  }
}
</style>
