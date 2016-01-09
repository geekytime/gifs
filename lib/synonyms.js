var _ = require("lodash");
var thesaurus = require("thesaurus");

module.exports = function(input){
  var words = _.words(input);
  var allMatches = [];
  words.forEach(function(word){
    var matches = thesaurus.find(word);
    allMatches = allMatches.concat(matches);
  });
  console.log(allMatches);
  return allMatches.join(" ");
};
