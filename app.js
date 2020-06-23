const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var data = require('./data.json').results

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get("/",(req,res)=>{
	var kind="song"
	if (req.query.albumName) {
		var albumName = req.query.albumName;
		var filteredSongs = data.filter((song)=>song.kind===kind&&albumName===song.collectionName);
		res.send(JSON.stringify(filteredSongs))
	} else 
	if (req.query.albumId) {
		var albumId = Number(req.query.albumId);
		var filteredSongs = data.filter((song)=>song.kind===kind&&albumId===song.collectionId);
		res.send(JSON.stringify(filteredSongs))
	} else 
	if (req.query.trackName) {
		var trackName = req.query.trackName;
		var filteredSongs = data.filter((song)=>song.kind===kind&&trackName===song.trackName);
		res.send(JSON.stringify(filteredSongs))
	} else 
	if (req.query.id) {
		var searchId = Number(req.query.id);
		var filteredSongs = data.filter((song)=>song.kind===kind&&searchId===song.trackId);
		res.send(JSON.stringify(filteredSongs))
	} else {
		res.send(JSON.stringify(data.filter((song)=>song.kind===kind)))
	}
})

app.get("/video",(req,res)=>{
	var kind="music-video"
	if (req.query.albumName) {
		var albumName = req.query.albumName;
		var filteredSongs = data.filter((song)=>song.kind===kind&&albumName===song.collectionName);
		res.send(JSON.stringify(filteredSongs))
	} else 
	if (req.query.albumId) {
		var albumId = Number(req.query.albumId);
		var filteredSongs = data.filter((song)=>song.kind===kind&&albumId===song.collectionId);
		res.send(JSON.stringify(filteredSongs))
	} else 
	if (req.query.trackName) {
		var trackName = req.query.trackName;
		var filteredSongs = data.filter((song)=>song.kind===kind&&trackName===song.trackName);
		res.send(JSON.stringify(filteredSongs))
	} else 
	if (req.query.id) {
		var searchId = Number(req.query.id);
		var filteredSongs = data.filter((song)=>song.kind===kind&&searchId===song.trackId);
		res.send(JSON.stringify(filteredSongs))
	} else {
		res.send(JSON.stringify(data.filter((song)=>song.kind===kind)))
	}
})

app.post("/update",(req,res)=>{
	var kind="song"
	if (req.body && req.body.songId) {
		var songId = Number(req.body.songId);
		var filteredSongs = data.filter((song)=>song.kind===kind&&songId===song.trackId);
		res.send(filteredSongs.forEach((song)=>{
			for (var key in req.body) {
				if (key !== "songId") {
					song[key] = req.body[key]
				}
			}
		}))
		res.send("Updated "+filteredSongs.length+" song(s)")
	} else {
		res.status(400).send("songId not specified.");
	}
})

app.post("/video/update",(req,res)=>{
	var kind="music-video"
	if (req.body && req.body.songId) {
		var songId = Number(req.body.songId);
		var filteredSongs = data.filter((song)=>song.kind===kind&&songId===song.trackId);
		res.send(filteredSongs.forEach((song)=>{
			for (var key in req.body) {
				if (key !== "songId") {
					song[key] = req.body[key]
				}
			}
		}))
		res.send("Updated "+filteredSongs.length+" video(s)")
	} else {
		res.status(400).send("songId not specified.");
	}
})

app.post("/delete",(req,res)=>{
	var kind="song"
	if (req.body && req.body.songId) {
		var songId = Number(req.body.songId);
		var filteredSongs = data.filter((song)=>song.kind===kind&&songId===song.trackId);
		for (var i=0;i<data.length;i++) {
			if (filteredSongs.includes(data[i])) {
				data.splice(i,1)
			}
		}
		res.send("Removed "+filteredSongs.length+" song(s)")
	} else {
		res.status(400).send("songId not specified.");
	}
})

app.post("/video/delete",(req,res)=>{
	var kind="music-video"
	if (req.body && req.body.songId) {
		var songId = Number(req.body.songId);
		var filteredSongs = data.filter((song)=>song.kind===kind&&songId===song.trackId);
		for (var i=0;i<data.length;i++) {
			if (filteredSongs.includes(data[i])) {
				data.splice(i,1)
			}
		}
		res.send("Removed "+filteredSongs.length+" video(s)")
	} else {
		res.status(400).send("songId not specified.");
	}
})

app.get("/artist",(req,res)=>{
	var kind="song"
	if (req.query.id) {
		var artistId = Number(req.query.id);
		var filteredSongs = data.filter((song)=>song.kind===kind&&artistId===song.artistId);
		res.send(JSON.stringify(filteredSongs))
	} else 
	if (req.query.name) {
		var artistName = req.query.name;
		var filteredSongs = data.filter((song)=>song.kind===kind&&song.artistName.includes(artistName));
		res.send(JSON.stringify(filteredSongs))
	} else {
		res.status(400).send("id or name not specified.");
	}
})

function SongIdDoesNotExist(trackId) {
	var kind="song"
	return data.filter((song)=>song.kind===kind&&trackId===song.trackId).length===0;
}

app.post("/add",(req,res)=>{
	var kind="song"
	if (req.body && req.body.trackName
	 && req.body.trackId  && req.body.collectionName && req.body.collectionId
	 && req.body.artistId && req.body.artistName) {
		 if (SongIdDoesNotExist(req.body.trackId)) {
			 var song = {}
			 for (var key in req.body) {
				song[key] = req.body[key]
			}
			song["kind"] = kind;
			data.push(song)
			res.send("Added song "+JSON.stringify(song));
		 } else {
			res.status(400).send("songId already exists.");
		 }
	} else {
		res.status(400).send("trackId / trackName / collectionName / collectionId / artistId / artistName not specified.");
	}
})

app.post("/video/add",(req,res)=>{
	var kind="music-video"
	if (req.body && req.body.trackName
	 && req.body.trackId  && req.body.collectionName && req.body.collectionId
	 && req.body.artistId && req.body.artistName && req.body.previewUrl) {
		 if (SongIdDoesNotExist(req.body.trackId)) {
			 var song = {}
			 for (var key in req.body) {
				song[key] = req.body[key]
			}
			song["kind"] = kind;
			data.push(song)
			res.send("Added video "+JSON.stringify(song));
		 } else {
			res.status(400).send("songId already exists.");
		 }
	} else {
		res.status(400).send("trackId / trackName / collectionName / collectionId / artistId / artistName / previewUrl not specified.");
	}
})

const port = 3000
app.listen(port, () => console.log(`Listening at http://localhost:${port}`))

/*
Name - trackName
trackId
Album Name - collectionName
Album ID - collectionId
artistId
artistName

update by id
delete by id
add new song
*/