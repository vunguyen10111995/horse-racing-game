/**
 * Horse Model
 * Represents a racing horse with unique properties
 */
export class Horse {
  constructor(id, name, color, condition) {
    this.id = id;
    this.name = name;
    this.color = color;
    this.condition = condition; // 1-100
  }

  /**
   * Calculate horse speed based on condition
   * Higher condition = faster speed
   * Speed is normalized to prevent extreme differences
   */
  calculateSpeed() {
    // Normalize condition to a smaller range (0.5 to 1.0)
    // This prevents horses with low condition from being too slow
    const normalizedCondition = 0.5 + (this.condition / 100) * 0.5;

    // Add smaller random factor for variety (0.9 to 1.1)
    const randomFactor = 0.9 + Math.random() * 0.2;

    return normalizedCondition * randomFactor;
  }
}

/**
 * Generate a list of horses with unique properties
 * @param {number} count - Number of horses to generate
 * @returns {Horse[]} Array of Horse instances
 */
export function generateHorses(count = 20) {
  const colors = [
    "#FF6B6B",
    "#4ECDC4",
    "#45B7D1",
    "#FFA07A",
    "#98D8C8",
    "#F7DC6F",
    "#BB8FCE",
    "#85C1E2",
    "#F8B739",
    "#52B788",
    "#E63946",
    "#A8DADC",
    "#457B9D",
    "#F1FAEE",
    "#E76F51",
    "#264653",
    "#2A9D8F",
    "#E9C46A",
    "#F4A261",
    "#6C5CE7",
  ];

  const horseNames = [
    "Thunder",
    "Lightning",
    "Storm",
    "Blaze",
    "Spirit",
    "Shadow",
    "Comet",
    "Star",
    "Phoenix",
    "Apollo",
    "Zeus",
    "Atlas",
    "Titan",
    "Neptune",
    "Mercury",
    "Pegasus",
    "Orion",
    "Flash",
    "Rocket",
    "Dash",
  ];

  return Array.from({ length: count }, (_, index) => {
    const condition = Math.floor(Math.random() * 100) + 1;
    return new Horse(index + 1, horseNames[index], colors[index], condition);
  });
}
