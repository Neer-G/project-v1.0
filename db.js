/*var mongoose = require( 'mongoose' );
 
mongoose.connect( 'mongodb://localhost/test', function(err){
	if(err){
		console.log(err);
	} else{
		console.log('connected to mongodb');
	}
});*/

// Retrieve
var MongoClient = require('mongodb').MongoClient;

// Connect to the db
MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
  if(!err) {
    console.log("We are connected");
  } else{
  	console.log(err);
  }
});