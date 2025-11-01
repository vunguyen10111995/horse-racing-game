<template>
  <div class="horse-list-container">
    <h2 class="section-title">
      🐴 Available Horses ({{ horses.length }})
    </h2>

    <div class="horse-list">
      <div
        v-for="horse in horses"
        :key="horse.id"
        class="horse-item"
      >
        <div
          class="horse-color"
          :style="{ backgroundColor: horse.color }"
        />
        <div class="horse-info">
          <div class="horse-name">
            {{ horse.name }}
          </div>
          <div class="horse-id">
            Horse #{{ horse.id }}
          </div>
        </div>
        <div class="horse-condition">
          <div class="condition-label">
            Condition
          </div>
          <div class="condition-bar">
            <div
              class="condition-fill"
              :style="{
                width: `${horse.condition}%`,
                backgroundColor: getConditionColor(horse.condition),
              }"
            />
          </div>
          <div class="condition-value">
            {{ horse.condition }}
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
  name: "HorseList",
  setup() {
    const store = useStore();

    const horses = computed(() => store.getters["horses/getAllHorses"]);

    const getConditionColor = (condition) => {
      if (condition >= 80) return "#4caf50";
      if (condition >= 60) return "#8bc34a";
      if (condition >= 40) return "#ffc107";
      if (condition >= 20) return "#ff9800";
      return "#f44336";
    };

    return {
      horses,
      getConditionColor,
    };
  },
};
</script>

<style scoped>
.horse-list-container {
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

.horse-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 500px;
  overflow-y: auto;
}

.horse-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.horse-item:hover {
  background: #e9ecef;
  transform: translateX(4px);
}

.horse-color {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.horse-info {
  flex-shrink: 0;
  min-width: 100px;
}

.horse-name {
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.horse-id {
  font-size: 0.8rem;
  color: #666;
}

.horse-condition {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 0;
}

.condition-label {
  font-size: 0.8rem;
  color: #666;
  white-space: nowrap;
}

.condition-bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  min-width: 60px;
}

.condition-fill {
  height: 100%;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.condition-value {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
  min-width: 30px;
  text-align: right;
}

/* Scrollbar Styling */
.horse-list::-webkit-scrollbar {
  width: 8px;
}

.horse-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.horse-list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.horse-list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* Responsive Design */
@media (max-width: 768px) {
  .horse-list-container {
    padding: 1rem;
  }

  .horse-item {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .horse-condition {
    width: 100%;
    margin-top: 0.5rem;
  }
}
</style>
