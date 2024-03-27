import Animal from "./animal.js";
import Claw from "./claw.js";

let maxElement = 10;
let game = document.getElementById('game');
let instruction = document.getElementById('instruction');
let maxHeight = game.offsetHeight;
let maxWidth = game.offsetWidth;
let spriteList = [];
let spritesToRemove = null;
let claw = new Claw();
let counter = 0;
let score = 0;


// SRC: Sounds by Pixabay
let soundfiles = [new Audio('sounds/cat-meow.mp3'), new Audio('sounds/cat-meow2.mp3'), new Audio('sounds/cat-meow3.mp3')];

onload = function() {
    instruction.addEventListener("click", () => {
        instruction.style.display = "none";
    });
    
    generateAnimals();
    setup();
    game.addEventListener("click", goFish);
}

function goFish(event) {
    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let soundfile = soundfiles[Math.floor(Math.random() * soundfiles.length)];
    soundfile.play();

    if (!claw.getAlreadyMoving()) {
        claw.setReset();
        claw.setAlreadyMoving(true);
        claw.setPositions(mouseX, mouseY);
        claw.tick();
    }
}

function setup() {
    tick();
}

function generateAnimals() {
    for (let i = 0; i < maxElement; i++) {
        let animal = new Animal(i, maxWidth, maxHeight, document.getElementById('game'));
        animal.node.addEventListener("click", handleStart);;
        spriteList.push(animal);
    }
}

function addAnimal() {
    let animal = new Animal(spriteList.length, maxWidth, maxHeight, document.getElementById('game'));
    animal.node.addEventListener("click", handleStart);
    spriteList.push(animal);
}

function handleStart(event) {
    event.target.style.animation = "react 0.5s 1 cubic-bezier(0.5, 0.5, 0.5, 0.5)";
}

const tick = () => {
    spriteList.forEach(sprite => {
        sprite.move();
        counter += claw.collison(sprite.node)
    });

    if (counter == 1) {
        score += 1;
        document.getElementById('score').innerHTML = score;
        counter = 0;
        setTimeout(addAnimal, 10);
    }

    window.requestAnimationFrame(tick);
}

