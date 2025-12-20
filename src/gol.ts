const canvas = document.getElementById("gameoflife") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;

canvas.width = 500;
canvas.height = 500;

const cellSize = 10;
let na: number = 20;
let cols: number = canvas.width / cellSize;
let rows: number = canvas.height / cellSize;

const BROWN = "#552d00ff";
const GREEN = "#1d9200ff";
const GROW_TICKS = 100;


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
        const candidates: Array<{ x: number; y: number }> = [];
        for (let dy = -r; dy <= r; dy++) {
            for (let dx = -r; dx <= r; dx++) {
                if (dx === 0 && dy === 0) 
                    continue;
                const ny = y + dy;
                const nx = x + dx;
                if (ny < 0 || ny >= rows || nx < 0 || nx >= cols) 
                    continue;
                if (g[ny][nx] === 1) {
                    candidates.push({ x: Math.sign(dx), y: Math.sign(dy) });
                }
            }
        }
        if (candidates.length) {
            return candidates[Math.floor(Math.random() * candidates.length)];
        }
    }
    return null;
}

function isFree(x: number, y: number, self: Animal): boolean {
    for (const a of animals) {
        if (a === self) 
            continue;
        if (a.x === x && a.y === y) 
            return false;
    }
    return true;
}

function pickFreeNeighbor(x: number, y: number, self: Animal): { x: number; y: number } | null {
    const options: Array<{ x: number; y: number }> = [];
    for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
            const nx = Math.min(Math.max(x + dx, 0), cols - 1);
            const ny = Math.min(Math.max(y + dy, 0), rows - 1);
            if (isFree(nx, ny, self)) options.push({ x: nx, y: ny });
        }
    }
    if (options.length === 0) return null;
    return options[Math.floor(Math.random() * options.length)];
}

class Animal {
    x: number;
    y: number;
    hunger: number = 10;
    alive: boolean = true;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    act(grid: number[][]) {
        if (this.alive == true) {
            if (grid[this.y][this.x] === 1) //eat
            {
                grid[this.y][this.x] = 0
                this.hunger = 10
                growTimer[this.y][this.x] = 0;
            }
            else {
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

let animals: Animal[] = [];
function posAnimals() {
    animals = [];
    const total = rows * cols;
    const need = Math.min(na, total);
    const indices: number[] = Array.from({ length: total }, (_, i) => i);
    for (let i = 0; i < need; i++) { //parcial Fisher–Yates shuffle
        const j = i + Math.floor(Math.random() * (total - i));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    for (let i = 0; i < need; i++) {
        const idx = indices[i];
        const y = Math.floor(idx / cols);
        const x = idx % cols;
        animals.push(new Animal(x, y));
    }
}
posAnimals();

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
            }
        }
    }
    drawAnimal();
    //drawGrid(ctx, canvas.width, canvas.height, cellSize);
}

function updatePopulation() {
    let i = 0;
    for (const a of animals) {
        if (a.alive)
            i++;
    }
    document.getElementById("population")!.innerText = i.toString();
}

//------------------------------web.ts
let start: boolean = false;
let speed: number = 100;
let restart: boolean = true;

function rst() {
    cols = canvas.width / cellSize;
    rows = canvas.height / cellSize;
    grid = [];
    initGrid(grid);
    growTimer = [];
    initTimer(growTimer);
    animals = [];
    posAnimals();
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
        na = 20;
        canvas.width = 500;
        canvas.height = 500;
    } else if (preset === 'x2') {
        na = 50;
        canvas.width = 1000;
        canvas.height = 1000;
    } else if (preset === 'x4') {
        na = 500;
        canvas.width = 2000;
        canvas.height = 2000;
    }
    rst();
}
//--------------------------------------------------

function tick() {
    if (!start)
        return;
    for (const animal of animals) {
        animal.act(grid);
    }
    growGrassByTicks(growTimer, grid, GROW_TICKS);
    drawNextTic(grid);
    updatePopulation();
    setTimeout(tick, 500 - speed);
}

drawNextTic(grid);
updatePopulation();