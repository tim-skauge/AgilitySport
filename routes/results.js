var moment = require('moment')
  , sampleData = require('./data.json');

exports.create = function(req, res) {
  res.render('result-create', { title: 'Create result' });
}

exports.single = function(req, res) {
  sampleData.createdFormatted = moment(sampleData.created).format('LL');
  sampleData.noFaults = 0;
  sampleData.withFaults = 0;
  sampleData.disqualified = 0;

  // calculate time faults
  for (var i in sampleData.results) {
    var result = sampleData.results[i];

    result.timeFaults = Math.max(result.time - sampleData.courseTimeInSeconds, 0);
    result.totalFaults = result.courseFaults + result.timeFaults;

    if (result.time) {
      result.metersPrSecond = sampleData.courseLengthInMeters / result.time;    	
    }

    if (result.disqualified) {
      sampleData.disqualified++;
    } else if (result.totalFaults == 0) {
      sampleData.noFaults++;
    } else {
      sampleData.withFaults++;
    }
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

  var firstTime = sampleData.results[0].time;
  for (var i in sampleData.results) {
    var result = sampleData.results[i];

    result.afterFirst = result.disqualified ? 0 : result.time - firstTime;
  }

  sampleData.noFaults = Math.round((sampleData.noFaults/sampleData.results.length)*100);
  sampleData.withFaults = Math.round((sampleData.withFaults/sampleData.results.length)*100);
  sampleData.disqualified = 100 - sampleData.noFaults - sampleData.withFaults;

  sampleData.title = "Results for " + sampleData.className + ", " + sampleData.dogSize + ". " + sampleData.competition + " " + sampleData.createdFormatted;
  res.render('result', sampleData);
};