# 🌱 NewWorld - Ecological Simulation

<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-87.4%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-5.8%25-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![HTML](https://img.shields.io/badge/HTML-6.8%25-E34F26?style=for-the-badge&logo=html5&logoColor=white)

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Canvas](https://img.shields.io/badge/Canvas_API-000000?style=for-the-badge&logo=html5&logoColor=white)

</div>
> *A virtual ecosystem inspired by the legendary **Conway's Game of Life***

## 🎯 About The Project

**NewWorld** was born after exploring the fascinating [Conway's Game of Life](https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life). What started as curiosity evolved into a complete ecological simulation where autonomous agents fight to survive in a dynamic world.

Unlike the classic cellular automaton, here the **agents** are individuals with hunger, survival instincts, and the need to find resources in a constantly changing environment.
<div align="center">
<img width="768" height="811" alt="image" src="https://github.com/user-attachments/assets/caf99d9b-fa84-4d9c-a02e-bfb55f3e5ecb" />
</div>
## ✨ Features

🦾 **Autonomous Agents**
- Hunger and survival system
- Intelligent resource searching
- Adaptive movement behavior

🌿 **Dynamic Ecosystem**
- Grass that grows over time
- Limited and renewable resources
- Natural balance between population and food supply

⚡ **Real-Time Simulation**
- Adjustable speed control
- Multiple world sizes (x1, x2, x4)
- Instant population status visualization

## 🚀 Installation

```bash
# Clone the repository
git clone https://github.com/isegura-b/NewWorld.git

# Enter the directory
cd NewWorld

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 🎮 How to Use

1. **Start**:  Begin the simulation
2. **Stop**:  Pause the ecosystem
3. **Restart**: Reset with a new random population
4. **Speed**: Control simulation speed (1-500)
5. **Size**: Choose the world size
   - `x1` - 500x500px (20 agents)
   - `x2` - 1000x1000px (50 agents)
   - `x4` - 2000x2000px (500 agents)

## 🧪 Tech Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white) | Static typing and robust development |
| ![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white) | Ultra-fast build tool |
| ![HTML5](https://img.shields.io/badge/HTML5_Canvas-E34F26?style=flat-square&logo=html5&logoColor=white) | Efficient graphic rendering |

</div>

## 🎨 How It Works

### The Life Cycle

```typescript
1. Agents search for grass (green) to feed
2. When eating, they satisfy hunger for 10 turns
3. Without food, they lose hunger each turn
4. With hunger = 0, the agent dies
5. Eaten grass regenerates after 80 ticks
```

### Movement System

Agents use a **radial search algorithm** that:
- Searches for food in growing concentric circles
- Avoids collisions with other agents
- Moves randomly if no nearby food is found
- Intelligently navigates towards the nearest resource

### Color Coding

- 🟩 **Green**: Available grass (food)
- 🟫 **Brown**: Consumed grass (regenerating)
- ⬛ **Black**: Living agents
- 🟥 **Red**:   Predator living agents

## 🧠 Advanced Mechanics

- **Reproduction (Animals)**: When `hunger > 16` and `rep <= 2`, an animal seeks a mate in adjacent cells. If found, a child spawns in a free neighboring cell. Parents incur a hunger cost (`-6`) and enter a reproduction cooldown (`25` ticks).
- **Reproduction (Predators)**: When `hunger > 18` and `rep <= 0`, predators reproduce similarly, spawning a child predator in a free adjacent cell. Hunger cost is `-8`, and reproduction cooldown is `30` ticks.
- **Feeding and Hunger**: Animals eat grass when standing on it and hungry (`<= 10`), gaining `+10` hunger and turning the tile to regenerating brown. Predators eat animals by moving into their cell when hungry (`<= 12`), gaining `+20` hunger.
- **Aging and Death**: Animals die at `age >= 400`; predators at `age >= 600`. All entities also die when `hunger <= 0`.
- **Terrain and Rivers**: Rivers are procedurally generated water tiles that are impassable for all agents; entities cannot move onto water.
- **Time and UI**: The simulation increments `year` each tick and displays live counts for animals and predators.
- **Speed and Tick Rate**: The delay per tick is `500 - speed` ms; higher `speed` means faster simulation.

See [src/gol.ts](src/gol.ts) for implementation details.

## 📊 Project Structure

```
NewWorld/
├── src/
│   ├── gol.ts        # Core simulation logic
│   ├── web.ts        # UI controls and interactions
│   └── tsconfig.json
├── public/
├── index.html        # Main HTML file
├── package.json
├── vite.config.ts
└── README.md
```

## 🔮 Future Improvements

- [ ] Population statistics and graphs
- [ ] Genetic algorithms for agent evolution

## 🤝 Contributing

Contributions are welcome! If you have ideas to improve NewWorld: 

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add:  AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📫 Contact

**isegura-b** - [@isegura-b](https://github.com/isegura-b)

Project Link: [https://github.com/isegura-b/NewWorld](https://github.com/isegura-b/NewWorld)

---

<div align="center">

**[⭐ If you like the project, give it a star!](https://github.com/isegura-b/NewWorld)**

Made by [isegura-b](https://github.com/isegura-b)

</div>
