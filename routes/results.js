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

  sampleData.results.sort(function(a, b) {
    if (a.disqualified) {
    	return 1;
    }

    if (b.disqualified) {
    	return -1;
    }

    if (a.totalFaults !== b.totalFaults) {
      return a.totalFaults - b.totalFaults;
    }

    if (a.courseFaults !== b.courseFaults) {
      return a.courseFaults - b.courseFaults;
    }

    return a.time - b.time;
  });

  sampleData.title = "Results for " + sampleData.className + ", " + sampleData.dogSize + ". " + sampleData.competition + " " + sampleData.createdFormatted;
  res.render('result', sampleData);
};