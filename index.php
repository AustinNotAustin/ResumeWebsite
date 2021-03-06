<!DOCTYPE html>

<!-- Restrict user's from caching -->
    <?php
    
    //set headers to NOT cache a page
    header("Cache-Control: no-cache, must-revalidate"); //HTTP 1.1
    header("Pragma: no-cache"); //HTTP 1.0
    header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Date in the past
    
    ?>
    
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Austin Arledge</title>
        <meta name="description" content="An ongoing project" />
        <meta name="author" content="Austin Arledge" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />

        <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-touch-icon.png">
        <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
        <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">

        <link rel="stylesheet" href="css/style.css" />
        <script defer type="text/javascript" src="js/main.js"></script>
        <!-- h Captcha custom class -->
        <script defer type="text/javascript" src="js/hCaptcha.js"></script>
        <!-- h Captcha CDN -->
        <script src='https://js.hcaptcha.com/1/api.js' async defer></script>
    </head>

    <body>
        
        <div class="camera">
            <div class="map pixelArt">

                
                <div>

                    <!-- Map objects -->
                    <div class="river">
                        <div class="riverSpriteSheet"></div>
                    </div>

                    <div class="generator">
                        <div class="generatorSpriteSheet"></div>
                    </div>

                    <div class="palmTree">
                        <div class="palmTreeSpriteSheet"></div>
                    </div>

                    <div class="palmTree palmTree2">
                        <div class="palmTreeSpriteSheet palmTreeSpriteSheet1"></div>
                    </div>
                    
                    
                    <!-- Speech Box -->
                    <div class="text"></div>
                    
                    
                    <!-- NPCs -->
                    <div class="doggo doggo1">
                        <div class="doggoSpriteSheet doggo1SpriteSheet"></div>
                    </div>
                    
                    <div class="soldier soldier1 pixelArt">
                        <div class="soldierSpriteSheet soldier1SpriteSheet pixelArt"></div>
                    </div>
                    
                    <div class="soldier soldier2 pixelArt">
                        <div class="soldierSpriteSheet soldier2SpriteSheet pixelArt"></div>
                    </div>
                    
                    <!-- PT Test Grader -->
                    <div class="soldier soldier3">
                        <div class="soldierSpriteSheet soldier3SpriteSheet"></div>
                    </div>

                    <div class="soldier soldier4">
                        <div class="soldierSpriteSheet soldier4SpriteSheet"></div>
                    </div>

                    <div class="tuber tuber1 pixelArt">
                        <div class="tuberSheet tuber1sheet pixelArt"></div>
                    </div>
                    
                    <div class="tuber tuber2 pixelArt">
                        <div class="tuberSheet tuber2sheet pixelArt"></div>
                    </div>

                    <div class="grad grad1">
                        <div class="gradSpriteSheet grad1SpriteSheet"></div>
                    </div>
                    
                    <div class="grad grad2">
                        <div class="gradSpriteSheet grad2SpriteSheet"></div>
                    </div>

                    <div class="grad grad3">
                        <div class="gradSpriteSheet grad3SpriteSheet"></div>
                    </div>

                    <div class="grad grad4">
                        <div class="gradSpriteSheet grad4SpriteSheet"></div>
                    </div>

                    <div class="grad grad5">
                        <div class="gradSpriteSheet grad5SpriteSheet"></div>
                    </div>
                    
                    <!-- Bridge -->
                    <div>
                        <div id="bridge"></div>
                    </div>
                    
                    
                    <!-- Flags -->
                    <div class="armyFlag">
                        <div id="armyFlagSS"></div>
                    </div>
                    
                    <div class="usFlag">
                        <div id="usFlagSS"></div>
                    </div>
                    
                    
                    <!-- Signs -->
                    <div class="sign goDownSign">
                        <div class="signSS goDownSignSS"></div>
                    </div>

                    <div class="sign armySign">
                        <div class="signSS armySignSS"></div>
                    </div>

                    <div class="sign cssSign">
                        <div class="signSS cssSignSS"></div>
                    </div>

                    <div class="sign htmlSign">
                        <div class="signSS htmlSignSS"></div>
                    </div>

                    <div class="sign javaSign">
                        <div class="signSS javaSignSS"></div>
                    </div>

                    <div class="sign mySqlSign">
                        <div class="signSS mySqlSignSS"></div>
                    </div>

                    <div class="sign pythonSign">
                        <div class="signSS pythonSignSS"></div>
                    </div>

                    <div class="sign javaScriptSign">
                        <div class="signSS javaScriptSignSS"></div>
                    </div>

                    <div class="sign leaderSign">
                        <div class="signSS leaderSignSS"></div>
                    </div>

                    <div class="sign netSysSign">
                        <div class="signSS netSysSignSS"></div>
                    </div>

                    <div class="sign nurseSign">
                        <div class="signSS nurseSignSS"></div>
                    </div>
                    
                    <div class="sign degreeSign">
                        <div class="signSS degreeSignSS"></div>
                    </div>

                    
                    
                    <!-- Numbers for stop clock -->
                    <div class="numbers0-6 tenMin">
                        <div class="numbers-hours" id="numbers0-6"></div>
                    </div>
                    
                    <div class="numbers oneMin">
                        <div class="numbers-minutes" id="numbers"></div>
                    </div>
                    
                    <div class="numbers0-6 tenSec">
                        <div class="numbers-tens-seconds" id="numbers0-6"></div>
                    </div>
                    
                    <div class="numbers hunSec">
                        <div class="numbers-seconds" id="numbers"></div>
                    </div>

                </div>
                
                <!-- Player Character -->
                <div>
                    <div class="character pixelArt" walkDir="down" sprintDir="down" walking="true" sprinting="false">
                        <div class="characterSpritesheet"></div>
                    </div>
                    
                </div>
                
                <!-- PT Grader's speech bubble -->
                <div class="ptGraderSpeechBubble speechBubble">'MORNING SERGEANT!</div>

                <!-- Mailbox has to be on top of Player Character to give proper visual effect -->
                <div class="mailbox">
                    <div id="mailbox"></div>
                </div>

                
                
                <div class="mail pixelArt">
                    <div id="mail"></div>
                </div>     

                <div class="mailClosed glow" onclick="displayLetterForm()">
                    <div class="mailClosedSpriteSheet"></div>
                </div>
            </div>
            

            <!-- Player Character's Speech Bubble -->
            <div class="playerText speechBubble"></div>
            

            <!-- Control Buttons / UI -->

            <div class="allBtns pixelArt">
                <div class="sprint-btn single-btn glow"></div>
                <div class="upBtn single-btn glow">
                    <div class="upBtnSpriteSheet singleBtnSpriteSheet"></div>
                </div>
                <div class="downBtn single-btn glow">
                    <div class="upBtnSpriteSheet singleBtnSpriteSheet"></div>
                </div>
            </div>


            <!-- Form Section -->

            <form id="message-form" class="pixelArt formLetterController" action="/php/sendEmail.php" method="post">
                <!-- Letter Form for user to send me a message -->
                <div class="pixelArt letterForm"></div>
                
                <!-- Letter form fields -->
                <input class="formText formCloseBtn" type="button" name="closeBtn" id="closeBtn" onclick="hideLetterForm()">

                <label class="formText formTextLabel" for="message">DEAR AUSTIN,</label>
                <textarea class="formTextField speechBubble" name="message" id="message" maxlength="495" placeholder="ENTER YOUR MESSAGE HERE!" required></textarea>
                
                <label class="formText formEmailLabel" for="email">MY EMAIL IS:</label>
                <input class="formEmailField speechBubble" type="email" name="email" id="email" maxlength="45" placeholder="ENTER YOUR EMAIL HERE!" required>
                
                <label class="formText formNameLabel" for="name">FROM,</label>
                <input class="formNameField speechBubble" type="text" name="name" id="name" maxlength="25" placeholder="ENTER YOUR NAME HERE!" required>
                
                <!-- h Captcha -->
                <div class="h-captcha h-captcha-custom" data-sitekey="--------------------> YOUR SITE KEY HERE! <--------------------"></div>

                <input class="formText submitFormLetter" type="submit" value="SUBMIT">
            </form>
            

        </div>
    </body>
        
    <footer>
    </footer>
</html>