const canvas = document.getElementById("gameoflife") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 500;
canvas.height = 500;

const cellSize = 20;
let ANIMAL_NUMBER: number = 40;
let PREDATOR_NUMBER: number = 3;
let cols: number = canvas.width / cellSize;
let rows: number = canvas.height / cellSize;

const BROWN = "#552d00ff";
const GREEN = "#1d9200ff";
const WATER = "#1e6ff2";
const GROW_TICKS = 100;

const HUNGER_NUM = 10 + Math.floor(Math.random() * 6);

const MIN_HUNGER_V = 10;
const MIN_HUNGER_C = 8;

const FEED_V_NUM = 5;
const FEED_C_NUM = 10;


let grid: number[][] = [];
function initGrid(grid: number[][]) {
    for (let y = 0; y < rows; y++) {
        const row: number[] = [];
        for (let x = 0; x < cols; x++) {
                row.push(1);
        }
        grid.push(row);
    }
}
initGrid(grid);

let growTimer: number[][] = [];
function initTimer(timer: number[][]) {
    for (let y = 0; y < rows; y++) {
        const row: number[] = [];
        for (let x = 0; x < cols; x++) {
            row.push(0);
        }
        timer.push(row);
    }
}
initTimer(growTimer);

function generateRiver(g: number[][]) {
    const orientationLR = Math.random() < 0.5; // true: left->right, false: top->bottom
    const base = Math.max(2, Math.floor(Math.min(rows, cols) * 0.05));
    const riverWidth = base + Math.floor(Math.random() * 2);

    if (orientationLR) {
        let y = Math.floor(Math.random() * (rows - 2)) + 1;
        for (let x = 0; x < cols; x++) {
            const half = Math.floor(riverWidth / 2);
            for (let dy = -half; dy <= half; dy++) {
                const ry = Math.min(Math.max(y + dy, 0), rows - 1);
                g[ry][x] = 2;
            }
            const r = Math.random();
            let momentum = 0;
            let drift = 0;
            if (r < 0.2)
                drift = -1;
            else if (r > 0.8)
                drift = 1;
            if (momentum !== 0 && Math.random() < 0.6)
                drift = momentum;
            y = Math.min(Math.max(y + drift, 1), rows - 2);
            momentum = drift;
        }
    } else {
        let x = Math.floor(Math.random() * (cols - 2)) + 1
        let momentum = 0;
        for (let y = 0; y < rows; y++) {
            const half = Math.floor(riverWidth / 2);
            for (let dx = -half; dx <= half; dx++) {
                const rx = Math.min(Math.max(x + dx, 0), cols - 1);
                g[y][rx] = 2;
            }
            const r = Math.random();
            let drift = 0;
            if (r < 0.2) drift = -1; else if (r > 0.8) drift = 1;
            if (momentum !== 0 && Math.random() < 0.6) drift = momentum;
            x = Math.min(Math.max(x + drift, 1), cols - 2);
            momentum = drift;
        }
    }
}

function drawGrid(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number) {
    ctx.strokeStyle = "#505050ff";
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += cellSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
    }
    for (let y = 0; y <= height; y += cellSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
    }
}

function searchForFood(g: number[][], y: number, x: number): { x: number; y: number } | null {
    const max = Math.max(rows, cols);
    for (let r = 1; r <= max; r++) {
        const candidates: Array<{ stepX: number; stepY: number; mapX: number; mapY: number }> = [];
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                if (dx === 0 && dy === 0)
                    continue;
                const ny = y + dy;
                const nx = x + dx;
                if (ny < 0 || ny >= rows || nx < 0 || nx >= cols)
                    continue;
                if (g[ny][nx] === 1) {
                    candidates.push({ stepX: Math.sign(dx), stepY: Math.sign(dy), mapX: nx, mapY: ny });
                }
            }
        }
        if (candidates.length > 0) {
            const c = candidates[Math.floor(Math.random() * candidates.length)];
            return { x: c.stepX, y: c.stepY };
        }
    }
    return null;
}

function isFree(x: number, y: number, self: { x: number; y: number }): boolean {
    if (grid[y][x] === 2)
        return false;
    for (const a of animals) {
        if (a === self)
            continue;
        if (a.x === x && a.y === y)
            return false;
    }
    for (const p of predators) {
        if (p === self)
            continue;
        if (p.x === x && p.y === y)
            return false;
    }
    return true;
}

function pickFreeNeighbor(x: number, y: number, self: { x: number; y: number }): { x: number; y: number } | null {
    const options: Array<{ x: number; y: number }> = [];
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const nx = Math.min(Math.max(x + dx, 0), cols - 1);
            const ny = Math.min(Math.max(y + dy, 0), rows - 1);
            if (isFree(nx, ny, self))
                options.push({ x: nx, y: ny });
        }
    }
    if (options.length === 0)
        return null;
    return options[Math.floor(Math.random() * options.length)];
}

class Animal {
    x: number;
    y: number;
    hunger: number = HUNGER_NUM;
    alive: boolean = true;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    act(grid: number[][]) {
        if (this.alive == true) {
            if (grid[this.y][this.x] === 1 && this.hunger <= MIN_HUNGER_V) //with grass
            { //eat
                grid[this.y][this.x] = 0
                this.hunger += FEED_V_NUM;
                growTimer[this.y][this.x] = 0;
            }
            else { //without grass
                const move = searchForFood(grid, this.y, this.x);
                if (move != null) {
                    const targetX = Math.min(Math.max(this.x + move.x, 0), cols - 1);
                    const targetY = Math.min(Math.max(this.y + move.y, 0), rows - 1);
                    if (isFree(targetX, targetY, this)) {
                        this.x = targetX;
                        this.y = targetY;
                    } else {
                        const n = pickFreeNeighbor(this.x, this.y, this);
                        if (n) {
                            this.x = n.x;
                            this.y = n.y;
                        }
                    }
                } else {
                    const n = pickFreeNeighbor(this.x, this.y, this);
                    if (n) {
                        this.x = n.x;
                        this.y = n.y;
                    }
                }
                this.hunger--;
            }
        }
        if (this.hunger <= 0)
            this.alive = false;
    }
}

function searchForAnimal(x: number, y: number, animals: Animal[]): { x: number; y: number } | null {
    const max = Math.max(rows, cols);
    for (let r = 1; r <= max; r++) {
        const candidates: Array<{ stepX: number; stepY: number; mapX: number; mapY: number }> = [];
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                if (dx === 0 && dy === 0)
                    continue;
                const ny = y + dy;
                const nx = x + dx;
                if (ny < 0 || ny >= rows || nx < 0 || nx >= cols)
                    continue;
                for (const a of animals) {
                    if (a.alive && a.x == nx && a.y == ny) {
                        candidates.push({ stepX: Math.sign(dx), stepY: Math.sign(dy), mapX: nx, mapY: ny });
                    }
                }
            }
        }
        if (candidates.length > 0) {
            const c = candidates[Math.floor(Math.random() * candidates.length)];
            return { x: c.stepX, y: c.stepY };
        }
    }
    return null;
}

function nearFood(x: number, y: number) {
    for (const a of animals) {
        if ((a.x >= x - 1 && a.x <= x + 1) && (a.y >= y - 1 && a.y <= y + 1)) {
            a.alive = false;
            return true;
        }
    }
    return false
}

class Predator {
    x: number;
    y: number;
    hunger: number = HUNGER_NUM;
    alive: boolean = true;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    act(grid: number[][]) {
        if (this.alive !== true) return;

        const move = searchForAnimal(this.x, this.y, animals);
        if (move != null && MIN_HUNGER_C >= this.hunger) {
            const targetX = Math.min(Math.max(this.x + move.x, 0), cols - 1);
            const targetY = Math.min(Math.max(this.y + move.y, 0), rows - 1);

            // If there's an animal on the target cell, eat it and move there
            const victim = animals.find(a => a.alive && a.x === targetX && a.y === targetY);
            if (victim) {
                victim.alive = false;
                this.x = targetX;
                this.y = targetY;
                this.hunger += FEED_C_NUM;
            } else {
                // Otherwise, move closer if the cell is free; else pick a free neighbor
                if (isFree(targetX, targetY, this)) {
                    this.x = targetX;
                    this.y = targetY;
                } else {
                    const n = pickFreeNeighbor(this.x, this.y, this);
                    if (n) {
                        this.x = n.x;
                        this.y = n.y;
                    }
                }
                this.hunger--;
            }
        } else {
            // No target or not hungry enough to chase: sleep
            this.hunger--;
        }

        if (this.hunger <= 0) 
            this.alive = false;
    }
}

let animals: Animal[] = [];
let predators: Predator[] = [];

function Generate() {
    animals = [];
    predators = [];
    const land: number[] = [];
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] !== 2) land.push(y * cols + x);
        }
    }
    const needAnimals = ANIMAL_NUMBER;
    const needPredators = PREDATOR_NUMBER;
    const need = needAnimals + needPredators;
    if ((needAnimals + needPredators) > land.length)
        return;
    for (let i = 0; i < need; i++) {
        const j = i + Math.floor(Math.random() * (land.length - i));
        [land[i], land[j]] = [land[j], land[i]];
    }
    let j = 0;
    for (let i = 0; i < needAnimals; i++) {
        const idx = land[j++];
        const y = Math.floor(idx / cols);
        const x = idx % cols;
        animals.push(new Animal(x, y));
    }
    for (let i = 0; i < needPredators; i++) {
        const idx = land[j++];
        const y = Math.floor(idx / cols);
        const x = idx % cols;
        predators.push(new Predator(x, y));
    }
}
generateRiver(grid);
Generate();

function drawAnimal() {
    for (const animal of animals) {
        if (animal.alive == true) {
            ctx.fillStyle = "black";
            ctx.fillRect(
                animal.x * cellSize + cellSize * 0.25,
                animal.y * cellSize + cellSize * 0.25,
                cellSize * 0.5,
                cellSize * 0.5
            );
        }
    }
}

function drawPredator() {
    for (const predator of predators) {
        if (predator.alive == true) {
            ctx.fillStyle = "red";
            ctx.fillRect(
                predator.x * cellSize + cellSize * 0.25,
                predator.y * cellSize + cellSize * 0.25,
                cellSize * 0.5,
                cellSize * 0.5
            );
        }
    }
}

function growGrassByTicks(timer: number[][], grid: number[][], growTicks: number) {
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] === 0) {
                timer[y][x] += 1;
                if (timer[y][x] >= growTicks) {
                    grid[y][x] = 1;
                    timer[y][x] = 0;
                }
            } else {
                if (timer[y][x] !== 0)
                    timer[y][x] = 0;
            }
        }
    }
}

function drawNextTic(grid: number[][]) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (grid[y][x] === 0) {
                ctx.fillStyle = BROWN;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else if (grid[y][x] === 1) {
                ctx.fillStyle = GREEN;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            } else if (grid[y][x] === 2) {
                ctx.fillStyle = WATER;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
    drawAnimal();
    drawPredator();
    //drawGrid(ctx, canvas.width, canvas.height, cellSize);
}

function updatePopulation() {
    let aliveAnimals = 0;
    for (const a of animals) {
        if (a.alive)
            aliveAnimals++;
    }
    let alivePredators = 0;
    for (const p of predators) {
        if (p.alive)
            alivePredators++;
    }
    const popEl = document.getElementById("population");
    if (popEl) popEl.innerText = aliveAnimals.toString();
    const predEl = document.getElementById("predators");
    if (predEl) predEl.innerText = alivePredators.toString();
}

//------------------------------web.ts
let start: boolean = false;
let speed: number = 300;
let restart: boolean = true;

function rst() {
    cols = canvas.width / cellSize;
    rows = canvas.height / cellSize;
    grid = [];
    initGrid(grid);
    growTimer = [];
    initTimer(growTimer);
    animals = [];
    generateRiver(grid);
    Generate();
    drawNextTic(grid);
    updatePopulation();

    start = false;
}
export function startGame() {
    start = true;
    tick();
}

export function stopGame() {
    start = false;
}

export function resetGame() {
    rst();
}

export function setSpeed(value: number) {
    speed = value;
}

export function setSize(preset: 'x1' | 'x2' | 'x4') {
    if (preset === 'x1') {
        ANIMAL_NUMBER = 20;
        PREDATOR_NUMBER = 5
        canvas.width = 500;
        canvas.height = 500;
    } else if (preset === 'x2') {
        ANIMAL_NUMBER = 50;
        PREDATOR_NUMBER = 10;
        canvas.width = 1000;
        canvas.height = 1000;
    } else if (preset === 'x4') {
        ANIMAL_NUMBER = 500;
        PREDATOR_NUMBER = 50;
        canvas.width = 2000;
        canvas.height = 2000;
    }
    rst();
}
//--------------------------------------------------

function stoptick() {
    let i = 0;
    for (const a of animals) {
        if (a.alive == false)
            i++;
    }
    for (const p of predators)
    {
        if (p.alive == false)
            i++;
    }
    if (animals.length + predators.length == i)
        return (true);
    return (false);
}


function tick() {
    if (!start || stoptick())
        return;
    for (const animal of animals)
        animal.act(grid);
    for (const p of predators)
        p.act(grid);
    growGrassByTicks(growTimer, grid, GROW_TICKS);
    drawNextTic(grid);
    updatePopulation();
    setTimeout(tick, 500 - speed);
}

drawNextTic(grid);
updatePopulation();