const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const config = require('../config/secret');

// db connection 
mongoose.connect(config.database, { useMongoClient : true});
const db = mongoose.connection;

db.on('error', () => {
	console.log('db connection error');
});

db.once('open', () => {
	console.log('db is connected');
});

// user schema
const userShema = mongoose.Schema({
	 name : {
	 	type: String
	 },
	 email : {
	 	type: String,
	 	unique: true
	 },
	 subject : {
	 	type: String
	 },
     message : {
    	type : String
    }
});

module.exports = mongoose.model('User', userShema);