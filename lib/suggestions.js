var _ = require("lodash");
var DidYouMean = require("did-you-mean");

module.exports = function(index, input){
  var allTags = _.uniq(_.flatten(_.pluck(index, "tags")));
  var matcher = new DidYouMean(allTags);
  var results = matcher.get(input);
  console.log("Did you mean: ", results);
  return results;
}
