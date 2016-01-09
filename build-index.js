var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var sentiment = require("sentiment");

var files = fs.readdirSync("./gifs");

var index = [];

var addEntry = function(tags, filename){  
  var tagString = tags.join(" ");
  var sentimentScore = sentiment(tagString).score;
  index.push({
    tags: tags,
    tagString: tagString,
    filename: filename,
    sentimentScore: sentimentScore
  });
};

var addFile = function(filename){
  var info = path.parse(filename);
  if (info.ext == ".metadata"){
    var fullPath = path.join("./gifs", filename);
    var contents = fs.readFileSync(fullPath, {encoding: "utf8"});
    if (contents.trim().length > 0){
      var words = _.words(contents);
      addEntry(words, info.name);
    } else {
      console.log("Missing metadata: ", filename);
    }
  }
};

files.forEach(addFile);
var contents = JSON.stringify(index, null, "\t");
fs.writeFileSync("index.json", contents);
