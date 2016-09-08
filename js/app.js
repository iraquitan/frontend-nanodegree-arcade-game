var xBounds = {min: 0, max: 505};
var yBounds = {min: 0, max: 5*83};
var enemyPositions = [50, 143, 225];
// Enemies our player must avoid
var Enemy = function(speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.spriteX = 0;
    this.spriteY = enemyPositions[getRandomIntInclusive(0, enemyPositions.length-1)];
    this.x = this.spriteX+2;
    this.y = this.spriteY+78;
    this.width = 93;
    this.height = 66;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.spriteX + (this.speed * dt) <= xBounds.max) {
        this.spriteX += this.speed * dt;
        this.x = this.spriteX+2;
        this.y = this.spriteY+78;
    } else {
        this.reset(); // Reset enemy position
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    // ctx.clearRect(this.spriteX+2, this.spriteY+78, 93, 66);
    ctx.drawImage(Resources.get(this.sprite), this.spriteX, this.spriteY);
    // ctx.rect(this.spriteX+2, this.spriteY+78, 93, 66);
    // ctx.stroke();
};
Enemy.prototype.reset = function () {
    this.spriteX = 0;
    this.spriteY = enemyPositions[getRandomIntInclusive(0, enemyPositions.length-1)];
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.spriteX = 2*101;
    this.spriteY = 383;
    this.x = this.spriteX+17;
    this.y = this.spriteY+63;
    this.width = 68;
    this.height = 77;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function (input) {
    if (input === "left") {
        // (this.spriteX - 101) >= xBounds.min ? this.spriteX -= 101 : this.spriteX -= 0;
        if ((this.spriteX - 101) >= xBounds.min) {
            this.spriteX -= 101;
            this.x = this.spriteX+17;
        }
    } else if (input === "right") {
        // (this.spriteX + 101) < xBounds.max ? this.spriteX += 101 : this.spriteX += 0;
        if ((this.spriteX + 101) < xBounds.max) {
            this.spriteX += 101;
            this.x = this.spriteX+17;
        }
    } else if (input === "up") {
        // (this.spriteY - 83) > yBounds.min ? this.spriteY -= 83 : this.reset();
        if ((this.spriteY - 83) > yBounds.min) {
            this.spriteY -= 83;
            this.y = this.spriteY+63;
        } else {
            this.reset();
        }
    } else if (input === "down") {
        // (this.spriteY + 83) <= yBounds.max ? this.spriteY += 83 : this.spriteX += 0;
        if ((this.spriteY + 83) <= yBounds.max) {
            this.spriteY += 83;
            this.y = this.spriteY+63;
        }
    }
};
Player.prototype.handleInput = function (input) {
    this.update(input);
};
Player.prototype.render = function () {
    // ctx.clearRect(this.spriteX+17, this.spriteY+63, 68, 77);
    ctx.drawImage(Resources.get(this.sprite), this.spriteX, this.spriteY);
    // ctx.rect(this.spriteX+17, this.spriteY+63, 68, 77);
    // ctx.stroke();
};
Player.prototype.reset = function () {
    this.spriteX = 2*101;
    this.spriteY = 383;
    this.x = this.spriteX+17;
    this.y = this.spriteY+63;
};

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [1, 2, 3]
                    .map(function (speed) {
                        return new Enemy(getRandomIntInclusive(100, 500));
                    });
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
