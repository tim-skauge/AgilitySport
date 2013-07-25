var moment = require('moment')
  , sampleData = require('./data.json');

exports.single = function(req, res) {
  sampleData.createdFormatted = moment(sampleData.created).format('LL');
  console.log(sampleData);

  sampleData.title = "Results for " + sampleData.className + ", " + sampleData.dogSize + ". " + sampleData.competition + " " + sampleData.createdFormatted;
  res.render('result', sampleData);
};