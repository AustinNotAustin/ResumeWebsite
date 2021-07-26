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

if (isset($_POST['name'])) {
    $name = (string)filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    $email = (string)filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $message = (string)filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
    
    $emailTo = "austin@austinarledge.com";

    $subject = "Interactive Resume Message";

    $headers = "From: austin@austinarledge.com";
    $headers .= "\r\nReply-To: austin@austinarledge.com";

    $user_IP = getUserIPAddress();

    $text = "New message from: ".$name."\n\nMessage: ".$message."\n\nContact Email: ".$emailFrom."\n\nIP Address: ".$user_IP;

    mail($emailTo, $subject, $text, $headers,'-faustin@austinarledge.com');
    header("Location: ../?messageSent");
}

?>