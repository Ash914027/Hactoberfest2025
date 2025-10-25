window.addEventListener("load", function () {
  const canvas = this.document.getElementById("canvas1");
  const ctx = canvas.getContext("2d");
  canvas.width = 1280;
  canvas.height = 720;
  
  ctx.fillStyle = "white"; // hard-coated the color of the 'fill' method with white
  ctx.lineWidth = 3;
  ctx.strokeStyle = "black";
  ctx.font = "40px Bangers";
  ctx.textAlign = "center";

  class Player {
    constructor(game) {
      // game args so that the player knows the limitations of the width and height for easier movement
      this.game = game;
      // starting position of the player should be on the middle
      this.collisionX = this.game.width * 0.5; // to keep them in the middle of the canvas
      this.collisionY = this.game.height * 0.5;
      this.collisionRadius = 30;
      this.speedX = 0; // speed of the player along x-axis
      this.speedY = 0; // speed along y-axis
      this.dx = 0; // distance of the player from the mouse along  x-axis
      this.dy = 0; // distance along y-axis
      this.speedModifier = 5;
      this.spriteWidth = 255;
      this.spriteHeight = 255;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      this.frameX = 0;
      this.frameY = 5;
      this.image = document.getElementById("bull");
    }

    restart() {
      this.collisionX = this.game.width * 0.5;
      this.collisionY = this.game.height * 0.5;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 100;
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );
      if (this.game.debug) {
        context.beginPath(); // to start a new shape and close any previous shape if any
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        ); // used to draw a circle; expects 5 args; x,y coords for center point, radius, start angle in radians, end angle
        context.save();
        context.globalAlpha = 0.5; // sets the opacity of the shape to semi-transparent
        context.fill(); // default color is black ; used to fill color in the shape made
        context.restore();
        // wrapped the made changes between save() and restore() method to avoid sharing with other shapes
        context.stroke(); // used to outline the shape made ; default is black, 1px stroke

        context.beginPath();
        context.moveTo(this.collisionX, this.collisionY); // define the starting x and y coords of the line
        context.lineTo(this.game.mouse.x, this.game.mouse.y); // define the ending x and y coords of the line
        context.stroke(); // to make the line visible
      }
    }

    update() {
      this.dx = this.game.mouse.x - this.collisionX; // one method for the player movement ; problem here is the speed is not constant
      this.dy = this.game.mouse.y - this.collisionY;
      const angle = Math.atan2(this.dy, this.dx); // Returns the angle (in radians) from the X axis to a point.
      if (angle < -2.74 || angle > 2.74) this.frameY = 6;
      else if (angle < -1.96) this.frameY = 7;
      else if (angle < -1.17) this.frameY = 0;
      else if (angle < -0.39) this.frameY = 1;
      else if (angle < 0.39) this.frameY = 2;
      else if (angle < 1.17) this.frameY = 3;
      else if (angle < 1.96) this.frameY = 4;
      else if (angle < 2.74) this.frameY = 5;

      // console.log(angle);

      const distance = Math.hypot(this.dy, this.dx); // other method for the player movement ; speed here is constant as we are targeting the longest distance only

      if (distance > this.speedModifier) {
        this.speedX = this.dx / distance || 0; // makes the object move towards the mouse smoothly along x-axis
        this.speedY = this.dy / distance || 0; // makes the object move towards the mouse smoothly along y-axis
      } // to stop the vibration of the player
      else {
        this.speedX = 0;
        this.speedY = 0;
      }
      this.collisionX += this.speedX * this.speedModifier;
      // adding the difference so that the object actually move
      this.collisionY += this.speedY * this.speedModifier; // multiplied by the speedModifier makes the player vibrate as now the player is pushed too far in both directions
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 100;

      // horizonntal boundaries

      if (this.collisionX < this.collisionRadius) {
        this.collisionX = this.collisionRadius;
      } else if (this.collisionX > this.game.width - this.collisionRadius) {
        this.collisionX = this.game.width - this.collisionRadius;
      }

      // vertical boundaries4

      if (this.collisionY < this.game.topMargin + this.collisionRadius) {
        this.collisionY = this.game.topMargin + this.collisionRadius;
      } else if (this.collisionY > this.game.height - this.collisionRadius) {
        this.collisionY = this.game.height - this.collisionRadius;
      }

      // collision with obstacles
      this.game.obstacles.forEach((obstacle) => {
        let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollsion(
          this,
          obstacle
        );

        if (collision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;

          this.collisionX = obstacle.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = obstacle.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
      // when collision is detected with the obstacle then the player can't pass through it
    } // make the object (player) follow the mouse (line)
  } // movements and other things of the player

  class Obstacle {
    constructor(game) {
      this.game = game; // we got the access of all the game properties
      this.collisionX = Math.random() * this.game.width;
      this.collisionY = Math.random() * this.game.height;
      this.collisionRadius = 40;
      this.image = document.getElementById("obstacles");
      this.spriteWidth = 250;
      this.spriteHeight = 250;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 70;
      this.frameX = Math.floor(Math.random() * 4);
      this.frameY = Math.floor(Math.random() * 3);
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      ); // used to draw image on the canvas
      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
      }
    }

    update() {}
  }

  class Egg {
    constructor(game) {
      this.game = game;
      this.collisionRadius = 40;
      this.margin = this.collisionRadius * 2; // space between the collision area and the edges of the game area
      this.collisionX =
        this.margin + Math.random() * (this.game.width - this.margin);
      // this.collisionX = Math.random() * (this.game.width)
      this.collisionY =
        this.game.topMargin +
        Math.random() * (this.game.height - this.game.topMargin - this.margin);
      this.image = document.getElementById("egg");
      this.spriteWidth = 110;
      this.spriteHeight = 135;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      // egg hatching logic
      this.hatchTimer = 0;
      this.hatchInterval = 5000;
      this.markedForDeletion = false;
    }

    draw(context) {
      context.drawImage(this.image, this.spriteX, this.spriteY);
      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
        const displayTimer = (this.hatchTimer * 0.001).toFixed(0);
        context.fillText(
          displayTimer,
          this.collisionX,
          this.collisionY - this.collisionRadius * 2.5
        );
      }
    }

    update(deltaTime) {
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 30;
      // collision
      let collisionObject = [
        this.game.player,
        ...this.game.obstacles,
        ...this.game.enemies,
      ]; // contains all the objects from which the eggs will collide
      // '...' spread op -> used to quickly expand elements in an array into another array

      collisionObject.forEach((object) => {
        let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollsion(
          this,
          object
        );
        if (collision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
      // hatching
      if (
        this.hatchTimer > this.hatchInterval ||
        this.collisionY < this.game.topMargin
      ) {
        this.game.hatchlings.push(
          new Larva(this.game, this.collisionX, this.collisionY)
        );
        this.markedForDeletion = true;
        this.game.removeGameObjects();
      } else {
        this.hatchTimer += deltaTime;
      }
    }
  }

  class Larva {
    constructor(game, x, y) {
      this.game = game;
      this.collisionX = x;
      this.collisionY = y;
      this.collisionRadius = 30;
      this.image = document.getElementById("larva");
      this.spriteWidth = 150;
      this.spriteHeight = 150;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.spriteX;
      this.spriteY;
      this.speedY = 1 + Math.random();
      this.frameX = 0;
      this.frameY = Math.floor(Math.random() * 2);
    }

    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );
      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
      }
    }

    update() {
      this.collisionY -= this.speedY;
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height * 0.5 - 40;
      // move to safety
      if (this.collisionY < this.game.topMargin) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
        if (!this.game.gameOver) this.game.score++;
        for (let i = 0; i < 10; i++) {
          this.game.particles.push(
            new FireFly(this.game, this.collisionX, this.collisionY, "yellow")
          );
        }
      }

      // collision with objects and hatchlings
      let collisionObject = [this.game.player, ...this.game.obstacles, ...this.game.eggs];
      collisionObject.forEach((object) => {
        let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollsion(
          this,
          object
        );
        if (collision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
      // collision of enemies
      this.game.enemies.forEach((enemy) => {
        if (this.game.checkCollsion(this, enemy)[0] && !this.game.gameOver) {
          this.markedForDeletion = true;
          this.game.removeGameObjects();
          this.game.lostHatchlings++;
          for (let i = 0; i < 10; i++) {
            this.game.particles.push(
              new Spark(this.game, this.collisionX, this.collisionY, "blue")
            );
          }
        }
      });
    }
  }

  class Enemy {
    constructor(game) {
      this.game = game;
      this.collisionRadius = 30;
      this.speedX = Math.random() * 3 + 0.5;
      this.image = document.getElementById("toads");
      this.spriteWidth = 140;
      this.spriteHeight = 260;
      this.width = this.spriteWidth;
      this.height = this.spriteHeight;
      this.collisionX =
        this.game.width + this.width + Math.random() * this.game.width * 0.5;
      this.collisionY =
        this.game.topMargin +
        Math.random() * (this.game.height - this.game.topMargin);
      this.spriteX;
      this.spriteY;
      this.frameX = 0;
      this.frameY = Math.floor(Math.random() * 4);
    }
    draw(context) {
      context.drawImage(
        this.image,
        this.frameX * this.spriteWidth,
        this.frameY * this.spriteHeight,
        this.spriteWidth,
        this.spriteHeight,
        this.spriteX,
        this.spriteY,
        this.width,
        this.height
      );
      if (this.game.debug) {
        context.beginPath();
        context.arc(
          this.collisionX,
          this.collisionY,
          this.collisionRadius,
          0,
          Math.PI * 2
        );
        context.save();
        context.globalAlpha = 0.5;
        context.fill();
        context.restore();
        context.stroke();
      }
    }
    update() {
      this.spriteX = this.collisionX - this.width * 0.5;
      this.spriteY = this.collisionY - this.height + 40;
      this.collisionX -= this.speedX;
      if (this.spriteX + this.width < 0 && !this.game.gameOver) {
        this.collisionX =
          this.game.width + this.width + Math.random() * this.game.width * 0.5;
        this.collisionY =
          this.game.topMargin +
          Math.random() * (this.game.height - this.game.topMargin);
        this.frameY = Math.floor(Math.random() * 4);
      }
      let collisionObject = [this.game.player, ...this.game.obstacles]; // contains all the objects from which the enemies will collide with
      // '...' spread op -> used to quickly expand elements in an array into another array

      collisionObject.forEach((object) => {
        let [collision, distance, sumOfRadii, dx, dy] = this.game.checkCollsion(
          this,
          object
        );
        if (collision) {
          const unit_x = dx / distance;
          const unit_y = dy / distance;
          this.collisionX = object.collisionX + (sumOfRadii + 1) * unit_x;
          this.collisionY = object.collisionY + (sumOfRadii + 1) * unit_y;
        }
      });
    }
  }

  class Particle {
    constructor(game, x, y, color) {
      this.game = game;
      this.collisionX = x;
      this.collisionY = y;
      this.color = color;
      this.radius = Math.floor(Math.random() * 10 + 5);
      this.speedX = Math.random() * 6 - 3;
      this.speedY = Math.random() * 2 + 0.5;
      this.angle = 0;
      this.va = Math.random() * 0.1 + 0.01; // velocity of angle
      this.markedForDeletion = false;
    }

    draw(context) {
      context.save();
      context.fillStyle = this.color;
      context.beginPath();
      context.arc(
        this.collisionX,
        this.collisionY,
        this.radius,
        0,
        Math.PI * 2
      );
      context.fill();
      context.stroke();
      context.restore();
    }
  }

  class FireFly extends Particle {
    update() {
      this.angle += this.va;
      this.collisionX += Math.cos(this.angle) * this.speedX;
      this.collisionY -= this.speedY;
      if (this.collisionY < 0 - this.radius) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
      }
    }
  }

  class Spark extends Particle {
    update() {
      this.angle += this.va * 0.5;
      this.collisionX -= Math.cos(this.angle) * this.speedX;
      this.collisionY -= Math.sin(this.angle) * this.speedY;
      if (this.radius > 0.1) this.radius -= 0.05;
      if (this.radius < 0.2) {
        this.markedForDeletion = true;
        this.game.removeGameObjects();
      }
    }
  }

  class Game {
    constructor(canvas) {
      this.canvas = canvas;
      this.width = this.canvas.width;
      this.height = this.canvas.height;
      this.topMargin = 260;
      this.debug = false;
      this.player = new Player(this);
      this.fps = 70;
      this.timer = 0; // starts from 0 to a threshold value after which the next animation frame is called; reset back to zero
      this.interval = 1000 / this.fps;
      this.eggTimer = 0; // same logic as for FPS
      this.eggInterval = 1000;
      this.obstacles = [];
      this.eggs = [];
      this.gameObjects = [];
      this.enemies = [];
      this.hatchlings = [];
      this.particles = [];
      this.score = 0;
      this.gameOver = false;
      this.lostHatchlings = 0;
      this.numberOfObstacles = 10;
      this.maxEggs = 5;
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };
      this.winningScore = 30

      this.canvas.addEventListener("mousedown", (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = true;
        // coordinate of the click on the target node
        // console.log(this.mouse.x, this.mouse.y); // gives error because the 'this' keyword forgets its reference i.e. it forgets its lexical scoping
        // to overcome this using arrow functions
      });

      this.canvas.addEventListener("mouseup", (e) => {
        this.mouse.x = e.offsetX;
        this.mouse.y = e.offsetY;
        this.mouse.pressed = false;
      });

      this.canvas.addEventListener("mousemove", (e) => {
        if (this.mouse.pressed) {
          this.mouse.x = e.offsetX;
          this.mouse.y = e.offsetY;
        }
      });
      window.addEventListener("keydown", (e) => {
        if (e.key == "d") this.debug = !this.debug;
        else if (e.key == "r") this.restart();
      });
    }
    render(context, deltaTime) {
      // draw or update all objects
      if (this.timer > deltaTime) {
        // animate next frame
        context.clearRect(0, 0, this.width, this.height);
        // this.obstacles.forEach((obstacle) => obstacle.draw(context));
        this.gameObjects = [
          ...this.eggs,
          ...this.obstacles,
          this.player,
          ...this.enemies,
          ...this.hatchlings,
          ...this.particles,
        ]; // here the order matter bcz the draw method wil draw the objecst on top of each other as per the sequence

        // sort by vertical posi
        this.gameObjects.sort((a, b) => {
          return a.collisionY - b.collisionY;
        }); // as the vertical posi changes, the object automatically goes to back of the existing object

        this.gameObjects.forEach((object) => {
          object.draw(context);
          object.update(deltaTime);
        });
        // this.player.draw(context);
        // this.player.update();
        this.timer = 0;
      }
      this.timer += deltaTime;

      // add eggs periodically
      if (
        this.eggTimer > this.eggInterval &&
        this.eggs.length < this.maxEggs &&
        !this.gameOver
      ) {
        this.addEgg();
        this.eggTimer = 0;
      } else {
        this.eggTimer += deltaTime;
      }

      // draw status text
      context.save();
      context.textAlign = "left";
      context.fillText("Score: " + this.score, 25, 50);
      if (this.debug) {
        context.fillText("Lost: " + this.lostHatchlings, 25, 100);
      }
      context.restore();

      // win or lose
      if (this.score >= this.winningScore || this.lostHatchlings >= 10) {
        this.gameOver = true;
        context.save();
        context.fillStyle = "rgba(0, 0, 0, 0.5)";
        context.fillRect(0, 0, this.width, this.height);
        context.fillStyle = "white";
        context.textAlign = "center";
        context.shadowOffsetX = 4; // property of the canvas element, performance expensive ; not supported by most of the browsers
        context.shadowOffsetY = 4;
        context.shadowColor = "black";
        let message1, message2;
        if (this.score >= this.winningScore) {
          message1 = "Good Job!!";
          message2 = "You are a saviour!!";
        } else if (this.lostHatchlings >= 10) {
          message1 = "Oh No!!";
          message2 = `You lost ${this.lostHatchlings} hatchlings, don't be a pushover!!`;
        }
        context.font = "130px Bangers";
        context.fillText(message1, this.width * 0.5, this.height * 0.5 - 20);
        context.font = "40px Bangers";
        context.fillText(message2, this.width * 0.5, this.height * 0.5 + 30);
        context.fillText(
          `Final Score: ${this.score}. Press 'R' to restart!!`,
          this.width * 0.5,
          this.height * 0.5 + 80
        );
        context.restore();
      }
    }

    addEgg() {
      this.eggs.push(new Egg(this));
    }

    removeGameObjects() {
      this.eggs = this.eggs.filter((object) => !object.markedForDeletion);
      this.hatchlings = this.hatchlings.filter(
        (object) => !object.markedForDeletion
      );
      this.particles = this.particles.filter(
        (object) => !object.markedForDeletion
      );
    }
    addEnemy() {
      this.enemies.push(new Enemy(this));
    }
    checkCollsion(a, b) {
      const dx = a.collisionX - b.collisionX;
      const dy = a.collisionY - b.collisionY;
      const distance = Math.hypot(dy, dx);
      const sumOfRadii = a.collisionRadius + b.collisionRadius;

      return [distance < sumOfRadii, distance, sumOfRadii, dx, dy];
    }
    restart() {
      this.player.restart();
      this.obstacles = [];
      this.eggs = [];
      this.gameObjects = [];
      this.enemies = [];
      this.hatchlings = [];
      this.particles = [];
      this.mouse = {
        x: this.width * 0.5,
        y: this.height * 0.5,
        pressed: false,
      };
      this.score = 0
      this.lostHatchlings = 0
      this.gameOver = false
      this.init()
    }
    init() {
      for (let i = 0; i < 5; i++) {
        this.addEnemy();
        // console.log(this.enemies);
      }
      let attempts = 0;
      while (this.obstacles.length < this.numberOfObstacles && attempts < 500) {
        let testObstacle = new Obstacle(this);
        let overlapped = false;
        this.obstacles.forEach((obstacle) => {
          // using circle pack algo
          const dx = testObstacle.collisionX - obstacle.collisionX; // difference between the two obstacles horizontally
          const dy = testObstacle.collisionY - obstacle.collisionY; // difference between the two obstacles vertically
          const distance = Math.hypot(dx, dy);
          const distanceBuffer = 150; // minimum space for better movement of player between obstacles
          const sumOfRadii =
            testObstacle.collisionRadius +
            obstacle.collisionRadius +
            distanceBuffer;

          if (distance < sumOfRadii) {
            overlapped = true;
          }
        });
        const margin = testObstacle.collisionRadius * 3;
        if (
          !overlapped &&
          testObstacle.spriteX > 0 &&
          testObstacle.spriteX < this.width - testObstacle.width &&
          testObstacle.collisionY > this.topMargin + margin &&
          testObstacle.collisionY < this.height - margin
        ) {
          this.obstacles.push(testObstacle);
        }
        attempts++;
      }
    } // it will create obstacles and push them into the obstacle array
  } // controls our whole logic of the game

  const game = new Game(canvas);
  game.init();
  console.log(game);

  let lastTime = 0;
  function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime; // difference between the timestamp from this animation loop and the timestamp from the previous animation loop
    lastTime = timeStamp;
    // console.log(deltaTime)
    // ctx.clearRect(0, 0, canvas.width, canvas.height); // built-in method used to clear the shapes ; takes the starting coords and ending coords
    game.render(ctx, deltaTime); // because this is to be called again and again
    requestAnimationFrame(animate);
  } // animations of the game required

  animate(0);
});