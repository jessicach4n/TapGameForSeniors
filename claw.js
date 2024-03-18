export default class Claw {
    constructor() {
        this.node = document.getElementById('claw');
        this.speed = 6;
        this.initPosition = -window.innerHeight;
        this.currentPosition = this.initPosition;
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
        if (!this.targetReached) {
            this.currentPosition += this.speed;
            if (this.currentPosition >= this.posMaxY || this.currentPosition >= this.targetY) {
                this.targetReached = true;
            }
        }
        else {
            this.currentPosition -= this.speed;
            if (this.currentPosition <= this.initPosition) {
                this.currentPosition = this.initPosition;
                this.alreadyMoving = false;
            }
        }
        
        this.node.style.top = this.currentPosition + 'px';
    }

    tick() {
        this.move();
        
        window.requestAnimationFrame(this.tick.bind(this));
    }
}