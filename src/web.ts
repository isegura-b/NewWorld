import { startGame, stopGame, resetGame, setSpeed, setSize } from "./gol";

const startBtn = document.getElementById("startBtn") as HTMLButtonElement;
const stopBtn = document.getElementById("stopBtn") as HTMLButtonElement;
const resetBtn = document.getElementById("resetBtn") as HTMLButtonElement;
const speedRange = document.getElementById("speedRange") as HTMLInputElement;
const x1Btn = document.getElementById("x1Btn") as HTMLButtonElement;
const x2Btn = document.getElementById("x2Btn") as HTMLButtonElement;
const x4Btn = document.getElementById("x4Btn") as HTMLButtonElement;

startBtn.onclick = () => startGame();
stopBtn.onclick = () => stopGame();
resetBtn.onclick = () => resetGame();
speedRange.oninput = (e) => setSpeed(parseInt((e.target as HTMLInputElement).value));

x1Btn.onclick = () => setSize('x1');
x2Btn.onclick = () => setSize('x2');
x4Btn.onclick = () => setSize('x4');