var _ = require("lodash");

module.exports = function(index, inputWords){
  var allMatches = [];
  index.forEach(function(entry){
    var matches = _.intersection(entry.tags, inputWords);
    if (matches.length > 0){
      allMatches.push({
        filename: entry.filename,
        id: entry.filename + ":exact",
        type: "exact",
        weight: matches.length,
        matches: matches
      });
    }
  });
  return allMatches;
};
