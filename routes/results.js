var moment = require('moment')
  , sampleData = require('./data.json');

exports.single = function(req, res) {
  sampleData.createdFormatted = moment(sampleData.created).format('LL');

  // calculate time faults
  for (var i in sampleData.results) {
    var result = sampleData.results[i];

    result.timeFaults = Math.max(result.time - sampleData.courseTimeInSeconds, 0);
    result.totalFaults = result.courseFaults + result.timeFaults;
  }

  sampleData.title = "Results for " + sampleData.className + ", " + sampleData.dogSize + ". " + sampleData.competition + " " + sampleData.createdFormatted;
  res.render('result', sampleData);
};