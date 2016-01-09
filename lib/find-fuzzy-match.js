var FuzzySet = require("fuzzyset.js");

var sameSentiment = function(first, second){
  if (first ===0 && second ===0){
    return true;
  }
  if (first < 0 && second < 0){
    return true;
  }
  if (first > 0 && second > 0){
    return true;
  }
  return false;
}

module.exports = function(index, inputWords, inputSentiment){
  var allMatches = [];
  index.forEach(function(entry){
    var query = new FuzzySet(entry.tags);
    var totalScore = 0;
    var allMatches = [];
    inputWords.forEach(function(inputWord){
      var matches = query.get(inputWord);
      if (matches && matches.length){
        var wordScore = matches[0][0];
        if (wordScore > .8){
          totalScore++;
          allMatches.push(matches);
        }
      }
    });
    var isSameSentiment = sameSentiment(entry.sentimentScore, inputSentiment);
    if (totalScore > 0 && isSameSentiment){
      allMatches.push({
        filename: entry.filename,
        id: entry.filename + ":fuzzy",
        type: "fuzzy",
        weight: totalScore * .8,
        matches: allMatches
      })
    }
  });
  return allMatches;
}
