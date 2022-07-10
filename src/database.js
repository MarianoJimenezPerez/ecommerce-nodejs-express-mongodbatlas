const mongoose = require('mongoose');
const { mongodb } = require('./keys');

mongoose.set('useFindAndModify', false);
mongoose.connect(mongodb.URI, mongodb.options)
  .then(db => console.log('DB is connected'))
  .catch(err => console.log(err));
