var mongoose = require('mongoose');

//Genre schema
var genreSchema = mongoose.Schema({
	name:{
		type:String,
		required: true
	},
	si_name:{
		type:String,
		required: true
	},
	created_date:{
		type:Date,
		default:Date.now
	}
});

var Genre = mongoose.model(
	'Genre', //name
	genreSchema, //schema
	'genre' //collection name
	);
//get genres
Genre.getGenres = function (callback,limit){
	Genre.find(callback).limit(limit);
};
Genre.getGenreById = function(id,callback){
	Genre.findById(id,callback);
};
Genre.addGenre = function(genre,callback){
	Genre.create(genre,callback);
};
Genre.updateGenre = function(id,genre,options,callback){
	var query = {_id:id};
	var update = {
		name:genre.name,
		si_name:genre.si_name
	};
	Genre.findOneAndUpdate(query,update,options,callback);
};
Genre.deleteGenre = function(id,callback){
	var query = {_id:id};
	Genre.remove(query,callback);
};
module.exports = Genre;
