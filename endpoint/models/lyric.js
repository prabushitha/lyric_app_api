var mongoose = require('mongoose');

//Genre schema
var lyricSchema = mongoose.Schema({
	title:{
		type:String,
		required: true
	},
	si_title:{
		type:String,
		required: true
	},
	genre:{
		type:String,
		required: true
	},
	content:{
		type:String
	},
	mp3link:{
		type:String
	},
	upvotes:{
		type:Number,
		default:0
	},
	downvotes:{
		type:Number,
		default:0
	},
	created_date:{
		type:Date,
		default:Date.now
	}
});

var Lyric = mongoose.model(
	'Lyric', //name
	lyricSchema, //schema
	'lyric' //collection name
	);
//get genres
Lyric.getLyrics = function (callback,limit){
	Lyric.find(callback).limit(limit);
};
Lyric.getLyricById = function(id,callback){
	Lyric.findById(id,callback);
};
Lyric.addLyric = function(lyric,callback){
	Lyric.create(lyric,callback);
};
Lyric.updateLyric = function(id,lyric,options,callback){
	var query = {_id:id};
	var update = lyric;
	Lyric.findOneAndUpdate(query,update,options,callback);
};
Lyric.deleteLyric = function(id,callback){
	var query = {_id:id};
	Lyric.remove(query,callback);
};
module.exports = Lyric;
