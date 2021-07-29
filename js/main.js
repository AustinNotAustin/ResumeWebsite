// Get the map/background
const map = document.querySelector(".map");

// Speed multipliers. Modifiers should be in multiples of 1
const globalSpeedModifier = 1; // This controls every moving objects speed, this is more for debugging (i.e. multiply the speed by 2, 3, 10, ect...)
var playerCharacterWalkSpeedModifier = 1; // Controls the playerCharacters speed, will get changed when sprinting
const runnerSpeedModifier = 1; // Double this to double the runners speed, or adjust accordingly
const floatSpeedModifier = 1; // Multiplies the tubers float speed
const generatorNPCSpeedModifier = 1; // Multiplies the generator NPCs walking speed

const globalSpeed = 60; // This also controls every obects movement speed, but this should be left alone. Used for slightly adjusting the overall tempo


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
    const maxRiverX = 432;
    
    // x and y pos of the tubers
    this.x = 350;
    this.y = 430;
    this.tuberClass = tuberClass;
    this.tuberSheet = tuberSheet;
    
    var currentBG; // Used to select new character sprite to emulate a different person floating
    var bgNum = 0; // Multiplies the new random NPC sprite by -24 to get the appropriate pixel size

    // Func to float the toooober down left
    this.float = function (floatSpeedDelta, px) {
        
        // Move the toooober back to the right side if x == 0, reset the skin, and random y pos
        if (this.x <= 0) {
            currentBG = randomInt(0, 15);
            bgNum = currentBG * -24;
            this.x = maxRiverX;
            this.tuberSheet.style.setProperty("background-position-y", `${bgNum * px}px`);
            this.y = randomInt(400, 430); // Randomly select the y value from the range
        }
        
        // If the x pos hits the river bend, make the tubers float straight left instead of down left
        if (this.x > 130) {
            this.y += (0.004 * floatSpeedDelta);
        }

        // Make the tubers float down left
        this.x -= (0.02 * floatSpeedDelta);
        this.tuberSheet.style.setProperty("background-position-y", `${bgNum * px}px`); // Update the sprite sheet to prevent resizing bugs
        this.tuberClass.style.transform = `translate3d( ${this.x * px}px, ${this.y * px}px, 0)`; // Move the tuber

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
    var up = -120;
    var runnerDown = -80;
    var left = -140;
    var right = -100;
    
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
    this.run = function (speedDelta, px) {
        
        // Check their x and y pos
        // 1 to 2 to 3 (Top Left and Top Middle)
        if (this.y >= runnerCurveTop && this.x < runnerMidRight && this.x >= runnerLeftLimit && this.y <= runnerTopLimit) {
            this.x += speedDelta;
            this.y -= speedDelta; // Going north east
            this.spriteSheet.style.setProperty("background-position-y", `${right * px}px`);
        }
        
        // 3 to 4 (Top Middle and Top Right)
        if (this.y >= runnerCurveTop && this.x >= runnerMidRight && this.x < runnerRightLimit && this.y < runnerTopLimit) {
            this.x += speedDelta;
            this.y += speedDelta; // Going south east
        }
        
        // 4 to 5 (Right)
        if (this.x == runnerRightLimit && this.y < runnerBottomLimit) {
            this.y += speedDelta; // Going south
            this.spriteSheet.style.setProperty("background-position-y", `${runnerDown * px}px`);
        }
        
        // 5 to 6 to 7 (Bottom Right and Bottom Middle)
        if (this.y <= runnerCurveBottom && this.y >= runnerBottomLimit && this.x <= runnerRightLimit && this.x > runnerMidLeft) {
            this.x -= speedDelta;
            this.y += speedDelta; // Going south west
            this.spriteSheet.style.setProperty("background-position-y", `${left * px}px`);
        }
        
        // 6 to 7 (Bottom Middle and Bottom Left)
        if (this.y <= runnerCurveBottom && this.y >= runnerBottomLimit && this.x >= runnerLeftLimit && this.x <= runnerMidLeft) {
            this.x -= speedDelta;
            this.y -= speedDelta; // Going north west
        }
        
        // 7 to 8 (Left)
        if (this.x == runnerLeftLimit && this.y >= runnerTopLimit) {
            this.y -= speedDelta; // Going north
            this.spriteSheet.style.setProperty("background-position-y", `${up * px}px`);
        }
        
        // Clamp their running
        if (this.x < runnerLeftLimit) { this.x = runnerLeftLimit; }
        if (this.x > runnerRightLimit) { this.x = runnerRightLimit; }
        if (this.y < runnerCurveTop) { this.y = runnerCurveTop; }
        if (this.y > runnerCurveBottom) { this.y = runnerCurveBottom; }
        
        // Set their positions
        this.class.style.transform = `translate3d( ${this.x * px}px, ${this.y * px}px, 0)`;
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
// JNN and STT Soldiers
//
//
//
//
//

function generatorNPC () {

    var topLimit = 0;
    var bottomLimit = 80;
    this.spriteSheet = document.querySelector(".soldier4SpriteSheet");
    this.divHolder = document.querySelector(".soldier4");
    this.y = 1;
    var isNPCPaused = false;
    var pauseStart = new Date().getTime();
    var pauseLimit = 4000;
    var direction = "south";
    var dirNum = 0; // North: -2 | South: 0 | East: -1 | West: -3

    this.animate = function (speed, timeStamp, px) {

        if (isNPCPaused) {

            if (timeStamp - pauseStart >= pauseLimit) {

                if (direction === "north") {
                    dirNum = -2; // Set the SpriteSheet quadrant to North
                }
                
                if (direction === "south") {
                    dirNum = 0; // Set the SpriteSheet quadrant to South
                }

                this.spriteSheet.style.setProperty("animation", "animate 0.5s steps(4) infinite");
                isNPCPaused = false;
            }

        }

        // If NPC is waiting at a point before walking back
        if (!(isNPCPaused)) {

            // If he's set to walk north
            if (direction === "north") {
                this.y -= speed;

                // If NPC is at top point
                if (this.y <= topLimit) {
                    pauseStart = timeStamp; // Set the time stamp for the pause to now
                    direction = "south"; // Tell the NPC to walk South next (He won't until after the delay though)
                    this.spriteSheet.style.setProperty("animation", "none"); // Stop the walking animation
                    isNPCPaused = true;
                }
            }
            
            // If he's set to walk south
            if (direction === "south") {
                this.y += speed;

                // If NPC is at bottom point
                if (this.y >= bottomLimit) {
                    pauseStart = timeStamp; // Set the time stamp for the pause to now
                    direction = "north"; // Tell the NPC to walk North next (He won't until after the delay though)
                    dirNum = -3; // Set the SpriteSheet quadrant to West
                    this.spriteSheet.style.setProperty("animation", "none"); // Stop the walking animation
                    isNPCPaused = true;
                }
            }
        }

        this.spriteSheet.style.setProperty("background-position-y", `${dirNum * px * 20}px`);
        this.divHolder.style.transform = `translate3d( ${0 * px}px, ${this.y * px}px, 0)`;
    }
}

let generatorNPCObj = new generatorNPC();


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


function AwfulSpeechDude () {
    var awfulSpeechJSON; // Define the JSON var in global scope
    
    fetch("awfulSpeech.json").then(response => response.json()) // Fetch it and make it a JSON
    .then(response => { // Create a promise
        awfulSpeechJSON = response; // Assign the promise value to the global scope var
    });
    
    // Get the .text class
    const container = document.querySelector(".text");

    this.timeSinceLastMessage = 0; // Difference between lastMessageTime and now
    var letters = [];
    this.isPlayerCharacterReadyForSpeech = false;
    this.isAMUNPCSpeaking = false;
    var self = this;
    
    var speechLine = 0; // Current sentence number for the speech
    var previousDelay; 
    
    this.playAwfulSpeech = function () {
        

        this.timeSinceLastMessage = nowTime - lastMessageTime; // Time since the last speech message compared to nowTime

        // If timeSinceLastMessage doesn't have a value yet
        // Meaning it's the first time it's being ran
        if (!(this.timeSinceLastMessage > -1)) {
            // Set the value to 11000 (A number large enough for "most" sentences)
            this.timeSinceLastMessage = 11000;
        }
        
        // If player is ready (meaning he's past Y 1800 | See placeCharacter()) and
        // If the current sentence is less than the total number of sentences and
        // If the person isn't already speaking: continue
        if (this.isPlayerCharacterReadyForSpeech && speechLine < awfulSpeechJSON.speech.length && !(this.isAMUNPCSpeaking)) {

            if (previousDelay == undefined) {
                previousDelay = (awfulSpeechJSON.speech[speechLine].speed * awfulSpeechJSON.speech[speechLine].string.length) * 1.5; // Post speech sentence delay
            }

            // If the line that the speaker is on, is past the first line
            if (speechLine > 0) {
                // Get the speech speed - 1 index to match the delay with the sentence speed
                // Otherwise it'd be for the next line speed which may be different
                //previousDelay = (speech[speechLine-1].speed * speech[speechLine-1].string.length) * 1.5;
                previousDelay = (awfulSpeechJSON.speech[speechLine-1].speed * awfulSpeechJSON.speech[speechLine-1].string.length) * 1.5;
            }
            
            // If the previousDelay timer has been met or exceeded by timeSinceLastMessage
            if (this.timeSinceLastMessage >= previousDelay) {
                container.innerHTML = ""; // Clear the current HTML spans
                this.playSpeech(speechLine); // Play the next speech sentence
                this.timeSinceLastMessage = 0; // Reset the last speech sentence elapsed time to 0
                lastMessageTime = new Date().getTime(); // Reset the time stamp of the last message
                speechLine++; // Go to the next speech sentence
            }
        }
    }

    // This handles each line of the JSON (Give each line to the displaySpeechTextLetter one at a time to be displayed)
    this.playSpeech = function (line) {
        this.line = line;

        awfulSpeechJSON.speech[this.line].string.split("").forEach(letter => {
            var span = document.createElement("span");
            span.textContent = letter;
            container.appendChild(span);
        
            letters.push({
                span: span,
                delayAfter: awfulSpeechJSON.speech[this.line].speed,
                isSpace: letter === " ",
            })
        })
    
        this.displaySpeechTextLetter(letters);
    }

    // This handles each letter of each line of the JSON (Displays the letters one at a time)
    this.displaySpeechTextLetter = function (letterList) {
        var next = letterList.splice(0, 1)[0];
        next.span.classList.add("revealed");

        var delay = next.isSpace ? 0 : next.delayAfter;

        if (letterList.length > 0) {
            this.isAMUNPCSpeaking = true;

            setTimeout(function () {
                self.displaySpeechTextLetter(letterList);
            }, delay)
        }

        if (letterList.length == 0) {
            this.isAMUNPCSpeaking = false;
        }
    }
}

let awfulSpeechDudeObj = new AwfulSpeechDude(); // Create the new awful speech dude object


//
//
//
//
//
// PT Grader Greeting
//
//
//
//
//


// Get the speech bubble
const ptGraderSpeechBubble = document.querySelector(".ptGraderSpeechBubble");
const ptGraderSpriteSheet = document.querySelector(".soldier3SpriteSheet");

var isPlayerCharacterReadyForGreeting = false; // Don't play message until true
var greetingMessagePlayed = false; // Only play once
var timeStampForGreetingMessage; // Time stamp for when the user reaching the Y coord
var greetingDelay; // Used to get the difference between message played time and now time
var greetingFinished = false; // If true, this function won't be called anymore
var ptGraderDirection = -3;

function greetPlayerCharacter (nowTime, pixelSize) {

    ptGraderSpriteSheet.style.setProperty('background-position-y', `${(pixelSize * 20) * ptGraderDirection}px`);


    if (!(greetingFinished)) {

        // If the player is at the Y pos and hasn't heard the message yet
        if (isPlayerCharacterReadyForGreeting && !(greetingMessagePlayed)) {
            ptGraderSpeechBubble.style.setProperty('opacity', '1');
            ptGraderDirection = -1; // Set direction to right
            greetingMessagePlayed = true; // Only fire once
            timeStampForGreetingMessage = nowTime; // Only runs once so OK to set
        }
    
        // If the player has heard the message
        if (greetingMessagePlayed) {
        
            // Create the current delay
            greetingDelay = nowTime - timeStampForGreetingMessage;

            // Check the delay
            if (greetingDelay >= 2000) {
                ptGraderDirection = -3; // Set direction to left
                // Hide the message
                ptGraderSpeechBubble.style.setProperty('opacity', '0');
                // Set greeting finished to true to stop this functions from being called in the game loop
                greetingFinished = true;
            }
        }
    }
}


//
//
//
//
//
// Mail Box Scene & Letter/Form display
//
//
//
//
//


const mailSpriteSheet = document.querySelector("#mail");
const mailLetterClosed = document.querySelector(".mailClosed");

var isPlayerCharacterAtMailbox = false; // AT the mailbox, ready to open it
var mailBoxScenePlayed = false; // Did the sprite sheet play
var mailBoxSceneTimeStamp; // Time that sprite sheet played
var mailBoxSceneDiff; // Time difference between nowTime and mail box scene time stamp
var mailBoxSceneFinished = false; // Completely done? If true, no longer called in game loop

function playMailBoxScene (nowTime) {
    
    if (!(mailBoxSceneFinished)) {

        if (isPlayerCharacterAtMailbox && !(mailBoxScenePlayed)) {
            mailLetterClosed.style.setProperty('visibility', 'hidden');
            mailSpriteSheet.style.setProperty('visibility', 'visible');
            mailSpriteSheet.style.setProperty('animation', 'animate 3.8s steps(16)');
            mailBoxSceneTimeStamp = nowTime; // Only called once
            mailBoxScenePlayed = true;
        }

        mailBoxSceneDiff = nowTime - mailBoxSceneTimeStamp; // Called continously until mail box scene finished is true

        if (mailBoxScenePlayed && mailBoxSceneDiff >= 3800) {
            mailSpriteSheet.style.setProperty('visibility', 'hidden');
            mailLetterClosed.style.setProperty('visibility', 'visible');
            mailBoxSceneFinished = true;
            displayLetterForm();
        }
    }
}

const formletterController = document.querySelector(".formLetterController");

var letterFormFinished = false;

function displayLetterForm () {

    formletterController.style.setProperty('visibility', 'visible');

}

function hideLetterForm () {

    formletterController.style.setProperty('visibility', 'hidden');
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



function playerCharacter () {

    this.wasSprintToggled = false;
    
    var heldDirections = []; // State of which arrow keys are being held down
    const character = document.querySelector(".character");
    
    this.isPlayerCharacterSprinting = false;

    this.x = 78;
    this.y = 32;
    
    // Set the constriants / walls
    const leftLimit = 230; // was 16 * 14.5;
    const rightLimit = 230; // was 16 * 14.5;
    const topLimit = 16 * 10;
    const bottomLimit = 16 * 152;

    this.keyDown = function (event) {
        var direction = keys[event.key];
        if (direction && heldDirections.indexOf(direction) === -1) {
            heldDirections.unshift(direction);
        }
    }

    this.keyUp = function (event) {
        var direction = keys[event.key];
        var index = heldDirections.indexOf(direction);
        if (index > -1) {
            heldDirections.splice(index, 1);
        }
    }
/*
    this.addEventListener("keydown", (e) => {
            var dir = this.keys[e.key];
            if (dir && this.heldDirections.indexOf(dir) === -1) {
            this.heldDirections.unshift(dir);
            }
        });
*/
    this.checkEvents = function () {
        
        // If the player is at the PT Grader, set isPlayerCharacterReadyForGreeting to true
        if (this.y > 810) { isPlayerCharacterReadyForGreeting = true; }

        // If the player reaches the area to see the speech, set isPlayerCharacterReadyForSpeech to true
        if (this.y > 1800) {awfulSpeechDudeObj.isPlayerCharacterReadyForSpeech = true; }
        if (this.y < 1800) { awfulSpeechDudeObj.isPlayerCharacterReadyForSpeech = false; }

        // If the player reaches the mailbox & mailbox area, set true
        if (this.y > 2300) { isPlayerCharacterNearMailbox = true; }
        if (this.y >= 16 * 148) { isPlayerCharacterAtMailbox = true; }
    }

    this.checkConstraints = function () {
        if (this.x < leftLimit) { this.x = leftLimit; }
        if (this.x > rightLimit) { this.x = rightLimit; }
        if (this.y < topLimit) { this.y = topLimit; }
        if (this.y > bottomLimit) { this.y = bottomLimit }

    }

    this.walkUp = function (event) {
        event.preventDefault(); // Stop double calls for taps
        // Change the button image
        upBtn.style.setProperty('background-position-y', `${(getPixelSize() * -32)}px`);

        upBtnYPos = -32;

        var dir = keys.Up;
        if (dir && heldDirections.indexOf(dir) === -1) {
            heldDirections.unshift(dir);
            }
    }

    this.walkUpCancel = function (event) {
        event.preventDefault(); // Stop double calls for taps
        // Reset the button image
        upBtn.style.setProperty('background-position-y', `${(getPixelSize() * 0)}px`);

        upBtnYPos = 0;

        var dir = keys.Up;
        var index = heldDirections.indexOf(dir);
        if (index > -1) {
            heldDirections.splice(index, 1);
        }
    }

    // Handle the event
    this.walkDown = function (event) {
        event.preventDefault(); // Stop double calls for taps
        // Change the button image
        downBtn.style.setProperty('background-position-y', `${(getPixelSize() * -32)}px`);

        downBtnYPos = -32;

        var dir = keys.Down;
        if (dir && heldDirections.indexOf(dir) === -1) {
            heldDirections.unshift(dir);
        }
    }

    this.walkDownCancel = function (event) {
        event.preventDefault(); // Stop double calls for taps
        // Reset the button image
        downBtn.style.setProperty('background-position-y', `${(getPixelSize() * 0)}px`);

        downBtnYPos = 0;

        var dir = keys.Down;
        var index = heldDirections.indexOf(dir);
        if (index > -1) {
            heldDirections.splice(index, 1);
        }
    }

    this.changeSS = function (heldDirection) {
        character.setAttribute("walking", (heldDirection && !(this.isPlayerCharacterSprinting)) ? "true" : "false");
        character.setAttribute("sprinting", (heldDirection && this.isPlayerCharacterSprinting) ? "true" : "false");
    }

    this.animate = function (pixelSize) {
        
        var camera_left = pixelSize * 100;
        var camera_top = pixelSize * 80;
        
        // The most current held direction
        const heldDirection = heldDirections[0];

        // If the user is holding a direction button
        if (heldDirection) {

            if (!(this.isPlayerCharacterSprinting)) {
                if (heldDirection === directions.down) { this.y += playerCharacterWalkSpeed; }
                if (heldDirection === directions.up) { this.y -= playerCharacterWalkSpeed; }
                if (heldDirection === directions.left) { this.x -= playerCharacterWalkSpeed; }
                if (heldDirection === directions.right) { this.x += playerCharacterWalkSpeed; }

                if (this.wasSprintToggled) {
                    character.setAttribute("runDir", "");
                    this.wasSprintToggled = false;
                }

                character.setAttribute("walkDir", heldDirection);
            }
            
            if (this.isPlayerCharacterSprinting) {
                if (heldDirection === directions.down) { this.y += playerCharacterWalkSpeed; }
                if (heldDirection === directions.up) { this.y -= playerCharacterWalkSpeed; }
                if (heldDirection === directions.left) { this.x -= playerCharacterWalkSpeed; }
                if (heldDirection === directions.right) { this.x += playerCharacterWalkSpeed; }
                character.setAttribute("runDir", heldDirection);
                character.setAttribute("walkDir", heldDirection);
            }
        }
        
        if (!heldDirection) {
            character.setAttribute("runDir", "");
        }

        
        this.checkConstraints();
        this.checkEvents();
        this.changeSS(heldDirection);
        
        map.style.transform = `translate3d( ${-this.x * pixelSize + camera_left}px, ${-this.y * pixelSize + camera_top}px, 0)`;
        character.style.transform = `translate3d( ${this.x * pixelSize}px, ${this.y * pixelSize}px, 0)`;
    }

}

let mainCharacterObj = new playerCharacter();

//
//
//
//
//
// Listeners
//
//
//
//
//



// Direction key state
var directions = {
    up: "up",
    down: "down",
    left: "left",
    right: "right",
}

var keys = {
    ArrowUp: directions.up,
    ArrowDown: directions.down,
    ArrowLeft: directions.left,
    ArrowRight: directions.right,
    Up: directions.up,
    Down: directions.down,
    Left: directions.left,
    Right: directions.right,
}


document.addEventListener("keydown", mainCharacterObj.keyDown);
document.addEventListener("keyup", mainCharacterObj.keyUp);


// Get the button elements
var upBtn = document.querySelector(".upBtn");
var downBtn = document.querySelector(".downBtn");
var sprintBtn = document.querySelector(".sprint-btn");

// Add the button touch screen listeners (touchstart, touchend, touchleave)
sprintBtn.addEventListener("mousedown", sprintToggle, false);
sprintBtn.addEventListener("touchend", sprintToggle, false);
//sprintBtn.addEventListener("touchend", sprintToggle);
//sprintBtn.addEventListener("touchleave", sprintToggle);

upBtn.addEventListener("touchstart", mainCharacterObj.walkUp, false);
upBtn.addEventListener("mousedown", mainCharacterObj.walkUp, false);
upBtn.addEventListener("mouseup", mainCharacterObj.walkUpCancel, false);
upBtn.addEventListener("mouseout", mainCharacterObj.walkUpCancel, false);
upBtn.addEventListener("mouseleave", mainCharacterObj.walkUpCancel, false);
upBtn.addEventListener("touchend", mainCharacterObj.walkUpCancel, false);
upBtn.addEventListener("touchleave", mainCharacterObj.walkUpCancel, false);

downBtn.addEventListener("touchstart", mainCharacterObj.walkDown, false);
downBtn.addEventListener("mousedown", mainCharacterObj.walkDown, false);
downBtn.addEventListener("mouseup", mainCharacterObj.walkDownCancel, false);
downBtn.addEventListener("mouseout", mainCharacterObj.walkDownCancel, false);
downBtn.addEventListener("mouseleave", mainCharacterObj.walkDownCancel, false);
downBtn.addEventListener("touchend", mainCharacterObj.walkDownCancel, false);
downBtn.addEventListener("touchleave", mainCharacterObj.walkDownCancel, false);

// Handle the event
const sprintBtnSS = document.querySelector(".sprint-btn");
var sprintBtnYPos = 0; // Used for updating the sprite

function sprintToggle (event) {
    event.preventDefault(); // Stop double calls for taps
    mainCharacterObj.wasSprintToggled = true;

    // Set a sprinting var to true
    // Toggle with bool = !bool
    mainCharacterObj.isPlayerCharacterSprinting = !mainCharacterObj.isPlayerCharacterSprinting;

    // Change the movement speed
    // Change the btn ss
    if (mainCharacterObj.isPlayerCharacterSprinting) {
        sprintBtnYPos = -32;
        playerCharacterWalkSpeedModifier = 2.0;
        sprintBtnSS.style.setProperty('background-position-y', `${getPixelSize() * -32}px`)
    }

    if (!mainCharacterObj.isPlayerCharacterSprinting) {
        sprintBtnYPos = 0;
        playerCharacterWalkSpeedModifier = 1.0;
        sprintBtnSS.style.setProperty('background-position-y', '0px')

    }
    // Set a moving var to true when moving from the other functions below
        // When moving var is true and so is sprinting
            // Change the sprite sheet
            // Make the sprite sheet change faster to take faster steps
}

var upBtnYPos = 0; // Used for updating the sprite

downBtnYPos = 0; // Used for updating the sprite





//
//
//
//
//
// Player Speech
//
//
//
//
//


// Get the players speech bubble
const playerSpeechBubble = document.querySelector(".playerText");

// Only fire once, set near mailbox to true when Y Pos is met
var mailMessagePlayed = false;
var isPlayerCharacterNearMailbox = false;

// Bool to track if the player character is currently speaking
var isPlayerCharacterSpeaking = false;

// Just temp time holder
var timeSinceLastPlayerCharacterSpeech;

// Create the possible player text lines
const playerLines = [
    "I SHOULD MOVE MY MAILBOX CLOSER. ",
    "SERGEANT MAJOR'S WORDS ECHOED... ",
    "GET OFF THE GRASS, SOLDIER! ",
]


function playerCharacterSpeechController () {

    // Hide the speech bubble is time is met
    if (nowTime - timeSinceLastPlayerCharacterSpeech > 3600) { playerSpeechBubble.style.setProperty('opacity', '0'); }

    if (isPlayerCharacterNearMailbox && !(mailMessagePlayed) && !(isPlayerCharacterSpeaking)) {
            timeSinceLastPlayerCharacterSpeech = nowTime;
            playerSpeechBubble.innerHTML = "";
            mailMessagePlayed = true;
            playerSpeechBubble.style.setProperty('opacity', '1');
            playerCharacterSpeak(0);

            // If the elapsed time > some num, hide text
            // I'm just working around this area right now, I should create the player character as an object later
            // and then store important information inside of it like the last speech time and what not.
        }
}


var playerCharacterLetters = [];

// Play player character's message
function playerCharacterSpeak (lineNum) {
    this.lineNum = lineNum;
    //this.test = playerLines[this.lineNum].split("");
    playerLines[this.lineNum].split("").forEach(letter => {
        /*
        */
        var span = document.createElement("span");
        span.textContent = letter;
        playerSpeechBubble.appendChild(span);

        playerCharacterLetters.push({
            span: span,
            delayAfter: "100",
            isSpace: letter === " ",
        })
    })
    
    displayPlayerCharacterLetter(playerCharacterLetters);
}

// Display player character's text
function displayPlayerCharacterLetter (letterList) {
    var next = letterList.splice(0, 1)[0];
    next.span.classList.add("revealed");

    var delay = next.isSpace ? 0 : next.delayAfter;

    if (letterList.length > 0) {
        isCharacterSpeaking = true;

        setTimeout(function () {
            displayPlayerCharacterLetter(letterList);
        }, delay)
    }

    if (letterList == 0) {
        isCharacterSpeaking = false;
    }

}


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



var FPS = 30; // Currently used for the setTimeout (not sure if it's working/doing anything)
var deltaTime; // Currently unused
var lastMessageTime; // Time of the last speech message occurred 
var nowTime = new Date().getTime(); // Now, updated every tick below
var lastFrameTimeStamp; // Currently used to get deltaTime
var pixelSize; // Used to store the current pixel size based on the users device width & zoom

// Speed vars to be used for their respective delta times. No value yet as delta time speed will be assigned accordingly in the main loop
var playerCharacterWalkSpeed; // Speed of player character movement
var runnerSpeed;
var floatSpeed;
var generatorSpeed;

function MainLoop () {

    setTimeout(function () {
        // Used for getting the Delta time
        if (lastFrameTimeStamp === undefined) {
            // Similar to nowTime, but isn't updated every tick (kinda, I think it's broken)
            lastFrameTimeStamp = new Date().getTime();
        }

        nowTime = new Date().getTime(); // The current time | Updated every call
        deltaTime = (nowTime - lastFrameTimeStamp) / 1000;

        pixelSize = getPixelSize();

        // Set the player characters speed
        playerCharacterWalkSpeed = playerCharacterWalkSpeedModifier * deltaTime * globalSpeed * globalSpeedModifier;
        // Set the runner NPCs speed
        runnerSpeed = (runnerSpeedModifier * deltaTime * globalSpeed * globalSpeedModifier) * 0.5; // Slow them down a bit, they were running laps way too fast
        // Set the generator NPCs speed
        generatorSpeed = (generatorNPCSpeedModifier * deltaTime * globalSpeed * globalSpeedModifier) * 0.5; // * by 0.5 to get an appropriate looking speed

        // Set the tuber NPCs speed
        // * by 5.2 to get the speed my wife said looks good (happy wife == happy life // cause she'll feed me mainly)
        tuberSpeed = (floatSpeedModifier * deltaTime * globalSpeed * globalSpeedModifier) * 5.2;

        runner1Obj.run(runnerSpeed, pixelSize);
        runner2Obj.run(runnerSpeed, pixelSize);

        generatorNPCObj.animate(generatorSpeed, lastFrameTimeStamp, pixelSize);

        tuber1Obj.float(tuberSpeed, pixelSize);
        tuber2Obj.float(tuberSpeed, pixelSize);

        mainCharacterObj.animate(pixelSize); // Pass in pixel size to avoid multiple calls to getPixelSize

        playerCharacterSpeechController();
        greetPlayerCharacter(lastFrameTimeStamp, pixelSize); // Check if it's time to greet & also update the sprite pixel size
        awfulSpeechDudeObj.playAwfulSpeech();
        playMailBoxScene(lastFrameTimeStamp);

        // Keep updating the background position based on the current set direction
        // I don't have a place for the GUI buttons to be placed so their pxs will just be updated here
        sprintBtnSS.style.setProperty('background-position-y', `${pixelSize * sprintBtnYPos}px`);
        upBtn.style.setProperty('background-position-y', `${pixelSize * upBtnYPos}px`);
        downBtn.style.setProperty('background-position-y', `${pixelSize * downBtnYPos}px`);

        lastFrameTimeStamp = new Date().getTime(); // Updated every tick, is this correct?
        // It may be, since the time stamp would be after all the tick actions have been performed.

    }, 1000 / FPS);
    
    
    window.requestAnimationFrame(() => {
        MainLoop();
    })
}
MainLoop(); // Start the main game loop


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


// Check if the user is on mobile, if so, show the mobile controls
if (isUserOnTouchDevice()) {
    var allTouchBtns = document.querySelector(".allBtns");
    allTouchBtns.style.setProperty("visibility", "visible");
}

function isUserOnTouchDevice () {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}

function clamp (num, min, max) {
    var clamped = Math.min(Math.max(num, min), max);

    return clamped;
}

function randomInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
}


function getPixelSize () {
    var pixelSize;

    // Get the pixel size each iteration to ensure the most accurate value is available
    pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));

    return pixelSize;
}

// Disable CTRL + Scroll Wheel zooming
document.addEventListener('wheel', (e) => {
    
    if (e.ctrlKey) e.preventDefault()
}, {passive: false,capture: true, bubbling: true})
document.addEventListener('resize', (e) => {
    e.preventDefault()
}, {passive: false, capture: true, bubbling: true})
window.visualViewport.addEventListener('resize', (e) => {
    e.preventDefault()
},{passive: false, capture: true, bubbling: true})
