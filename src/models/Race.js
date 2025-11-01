/**
 * Race Model
 * Represents a single race round with distance, participating horses, and results
 */
export class Race {
  constructor(roundNumber, distance, horses = []) {
    this.roundNumber = roundNumber;
    this.distance = distance;
    this.horses = horses;
    this.results = [];
    this.status = "pending"; // pending, running, completed
    this.startTime = null;
    this.endTime = null;
  }

  /**
   * Start the race
   */
  start() {
    this.status = "running";
    this.startTime = Date.now();
  }

  /**
   * Complete the race with results
   * @param {Array} results - Array of {horseId, position, time}
   */
  complete(results) {
    this.status = "completed";
    this.endTime = Date.now();
    this.results = results;
  }

  /**
   * Check if race is completed
   */
  isCompleted() {
    return this.status === "completed";
  }

  /**
   * Check if race is running
   */
  isRunning() {
    return this.status === "running";
  }
}

/**
 * Race distances for each round
 */
export const RACE_DISTANCES = [1200, 1400, 1600, 1800, 2000, 2200];

/**
 * Number of horses per race
 */
export const HORSES_PER_RACE = 10;

/**
 * Total number of rounds
 */
export const TOTAL_ROUNDS = 6;

/**
 * Generate race schedule
 * @param {Array} allHorses - All available horses
 * @returns {Race[]} Array of Race instances
 */
export function generateRaceSchedule(allHorses) {
  const races = [];

  for (let round = 0; round < TOTAL_ROUNDS; round++) {
    const distance = RACE_DISTANCES[round];

    // Select 10 random horses for this race
    const selectedHorses = selectRandomHorses(allHorses, HORSES_PER_RACE);

    races.push(new Race(round + 1, distance, selectedHorses));
  }

  return races;
}

/**
 * Select random horses from the pool
 * @param {Array} horses - Pool of horses
 * @param {number} count - Number of horses to select
 * @returns {Array} Selected horses
 */
function selectRandomHorses(horses, count) {
  const shuffled = [...horses].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
