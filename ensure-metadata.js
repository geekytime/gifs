var _ = require("lodash");
var fs = require("fs");
var path = require("path");

var files = fs.readdirSync("./gifs");

var getMetadataFilename = function(gifName){
  var basename = path.basename(gifName);
  var metadataFilename = basename + ".metadata";
  return metadataFilename;
}

var needsMetadata = function(metadataFilename){
  return !_.contains(files, metadataFilename);
}

var createMetadata = function(metadataFilename){
  var fullPath = path.join("./gifs", metadataFilename);
  fs.writeFileSync(fullPath, "");
};

var ensureMetadata = function(filename){
  if (path.extname(filename) == ".gif"){
    var metadataFilename = getMetadataFilename(filename);
    if (needsMetadata(metadataFilename)){
      createMetadata(metadataFilename);
    }
  }
};

files.forEach(ensureMetadata);
