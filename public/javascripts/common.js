
// password and confirm password validation
$.validator.addMethod('equalTo',function () {     
    return $('#passwordsignup').val() == $('#passwordsignup_confirm').val()
}, 'password and confirm password should be same.');

$(document).ready(function() {
    $("#registrationform").validate({
        rules: {
        	"usernamesignup": {
                required: true
            },
            "emailsignup": {
                required: true,
                email:true
            },
            "passwordsignup": {
                required: true
            },
           "passwordsignup_confirm": {      
           		required: true,         
                equalTo: true
            },
            "username": {      
                required: true,
                email: true
            },
            "password": {      
                required: true
            },
        },messages: {
        	"usernamesignup": {
                required: "Please enter your Name."
            },
            "emailsignup": {
                required: "Please enter your email.",
                email: "Please enter valid email."
            },
            "passwordsignup": {
               required:"Please enter your Password."
            },
            "passwordsignup_confirm": {  
            	required:"Please enter your Password.",              
                equalTo: 'password and confirm password should be same.'
            },
            "username": {  
                required:"Please enter your email.",
                email: "Please enter valid email."    
            },
            "password": {  
                required:"Please enter your Password."
            }
        }
    });

    $("#loginform").validate({
        rules: {            
            "username": {      
                required: true,
                email: true
            },
            "password": {      
                required: true
            },
        },messages: {            
            "username": {  
                required:"Please enter your email.",
                email: "Please enter valid email."    
            },
            "password": {  
                required:"Please enter your Password."
            }
        }
    });
});