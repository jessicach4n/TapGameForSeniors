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
let collision = false;
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
        addAnimal(i);
    }
}

function addAnimal(id) {
    let animal = new Animal(id, maxWidth, maxHeight, document.getElementById('game'));
    animal.node.addEventListener("click", handleStart);
    spriteList.push(animal);
}

function handleStart(event) {
    event.target.style.animation = "react 0.5s 1 cubic-bezier(0.5, 0.5, 0.5, 0.5)";
}

const tick = () => {
    spriteList.forEach(sprite => {
        sprite.move();
        if(claw.collison(sprite.node)) {
            score += 1;
            document.getElementById('score').innerHTML = score;
            addAnimal(spriteList.length);
        }
    });

    window.requestAnimationFrame(tick);
}

