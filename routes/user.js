
/**
 * save user  details
 */
var collections = ["users"];
var db = require("mongojs").connect('anktech', collections);
var nodemailer = require("nodemailer");

exports.save = function(req, res){
    if(req.method == 'POST'){
        var name = req.body.usernamesignup;        
        var email = req.body.emailsignup;
        var password = req.body.passwordsignup;
        var cpassword = req.body.passwordsignup_confirm;       
        
        // insert data into database
        db.users.insert({"name": name, "email": email, "password": password}, function(err, doc) {
            if(!err){
                // SMTP connection for mail
                var smtpTransport = nodemailer.createTransport("SMTP",{
                    service: "Gmail",
                    auth: {
                        user: "neerajanktech@gmail.com",
                        pass: "anktech@123"
                    }
                });
                var body = ""
	                body += "<b>Welcome "+name+" !</b>,<br><br>"
	                body += "You've successfully signed up for an account."
	                body += "Your account has been created and you may now sign in our website with your email address "+email+" ."
	                body += "You may sign in at any time at localhost:3000 .<br><br>Sincerely,<br><br>The Anktech Team";

                // setup e-mail data 
                var mailOptions = {
                    from: "Neeraj<noreply@anktech.co.in>", 
                    to: email, 
                    subject: "Registration Confirmation Email", 
                    text: "Hello "+name, 
                    html: body
                }

                // send mail with defined transport object
                smtpTransport.sendMail(mailOptions, function(error, response){
                    if(error){
                    	db.close();
                        console.log(error);
                    }else{
                    	db.close();
                    	//req.flash('error', 'You\'ve successfully signed up for an account');
                        console.log("Message sent: " + response.message);                        
                        res.redirect('/');
                    }
                    //req.flash("info", "You went GO, and got redirected to home!");
                });
            } else{
            	db.close();
            	console.log(err);
            }
        });
	} else{
		db.close();
    	res.redirect('/');
	}
	
};



/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};