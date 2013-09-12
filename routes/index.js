
/*
 * GET home page.
 */

var collections = ["users"];
var db = require("mongojs").connect('anktech', collections);

exports.index = function(req, res){
	if(req.cookies.email &&  req.cookies.password){
		var email = req.cookies.email;
        var password = req.cookies.password; 
	    db.users.find({"email": email, "password": password}, function(err, doc) {  
	        if(doc.length > 0 ){                
	            req.session.email = email;	           
	            res.redirect('/myaccount');
	        } else{
	           res.render('index', { title: 'Login' });           
	        }
    	});
  	} else{
       	res.render('index', { title: 'Login' });           
    }
};