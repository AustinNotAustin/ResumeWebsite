// Reference to the HTML elements
const map = document.querySelector(".map");
const character = document.querySelector(".character");

var speed = 0.75; // Speed of player character movement in px/frame
const runnerSpeed = 0.25;

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
    var floatSpeed = 1;

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
const runner1 = document.querySelector(".soldier1");

// State of runners
var runner1x = 185;
var runner1y = 800;

const runNPCs = () => {

    // Get the pixel size each iteration to ensure the most accurate value is available
    var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

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

    // 1 to 2 to 3 (Top Left and Top Middle)
    if (runner1y >= runnerCurveTop && runner1x < runnerMidRight && runner1x >= runnerLeftLimit && runner1y <= runnerTopLimit) {
        runner1x += runnerSpeed;
        runner1y -= runnerSpeed; // Going north east
        runner1.setAttribute("facing", "right");
    }

    // 3 to 4 (Top Middle and Top Right)
    if (runner1y >= runnerCurveTop && runner1x >= runnerMidRight && runner1x < runnerRightLimit && runner1y < runnerTopLimit) {
        runner1x += runnerSpeed;
        runner1y += runnerSpeed; // Going south east
    }

    // 4 to 5 (Right)
    if (runner1x == runnerRightLimit && runner1y < runnerBottomLimit) {
        runner1y += runnerSpeed; // Going south
        runner1.setAttribute("facing", "down");
    }

    // 5 to 6 to 7 (Bottom Right and Bottom Middle)
    if (runner1y <= runnerCurveBottom && runner1y >= runnerBottomLimit && runner1x <= runnerRightLimit && runner1x > runnerMidLeft) {
        runner1x -= runnerSpeed;
        runner1y += runnerSpeed; // Going south west
        runner1.setAttribute("facing", "left");
    }

    // 6 to 7 (Bottom Middle and Bottom Left)
    if (runner1y <= runnerCurveBottom && runner1y >= runnerBottomLimit && runner1x >= runnerLeftLimit && runner1x <= runnerMidLeft) {
        runner1x -= runnerSpeed;
        runner1y -= runnerSpeed; // Going north west
    }

    // 7 to 8 (Left)
    if (runner1x == runnerLeftLimit && runner1y >= runnerTopLimit) {
        runner1y -= runnerSpeed; // Going north
        runner1.setAttribute("facing", "up");
    }

    // Keep runner within limits
    if (runner1x < runnerLeftLimit) { runner1x = runnerLeftLimit; }
    if (runner1x > runnerRightLimit) { runner1x = runnerRightLimit; }
    if (runner1y < runnerCurveTop) { runner1y = runnerCurveTop; }
    if (runner1y > runnerCurveBottom) { runner1y = runnerCurveBottom; }

    runner1.style.transform = `translate3d( ${runner1x * pixelSize}px, ${runner1y * pixelSize}px, 0)`;
}

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
    runNPCs();
    tuber1Obj.float();
    tuber2Obj.float();
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