var _ = require("lodash");
var downloadFile = require("download-file");
var fs = require("fs");
var isThere = require("is-there");
var path = require("path");
var sentiment = require("sentiment");

var index = [];

var addEntry = function(metadata){
  var tagString = metadata.words.join(" ");
  var sentimentScore = sentiment(tagString).score;
  index.push({
    tags: metadata.words,
    tagString: tagString,
    filename: metadata.filename,
    sentimentScore: sentimentScore
  });
};

var ensureGif = function(metadata){
  if (_.isUndefined(metadata.source)){
    return;
  }

  var gifPath = path.join("./gifs", metadata.filename);
  if (!isThere(gifPath)){
    console.log("gif missing:", gifPath);
    console.log("downloading:", metadata.source);

    var options = {
      directory: "./gifs",
      filename: metadata.filename
    };
    downloadFile(metadata.source, options, function(err){
      if (err){
        console.error("  download failed for:", metadata.source);
        console.error(err);
      } else {
        console.log("  download complete:", metadata.source);
      }
    });
  }
};

var addFile = function(filename){
  var info = path.parse(filename);
  if (info.ext == ".json"){
    var fullPath = path.resolve("./gifs", filename);
    var metadata = require(fullPath);
    metadata.filename = info.name + ".gif";
    if (metadata){
      addEntry(metadata);
      ensureGif(metadata);
    } else {
      console.log("Missing metadata: ", filename);
    }
  }
};

var files = fs.readdirSync("./gifs");
files.forEach(addFile);
var contents = JSON.stringify(index);
fs.writeFileSync("index.json", contents);
