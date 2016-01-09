var _ = require("lodash");
var findAll = require("./find-all.js");
var random = require("random-weighted-choice");
var synonyms = require("./synonyms.js");
var suggestions = require("./suggestions.js");

var defaults = {
  trySynonyms: true,
  provideSuggestions: true
};

var findOne = function(index, input, options){
  var settings = _.defaults(options || {}, defaults);
  var results = findAll(index, input);  
  var one = random(results);
  if (one){
    return _.findWhere(results, {id:one});
  } else {
    var result = {};
    if (settings.trySynonyms){
      result = findOne(index, synonyms(input));
      result.thesaurusMatch = true;
    }
    if (settings.provideSuggestions){
      result.suggestions = suggestions(index, input);
    }
    return result;
  }
};

module.exports = findOne;
