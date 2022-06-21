let form = document.getElementById("message-form");


// Listen for form submissions, and ensure the user completes the hCaptcha
form.addEventListener("submit", (event) => {

    let hcaptchaVal = document.getElementsByName("h-captcha-response").value;
    if (hcaptchaVal === "") {
       event.preventDefault();
       alert("Please complete the hCaptcha");
    }

});
