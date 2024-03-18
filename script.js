import Animal from "./animal.js";
import Claw from "./claw.js";

let maxElement = 7;
let game = document.getElementById('game');
let maxHeight = game.offsetHeight;
let maxWidth = game.offsetWidth;
let spriteList = [];
let claw = new Claw();

onload = function() {
    generateAnimals();
    setup();
    game.addEventListener("click", goFish);
}

function goFish(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    if (!claw.getAlreadyMoving()) {
        claw.setReset();
        claw.setAlreadyMoving(true);
        claw.setPositions(mouseX, mouseY);
        claw.tick();
    }
}

function toggleMenu() {
    console.log('toggle')
} 

function setup() {
    tick();
}

function generateAnimals() {
    for (let i = 0; i < maxElement; i++) {
        let animal = new Animal(i, maxWidth, maxHeight, document.getElementById('game'));
        animal.node.addEventListener("click", handleStart);
        // animal.addEventListener("touchend", handleEnd);
        // animal.addEventListener("touchcancel", handleCancel);
        // animal.addEventListener("touchmove", handleMove);
        spriteList.push(animal);
    }
}

function handleStart(event) {
    event.target.style.backgroundColor = "green";
}

const tick = () => {
    spriteList.forEach(sprite => {
        sprite.move();
    });

    window.requestAnimationFrame(tick);
}

