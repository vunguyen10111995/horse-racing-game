# Architecture Documentation

## Project Structure

```
horse-racing-game/
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css          # Global styles
│   ├── components/
│   │   ├── __tests__/            # Component tests
│   │   ├── ControlPanel.vue      # Game control buttons
│   │   ├── HorseList.vue         # Display all horses
│   │   ├── RaceSchedule.vue      # Show race schedule
│   │   ├── RaceTrack.vue         # Animated race visualization
│   │   └── RaceResults.vue       # Display race results
│   ├── models/
│   │   ├── __tests__/            # Model tests
│   │   ├── Horse.js              # Horse model and utilities
│   │   └── Race.js               # Race model and utilities
│   ├── store/
│   │   ├── modules/
│   │   │   ├── __tests__/        # Store module tests
│   │   │   ├── horses.js         # Horses state management
│   │   │   ├── races.js          # Races state management
│   │   │   └── game.js           # Game flow management
│   │   └── index.js              # Vuex store configuration
│   ├── App.vue                   # Root component
│   └── main.js                   # Application entry point
├── e2e/                          # End-to-end tests
├── index.html                    # HTML entry point
├── vite.config.js                # Vite configuration
├── vitest.config.js              # Vitest configuration
├── playwright.config.js          # Playwright configuration
└── package.json                  # Dependencies and scripts
```

## Design Patterns

### 1. State Management (Vuex)

The application uses Vuex for centralized state management with three main modules:

#### Horses Module

- **Responsibility**: Manage the pool of 20 horses
- **State**: All horses with their properties (id, name, color, condition)
- **Actions**: Initialize horses, update horse conditions

#### Races Module

- **Responsibility**: Handle race scheduling and execution
- **State**: Race schedule, current race, results
- **Actions**: Generate schedule, start races, simulate races

#### Game Module

- **Responsibility**: Control overall game flow
- **State**: Game status (idle, ready, racing, completed)
- **Actions**: Initialize game, coordinate race execution

### 2. Component-Based Architecture

Components are organized by responsibility:

#### Presentational Components

- `HorseList`: Displays horse information
- `RaceSchedule`: Shows upcoming races
- `RaceResults`: Displays completed race results

#### Container Components

- `ControlPanel`: Manages user interactions
- `RaceTrack`: Handles race animation logic

#### Root Component

- `App`: Orchestrates layout and initialization

### 3. Model Layer

Models encapsulate business logic:

#### Horse Model

```javascript
class Horse {
  - id: number
  - name: string
  - color: string
  - condition: number (1-100)
  + calculateSpeed(): number
}
```

#### Race Model

```javascript
class Race {
  - roundNumber: number
  - distance: number
  - horses: Horse[]
  - results: Result[]
  - status: 'pending' | 'running' | 'completed'
  + start(): void
  + complete(results): void
}
```

## Data Flow

### 1. Initialization Flow

```
User loads app
  → Game module initializes
  → Horses module generates 20 horses
  → UI displays horses
```

### 2. Schedule Generation Flow

```
User clicks "Generate Schedule"
  → Game module sets generating state
  → Races module generates 6 races
  → Each race gets 10 random horses
  → UI displays schedule
  → Game status changes to "ready"
```

### 3. Race Execution Flow

```
User clicks "Start Race"
  → Game module sets racing state
  → For each race (sequential):
    → Races module starts race
    → Race status changes to "running"
    → Animation begins (RaceTrack component)
    → Race simulation calculates results
    → Race status changes to "completed"
    → Results added to store
    → UI displays results
  → Game status changes to "completed"
```

## Key Features Implementation

### 1. Random Horse Selection

- Uses Fisher-Yates shuffle algorithm
- Ensures fair distribution across races
- Each race gets unique set of 10 horses

### 2. Race Simulation

- Speed calculation based on horse condition
- Random factor adds unpredictability
- Results sorted by completion time

### 3. Animation System

- CSS transitions for smooth movement
- JavaScript interval for position updates
- Responsive to different race distances

### 4. Responsive Design

- Mobile-first approach
- Breakpoints at 768px and 1024px
- Flexible grid layout
- Scrollable containers for overflow

## Testing Strategy

### Unit Tests (Vitest)

- Model logic testing
- Store mutations and actions
- Component rendering and interactions
- Isolated testing with mocks

### E2E Tests (Playwright)

- Full user workflow testing
- Cross-browser compatibility
- Mobile responsiveness
- Animation and timing verification

## Performance Considerations

### 1. Efficient Rendering

- Component-level reactivity
- Computed properties for derived state
- Minimal re-renders

### 2. Animation Performance

- CSS transforms for GPU acceleration
- RequestAnimationFrame for smooth updates
- Cleanup on component unmount

### 3. State Updates

- Batch mutations where possible
- Immutable state updates
- Namespaced modules prevent conflicts

## Scalability

### Easy Extensions

1. **Add More Horses**: Change `totalHorses` constant
2. **Modify Race Count**: Update `TOTAL_ROUNDS` constant
3. **Change Distances**: Modify `RACE_DISTANCES` array
4. **Add Features**:
   - Betting system
   - Horse statistics
   - Historical race data
   - Multiplayer mode

### Code Organization

- Clear separation of concerns
- Modular store structure
- Reusable components
- Testable business logic

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- ES2021+ features
- CSS Grid and Flexbox
- Responsive design for mobile devices
