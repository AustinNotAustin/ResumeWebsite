<?php

function getUserIPAddress() {  
    // From share internet  
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {  
        $ip = $_SERVER['HTTP_CLIENT_IP'];  
    }  
    
    // From proxy  
    elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {  
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];  
    }  
    
    // From remote address  
    else {  
        $ip = $_SERVER['REMOTE_ADDR'];  
    }  
    
    return $ip;  
}

// h Captcha
$data = array(
    'secret' => "--------------------> DON'T FORGET TO PUT YOUR hCAPTCHA SECRET KEY HERE! <--------------------",
    'response' => $_POST['h-captcha-response']
);

$verify = curl_init();

curl_setopt($verify, CURLOPT_URL, "https://hcaptcha.com/siteverify");
curl_setopt($verify, CURLOPT_POST, true);
curl_setopt($verify, CURLOPT_POSTFIELDS, http_build_query($data));
curl_setopt($verify, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($verify);
$responseData = json_decode($response);

// If they have completed the hCaptcha successfully
if($responseData->success) {
    // Send email
    if (isset($_POST['name'])) {
        $name = (string)filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        $email = (string)filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $message = (string)filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
        
        $emailTo = "--------------------> YOUR EMAIL HERE! <--------------------";

        $subject = "Interactive Resume Message";

        $headers = "From: --------------------> YOUR EMAIL HERE! <--------------------";
        $headers .= "\r\nReply-To: --------------------> YOUR EMAIL HERE! <--------------------";

        $user_IP = getUserIPAddress();

        $text = "New message from: ".$name."\n\nMessage: ".$message."\n\nContact Email: ".$emailFrom."\n\nIP Address: ".$user_IP;

        mail($emailTo, $subject, $text, $headers,'-f--------------------> YOUR EMAIL HERE! <--------------------');
    }

    echo '<script type="text/javascript">

            if (window.confirm("Message sent! :)")) {
                window.location.href="../?messageSent";
            } else {
                window.location.href="../?messageSent";
            }

    </script>';
}
// If the have failed the hCaptcha...
else {
    echo '<script type="text/javascript">

            if (window.confirm("Please complete the hCaptcha next time! \n\nYour message was NOT sent :(")) {
                window.location.href="../?messageFailed";
            } else {
                window.location.href="../?messageFailed";
            }

    </script>';
}

?>