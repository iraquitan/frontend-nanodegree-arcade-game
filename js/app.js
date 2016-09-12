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
    ctx.drawImage(Resources.get(this.sprite), this.spriteX, this.spriteY);
};
// Reset the enemy on the screen
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
    this.y = this.spriteY+93;
    this.width = 68;
    this.height = 47;
    this.sprite = 'images/char-boy.png';
    this.selected = false;
    this.life = 3;
};
// Update the player's position, required method for game
Player.prototype.update = function (input) {
    if (input === "left") {
        if ((this.spriteX - 101) >= xBounds.min) {
            this.spriteX -= 101;
            this.x = this.spriteX+17;
        }
    } else if (input === "right") {
        if ((this.spriteX + 101) < xBounds.max) {
            this.spriteX += 101;
            this.x = this.spriteX+17;
        }
    } else if (input === "up") {
        if ((this.spriteY - 83) > yBounds.min) {
            this.spriteY -= 83;
            this.y = this.spriteY+93;
        } else {
            this.reset();
        }
    } else if (input === "down") {
        if ((this.spriteY + 83) <= yBounds.max) {
            this.spriteY += 83;
            this.y = this.spriteY+93;
        }
    }
};
// Handle inputs for the player
Player.prototype.handleInput = function (input) {
    this.update(input);
};
// Render the player sprite on canvas
Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.spriteX, this.spriteY);
};
// Reset player's initial position
Player.prototype.reset = function () {
    this.spriteX = 2*101;
    this.spriteY = 383;
    this.x = this.spriteX+17;
    this.y = this.spriteY+93;
};

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// The Selector class definition
var Selector = function () {
    this.players = {
        0: 'images/char-boy.png',
        1: 'images/char-cat-girl.png',
        2: 'images/char-horn-girl.png',
        3: 'images/char-pink-girl.png',
        4: 'images/char-princess-girl.png'
    };
    this.spriteX = 2*101;
    this.spriteY = 383;
    this.sprite = 'images/Selector.png';
};
// Renders the selector on canvas
Selector.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.spriteX, this.spriteY);
};
// Updates the Selector's position on canvas
Selector.prototype.update = function (input) {
    if (input === "left") {
        selectSound.play();
        if ((this.spriteX - 101) >= xBounds.min) {
            this.spriteX -= 101;
        }
    } else if (input === "right") {
        selectSound.play();
        if ((this.spriteX + 101) < xBounds.max) {
            this.spriteX += 101;
        }
    }
};
Selector.prototype.handleInput = function (input) {
    if (input === "enter") {
        for (var key in this.players) {
            if (this.spriteX === key*101) {
                player.sprite = this.players[key];
                player.selected = true;
                document.removeEventListener('keyup', selectorEventHandler);
                document.addEventListener('keyup', playerEventHandler);
                break;
            }
        }
        selectedSound.play();
    } else {
        this.update(input);
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var difficulties = [
    {easy: [100, 200]},
    {normal: [200, 300]},
    {hard: [300, 500]}
];
var allEnemies = [1, 2, 3]
                    .map(function (speed) {
                        return new Enemy(getRandomIntInclusive(100, 500));
                    });
var player = new Player();
var playerSelector = new Selector();

document.addEventListener('keyup', selectorEventHandler);
// Handler function that listens for key presses and sends the keys to your
// Selector.handleInput() method. You don't need to modify this.
function selectorEventHandler(e) {
    var allowedKeys = {
        37: 'left',
        39: 'right',
        13: 'enter'
    };
    playerSelector.handleInput(allowedKeys[e.keyCode]);
}

// Handler function that listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
function playerEventHandler(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
}

function sound(src, loop) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    if (loop) {
        this.sound.setAttribute('loop', "");
    }
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    };
    this.stop = function(){
        this.sound.pause();
    };
}

// Add audio elements
var bgSound = new sound('audio/background.wav', true);
var gameOverSound = new sound('audio/game-over.wav');
var hurtSound = new sound('audio/hit-hurt.wav');
var selectSound = new sound('audio/select.wav');
var selectedSound = new sound('audio/selected.wav');