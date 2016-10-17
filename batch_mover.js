/* 
HOW THIS WORKS

Put this script in the folder full of pics you want to upload to firebase.
This script will, on a timer, move an image from this directory to the directory listening
for new files, as set in the 'toDir' global variable.. 

NOTE: files will no longer appear in the original directory!

*/

var fs = require('fs');
var attempted = 0;
var done = 0;
var total = 0;
var firstTime = true;
var toDir = "/Users/matthewepler/Desktop/grace_hopper_uploader";

var files = fs.readdirSync(__dirname);
total = files.length;

uploadFile();

function uploadFile() {
	attempted += 1;
	if(attempted < total) {
		setTimeout(function() {
			uploadFile();
		}, 2000);
	}

	// read director
	var nowFiles = fs.readdirSync(__dirname);

	// select a file
	var path = null;
	var thisFile = null;

	if (files !== null) {
		thisFile = nowFiles[getRandomIntInclusive(0, nowFiles.length)];
		path = __dirname + '/' + thisFile
		path !== null ? moveFile(path) : console.log('Error: path assignment failed:', thisFile);
	} else {
		console.log('Error: reading directory failed');
	}

	// move it to the uploader dir
	function moveFile(path) {
		rename = fs.rename(path, toDir + '/' + thisFile, function(err) {
			if (err) {
				console.log('Error: selecting random file failed:', thisFile);
				console.log(err);
			} else {
				done += 1;
				console.log(done + ' of ' + total + ' complete');
			}
		});	
	}
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}