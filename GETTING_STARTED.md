# Getting Started with Horse Racing Game

Welcome! This guide will help you get up and running with the Horse Racing Game in just a few minutes.

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies

```bash
npm install
```

⏱️ Takes about 2-3 minutes

### Step 2: Start Development Server

```bash
npm run dev
```

⏱️ Server starts in seconds

### Step 3: Open in Browser

Navigate to: `http://localhost:5173/`

🎉 **You're ready to play!**

## 🎮 How to Play

### 1. View the Horses

When the app loads, you'll see 20 horses on the left side, each with:

- A unique name (Thunder, Lightning, etc.)
- A unique color
- A condition score (1-100)

### 2. Generate Race Schedule

Click the **"🎲 Generate Schedule"** button at the top.

This creates 6 races with:

- Different distances (1200m to 2200m)
- 10 random horses per race
- Visual schedule display

### 3. Start Racing

Click the **"🏁 Start Race"** button.

Watch as:

- Horses animate across the track
- Races run one at a time
- Results appear after each race

### 4. View Results

See the results on the right side:

- 🥇🥈🥉 Top 3 horses highlighted
- Complete rankings for all horses
- Completion times
- Expandable detailed views

## 📱 Try Different Devices

### Desktop

Full experience with side-by-side layout

### Tablet

Optimized layout for medium screens

### Mobile

Vertical layout, touch-friendly controls

## 🧪 Run Tests

### Unit Tests

```bash
npm run test:unit
```

Tests all components, models, and store modules

### E2E Tests

```bash
npm run test:e2e
```

Tests complete user workflows

## 📚 Learn More

### For Users

- **GAME_RULES.md** - How the game works
- **FEATURES.md** - What the game can do

### For Developers

- **SETUP.md** - Detailed installation guide
- **DEVELOPMENT.md** - Development workflow
- **ARCHITECTURE.md** - Technical details
- **PROJECT_SUMMARY.md** - Complete overview

## 🎯 What Makes This Special?

### ✨ Beautiful UI

- Modern, gradient design
- Smooth animations
- Intuitive controls

### 🏇 Realistic Racing

- Speed based on horse condition
- Random factors for excitement
- Visual race animations

### 📊 Detailed Results

- Immediate feedback
- Complete statistics
- Historical data

### 📱 Works Everywhere

- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

### 🧪 Well Tested

- 55+ unit tests
- 21+ E2E tests
- Cross-browser tested

### 📖 Fully Documented

- User guides
- Developer guides
- Code comments

## 🛠️ Development Commands

### Start Development

```bash
npm run dev
```

Hot reload enabled, fast refresh

### Build for Production

```bash
npm run build
```

Creates optimized bundle

### Preview Production Build

```bash
npm run preview
```

Test production build locally

### Run All Tests

```bash
npm run test:unit && npm run test:e2e
```

Complete test suite

### Lint Code

```bash
npm run lint
```

Check code quality

## 🎨 Customization Ideas

### Easy Changes

1. **Change number of horses**: Edit `TOTAL_HORSES` in `src/models/Horse.js`
2. **Change number of rounds**: Edit `TOTAL_ROUNDS` in `src/models/Race.js`
3. **Change race distances**: Edit `RACE_DISTANCES` array
4. **Change colors**: Edit color array in `generateHorses()`

### Advanced Features

1. Add betting system
2. Track statistics
3. Save game history
4. Add multiplayer
5. Create tournaments

## 🐛 Troubleshooting

### Port Already in Use?

```bash
npm run dev -- --port 3000
```

Use a different port

### Tests Failing?

```bash
npm install
npx playwright install
```

Reinstall dependencies

### Build Errors?

```bash
rm -rf node_modules package-lock.json
npm install
```

Clean install

## 💡 Tips & Tricks

### For Best Experience

1. Use Chrome or Firefox for best performance
2. Enable hardware acceleration
3. Close unnecessary tabs
4. Use fullscreen mode

### For Development

1. Install Vue DevTools browser extension
2. Use VS Code with Volar extension
3. Enable ESLint auto-fix
4. Run tests in watch mode

### For Testing

1. Use Playwright UI for debugging
2. Run specific test files
3. Use headed mode to see tests run
4. Check screenshots on failures

## 🎓 Learning Path

### Beginner

1. Play the game
2. Read GAME_RULES.md
3. Explore the UI
4. Try on different devices

### Intermediate

1. Read ARCHITECTURE.md
2. Explore component code
3. Understand Vuex store
4. Run and read tests

### Advanced

1. Read DEVELOPMENT.md
2. Make code changes
3. Add new features
4. Contribute improvements

## 🌟 Key Features

### Game Features

- ✅ 20 unique horses
- ✅ 6 race rounds
- ✅ Animated racing
- ✅ Real-time results
- ✅ Detailed statistics

### Technical Features

- ✅ Vue.js 3
- ✅ Vuex state management
- ✅ Component architecture
- ✅ Comprehensive testing
- ✅ Responsive design

### Quality Features

- ✅ Clean code
- ✅ Well documented
- ✅ ESLint configured
- ✅ Production ready
- ✅ Easy to maintain

## 🚀 Next Steps

### Just Playing?

1. Generate a schedule
2. Start the races
3. Enjoy the animations
4. Check the results

### Want to Learn?

1. Read the documentation
2. Explore the code
3. Run the tests
4. Try making changes

### Want to Develop?

1. Set up your IDE
2. Read DEVELOPMENT.md
3. Understand the architecture
4. Start coding!

## 📞 Need Help?

### Documentation

- Check the relevant .md files
- Read inline code comments
- Review test files for examples

### Common Questions

**Q: How do I change the number of horses?**
A: Edit `totalHorses` in `src/store/modules/horses.js`

**Q: Can I add more races?**
A: Yes! Edit `TOTAL_ROUNDS` in `src/models/Race.js`

**Q: How do I customize colors?**
A: Edit the `colors` array in `src/models/Horse.js`

**Q: Can I save game results?**
A: Not currently, but easy to add with localStorage

**Q: Is this production ready?**
A: Yes! Fully tested and documented

## 🎉 Have Fun!

The Horse Racing Game is designed to be:

- **Fun to play** 🎮
- **Easy to use** 👍
- **Beautiful to look at** 🎨
- **Smooth to interact with** ⚡
- **Interesting to develop** 💻

Whether you're playing for fun or exploring the code, we hope you enjoy it!

---

**Ready to race?** Run `npm run dev` and let's go! 🏇🏁

**Happy Racing!** 🐴✨
