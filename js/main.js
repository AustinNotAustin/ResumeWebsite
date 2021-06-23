// Reference to the HTML elements
const map = document.querySelector(".map");
const character = document.querySelector(".character");

const speed = 0.5; // Speed of player character movement in px/frame
const runnerSpeed = 0.1;
const floatSpeed = 1.2;

//
//
//
//
//
// Tubers toooobing
//
//
//
//
//


// Set the HTML Elements for the tubers
const tuber1Class = document.querySelector(".tuber1");
const tuber1Sheet = document.querySelector(".tuber1sheet");

const tuber2Class = document.querySelector(".tuber2");
const tuber2Sheet = document.querySelector(".tuber2sheet");



// Create a new toooober object
function Tuber (tuberClass, tuberSheet) {
    
    // River/Tuber max and min x values
    const maxRiverX = 480;


    // Get the pixel size each iteration to ensure the most accurate value is available
    //var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
    
    this.x = -48;
    this.y = 0;
    this.skin = 0;
    this.tuberClass = tuberClass;
    this.tuberSheet = tuberSheet;
    
    var px;
    var currentBG;
    var bgNum = 0;
    var count = 0;

    // Func to float the toooober down left
    this.float = function () {
        
        px = getPixelSize();
        
        // Move the toooober back to the right side if x == -22, reset the skin, and random y
        if (this.x < -48) {
            currentBG = randomInt(0, 15);
            bgNum = currentBG * -24;
            this.x = maxRiverX;
            this.tuberSheet.style.setProperty("background-position-y", `${bgNum * px}px`);
            this.y = randomInt(400, 430); // Randomly select the y value from the range
            // this.skin = randomInt(0, 3) * -22; // Get a random number (0-3, since there are 4 options) then multiple by -22 (for the px's)
        }
        
        if (count == 100) {
            this.y -= (0.2 * floatSpeed);
        }

        if (count == 200) {
            this.y += (0.2 * floatSpeed);
            count = 0;
        }

        count++;
        
        if (this.x > 130) {
            this.y += (0.004 * floatSpeed);
        }

        this.x -= (0.02 * floatSpeed);
        this.tuberSheet.style.setProperty("background-position-y", `${bgNum * px}px`);
        this.tuberClass.style.transform = `translate3d( ${this.x * px}px, ${this.y * px}px, 0)`;

    }
}
    
// Create the tuber objects
let tuber1Obj = new Tuber(tuber1Class, tuber1Sheet);
let tuber2Obj = new Tuber(tuber2Class, tuber2Sheet);


//
//
//
//
//
// Track Runners
//
//
//
//
//

// Soldier/Runner on track
const runner1Class = document.querySelector(".soldier1");
const runner1SpriteSheet = document.querySelector(".soldier1SpriteSheet");

const runner2Class = document.querySelector(".soldier2");
const runner2SpriteSheet = document.querySelector(".soldier2SpriteSheet");


// Create the runner class
function Runner (runnerClass, runnerSpriteSheet, x, y) {
    this.class = runnerClass;
    this.spriteSheet = runnerSpriteSheet;
    
    // State of runners (X and Y pos)
    this.x = x;
    this.y = y;
    
    // Set the Sprite Sheet pxs to direction 
    var up = -32;
    var runnerDown = 0;
    var left = -48;
    var right = -16;
    
    var px;
    
    // Set their running limits
    // Left and right sides of the track
    var runnerLeftLimit = 44;
    var runnerRightLimit = 180;
    
    // Top of the track before the curve
    var runnerTopLimit = 810;
    var runnerBottomLimit = 1000;
    
    // Top of the track curve
    var runnerCurveTop = 770;
    var runnerCurveBottom = 1040;
    
    // Left and right sides of the top of the track curve
    var runnerMidRight = 140;
    var runnerMidLeft = 84;
    
    
    // Make them run
    this.run = function () {
        
        // Get the pixel size each iteration to ensure the most accurate value is available
        px = getPixelSize();
        
        
        // Check their x and y pos
        // 1 to 2 to 3 (Top Left and Top Middle)
        if (this.y >= runnerCurveTop && this.x < runnerMidRight && this.x >= runnerLeftLimit && this.y <= runnerTopLimit) {
            this.x += runnerSpeed;
            this.y -= runnerSpeed; // Going north east
            this.spriteSheet.style.setProperty("background-position-y", `${right * px}px`);
        }
        
        // 3 to 4 (Top Middle and Top Right)
        if (this.y >= runnerCurveTop && this.x >= runnerMidRight && this.x < runnerRightLimit && this.y < runnerTopLimit) {
            this.x += runnerSpeed;
            this.y += runnerSpeed; // Going south east
        }
        
        // 4 to 5 (Right)
        if (this.x == runnerRightLimit && this.y < runnerBottomLimit) {
            this.y += runnerSpeed; // Going south
            this.spriteSheet.style.setProperty("background-position-y", `${runnerDown * px}px`);
        }
        
        // 5 to 6 to 7 (Bottom Right and Bottom Middle)
        if (this.y <= runnerCurveBottom && this.y >= runnerBottomLimit && this.x <= runnerRightLimit && this.x > runnerMidLeft) {
            this.x -= runnerSpeed;
            this.y += runnerSpeed; // Going south west
            this.spriteSheet.style.setProperty("background-position-y", `${left * px}px`);
        }
        
        // 6 to 7 (Bottom Middle and Bottom Left)
        if (this.y <= runnerCurveBottom && this.y >= runnerBottomLimit && this.x >= runnerLeftLimit && this.x <= runnerMidLeft) {
            this.x -= runnerSpeed;
            this.y -= runnerSpeed; // Going north west
        }
        
        // 7 to 8 (Left)
        if (this.x == runnerLeftLimit && this.y >= runnerTopLimit) {
            this.y -= runnerSpeed; // Going north
            this.spriteSheet.style.setProperty("background-position-y", `${up * px}px`);
        }
        
        // Clamp their running
        if (this.x < runnerLeftLimit) { this.x = runnerLeftLimit; }
        if (this.x > runnerRightLimit) { this.x = runnerRightLimit; }
        if (this.y < runnerCurveTop) { this.y = runnerCurveTop; }
        if (this.y > runnerCurveBottom) { this.y = runnerCurveBottom; }
        
        // Set their positions
        this.class.style.transform = `translate3d( ${this.x * pixelSize}px, ${this.y * pixelSize}px, 0)`;
    }
    
    
    
    
}


// Create the runner objects
let runner1Obj = new Runner(runner1Class, runner1SpriteSheet, 180, 850);
let runner2Obj = new Runner(runner2Class, runner2SpriteSheet, 180, 810);


//
//
//
//
//
// Awful Speech Dude
//
//
//
//
//

var container = document.querySelector(".text");

var speeds = {
    pause: 750,
    slow: 500,
    normal: 250,
    fast: 100
}

var speech = [
    { string: "Uhm, Hey everyone. ", speed: speeds.normal },
    { string: "Thanks for letting me practice my speech. ", speed: speeds.normal },
    { string: "Well, I mean, thanks for listening to me... ", speed: speeds.normal },
    { string: "practice my speech... in front of you... ", speed: speeds.normal },
    { string: "while you listen to me... some of you... ", speed: speeds.normal },
    { string: "Not that that's a problem though! ", speed: speeds.fast },
    { string: "I don't care if you listen or not! ", speed: speeds.fast },
    { string: "Wait! Yes I do, I do care! ", speed: speeds.fast },
    { string: "It's just that I'm not bothered by you not ", speed: speeds.normal },
    { string: "listening to my speech ", speed: speeds.normal },
    { string: "since it's just practice. ", speed: speeds.slow },
    { string: "Right. Well. *cough* I should, uh..  ", speed: speeds.slow },
    { string: "I should get started with the speech. ", speed: speeds.normal },
    { string: "Is anyone else hot? ", speed: speeds.normal },
    { string: "It feels pretty hot to me. ", speed: speeds.normal },
    { string: "I think I'm sweating a little bit. ", speed: speeds.slow },
    { string: "I should have brought my water bottle. ", speed: speeds.normal },
    { string: "I didn't put it in the fridge though, ", speed: speeds.normal },
    { string: "so it wasn't cold how I like it this morning. ", speed: speeds.normal },
    { string: "I prefer fridge temp water over ice water. ", speed: speeds.normal },
    { string: "I think it's my freezer. ", speed: speeds.normal },
    { string: "Well, it might be the ice maker actually. ", speed: speeds.slow },
    { string: "I should have the filter replaced soon. ", speed: speeds.normal },
    { string: "I can't remember the last time I replace the filter. ", speed: speeds.normal },
    { string: "Sheesh! That's pretty gross, huh!? ", speed: speeds.fast },
]

var characters = [];
textLines.forEach(line => {

    line.string.split("").forEach(character => {
        var span = document.createElement("span");
        span.textContent = character;
        container.appendChild(span);
        characters.push({
            span: span,
            isSpace: character === " ",
            delayAfter: line.speed,
            classes: line.classes || []
            // test
        })
    })

})

//
//
//
//
//
// Player Character
//
//
//
//
//

var x = 80;
var y = 32;
var held_directions = []; // State of which arrow keys are being held down

const placeCharacter = () => {

    // Get the pixelSize var from the CSS sheet
    var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

    // The most current held direction
    const held_direction = held_directions[0];

    if (held_direction) {
        if (held_direction === directions.down) { y += speed; }
        if (held_direction === directions.up) { y -= speed; }
        if (held_direction === directions.left) { x -= speed; }
        if (held_direction === directions.right) { x += speed; }
        character.setAttribute("facing", held_direction);
    }
    
    character.setAttribute("walking", held_direction ? "true" : "false");

    // Set the constriants / walls
    var leftLimit = 16 * 14.5;
    var rightLimit = 16 * 14.5;
    var topLimit = 16 * 10;
    var bottomLimit = 16 * 152;
    if (x < leftLimit) { x = leftLimit; }
    if (x > rightLimit) { x = rightLimit; }
    if (y < topLimit) { y = topLimit; }
    if (y > bottomLimit) { y = bottomLimit }
    
    var camera_left = pixelSize * 100;
    var camera_top = pixelSize * 50;

    map.style.transform = `translate3d( ${-x * pixelSize + camera_left}px, ${-y * pixelSize + camera_top}px, 0)`;

    character.style.transform = `translate3d( ${x * pixelSize}px, ${y * pixelSize}px, 0)`;
}


// Direction key state
const directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

const keys = {
    ArrowUp: directions.up,
    ArrowDown: directions.down,
    ArrowLeft: directions.left,
    ArrowRight: directions.right,
    Up: directions.up,
    Down: directions.down,
    Left: directions.left,
    Right: directions.right,
}

document.addEventListener("keydown", (e) => {
    var dir = keys[e.key];
    if (dir && held_directions.indexOf(dir) === -1) {
        held_directions.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    var dir = keys[e.key];
    var index = held_directions.indexOf(dir);
    if (index > -1) {
        held_directions.splice(index, 1)
    }
});

// 
//
//
//
//
// Set up the game loop
//
//
//
//
//


const step = () => {
    placeCharacter();
    tuber1Obj.float();
    tuber2Obj.float();
    runner1Obj.run();
    runner2Obj.run();
    window.requestAnimationFrame(() => {
        step();
    })
}
step(); // Take the first step

//
//
//
//
//
// Tools
//
//
//
//
//

function randomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}


var pixelSize;
function getPixelSize () {
    // Get the pixel size each iteration to ensure the most accurate value is available
    pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

    return pixelSize;
}