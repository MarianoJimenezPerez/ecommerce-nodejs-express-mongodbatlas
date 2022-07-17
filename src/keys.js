const dotenv = require('dotenv').config();


module.exports = {
  mongodb: {
    URI: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@proyecto-final-coder.chalkx8.mongodb.net/?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000
    }
  }
};
