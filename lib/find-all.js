var _ = require("lodash");
var findExactMatch = require("./find-exact-match.js");
var findFuzzyMatch = require("./find-fuzzy-match.js");
var sentiment = require("sentiment");

module.exports = function(index, input){
  var inputWords = _.words(input);
  var inputSentiment = sentiment(input).score;
  var exactMatches = findExactMatch(index, inputWords);
  var fuzzyMatches = findFuzzyMatch(index, inputWords, inputSentiment);

  return [].concat(exactMatches, fuzzyMatches);
};
