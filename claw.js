export default class Claw {
    constructor() {
        this.node = document.getElementById('claw');
        this.speed = 8;
        this.initPosition = -window.innerHeight;
        this.currentPositionY = this.initPosition;
        this.posMaxY = this.initPosition + this.node.offsetHeight;
        this.targetReached = false;
        this.alreadyMoving = false;
    }

    setPositions(x, y) {
        this.posX = x - (this.node.offsetWidth / 2);
        this.targetY = y - (this.node.offsetHeight - 50);
        this.node.style.left = this.posX + 'px';
    }

    getAlreadyMoving() {
        return this.alreadyMoving;
    }

    setAlreadyMoving(value) {
        this.alreadyMoving = value;
    }

    setReset() {
        this.targetReached = false;
    }

    move() {
        console.log(this.alreadyMoving);
        if (!this.targetReached) {
            this.currentPositionY += this.speed;
            if (this.currentPositionY >= this.posMaxY || this.currentPositionY >= this.targetY) {
                this.targetReached = true;
            }
        }
        else {
            this.currentPositionY -= this.speed;
            if (this.currentPositionY <= this.initPosition) {
                this.currentPositionY = this.initPosition;
                this.alreadyMoving = false;
            }
        }
        
        this.node.style.top = this.currentPositionY + 'px';
    }

    tick() {
        this.move();
        window.requestAnimationFrame(this.tick.bind(this));
    }
}