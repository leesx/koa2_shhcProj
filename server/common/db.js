//var db = require('mongoskin').db('mongodb://10.10.3.188:27017/blog');
//var db = require('mongoskin').db('mongodb://127.0.0.1:27017/blog');
const mongoskin= require('mongoskin');
const mongodbUrl = 'mongodb://lishangxi:891212459x@127.0.0.1:27017/db_shhc';
module.exports={
	db : mongoskin.db(mongodbUrl),
	ObjectID : mongoskin.ObjectID,
	mongodbUrl,
};
