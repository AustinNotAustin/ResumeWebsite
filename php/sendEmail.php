<?php

// Used to ban IPs if needed
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

// Simplified for extra security
if (isset($_POST['name'])) {
    $name = (string)filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = (string)filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $message = (string)filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $emailTo = "myEmailHere@email.here";

    $subject = "Subject";

    $headers = "From: website";

    $user_IP = getUserIPAddress();

    $text = $message;

    mail($emailTo, $subject, $text, $headers,'-fmyEmailHere@email.here');
    header("Location: ../?messageSent");
}

?>
