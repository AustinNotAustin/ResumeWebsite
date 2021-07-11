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
    
    header("Location: ../?messageSent");
}

?>