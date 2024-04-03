export default class Claw {
    constructor() {
        this.node = document.getElementById('claw');
        this.speed = 8;
        this.initPosition = -window.innerHeight*0.8;
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

    reset() {
        this.targetReached = false;
    }

    move() {
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

        let id = window.requestAnimationFrame(this.move.bind(this));

        if (!this.alreadyMoving) {
            window.cancelAnimationFrame(id);
        }
    }

    collison(sprite) {
        let clawBox = this.node.getBoundingClientRect();
        let spriteBox = sprite.getBoundingClientRect();
        let collison = false;
        
        if (clawBox.left < spriteBox.right && clawBox.right > spriteBox.left) {
            if (clawBox.top < spriteBox.bottom && clawBox.bottom > spriteBox.top) {
                sprite.remove();
                collison = true;
            }
        }
        return collison;
    }
}