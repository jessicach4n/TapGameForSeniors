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
    event.target.style.backgroundColor = "green";
}

const tick = () => {
    spriteList.forEach(sprite => {
        sprite.move();
        // spritesToRemove = claw.collison(sprite.node)
        counter += claw.collison(sprite.node)
    });
    
    // spritesToRemove.forEach(sprite => {
    //     spriteList.splice(spriteList.indexOf(sprite), 1);
    // });

    // console.log(spritesToRemove);
    // console.log(spriteList.length)

    if (counter == 1) {
        counter = 0;
        setTimeout(addAnimal, 1500);
    }

    window.requestAnimationFrame(tick);
}

