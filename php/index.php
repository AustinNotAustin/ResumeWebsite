<?php


if (isset($_POST)) {
    $name = $_POST['name'];
    $emailFrom = $_POST['email'];
    $message = $_POST['message'];
    
    $emailTo = "austin@austinarledge.com";
    $subject = "Interactive Resume Message";
    $headers = "From: austin@austinarledge.com";
    $headers .= "\r\nReply-To: austin@austinarledge.com";
    $text = "New message from: ".$name."\n\n".$message."\n\nContact Email: ".$emailFrom;
    
    mail($emailTo, $subject, $text, $headers,'-faustin@austinarledge.com');
    
    echo '<style type="text/css">
    #mailBox {
        transform: translate3d(-50%, 0%, 0);
    }
    </style>';
    
}

?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Austin Arledge</title>
        <meta name="description" content="An ongoing project" />
        <meta name="author" content="Austin Arledge" />
        <meta name="viewport" content="width=device-width, user-scalable=no" />
        <link rel="stylesheet" href="css/style.css" />
        <script defer type="text/javascript" src="js/main.js"></script>
    </head>

    <body>
        
        <div class="camera">
            <div class="map pixelArt">

                
                <div>

                    <!-- Map objects -->
                    <div class="river">
                        <img id="river" src="/img/RiverSpriteSheet.png">
                    </div>
                    
                    
                    <!-- Speech Box -->
                        <div class="text"></div>

                    
                    <!-- NPCs -->
                    <div class="soldier soldier1 pixelArt">
                        <div class="soldierSpriteSheet soldier1SpriteSheet pixelArt"></div>
                    </div>

                    <div class="soldier soldier2 pixelArt">
                        <div class="soldierSpriteSheet soldier2SpriteSheet pixelArt"></div>
                    </div>

                    <div class="tuber tuber1 pixelArt">
                        <div class="tuberSheet tuber1sheet pixelArt"></div>
                    </div>
                    
                    <div class="tuber tuber2 pixelArt">
                        <div class="tuberSheet tuber2sheet pixelArt"></div>
                    </div>
                    

                    <!-- Bridge -->
                    <div>
                        <img id="bridge" src="/img/Bridge.png">
                    </div>
                    
                    
                    <!-- Flags -->
                    <div class="armyFlag">
                        <img id="armyFlag" src="/img/Flag/FlagSheet.png">
                    </div>
                    
                    <div class="usFlag">
                        <img id="usFlag" src="/img/flag/USFlagSheet.png">
                    </div>
                    
                    
                    <!-- Signs -->
                    <div class="sign armySign">
                        <img id="sign" src="/img/Signs/ArmySigns.png" style="animation: animate 3.1s steps(2) infinite;">
                    </div>

                    <div class="sign cssSign">
                        <img id="sign" src="/img/Signs/CSSSign.png" style="animation: animate 3.4s steps(2) infinite;">
                    </div>

                    <div class="sign htmlSign">
                        <img id="sign" src="/img/Signs/HTMLSign.png" style="animation: animate 3.6s steps(2) infinite;">
                    </div>

                    <div class="sign javaSign">
                        <img id="sign" src="/img/Signs/JavaSign.png" style="animation: animate 3.1s steps(2) infinite;">
                    </div>

                    <div class="sign mySqlSign">
                        <img id="sign" src="/img/Signs/MySQLSign.png" style="animation: animate 3.5s steps(2) infinite;">
                    </div>

                    <div class="sign pythonSign">
                        <img id="sign" src="/img/Signs/PythonSign.png" style="animation: animate 3.2s steps(2) infinite;">
                    </div>

                    <div class="sign javaScriptSign">
                        <img id="sign" src="/img/Signs/JavaScriptSign.png" style="animation: animate 3.3s steps(2) infinite;">
                    </div>

                    <div class="sign leaderSign">
                        <img id="sign" src="/img/Signs/LeaderSign.png">
                    </div>

                    <div class="sign netSysSign">
                        <img id="sign" src="/img/Signs/NetSysSign.png">
                    </div>

                    <div class="sign nurseSign">
                        <img id="sign" src="/img/Signs/NurseSign.png">
                    </div>

                    <div class="sign nurseSign">
                        <img id="sign" src="/img/Signs/NurseSign.png">
                    </div>
                    
                    <div class="sign degreeSign">
                        <img id="sign" src="/img/Signs/DegreeSign.png">
                    </div>

                    
                    
                    <!-- Numbers for stop clock -->
                    <div class="numbers0-6 tenMin">
                        <img id="numbers0-6" src="/img/ClockNumbers0-6.png" style="animation: animate 3600s steps(6) infinite">
                    </div>
                    
                    <div class="numbers oneMin">
                        <img id="numbers" src="/img/ClockNumbers.png" style="animation: animate 600s steps(10) infinite">
                    </div>
                    
                    <div class="numbers0-6 tenSec">
                        <img id="numbers0-6" src="/img/ClockNumbers0-6.png" style="animation: animate 60s steps(6) infinite">
                    </div>
                    
                    <div class="numbers hunSec">
                        <img id="numbers" src="/img/ClockNumbers.png" style="animation: animate 10s steps(10) infinite">
                    </div>
                    


                    <!-- PT Test Grader -->
                    <div class="soldier soldier3">
                        <div class="soldierSpriteSheet soldier3SpriteSheet"></div>
                    </div>

                </div>
                
                <!-- Player Character -->
                <div>
                    <div class="character pixelArt" facing="down" walking="true">
                        <div class="characterSpritesheet pixelArt"></div>
                    </div>
                    
                </div>
                
                <!-- PT Grader's speech bubble -->
                <div class="ptGraderSpeechBubble speechBubble">'MORNING SERGEANT!</div>

                <!-- Mailbox has to be on top of Player Character to give proper visual effect -->
                <div class="mailbox">
                    <img id="mailbox" src="/img/Mailbox.png">
                </div>

                
                
                <div class="mail pixelArt">
                    <img id="mail" src="/img/MailSpriteSheet.png">
                </div>     

                <img src="/img/MailLetterClosed.png" class="mailClosed" onclick="displayLetterForm()">
            </div>
            
            <!-- Player Character's Speech Bubble -->
            <div class="playerText speechBubble"></div>
            

            <form class="pixelArt formLetterController" action="index.php" method="post">
                <!-- Letter Form for user to send me a message -->
                <div class="pixelArt letterForm"></div>
                
                <!-- Letter form fields -->
                <input class="formText formCloseBtn" type="button" name="closeBtn" id="closeBtn" value="x" onclick="hideLetterForm()">

                <label class="formText formTextLabel" for="message">DEAR AUSTIN,</label>
                <textarea class="formTextField speechBubble" name="message" id="message" cols="44" rows="11" maxlength="495" placeholder="ENTER YOUR MESSAGE HERE!" required></textarea>
                
                <label class="formText formEmailLabel" for="email">MY EMAIL IS:</label>
                <input class="formEmailField speechBubble" type="email" name="email" id="email" placeholder="ENTER YOUR EMAIL HERE!" required>
                
                <label class="formText formNameLabel" for="name">FROM,</label>
                <input class="formNameField speechBubble" type="text" name="name" id="name" placeholder="ENTER YOUR NAME HERE!" required>
                
                <input class="formText submitFormLetter" type="submit" value="SUBMIT">
            </form>
            
        </div>
    </body>
        
    <footer>
        
    </footer>
</html>