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
<img width="553" height="603" alt="image" src="https://github.com/user-attachments/assets/e1ddd376-a5fb-4142-9d48-91db3891cf4b" />
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
5. Eaten grass regenerates after 100 ticks
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

- [ ] Agent reproduction system
- [ ] Different agent types (herbivores/carnivores)
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
