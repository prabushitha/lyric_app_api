var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var async = require('async');

//using body parser
app.use(bodyParser.json());

Genre = require('./models/genre');
Lyric = require('./models/lyric');
//database connection
mongoose.connect('mongodb://localhost/musicapp');
var db = mongoose.connection;

/*
 MIDDLEWARE TO ACCEPT CORS
*/
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, PUT');
    next();
});
//create index routes
app.get('/',function(req,res){
	res.send("Welcome to music app");
});

/*
	Genre API
*/
//create api route to get all genres
app.get('/api/genre',function(req,res){
	Genre.getGenres(function(err,genres){
		if(err){
			throw err;
		}
		console.log("Get all genres request");
		res.json(genres);
	});
});

//create api route to get single genre by id
app.get('/api/genre/:_id',function(req,res){
	Genre.getGenreById(req.params._id, function(err,genres){
		if(err){
			throw err;
		}
		console.log("Get a genre request of "+req.params._id);
		res.json(genres);
	});
});

//create api route to add new genre to db
app.post('/api/genre',function(req,res){
	var genre = req.body;
	console.log("--------------------------------");
	console.log(genre);
	console.log("--------------------------------");
	Genre.addGenre(genre, function(err,genre){
		if(err){
			//throw err;
			console.log(err);
			res.json(err);
		}else{
			res.json(genre);
		}
		//console.log(genres);
		
	});
});

//create api route to update genre
app.put('/api/genre/:_id',function(req,res){
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, function(err,genre){
		if(err){
			throw err;
		}
		//console.log(genres);
		res.json(genre);
	});
});

//create api route to delete genre
app.delete('/api/genre/:_id',function(req,res){
	var id = req.params._id;
	Genre.deleteGenre(id, function(err,genre){
		if(err){
			throw err;
		}
		//console.log(genres);
		res.json(genre);
	});
});

/*
	Lyric API
*/
//create api route to get all lyrics
app.get('/api/lyric',function(req,res){
	Lyric.getLyrics({},10000,0,function(err,genres){
		if(err){
			throw err;
		}
		console.log("Get all genres request");
		res.json(genres);
	},{});
});
//create api route to get all lyrics with specific keyword
app.get('/api/lyric/keyword/:_keyword/:_limit/:_page',function(req,res){
	//{$or:[{title:/a/},{si_title:/a/}]}
	var queryjson = {
		$or:[
				{title:new RegExp(req.params._keyword)},
				{si_title:new RegExp(req.params._keyword)}
			]
	};
	console.log(queryjson);
	//async.parallel runs 2 functions at once under same conditions
	async.parallel([Lyric.getLyrics.bind(null,queryjson,req.params._limit,req.params._page), Lyric.getLyricCount.bind(null,queryjson)], function(err, results){
         res.json({totalcount: results[1], lyrics: results[0]});

    });
});

//create api route to get all lyrics
app.get('/api/lyric/:_limit/:_page',function(req,res){
	//async.parallel runs 2 functions at once under same conditions
	async.parallel([Lyric.getLyrics.bind(null,{},req.params._limit,req.params._page), Lyric.getLyricCount.bind(null,{})], function(err, results){
         //err contains the array of error of all the functions
         //results contains an array of all the results
         //results[0] will contain value from getLyrics function
         //results[1] will contain value from getLyricCount function
         //You can send the results as
         res.json({totalcount: results[1], lyrics: results[0]});

    });
});

//create api route to get single genre by id
app.get('/api/lyric/:_id',function(req,res){
	Lyric.getLyricById(req.params._id, function(err,genres){
		if(err){
			throw err;
		}
		console.log("Get a genre request of "+req.params._id);
		res.json(genres);
	});
});

//create api route to add new genre to db
app.post('/api/lyric',function(req,res){
	var genre = req.body;
	console.log("--------------------------------");
	console.log(genre);
	console.log("--------------------------------");
	Lyric.addLyric(genre, function(err,genre){
		if(err){
			//throw err;
			console.log(err);
			res.json(err);
		}else{
			res.json(genre);
		}
		//console.log(genres);
		
	});
});

//create api route to update genre
app.put('/api/lyric/:_id',function(req,res){
	var id = req.params._id;
	var genre = req.body;
	Lyric.updateLyric(id, genre, {}, function(err,genre){
		if(err){
			throw err;
		}
		//console.log(genres);
		res.json(genre);
	});
});

//create api route to delete genre
app.delete('/api/lyric/:_id',function(req,res){
	var id = req.params._id;
	Lyric.deleteLyric(id, function(err,genre){
		if(err){
			throw err;
		}
		//console.log(genres);
		res.json(genre);
	});
});


app.listen(3000);
console.log('Running on port 3000');


