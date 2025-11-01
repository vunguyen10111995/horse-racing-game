<template>
  <div class="race-track-container">
    <h2 class="section-title">🏇 Race Track</h2>

    <div v-if="!currentRace" class="empty-state">
      <p>No active race</p>
      <p class="hint">Generate schedule and start racing!</p>
    </div>

    <div v-else class="race-track">
      <div class="race-info">
        <div class="info-item">
          <span class="info-label">Round:</span>
          <span class="info-value"
            >{{ currentRace.roundNumber }} / {{ totalRounds }}</span
          >
        </div>
        <div class="info-item">
          <span class="info-label">Distance:</span>
          <span class="info-value">{{ currentRace.distance }}m</span>
        </div>
        <div class="info-item">
          <span class="info-label">Status:</span>
          <span class="info-value" :class="`status-${currentRace.status}`">
            {{ currentRace.status.toUpperCase() }}
          </span>
        </div>
      </div>

      <div class="track">
        <div class="track-lanes">
          <div
            v-for="(horse, index) in currentRace.horses"
            :key="horse.id"
            class="lane"
          >
            <div class="lane-number">{{ index + 1 }}</div>
            <div class="lane-track">
              <div class="finish-line"></div>
              <div
                class="horse-runner"
                :style="{
                  backgroundColor: horse.color,
                  left: `${getHorsePosition(horse.id)}%`,
                }"
              >
                <span class="horse-icon">🐴</span>
              </div>
            </div>
            <div class="lane-info">
              <div class="lane-horse-name">{{ horse.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, watch, onUnmounted } from "vue";
import { useStore } from "vuex";

export default {
  name: "RaceTrack",
  setup() {
    const store = useStore();

    const currentRace = computed(() => store.getters["races/getCurrentRace"]);
    const totalRounds = computed(
      () => store.getters["races/getSchedule"].length
    );
    const isPaused = computed(() => store.getters["game/isPaused"]);
    const horsePositions = ref({});
    let animationFrameId = null;

    // Define functions first
    const finishAnimation = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      // Set all horses to finish line
      if (currentRace.value) {
        currentRace.value.horses.forEach((horse) => {
          horsePositions.value[horse.id] = 100;
        });
      }
    };

    const startAnimation = () => {
      if (!currentRace.value) {
        return;
      }

      // Clear any existing animation first
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }

      // Initialize positions to 0 for all horses
      const initialPositions = {};
      currentRace.value.horses.forEach((horse) => {
        initialPositions[horse.id] = 0;
      });
      horsePositions.value = initialPositions;

      // Calculate animation speed based on race distance
      // Faster animation: fastest horse completes in 10-15 seconds
      const raceDistance = currentRace.value.distance;
      const targetDuration = 10000 + (raceDistance - 1200) * 5; // milliseconds (10-15s)
      const updateInterval = 50; // Target 50ms per update (20fps equivalent for smooth motion)
      const totalUpdates = targetDuration / updateInterval;
      const baseIncrement = 100 / totalUpdates;

      // Pre-calculate speed for each horse to avoid repeated lookups
      const horseSpeeds = {};
      currentRace.value.horses.forEach((horse) => {
        const horseData = store.getters["horses/getHorseById"](horse.id);
        horseSpeeds[horse.id] = horseData.calculateSpeed();
      });

      // Track last update time for consistent animation speed
      let lastUpdateTime = performance.now();

      // Animate horses using requestAnimationFrame
      const animate = (currentTime) => {
        // Check if paused
        if (isPaused.value) {
          lastUpdateTime = currentTime; // Update time to prevent jump when resumed
          animationFrameId = requestAnimationFrame(animate);
          return; // Skip this frame but keep animation running
        }

        if (!currentRace.value) {
          animationFrameId = null;
          return;
        }

        // Calculate time elapsed since last update
        const deltaTime = currentTime - lastUpdateTime;

        // Only update if enough time has passed (throttle to ~50ms updates)
        if (deltaTime >= updateInterval) {
          lastUpdateTime = currentTime - (deltaTime % updateInterval); // Carry over excess time

          let allFinished = true;
          const newPositions = { ...horsePositions.value };

          currentRace.value.horses.forEach((horse) => {
            const speed = horseSpeeds[horse.id];
            const incrementPerUpdate = baseIncrement * speed;

            if (newPositions[horse.id] < 100) {
              newPositions[horse.id] = Math.min(
                100,
                newPositions[horse.id] + incrementPerUpdate
              );
              allFinished = false;
            }
          });

          horsePositions.value = newPositions;

          if (allFinished) {
            animationFrameId = null;
            return;
          }
        }

        // Continue animation
        animationFrameId = requestAnimationFrame(animate);
      };

      // Start the animation
      animationFrameId = requestAnimationFrame(animate);
    };

    const getHorsePosition = (horseId) => {
      return horsePositions.value[horseId] || 0;
    };

    // Watch for race changes and status
    watch(
      () => ({
        race: currentRace.value,
        status: currentRace.value?.status,
        roundNumber: currentRace.value?.roundNumber,
      }),
      (newVal, oldVal) => {
        // If status changed to running, start animation
        if (newVal.status === "running" && oldVal?.status !== "running") {
          // Clear any existing animation first
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
          // Start animation immediately
          startAnimation();
        }
        // If status changed to completed, finish animation
        else if (
          newVal.status === "completed" &&
          oldVal?.status === "running"
        ) {
          finishAnimation();
        }
        // If round changed but race is pending, reset positions
        else if (
          newVal.roundNumber !== oldVal?.roundNumber &&
          newVal.status === "pending"
        ) {
          horsePositions.value = {};
        }
      },
      { immediate: true, deep: true }
    );

    onUnmounted(() => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    });

    return {
      currentRace,
      totalRounds,
      getHorsePosition,
    };
  },
};
</script>

<style scoped>
.race-track-container {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  min-height: 400px;
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

.race-info {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 8px;
  flex-wrap: wrap;
}

.info-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.info-label {
  font-weight: 600;
  color: #666;
}

.info-value {
  font-weight: 700;
  color: #333;
}

.status-pending {
  color: #6c757d;
}

.status-running {
  color: #ffc107;
  animation: pulse-text 1s ease-in-out infinite;
}

.status-completed {
  color: #28a745;
}

.track {
  background: linear-gradient(to bottom, #90ee90 0%, #228b22 100%);
  border-radius: 8px;
  padding: 1rem;
  overflow-x: auto;
}

.track-lanes {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 600px;
}

.lane {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.5rem;
  border-radius: 4px;
}

.lane-number {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  font-weight: 700;
  color: #333;
  flex-shrink: 0;
}

.lane-track {
  flex: 1;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  position: relative;
  overflow: hidden;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.finish-line {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: repeating-linear-gradient(
    45deg,
    #000,
    #000 5px,
    #fff 5px,
    #fff 10px
  );
}

.horse-runner {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.1s linear;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.horse-icon {
  font-size: 1.2rem;
}

.lane-info {
  width: 100px;
  flex-shrink: 0;
}

.lane-horse-name {
  font-weight: 600;
  color: white;
  font-size: 0.85rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

@keyframes pulse-text {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Responsive Design */
@media (max-width: 768px) {
  .race-track-container {
    padding: 1rem;
  }

  .race-info {
    gap: 1rem;
  }

  .track {
    padding: 0.5rem;
  }

  .track-lanes {
    min-width: 400px;
  }
}
</style>
