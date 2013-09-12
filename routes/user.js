
/**
 *mongo db connection
 */
var collections = ["users"];
var db = require("mongojs").connect('anktech', collections);
var nodemailer = require("nodemailer");


/**
 * save user details
 */
exports.save = function(req, res){
    if(req.method == 'POST'){       
        var name = req.body.usernamesignup;        
        var email = req.body.emailsignup;
        var password = req.body.passwordsignup;
        var cpassword = req.body.passwordsignup_confirm;       
        
        db.users.find({"email": email}, function(err, doc) {  
            if(doc.length > 0 ){                
                res.write("User with "+ email +" already registered");  
                res.end();
            } else{
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
                                console.log(error);
                            }else{                            	
                            	//req.flash('info', 'You\'ve successfully signed up for an account');
                                console.log("Message sent: " + response.message);                        
                                res.redirect('/');
                            }                            
                        });
                    } else{                    	
                    	console.log(err);
                    }
                });
            }
        });
	} else{		
    	res.redirect('/');
	}
	
};



/*
 * user login method
 */

exports.login = function(req, res){
    if(req.method == 'POST'){         
        var email = req.body.username;
        var password = req.body.password;              
        var rememberme = req.body.rememberme;              
        db.users.find({"email": email, "password": password}, function(err, doc) {  
            if(doc.length > 0 ){                
                req.session.email = email;
                if(rememberme == 1){
                    res.cookie('email', email);
                    res.cookie('password', password);
                }
                res.redirect('/myaccount');
            } else{
                console.log("You have entered invalid Username or Password");
                res.redirect('/');                
            }
            
        });
    }
};

/*
 * show my account page
 */
exports.myaccount = function(req, res){
    if(req.session.email) {
        res.render('myaccount', { title: 'My Account' });
    } else{
        res.redirect('/');   
    }
};


/*
 * logout method
 */
exports.logout = function(req, res){    
    req.session.destroy();
    res.clearCookie('email');    
    res.clearCookie('password');    
    res.redirect('/');  
    res.send("You are successfully logout");
};


/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};