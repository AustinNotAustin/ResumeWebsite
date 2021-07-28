// Reference to the HTML elements
const map = document.querySelector(".map");


// Speed multipliers
const globalSpeedModifier = 1;
const globalSpeed = 60;
var playerCharacterWalkSpeedModifier = 1;
const runnerSpeedModifier = 0.5;
const floatSpeedModifier = 5.2;
const generatorNPCSpeedModifier = 0.5;

// Player speeds
var playerCharacterWalkSpeed; // Speed of player character movement
var runnerSpeed;
var floatSpeed;
var generatorSpeed;


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


    // Get the pixel size each iteration to ensure the most accurate value is available
    //var pixelSize = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--pixel-size'));
    
    this.x = 350;
    this.y = 430;
    this.skin = 0;
    this.tuberClass = tuberClass;
    this.tuberSheet = tuberSheet;
    
    var px;
    var currentBG;
    var bgNum = 0;
    var count = 0;

    // Func to float the toooober down left
    this.float = function (floatSpeedDelta) {
        
        px = getPixelSize();
        
        // Move the toooober back to the right side if x == 0, reset the skin, and random y
        if (this.x <= 0) {
            currentBG = randomInt(0, 15);
            bgNum = currentBG * -24;
            this.x = maxRiverX;
            this.tuberSheet.style.setProperty("background-position-y", `${bgNum * px}px`);
            this.y = randomInt(400, 430); // Randomly select the y value from the range
            // this.skin = randomInt(0, 3) * -22; // Get a random number (0-3, since there are 4 options) then multiple by -22 (for the px's)
        }
        
        if (count == 100) {
            this.y -= (0.2 * floatSpeedDelta);
        }

        if (count == 200) {
            this.y += (0.2 * floatSpeedDelta);
            count = 0;
        }

        count++;
        
        if (this.x > 130) {
            this.y += (0.004 * floatSpeedDelta);
        }

        this.x -= (0.02 * floatSpeedDelta);
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
    var up = -120;
    var runnerDown = -80;
    var left = -140;
    var right = -100;
    
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
    this.run = function (speedDelta) {
        
        // Get the pixel size each iteration to ensure the most accurate value is available
        px = getPixelSize();
        
        
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
    var self = this;
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


// Set the varying speeds for text to display
var speeds = {
    pause: 700,
    slow: 140,
    normal: 100,
    fast: 50
}

var speech = [
    { string: "UHM, HEY THERE, ", speed: speeds.normal },
    { string: "EVERYONE, OUT THERE. ", speed: speeds.normal },
    { string: "THANKS FOR COMING OUT TODAY. ", speed: speeds.normal },
    { string: "EVEN THOUGH IT'S MANDATORY. ", speed: speeds.normal },
    { string: "THANKS FOR BEING HERE ANYWAY. ", speed: speeds.normal },
    { string: "I COULD USE SOME PRACTICE, ", speed: speeds.normal },
    { string: "PRACTICE WITH MY SPEECH THAT IS. ", speed: speeds.fast },
    { string: "SO YEAH, THANKS AGAIN. ", speed: speeds.normal },
    { string: "HA HA ", speed: speeds.fast },
    { string: "I SURE DID SAY THANKS A LOT. ", speed: speeds.normal },
    { string: "RIGHT? ", speed: speeds.normal },
    { string: "HA HA ", speed: speeds.fast },
    { string: "KIND OF FUNNY. ", speed: speeds.fast },
    { string: "I GUESS IT'S NOT THAT FUNNY. ", speed: speeds.fast },
    { string: "WELL, UHH... ", speed: speeds.normal },
    { string: "*COUGH* ", speed: speeds.fast },
    { string: "THANKS FOR LETTING ME PRACTICE. ", speed: speeds.normal },
    { string: "DANG, I SAID THANKS AGAIN. ", speed: speeds.normal },
    { string: "WELL, I MEAN... ", speed: speeds.normal },
    { string: "THANKS FOR LISTENING TO ME! ", speed: speeds.normal },
    { string: "I SAID IT AGAIN... ", speed: speeds.fast },
    { string: "THANKS FOR LETTING ME PRACTICE, ", speed: speeds.normal },
    { string: "MY SPEECH... ", speed: speeds.slow },
    { string: "IN FRONT OF YOU... ", speed: speeds.slow },
    { string: "WHILE YOU LISTEN TO ME... ", speed: speeds.slow },
    { string: "SOME OF YOU... ", speed: speeds.slow },
    { string: "NOT THAT IT'S A PROBLEM THOUGH! ", speed: speeds.normal },
    { string: "I DON'T CARE IF YOU LISTEN! ", speed: speeds.normal },
    { string: "WAIT! ", speed: speeds.fast },
    { string: "YES I DO, I DO CARE! ", speed: speeds.fast },
    { string: "IT'S JUST THAT, ", speed: speeds.normal },
    { string: "IF YOU DON'T LISTEN ", speed: speeds.normal },
    { string: "TO MY SPEECH ", speed: speeds.normal },
    { string: "I WON'T GET MAD OR ANYTHING ", speed: speeds.normal },
    { string: "SINCE IT'S JUST PRACTICE. ", speed: speeds.normal },
    { string: "NOT THAT I GET MAD OFTEN ", speed: speeds.fast },
    { string: "OR ANYTHING LIKE THAT ", speed: speeds.normal },
    { string: "IT'S JUST THAT ", speed: speeds.slow },
    { string: "YOU'RE FREE TO DO WHAT YOU WANT ", speed: speeds.normal },
    { string: "SINCE IT'S A FREE COUNTRY AND ALL ", speed: speeds.normal },
    { string: "WELL, YOU DO HAVE TO BE HERE ", speed: speeds.normal },
    { string: "KIND OF ", speed: speeds.normal },
    { string: "LIKE, IF YOU LEAVE ", speed: speeds.normal },
    { string: "YOU WON'T GET ARRESTED ", speed: speeds.normal },
    { string: "FOR THAT ", speed: speeds.normal },
    { string: "PROBABLY ", speed: speeds.normal },
    { string: "RIGHT. ", speed: speeds.normal },
    { string: "WELL. ", speed: speeds.slow },
    { string: "*COUGH* ", speed: speeds.fast },
    { string: "I SHOULD, ", speed: speeds.normal },
    { string: "UH... ", speed: speeds.slow },
    { string: "I SHOULD START THE SPEECH. ", speed: speeds.normal },
    { string: "SINCE I THINK IT'LL BE RECORDED ", speed: speeds.normal },
    { string: "THAT WAY THEY CAN USE IT LATER ", speed: speeds.normal },
    { string: "FOR THINGS LIKE SENIOR VIDEOS ", speed: speeds.normal },
    { string: "AND PUT IT UP ON YOUTUBE. ", speed: speeds.normal },
    { string: "MAYBE THEY'LL MAKE BLOOPERS ", speed: speeds.fast },
    { string: "OR FUNNY MOMENTS ", speed: speeds.normal },
    { string: "OR OTHER COOL VIDEOS OF US! ", speed: speeds.normal },
    { string: "THAT'D BE SO COOL. ", speed: speeds.slow },
    { string: "WAIT! ", speed: speeds.fast },
    { string: "DO YOU THINK THAT ", speed: speeds.fast },
    { string: "THEY ALREADY STARTED RECORDING?! ", speed: speeds.fast },
    { string: "OH NO! ", speed: speeds.fast },
    { string: "I HAVEN'T SAID THE SPEECH YET! ", speed: speeds.fast },
    { string: "HOW LONG DO YOU THINK IT'S BEEN? ", speed: speeds.fast },
    { string: "THEY'VE PROBABLY RECORDED IT ALL! ", speed: speeds.fast },
    { string: "OH BOY, THAT'S A LOT OF VIDEO! ", speed: speeds.normal },
    { string: "I HOPE THEY HAVE A BIG HARD DRIVE. ", speed: speeds.normal },
    { string: "OR MAYBE A SPARE DRIVE. ", speed: speeds.normal },
    { string: "LIKE A BACK UP ONE. ", speed: speeds.slow },
    { string: "JUST IN CASE THEY NEED A BUNCH OF ", speed: speeds.normal },
    { string: "STORAGE FOR LONG VIDEOS ", speed: speeds.normal },
    { string: "OR LONG SPEECHES ", speed: speeds.slow },
    { string: "LIKE THIS SPEECH CURRENTLY IS. ", speed: speeds.normal },
    { string: "IT WASN'T SUPPOSED TO BE LONG. ", speed: speeds.normal },
    { string: "I HONESTLY DIDN'T EVEN ", speed: speeds.normal },
    { string: "WRITE THAT MUCH. ", speed: speeds.normal },
    { string: "MY SPEECH IS ONLY LIKE A PARAGRAPH ", speed: speeds.normal },
    { string: "A SINGLE PARAGRAPH ", speed: speeds.normal },
    { string: "SO LIKE, 4-5 SENTENCES ", speed: speeds.normal },
    { string: "8-16 WORDS PER SENTENCE OR SO ", speed: speeds.normal },
    { string: "WHICH IS 32-80 WORDS IN TOTAL ", speed: speeds.normal },
    { string: "THAT'S IT ", speed: speeds.normal },
    { string: "LESS THAN 100 WORDS AND DONE ", speed: speeds.normal },
    { string: "YEAH ", speed: speeds.normal },
    { string: "SO... ", speed: speeds.slow },
    { string: "UH... ", speed: speeds.slow },
    { string: "I SHOULD START IT, RIGHT? ", speed: speeds.normal },
    { string: "LET ME FLIP THE PAPER ", speed: speeds.normal },
    { string: "OH ", speed: speeds.normal },
    { string: "COME ON ", speed: speeds.normal },
    { string: "THE PAGE IS STICKING TO MY HANDS ", speed: speeds.normal },
    { string: "MY HANDS ARE KIND OF CLAMY ", speed: speeds.normal },
    { string: "PROBABLY BECAUSE IT'S SO HOT OUT ", speed: speeds.normal },
    { string: "I'M HOT ", speed: speeds.normal },
    { string: "LIKE REALLY HOT ", speed: speeds.fast },
    { string: "THAT SOUNDS WEIRD ", speed: speeds.normal },
    { string: "I MEAN, I'M HOT ", speed: speeds.normal },
    { string: "IN A TEMPERATURE KIND OF WAY ", speed: speeds.normal },
    { string: "NOT LIKE A PHYSICAL KIND OF WAY ", speed: speeds.normal },
    { string: "NOT TO SAY I'M UGLY OR ANYTHING ", speed: speeds.normal },
    { string: "I DON'T THINK I'M UGLY ", speed: speeds.slow },
    { string: "I'VE BEEN TOLD I'M NOT UGLY ", speed: speeds.slow },
    { string: "BY PEOPLE ", speed: speeds.normal },
    { string: "OTHER THAN MY MOM ", speed: speeds.slow },
    { string: "I'M SURE YOU COULD HAVE ", speed: speeds.normal },
    { string: "GUESS THAT THOUGH ", speed: speeds.normal },
    { string: "EVERYONE'S MOM SAYS NICE THINGS ", speed: speeds.normal },
    { string: "WELL, NOT EVERY MOM ", speed: speeds.slow },
    { string: "I GUESS... ", speed: speeds.slow },
    { string: "I DON'T KNOW EVERY MOM ", speed: speeds.normal },
    { string: "SOME MOMS COULD BE MEAN ", speed: speeds.normal },
    { string: "LIKE THEY MIGHT CALL OTHERS UGLY ", speed: speeds.normal },
    { string: "OR MAYBE THEY'RE MEAN IN TRAFFIC ", speed: speeds.normal },
    { string: "LIKE WHEN ANOTHER DRIVER AT A TURN ", speed: speeds.normal },
    { string: "GOT THERE 2ND AND YOU GOT THERE 1ST ", speed: speeds.normal },
    { string: "YOU KNOW IT'S YOUR TURN TO GO, RIGHT? ", speed: speeds.normal },
    { string: "BUT THEN THEY GO INSTEAD OF YOU. ", speed: speeds.normal },
    { string: "THAT'S ANNOYING. ", speed: speeds.normal },
    { string: "LIKE, I WAITED MY TURN TO TURN, ", speed: speeds.fast },
    { string: "YOU KNOW? ", speed: speeds.normal },
    { string: "I WAS AT THIS STOP SIGN BEFORE YOU ", speed: speeds.fast },
    { string: "AND THEN YOU GOT HERE ", speed: speeds.normal },
    { string: "I DIDN'T WAIVE YOU ON TO GO ", speed: speeds.fast },
    { string: "YOU WENT ON YOUR OWN ACCORD ", speed: speeds.fast },
    { string: "I'M JUST WAITING TO TURN ", speed: speeds.normal },
    { string: "I WANTED TO MAKE SURE IT'S CLEAR ", speed: speeds.normal },
    { string: "LOOK BOTH WAYS, RIGHT!? ", speed: speeds.normal },
    { string: "I'M A SAFE DRIVER, LOOKING BOTH WAYS ", speed: speeds.normal },
    { string: "YOU'RE AN UNSAFE DRIVER ", speed: speeds.normal },
    { string: "GOING BEFORE ME AND STUFF. ", speed: speeds.normal },
    { string: "SHEESH! ", speed: speeds.normal },
    { string: "WELL... ", speed: speeds.slow },
    { string: "NOT \"YOU\" SPECIFICALLY ", speed: speeds.slow },
    { string: "I MEAN OTHER PEOPLE ", speed: speeds.normal },
    { string: "IN THIS SCENARIO THAT I JUST MADE UP ", speed: speeds.normal },
    { string: "NOT THAT IT'S FAKE ", speed: speeds.fast },
    { string: "BECAUSE I'VE BEEN IN THAT SITUATION ", speed: speeds.normal },
    { string: "AND IT'S REAL AT THAT TIME. ", speed: speeds.normal },
    { string: "RIGHT NOW THOUGH I DIDN'T HAVE ", speed: speeds.normal },
    { string: "AN EXACT EVENT IN MIND ", speed: speeds.normal },
    { string: "I HAD A GENERALIZATION INSTEAD ", speed: speeds.normal },
    { string: "YOU KNOW WHAT I MEAN? ", speed: speeds.normal },
    { string: "RIGHT... ", speed: speeds.slow },
    { string: "UH... ", speed: speeds.slow },
    { string: "IS ANYONE ELSE HOT? ", speed: speeds.normal },
    { string: "IT FEELS PRETTY HOT TO ME. ", speed: speeds.normal },
    { string: "I'M SWEATING A LITTLE BIT. ", speed: speeds.normal },
    { string: "I SHOULD'VE BROUGHT MY WATER BOTTLE. ", speed: speeds.normal },
    { string: "I’M PARCHED RIGHT NOW. ", speed: speeds.normal },
    { string: "I DIDN'T PUT IT IN THE FRIDGE THOUGH, ", speed: speeds.normal },
    { string: "SO IT WASN'T COLD HOW I LIKE IT. ", speed: speeds.normal },
    { string: "I PREFER FRIDGE TEMP WATER OVER ICED. ", speed: speeds.normal },
    { string: "I THINK IT'S THE ICE CUBES ", speed: speeds.normal },
    { string: "I DON'T REALLY ENJOY THE ICE CUBES ", speed: speeds.normal },
    { string: "NOT THAT I EAT ICE CUBES PER SE ", speed: speeds.normal },
    { string: "BUT I CAN TASTE THE METLED CUBES ", speed: speeds.normal },
    { string: "WHEN THEY MELT IN MY DRINK ", speed: speeds.normal },
    { string: "OVER THE SPAN OF THE DAY ", speed: speeds.normal },
    { string: "AS I SIP ON MY WATER ", speed: speeds.normal },
    { string: "I THINK IT'S MY FREEZER. ", speed: speeds.normal },
    { string: "I THINK THE FREEZER MAKES GROSS ICE ", speed: speeds.normal },
    { string: "IT MIGHT BE THE ICE MAKER ACTUALLY. ", speed: speeds.normal },
    { string: "I SHOULD HAVE THE FILTER REPLACED. ", speed: speeds.normal },
    { string: "THAT WOULD PROBABLY HELP A BIT ", speed: speeds.normal },
    { string: "I CAN'T REMEMBER THE LAST TIME I REPLACE IT. ", speed: speeds.normal },
    { string: "SHEESH! THAT'S PRETTY GROSS, HUH!? ", speed: speeds.fast },
    { string: "HA HA… ", speed: speeds.normal },
    { string: "YEAH. ", speed: speeds.slow },
    { string: "GROSS. ", speed: speeds.normal },
    { string: "NOT SAYING I’M GROSS. ", speed: speeds.fast },
    { string: "THE FILTER IS GROSS. ", speed: speeds.fast },
    { string: "NOT SAYING YOUR GROSS EITHER ", speed: speeds.fast },
    { string: "IF YOU DON’T CHANGE YOUR FILTER OFTEN ", speed: speeds.fast },
    { string: "FILTERS OFTEN GET OVERLOOKED. ", speed: speeds.normal },
    { string: "I IMAGINE… ", speed: speeds.slow },
    { string: "I DON’T ACTUALLY HAVE FACTS ON THAT ", speed: speeds.normal },
    { string: "BUT IT SOUNDS RIGHT ", speed: speeds.normal },
    { string: "SO… ", speed: speeds.slow },
    { string: "UH… ", speed: speeds.slow },
    { string: "WHAT PAGE WAS I ON AGAIN? ", speed: speeds.normal },
    { string: "HOLD ON ONE SEC. ", speed: speeds.normal },
    { string: "LET ME JUST FIND IT. ", speed: speeds.normal },
    { string: "HOW MANY PAPERS DO I HAVE? ", speed: speeds.normal },
    { string: "ARE THESE INSURANCE DOCUMENTS? ", speed: speeds.normal },
    { string: "OH. ", speed: speeds.normal },
    { string: "THEY’RE EXPIRED. ", speed: speeds.normal },
    { string: "I SHOULD PROBABLY GET ON THAT. ", speed: speeds.normal },
    { string: "… ", speed: speeds.normal },
]

// Get the .text class
var container = document.querySelector(".text");

function AwfulSpeechDude () {    
    this.timeSinceLastMessage = 0; // Difference between lastMessageTime and now
    var letters = [];
    this.isPlayerCharacterReadyForSpeech = false;
    this.isAMUNPCSpeaking = false;
    var self = this;
    
    var speechLine = 0; // Current sentence number for the speech
    var previousDelay = (speech[speechLine].speed * speech[speechLine].string.length) * 1.5; // Post speech sentence delay
    
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
        if (this.isPlayerCharacterReadyForSpeech && speechLine < speech.length && !(this.isAMUNPCSpeaking)) {
            // If the line that the speaker is on, is past the first line
            if (speechLine > 0) {
                // Get the speech speed - 1 index to match the delay with the sentence speed
                // Otherwise it'd be for the next line speed which may be different
                previousDelay = (speech[speechLine-1].speed * speech[speechLine-1].string.length) * 1.5;
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

    this.playSpeech = function (line) {
        this.line = line;

        speech[this.line].string.split("").forEach(letter => {
            var span = document.createElement("span");
            span.textContent = letter;
            container.appendChild(span);
        
            letters.push({
                span: span,
                delayAfter: speech[this.line].speed,
                isSpace: letter === " ",
            })
        })
    
        this.displaySpeechTextLetter(letters);
    }

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

function greetPlayerCharacter (nowTime) {

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
            delayAfter: speeds.normal,
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
var pixelSize;


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
        runnerSpeed = runnerSpeedModifier * deltaTime * globalSpeed * globalSpeedModifier;
        // Set the generator NPCs speed
        generatorSpeed = generatorNPCSpeedModifier * deltaTime * globalSpeed * globalSpeedModifier;
        // Set the tuber NPCs speed
        tuberSpeed = floatSpeedModifier * deltaTime * globalSpeed * globalSpeedModifier;

        runner1Obj.run(runnerSpeed);
        runner2Obj.run(runnerSpeed);

        generatorNPCObj.animate(generatorSpeed, lastFrameTimeStamp, pixelSize);

        tuber1Obj.float(tuberSpeed);
        tuber2Obj.float(tuberSpeed);

        mainCharacterObj.animate(pixelSize); // Pass in pixel size to avoid multiple calls to getPixelSize

        playerCharacterSpeechController();
        greetPlayerCharacter(lastFrameTimeStamp);
        awfulSpeechDudeObj.playAwfulSpeech();
        playMailBoxScene(lastFrameTimeStamp);

        // Keep updating the background position based on the current set direction
        ptGraderSpriteSheet.style.setProperty('background-position-y', `${(pixelSize * 20) * ptGraderDirection}px`);
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
