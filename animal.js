export default class Animal {
  constructor(id, maxWidth, maxHeight, gameSpace) {
    this.node = document.createElement('div');
    this.node.classList.add('animal');
    this.node.id = "animal" + id;

    this.maxHeight = maxHeight;
    this.maxWidth = maxWidth;
    this.width = this.node.offsetWidth;
    this.height = this.node.offsetHeight;
    
    this.posX = this.getRandomInt(0);
    this.posY = this.getRandomInt(1);
    this.speed = Math.random();
    
    this.xDirection = this.randomDirection();
    this.yDirection = this.randomDirection();
    
    this.node.style.left = this.posX + "px";
    this.node.style.top = this.posY + "px";
    
    this.hasTouchedTop = false;
    this.hasTouchedBottom = false;
    this.hasTouchedLeft = false;
    this.hasTouchedRight = false;
    
    gameSpace.appendChild(this.node);

  }

  move() {
    if (this.posX <= 0) {
      this.hasTouchedLeft = true;
    }
    if (this.posX > this.maxWidth - this.width) {
      this.hasTouchedRight = true;
    }
    if (this.posY <= 0) {
      this.hasTouchedTop = true;
    }
    if (this.posY > this.maxHeight - this.height) {
      this.hasTouchedBottom = true;
    }
    this.bounce();
  
    this.posX += this.xDirection;
    this.posY += this.yDirection;
    this.node.style.left = this.posX + 'px';
    this.node.style.top = this.posY + 'px'; 
  }

  handleStart() {
    console.log('touch');
    this.node.style.color = "green";
  }

  handleEnd() {
    console.log('end');
  }

  handleCancel() {
    console.log('cancel');
  }

  handleMove() {
    console.log('move');
  }

  bounce() {
    if (this.hasTouchedLeft || this.hasTouchedRight) {
      this.xDirection = -this.xDirection;
      this.hasTouchedLeft = false;
      this.hasTouchedRight = false;
    }
    if (this.hasTouchedTop || this.hasTouchedBottom) {
      this.yDirection = -this.yDirection;
      this.hasTouchedTop = false;
      this.hasTouchedBottom = false;
    }
  }

  randomDirection() {
    return Math.random() > 0.5 ? 1 : -1;
  }
  
  getRandomInt(dimension) {
    if (dimension == 0) {
      return Math.floor(Math.random() * (this.maxWidth - this.width));
    }
    return Math.floor(Math.random() * (this.maxHeight - this.height));
    
  }

}

