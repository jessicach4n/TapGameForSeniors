import Animal from "./animal.js";

let maxElement = 7;
let maxHeight = document.getElementById('game').offsetHeight;
let maxWidth = document.getElementById('game').offsetWidth;
let spriteList = [];

onload = function() {
    generateAnimals();
    setup();
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

