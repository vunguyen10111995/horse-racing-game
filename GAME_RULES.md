# Horse Racing Game - Rules and Specifications

## Game Overview

An interactive horse racing simulation where players can generate race schedules and watch animated races unfold in real-time.

## Core Rules

### Horses

1. **Total Horses**: 20 horses available for racing
2. **Horse Properties**:

   - **Unique ID**: 1-20
   - **Name**: Unique name (Thunder, Lightning, Storm, etc.)
   - **Color**: Unique color for visual identification
   - **Condition**: Score from 1-100 affecting performance

3. **Condition Score Impact**:
   - Higher condition = Better performance
   - Affects horse speed during races
   - Randomness factor ensures unpredictability

### Race Structure

1. **Total Rounds**: 6 rounds per game
2. **Horses Per Race**: 10 horses randomly selected
3. **Race Distances**:
   - Round 1: 1200 meters
   - Round 2: 1400 meters
   - Round 3: 1600 meters
   - Round 4: 1800 meters
   - Round 5: 2000 meters
   - Round 6: 2200 meters

### Race Execution

1. **Sequential Racing**: Races run one at a time
2. **Random Selection**: Each race gets 10 random horses from the pool of 20
3. **Speed Calculation**:

   - Base speed = condition / 100
   - Random factor = 0.8 to 1.2
   - Final speed = base speed × random factor

4. **Race Duration**: Varies based on distance
   - Longer distances = longer race time
   - Horse speed affects completion time

## Game Flow

### 1. Initialization Phase

- Application loads
- 20 horses are generated with random conditions
- All horses displayed in the horse list
- Game status: "Ready to Generate"

### 2. Schedule Generation Phase

- Player clicks "Generate Schedule" button
- System creates 6 races with specified distances
- Each race assigned 10 random horses
- Schedule displayed showing all races
- Game status: "Ready to Start"

### 3. Racing Phase

- Player clicks "Start Race" button
- Races execute sequentially (Round 1 → Round 6)
- For each race:
  - Race status changes to "Running"
  - Horses animate across the track
  - Results calculated based on speed and randomness
  - Race status changes to "Completed"
  - Results displayed immediately
- Game status: "Racing in Progress"

### 4. Completion Phase

- All 6 races completed
- Full results available for review
- Game status: "All Races Completed"
- Player can generate new schedule to play again

## Results and Scoring

### Race Results Include:

1. **Position**: 1st through 10th place
2. **Horse Information**: Name and color
3. **Completion Time**: Time taken to finish race
4. **Podium Display**: Top 3 horses highlighted with medals
   - 🥇 1st Place: Gold
   - 🥈 2nd Place: Silver
   - 🥉 3rd Place: Bronze

### Results Display:

- **Immediate**: Results appear as each race completes
- **Sequential**: Results stack in order of race completion
- **Detailed View**: Expandable full results showing all 10 positions
- **Persistent**: All results remain visible throughout game

## Visual Indicators

### Race Status:

- ⏳ **Pending**: Race not yet started
- 🏃 **Running**: Race in progress
- ✅ **Completed**: Race finished

### Horse Display:

- **Color Circle**: Visual identifier for each horse
- **Condition Bar**: Visual representation of condition score
- **Color-coded Conditions**:
  - Green (80-100): Excellent condition
  - Light Green (60-79): Good condition
  - Yellow (40-59): Average condition
  - Orange (20-39): Poor condition
  - Red (1-19): Very poor condition

### Game Status:

- 🎲 **Ready to Generate**: Initial state or after completion
- 🏁 **Ready to Start**: Schedule generated, ready to race
- 🏇 **Racing in Progress**: Races currently running
- 🏆 **All Races Completed**: All races finished

## User Interactions

### Available Actions:

1. **Generate Schedule**

   - Available when: Game is idle or completed
   - Effect: Creates new race schedule
   - Resets: Previous races and results

2. **Start Race**

   - Available when: Schedule is generated and not racing
   - Effect: Begins sequential race execution
   - Cannot be stopped once started

3. **View Results**
   - Available when: Races are completing
   - Effect: Shows detailed race outcomes
   - Expandable: Click to see all positions

## Technical Specifications

### Performance Characteristics:

1. **Speed Calculation**:

```
baseSpeed = condition / 100
randomFactor = random(0.8, 1.2)
finalSpeed = baseSpeed × randomFactor
```

2. **Time Calculation**:

```
completionTime = distance / finalSpeed
```

3. **Animation Speed**:

```
animationSpeed = finalSpeed × 0.5
```

### Randomness:

- **Horse Selection**: Fisher-Yates shuffle algorithm
- **Speed Variation**: ±20% random factor
- **Condition Generation**: Random integer 1-100

## Fair Play

### Ensuring Fairness:

1. **Random Selection**: All horses have equal chance of selection
2. **Speed Variation**: Random factor prevents predictable outcomes
3. **Condition-Based**: Better condition = better average performance
4. **No Bias**: Each race independently selects horses

### Variability:

- Same horse can perform differently in different races
- Higher condition horses more likely to win but not guaranteed
- Distance affects race duration but not relative performance

## Game Limits

### Technical Limits:

- **Minimum Horses**: 20 (required for proper game function)
- **Maximum Horses**: Unlimited (configurable)
- **Minimum Rounds**: 1 (configurable)
- **Maximum Rounds**: Unlimited (configurable)
- **Horses Per Race**: 10 (configurable)

### Current Configuration:

- 20 horses total
- 6 rounds per game
- 10 horses per race
- Distances: 1200m to 2200m in 200m increments

## Winning Conditions

### Individual Race:

- **Winner**: Horse with fastest completion time
- **Podium**: Top 3 horses receive medals
- **Rankings**: All 10 horses ranked by time

### Overall Game:

- No overall winner tracked (can be added as feature)
- Each race is independent
- Results viewable for all completed races

## Strategy Tips

### For Players:

1. **Horse Observation**: Note horses with high conditions
2. **Pattern Recognition**: Track which horses perform well
3. **Distance Awareness**: Longer races take more time
4. **Randomness Factor**: Outcomes never 100% predictable

### Understanding Results:

- High condition doesn't guarantee victory
- Random factors create exciting unpredictability
- Each race offers new opportunities
- Past performance doesn't guarantee future results

## Future Enhancements

### Potential Features:

1. **Betting System**: Wager on race outcomes
2. **Horse Training**: Improve horse conditions
3. **Statistics Tracking**: Historical performance data
4. **Leaderboards**: Track best horses across games
5. **Multiplayer**: Compete with other players
6. **Custom Races**: Player-defined distances
7. **Weather Effects**: Environmental factors
8. **Horse Fatigue**: Condition changes during game

## Accessibility

### User-Friendly Features:

- Clear visual indicators
- Color-coded information
- Responsive design for all devices
- Intuitive button states
- Real-time status updates
- Expandable detailed views

### Mobile Support:

- Touch-friendly buttons
- Scrollable lists
- Horizontal scroll for race track
- Optimized layout for small screens
- Full functionality on mobile devices
