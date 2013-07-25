var moment = require('moment')
  , sampleData = require('./data.json');

exports.single = function(req, res) {
  sampleData.createdFormatted = moment(sampleData.created).format('LL');
  console.log(sampleData);

  res.render('result', sampleData);
};